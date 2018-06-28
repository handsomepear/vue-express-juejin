import User from '../models/user'
import { md5 } from 'utility'  // 加密
import config from '../../server.config'
// 注册
export function register(req, res) {
  let username = req.body.username
  let phoneEmail = req.body.phoneEmail
  let password = md5(`${req.body.password}${config.secret}`) // 加密密码保存并且添加一个私钥
  // 判断用户是否被占用
  // 如果已存在返回1001
  // 如果不存在返回1000并保存数据库
  let user = new User(username, password, phoneEmail)
  User.getByUsername(username)
    .then(u => {
      if (u) {
        return res.json({
          code: 1001,
          msg: 'username already exists'
        })
      }
      return user.save() // 保存用户信息到数据库
    })
    .then(rows => {
      //表示注册失败了
      if (rows.affectedRows === 0) {
        return res.json({
          code: 1002,
          msg: 'user register failed'
        })
      }
      // 用户注册成功 记录用户登录状态
      user.id = rows.insertId  // 保存用户的id
      req.session.user = user
      res.json({
        code: 1000,
        user: { id: user.id },
        msg: 'user register success'
      })
    })
    .catch(err => {
      res.json({
        code: '1003',
        msg: err.message
      })
    })
}

// 登陆
export function login(req, res) {
  let phoneEmail = req.body.phoneEmail
  let password = md5(`${req.body.password}${config.secret}`)
  // 后台拿到用户请求的数据之后也一定要做校验判断
  // 因为用户可以禁用javascript

  // 2000 登陆成功
  // 2001 用户不存在
  // 2002 密码不正确
  // 2003 表示登陆失败
  // 2004 表示操作失败
  User.getByPhoneEmail(phoneEmail)
    .then(u => {
      if (!u) {
        return res.json({
          code: 2001,
          msg: 'phoneEmail not exits'
        })
      }
      if (password !== u.password) {
        return res.json({
          code: 2002,
          msg: 'password error'
        })
      }
      // 代码执行到这里 说明用户可以通过验证 登陆成功
      // 登陆成功 记录登陆状态 记录到session中
      req.session.user = u
      res.json({
        code: 2000,
        user: { id: u.user_id },
        msg: 'login success'
      })
    })
    .catch(err => {
      res.json({
        code: 2004,
        msg: err.message
      })
    })
}

// 登出
export function layout(req, res) {
  delete req.session.user
  res.redirect('/')
}

// 获取当前用户信息
export function userInfo(req, res) {
  res.json({
    code: 1000,
    data: req.session.user,
    msg: "success"
  })
}