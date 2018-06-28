# vue-juejin

> A Vue.js project

## Build Setup

``` bash
# 安装依赖
npm install

# 项目打包
npm run build

# 启动服务器并访问 http://127.0.0.1:3000
npm start
```

## 项目描述

模拟掘金手机端网页，打造一款IT界的交流平台

实现了 `首页文章展示`、`登录/注册/登出`、`专栏文章展示`、`收藏集卡片关注/取消关注`、`登录用户的收藏集卡片展示` 功能

## 技术栈

Vue + Vue-router + webpack 构建前台SPA页面

Node + express + mysql 搭建服务器并存储数据

## 项目目录结构

| --vue-juejin 
  |--dist               # webpack打包代码文件夹
  |--node_modules       # npm包管理文件夹
  |--server             # node服务器文件夹
    |-- controller      # 后端路由处理函数文件夹
    |-- model           # 数据模型文件夹
  |--src                # vue主文件夹
    |-- components      # vue组件文件夹
    |-- filters         # vue过滤器文件夹
    |-- static          # 静态文件文件夹
    |-- store           # vuex文件夹
    |-- App.vue         # vue主文件
    |-- main.js         # vue的一些配置文件
    |-- router.config.js   # vue-router配置文件
  |--app.js             # 服务器入口文件
  |--main.js            # node配置ES6语法之后的入口文件
  |--server.config.js   # 服务器的一些常量配置
  |--server.router.js   # 后端借口文件
  |--webpack.config.js  # webpack简化配置


## 后端路由设计

```bash
GET /firstPage  获取首页文章数据
GET /columnAll  获取专栏所有数据 
GET /columnFrontend 获取专栏前端选项卡数据(未实现)
GET /userInfo 获取登录用户信息
GET /collections 获取收藏集数据
GET /myCollections 获取当前登录用户收藏集信息
POST /follow 收藏集关注功能
POST /unfollow 收藏集取消关注功能
POST /register 用户注册
POST /login 用户登录
POST /layout 用户登出
```

## 数据库设计

表1: **articles** -> 存放文章信息

表2：**collections** -> 存放收藏集卡片信息

表3: **users** -> 存放用户信息

表4：**user_articles_map** -> 存放用户与收藏集卡片映射关系







