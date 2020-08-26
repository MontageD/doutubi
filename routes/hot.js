var express = require('express')
var router = express.Router()
var db = require('../db')
var async = require('async')
function getJSON (val) {
  return JSON.parse(JSON.stringify(val))
}
const limitNum = 60
/* GET users listing. */
// 时间倒叙查询全部
router.get('/all', async (req, res, next) => {
  res.locals.menu = 3
  var sql = `select id,name,url  from imgTag  where author <> '' order by id desc limit ${limitNum}`
  var sql2 = `select count(id) from imgTag where author <> '' order by id desc  `
  var result = await db.query(sql)
  var result2 = await db.query(sql2)
  var count = (getJSON(result2))[0]['count(id)']

  await res.render('hot', {
    result: getJSON(result),
    count: count,
    page: 1,
    limitNum: limitNum
  })
})
router.get('/all/more/:page', async (req, res, next) => {
  res.locals.menu = 3
  var page = req.params.page
  var limt = (page - 1) * limitNum
  var sql = `select id,name,url  from imgTag  where author <> '' order by id desc limit ${limt},${limitNum}`
  var sql2 = `select count(id) from imgTag where author <> '' order by id desc  `
  var result = await db.query(sql)
  var result2 = await db.query(sql2)
  var count = (getJSON(result2))[0]['count(id)']
  await res.render('hot', {
    result: getJSON(result),
    count: count,
    page: page,
    limitNum: limitNum
  })
})
module.exports = router
