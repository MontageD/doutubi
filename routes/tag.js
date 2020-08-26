var express = require('express')
var router = express.Router()
var db = require('../db')
var { filter } = require('../utils/filters')
function getJSON (val) {
  return JSON.parse(JSON.stringify(val))
}
const limitNum = 60
/* GET users listing. */
router.get('/all', async (req, res, next) => {
  // 读取搜索标签
  // page 为从哪里开始
  res.locals.menu = 2
  var sql = `select * from tag limit ${limitNum}`
  var sql2 = `select count(id) from tag limit ${limitNum}`
  var result = await db.query(sql)
  var result2 = await db.query(sql2)
  var count = (getJSON(result2))[0]['count(id)']
  await res.render('tag', {
    result: getJSON(result),
    count: count,
    page: 1,
    limitNum: limitNum
  })
})
// 加载更多标签的接口
router.get('/all/more/:page', async (req, res, next) => {
  res.locals.menu = 2
  // 读取搜索标签
  // page 为从哪里开始

  // var page = req.params.page - 1
  var page = req.params.page
  var limt = (page - 1) * limitNum
  var sql = `select *from tag limit ${limt},${limitNum} `
  var sql2 = `select count(id) from tag `
  var result = await db.query(sql)
  var result2 = await db.query(sql2)
  var count = (getJSON(result2))[0]['count(id)']
  await res.render('tag', {
    result: getJSON(result),
    count: count,
    page: req.params.page,
    limitNum: limitNum
  })
})

// 直接搜索
router.get('/search/keyword/:keyword', async (req, res, next) => {
  // 关键标签id
  res.locals.menu = 2
  var keyword = filter(req.params.keyword)
  var sql = `select id,name,url from imgTag where tag like "%${keyword}%" and author <> '' order by id desc limit ${limitNum} `
  var countSql = `select count(id) from imgTag where tag like "%${keyword}%"  and author <> '' order by id desc  `
  var wordSql = `select name from tag where id = ${keyword}  `
  var result = await db.query(sql)
  var result2 = await db.query(countSql)
  var result3 = await db.query(wordSql)
  console.log('result3', result3)
  if (result3.length < 0 || result3.length === 0) {
    await res.render('404', {
      text: '图片不存在'
      // hot: getJSON(hot)
    })
    return
  }
  var count = (getJSON(result2))[0]['count(id)']
  var keyName = (getJSON(result3))[0]['name']
  await res.render('tagDetail', {
    result: getJSON(result),
    count: count,
    keyword: keyName,
    page: 1,
    keyid: keyword,
    limitNum: limitNum
  })
})
// 分页搜索
router.get('/search/keyword/:keyword/page/:page', async (req, res, next) => {
  res.locals.menu = 2
  var keyword = filter(req.params.keyword)
  var page = filter(req.params.page)
  var limt = (page - 1) * limitNum
  var sql = `select id,name,url from imgTag where tag like "%${keyword}%" and author <> '' order by id desc limit ${limt},${limitNum} `
  var countSql = `select count(id) from imgTag where tag like "%${keyword}%" and author <> '' order by id desc  `
  var wordSql = `select name from tag where tagid = ${keyword}  `
  var result = await db.query(sql)
  var result2 = await db.query(countSql)
  var result3 = await db.query(wordSql)
  if (result3.length < 0 || result3.length === 0) {
    await res.render('404', {
      text: '图片不存在'
      // hot: getJSON(hot)
    })
    return
  }
  var count = (getJSON(result2))[0]['count(id)']
  var keyName = (getJSON(result3))[0]['name']
  console.log(keyName)
  // var upKeyword = result3
  await res.render('tagDetail', {
    result: getJSON(result),
    count: count,
    page: page,
    keyword: keyName,
    keyid: keyword,
    limitNum: limitNum
  })
})

module.exports = router
