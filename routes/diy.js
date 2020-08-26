var express = require('express')
var router = express.Router()
var db = require('../db')
var async = require('async')

function getJSON (val) {
  return JSON.parse(JSON.stringify(val))
}
const limitNum = 10

router.get('/', async (req, res, next) => {
  res.locals.menu = 4
  // var page = req.params.page ? req.params.page : 1
  // var limt = (page - 1) * limitNum
  var sql = `select name,tag,url,date,id from pc_tag order by id desc limit ${limitNum} `
  var result = await db.query(sql)
  var count = (getJSON(result))[0]['count(id)']
  await res.render('diy', {
    result: getJSON(result),
    count: count,
    page: 1,
    limitNum: limitNum
  })
})

router.get('/all', async (req, res, next) => {
  res.locals.menu = 4
  var sql = `select name,tag,url,date,id from pc_tag order by id desc limit ${limitNum} `
  var sql2 = `select count(id)  from pc_tag order by id desc`
  var result = await db.query(sql)
  var result2 = await db.query(sql2)
  var count = (getJSON(result2))[0]['count(id)']
  result.forEach(item => {
    item.id = Buffer.from(item.id.toString()).toString('base64')
  })
  await res.render('diy', {
    result: getJSON(result),
    count: count,
    page: 1,
    limitNum: limitNum
  })
})
router.get('/all/page/:page', async (req, res, next) => {
  res.locals.menu = 4
  var page = req.params.page
  var limt = (page - 1) * limitNum
  var sql = `select name,tag,url,date,id from pc_tag order by id desc limit ${limt},${limitNum}`
  var sql2 = `select count(id)  from pc_tag order by id desc`
  var result = await db.query(sql)
  var result2 = await db.query(sql2)
  var count = (getJSON(result2))[0]['count(id)']
  result.forEach(item => {
    item.id = Buffer.from(item.id.toString()).toString('base64')
  })
  await res.render('diy', {
    result: getJSON(result),
    count: count,
    page: page,
    limitNum: limitNum
  })
})

router.get('/detail/:id', async (req, res, next) => {
  res.locals.menu = 4
  // var id = new Buffer('MTU=', 'base64').toString();
  var text = req.params.id
  var id = Buffer.from(text, 'base64').toString('ascii')
  var sql = `select  name,tag,url,date,id from pc_tag where id = ${id}`
  var result = await db.query(sql)
  console.log('result', result)
  await res.render('diy_detail', {
    result: getJSON(result[0])
  })
})
module.exports = router
