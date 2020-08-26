var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

// const routes = require('./routes/index')
// const users = require('./routes/users')
// const biaoqing = require('./routes/biaoqing')

const allRoutes = require('./routes/all')
var app = express()
const gconfig = require('./config/gConfig')
// app.locals(gconfig)

// view engine setup
app.set('views', path.join(__dirname, 'dist/views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'dist')))

// app.use(function (req, resp, next) {
//   resp.locals['UID'] = gconfig
// })
app.use(function (req, res, next) {
  res.locals.gconfig = gconfig
  res.locals.menu = 1
  next()
})
// 装载路由
allRoutes(app)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
