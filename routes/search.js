var express = require('express')
var router = express.Router()
var db = require('../db')
const limitNum = 60
function getJSON (val) {
  return JSON.parse(JSON.stringify(val))
}
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})
// 直接搜索
router.get('/search/keyword/:keyword', async (req, res, next) => {
  res.locals.menu = 0
  var keyword = req.params.keyword
  var sql = `select id,name,url from imgTag where name like "%${keyword}%" and author <> '' order by id desc limit ${limitNum} `
  var countSql = `select count(id) from imgTag where name like "%${keyword}%"  and author <> '' order by id desc  `
  var result = await db.query(sql)
  var result2 = await db.query(countSql)
  var count = (getJSON(result2))[0]['count(id)']

  console.log({
    result: getJSON(result),
    count: count,
    keyword: keyword,
    page: 1,
    limitNum: limitNum
  })
  await res.render('search', {
    result: getJSON(result),
    count: count,
    keyword: keyword,
    page: 1,
    limitNum: limitNum
  })
})
// 分页搜索
router.get('/search/keyword/:keyword/page/:page', async (req, res, next) => {
  res.locals.menu = 0
  var keyword = req.params.keyword
  var page = req.params.page
  var limt = (page - 1) * limitNum
  var sql = `select id,name,url from imgTag where name like "%${keyword}%" and author <> '' order by id desc limit ${limt},${limitNum} `
  var countSql = `select count(id) from imgTag where name like "%${keyword}%" and author <> '' order by id desc  `
  var result = await db.query(sql)
  var result2 = await db.query(countSql)
  var count = (getJSON(result2))[0]['count(id)']
  await res.render('search', {
    result: getJSON(result),
    count: count,
    page: page,
    limitNum: limitNum
  })
})
module.exports = router
