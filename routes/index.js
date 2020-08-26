const app = require('express')
const router = app.Router()
var db = require('../db')
var async = require('async')
var gconfig = require('../config/gConfig')
// let responseJSON = function (res, ret) {
//   if (typeof ret === 'undefined') {
//     res.json({
//       code: '-200', msg: '操作失败'
//     })
//   } else {
//     res.json(ret)
//   }
// }
function getJSON (val) {
  return JSON.parse(JSON.stringify(val))
}
// app.locals.gconfig = gconfig
/* GET home page. */
router.get('/', async (req, res, next) => {
  // res.locals.menu = 1
  // var sql = `select * from tag where pc = 1 order by id desc limit 4  `
  // var result = []
  // var rows = await db.query(sql)
  // var row = JSON.parse(JSON.stringify(rows))
  // // 构建多分类的目录
  // await async.map(row, async (item, callback) => {
  //   var sqlLink = `select * from imgTag where tag like '%${item.tagid}%' and author <> '' order by rand() desc  limit 4`
  //   var sqlNum = `select count(id) from imgTag where tag like '%${item.tagid}%' and author <> '' order by rand() desc `
  //   var tmp = await db.query(sqlLink)
  //   var tmpNum = await db.query(sqlNum)
  //   // 重组数据结构
  //   var obj = Object.assign({}, item)
  //   obj.tmp = getJSON(tmp)
  //   obj.num = (getJSON(tmpNum))[0]['count(id)']
  //   result.push(obj)
  // }, async (err, results) => {
  //   var sql = `select * from imgTag where tag like '%13%'  and author <> '' order by rand() limit 24`
  //   var hot = await db.query(sql)
  //   if (err) {
  //     console.log(err)
  //   } else {
  //     await res.render('index', {
  //       result: result,
  //       hot: getJSON(hot)
  //     })
  //   }
  // })

  /***** */
  // var limitNum = 60
  // var result = []
  // var sql = `select * from tag limit ${limitNum}`
  // var tagResult = await db.query(sql)
  // res.render('index', {
  //   tagResult: tagResult,
  //   result: result
  // })
  /* **/
  res.locals.menu = 1
  var sql = `select * from tag where pc = 1 order by id desc limit 4  `
  var result = []
  var rows = await db.query(sql)
  var row = JSON.parse(JSON.stringify(rows))
  // 构建多分类的目录
  await async.map(row, async (item, callback) => {
    var sqlLink = `select * from imgTag where tag like '%${item.tagid}%' and author <> '' order by rand() desc  limit 4`
    var sqlNum = `select count(id) from imgTag where tag like '%${item.tagid}%' and author <> '' order by rand() desc `
    var tmp = await db.query(sqlLink)
    var tmpNum = await db.query(sqlNum)
    // 重组数据结构
    var obj = Object.assign({}, item)
    obj.tmp = getJSON(tmp)
    obj.num = (getJSON(tmpNum))[0]['count(id)']
    result.push(obj)
  }, async (err, results) => {
    // 查询右边标签页
    var sqlLink = `select * from tag where id < ${gconfig.limitTag} order by rand() limit 25  `
    var tagList = await db.query(sqlLink)
    // 今日最新的表情
    var sql = `select * from imgTag where tag like '%13%'  and author <> '' order by rand() limit 24`
    var hot = await db.query(sql)
    if (err) {
      console.log(err)
    } else {
      await res.render('index', {
        result: result,
        tagList: getJSON(tagList),
        hot: getJSON(hot)
      })
    }
  })
})

module.exports = router
