import * as db from './db'
export default class User {
  constructor(username, password, phoneEmail, avatar = "avatar.png") {
    this.username = username
    this.password = password
    this.avatar = avatar // 用户头像
    this.phoneEmail = phoneEmail
  }
  // 保存到数据库方法
  save() {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO `users`(`username`, `password`, `avatar`, `phoneEmail`) VALUES(?,?,?,?);', [this.username, this.password, this.avatar, this.phoneEmail])
        .then(rows => {
          // 保存成功后返回的对象 如果rows.insertId不为0的时候就说明添加成功了
          resolve(rows)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  // 根据用户名查找
  static getByUsername(username) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM `users` WHERE `username`=?', [username])
        .then(rows => {
          resolve(rows[0])
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  static getByPhoneEmail(phoneEmail) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM `users` WHERE `phoneEmail`=?', [phoneEmail])
        .then(rows => {
          resolve(rows[0])
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}


