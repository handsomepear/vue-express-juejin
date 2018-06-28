import * as db from '../models/db'

export function getCollections(req, res) {
  var user = req.session.user
  if (!user) {
    // 用户没有登录的时候的收藏信息
    db.query('SELECT * FROM `collections`')
      .then(rows => {
        // db.query('select * from users INNER JOIN user_article_map ON users.id = user_article_map.user_id INNER JOIN collections ON user_article_map.article_id = collections.id')
        // .then()
        res.json({
          code: 1000,
          data: rows,
          msg: 'success'
        })
      })
      .catch(err => {
        res.json({
          code: 1001,
          msg: err.message
        })
      })
  } else {
    // 用户登录之后查看的收藏集信息
    db.query('SELECT * FROM `collections`')
      .then(rows => {
        var allCard = rows
        db.query(`select * from collections where col_id in (select c_id from user_article_map where u_id="${user.user_id}") group by col_id`)
          .then(rows => {
            allCard.forEach(function (card) {
              card['followed'] = false
              rows.forEach(function (followCard) {
                if (card.col_id === followCard.col_id) {
                  card['followed'] = true
                }
              })
            });
            res.json({
              code: 1000,
              data: allCard,
              msg: 'success'
            })
          })
      })
      .catch(err => {
        res.json({
          code: 1001,
          msg: err.message
        })
      })
  }
}

export function follow(req, res) {
  var cardId = req.body.cardId
  var userId = req.body.userId
  db.query('INSERT INTO `user_article_map`(`c_id`,`u_id`) VALUES(?,?)', [cardId, userId])
    .then(rows => {
      if (rows.affectedRows == 1) {
        db.query(`UPDATE collections SET follow=follow+1 where col_id="${cardId}"`, [])
          .then(rows => {
          })
          .catch(err => {
          })
        return res.json({
          code: 1000,
          msg: "success"
        })
      }
      res.json({
        code: 1001,
        msg: 'failed'
      })
    })
    .catch(err => {
      res.json({
        code: 1002,
        msg: err.message
      })
    })
}

export function unfollow(req, res) {
  var cardId = req.body.cardId
  var userId = req.body.userId
  db.query(`DELETE FROM user_article_map WHERE c_id="${cardId}" and u_id="${userId}"`, [])
    .then(rows => {
      if (rows.affectedRows == 1) {
        db.query(`UPDATE collections SET follow=follow-1 where col_id="${cardId}"`, [])
          .then(rows => {
          })
          .catch(err => {
          })
        console.log(rows);
        return res.json({
          code: 1000,
          msg: "success"
        })
      }
      res.json({
        code: 1001,
        msg: 'failed'
      })
    })
    .catch(err => {
      res.json({
        code: 1002,
        msg: err.message
      })
    })
}

export function getMyCollections(req, res) {
  var userId = req.query.userId
  db.query(`SELECT * FROM users,collections,user_article_map WHERE user_article_map.u_id="${userId}" AND user_article_map.u_id=users.user_id  AND user_article_map.c_id=collections.col_id;
  `)
    .then(rows => {
      res.json({
        code: 1000,
        data: rows,
        msg: 'success'
      })
    })
}