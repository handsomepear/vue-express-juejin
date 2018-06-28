import express from 'express'
import * as userController from './server/controller/user'
import * as articleController from './server/controller/article'
import * as collectController from './server/controller/collect'
const router = express.Router()

router
  .get('/', (req, res) => {
    // 当通过req.session 访问里面的数据的时候
    // express-session 这个中间件自动把保存在客户端的钥匙 connect.sid带上来 然后通过这个钥匙去找对应的对象 通过键值对的形式拿到对应的数据
    res.sendFile(__dirname + '/index.html')
  })
  .get('/firstPage', articleController.getArticle)
  .get('/columnAll', articleController.getColumnArticle)
  .get('/columnFrontend', (req, res) => {
    // 专栏前端文章展示
  })
  .get('/userInfo',userController.userInfo)
  .get('/collections',collectController.getCollections)
  .get('/myCollections', collectController.getMyCollections)
  .post('/follow', collectController.follow)
  .post('/unfollow', collectController.unfollow)
  .post('/register', userController.register)
  .post('/login', userController.login)
  .post('/layout', userController.layout)


export default router