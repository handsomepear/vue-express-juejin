import * as db from '../models/db'

export function getArticle(req, res) {
  db.query('SELECT * FROM `articles`')
    .then(rows => {
      res.json({
        code: 1000,
        list: rows,
        msg: 'success'
      })
    })
    .catch(err => {
      res.json({
        code: 1001,
        msg: err.message
      })
    })
}

export function getColumnArticle(req, res) {
  db.query('SELECT * FROM `articles` WHERE `router`=?', ["column"])
    .then(rows => {
      res.json({
        code: 1000,
        list: rows,
        msg: 'success'
      })
    })
    .catch(err => {
      res.json({
        code: 1001,
        msg: err.message
      })
    })
}