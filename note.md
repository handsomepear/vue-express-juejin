### Cookie总结

HTTP 是无状态的  Cookie是用来解决HTTP无状态的问题的。也就是说使用Cookie可以用来保存状态

Cookie是保存在客户端的

- 第一次访问，校验，没有Cookie，然后浏览器在响应的时候写了一个Set-Cookie响应头
- 接下来的每一次请求 客户端的偶会带着这个Cookie发送请求

Cookie分为会话Cookie和持久化Cookie

- 会话Cookie只存活于浏览器打开状态 一旦浏览器关闭 会话Cookie消失
- 持久化Cookie是保存在硬盘中的 可以通过Max-Age属性指定过期时间(单位是秒)
  + 只要时间不到，那么cookie就一直保存到本地硬盘
  + 只要时间一到 Cookie就自动清除

Cookie的用途 一般适用于对安全性较低的功能

- 记住用户名
- 购物车
- 是不是第一次访问网站

Cookie 的问题

- Cookie会被附加到每个HTTP请求中 无形中增加了数据流量
- 由于在HTTP请求中的Cookie是明文传递的 所以安全性成问题
- Cookie的大小限制在4KB左右，对于复杂的存储需求来说是不够用的


### Session

Session 是基于 Cookie 实现的一种状态保持技术

Session 是利用Cookie在客户端存储一个密钥，然后在服务器端存储该密钥对应的数据仓库

Session 一般用于安全性较高的功能

- 用户注册登录状态
- 验证码

Session也分为会话Session和持久化Session
