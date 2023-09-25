const port = process.env.PORT || 9090
const env = process.env.NODE_ENV || 'development'
const express = require('express')
const path = require('path')

const jwtConfig = require('./config/jwt')
const jwt = require('jwt-simple')
// sesstion 存储
const bodyParser = require('body-parser')

// 日志
const log4js = require('./server_modules/log.js').log4js
const logger = require('./server_modules/log.js').logger

// 数据库
const mongoose = require('./server_modules/mongodb.js')

// 服务启动
const app = express()

const router = express.Router()
// 用于静态展示入口
router.get('/', function (req, res, next) {
  req.url = './index.html'
  next()
})
// 声明静态资源地址
app.use(express.static('dist'))
// app.use(express.static('static'));
app.use(router)
// 服务器提交的数据json化
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function (req, res, next) {
  const pathUrl = req.url.split('?')[0]
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.query && req.query.token) {
    token = req.query.token
  }
  if (
    [
      '/api/user/signup',
      '/api/user/signin',
      '/api/message/history/byUser',
      '/api/friend/list',
      '/api/user/vipuser',
      '/api/user/getInfo',
      '/api/user/search',
      '/api/message/v2/history',
      '/api/message/getHot'
    ].includes(pathUrl)
  ) {
    // return next();
    try {
      const decoded = jwt.decode(token, jwtConfig.secret)
      req.user = decoded
      return next()
    } catch (e) {
      return next()
    }
  } else {
    if (!token) {
      res.status(401).json({
        msg: '请先登录'
      })
      return next()
    }
    try {
      const decoded = jwt.decode(token, jwtConfig.secret)
      res.user = decoded
      return next()
    } catch (e) {
      res.status(401).json({
        msg: 'token 校验错误'
      })
      return next()
    }
  }
})
// sesstion 存储

// require('./router/routes.js')(app)

app.use('/api/file', require('./router/files'))
app.use('/api/user', require('./router/users'))
app.use('/api/message', require('./router/messages'))
app.use('/api/friend', require('./router/friends'))

if (app.get('env') === 'development') {
  app.set('showStackError', true)
  app.use(log4js.connectLogger(logger, { level: log4js.levels.INFO }))
  app.locals.pretty = true
  mongoose.set('debug', true)
}

const server = app.listen(port)
// websocket
require('./server_modules/websocket.js')(server)
