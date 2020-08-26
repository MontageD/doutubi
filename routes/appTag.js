var express = require('express')
var router = express.Router()
var db = require('../db')
var async = require('async')
const limitNum = 90
function getJSON (val) {
  return JSON.parse(JSON.stringify(val))
}
/* GET users listing. */
router.get('/all', async (req, res, next) => {
  // 读取搜索标签
  // page 为从哪里开始
  res.locals.menu = 2
  var sql = `select * from tag limit ${limitNum}`
  var result = await db.query(sql)
  await res.render('tag', {
    result: getJSON(result)
  })
})
// 加载更多标签的接口
router.get('/all/more/:page', async (req, res, next) => {
  // 读取搜索标签
  // page 为从哪里开始
  var limt = (page - 1) * limitNum
  // var page = req.params.page - 1
  var sql = `select *,count(id) from tag limit (${limt},${limitNum})`
  var result = await db.query(sql)
  await res.render('tag', {
    result: getJSON(result)
  })
})
module.exports = router
