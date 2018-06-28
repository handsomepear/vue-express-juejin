// const express = require('express')
import express from 'express'
import path from 'path'
import config from './server.config'
import bodyParser from 'body-parser'
import router from './server.router'
import session from 'express-session'
const app = express()
// 配置静态资源路径
// app.use("/dist", express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'index.html')))
config.staticPaths.forEach((staticPath, index) => {
  app.use(`/${path.basename(staticPath)}`, express.static(staticPath))
})
// 配置表单post请求
app.use(bodyParser.urlencoded({ extended: false }))

// 配置视图路径
app.set('views', __dirname + '/index.html')
// 配置session中间件 用来保持状态的
app.use(
  session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true
  })
)
app.use(router)
app.listen(config.port, config.host, () => {
  console.log('server is running.')
  console.log(`Please Visit http://${config.host}:${config.port}`)
})
