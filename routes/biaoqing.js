const app = require('express')
const router = app.Router()
var db = require('../db')
var async = require('async')
var gconfig = require('../config/gConfig')
var { filter } = require('../utils/filters')
router.get('/', async (req, res, next) => {

})
function getJSON (val) {
  return JSON.parse(JSON.stringify(val))
}
router.get('/detail/:id', async (req, res, next) => {
  res.locals.menu = 0
  var sql = `select name,id,tagid,showMenu from tag where pc = 1  order by  rand() limit 2  `
  var result = []
  var rows = await db.query(sql)
  var row = JSON.parse(JSON.stringify(rows))
  // // 构建多分类的目录
  await async.map(row, async (item, callback) => {
    var sqlLink = `select  id,url,tag,name,date from imgTag where tag like '%${item.tagid}%' and author <> ''  limit 4`
    var tmp = await db.query(sqlLink)
    //   // 重组数据结构
    var obj = Object.assign({}, item)
    obj.tmp = getJSON(tmp)
    result.push(obj)
  }, async (err, results) => {
    // 查询右边标签页
    var sql1 = `select name,id,tagid,showMenu from tag where id < ${gconfig.limitTag} order by rand() limit 25 `
    var tagList = await db.query(sql1)
    // 今日最新的表情
    // var sql2 = `select * from imgTag where tag like '%13%'  and author <> '' order by rand() limit 24`
    // var hot = await db.query(sql2)

    //  指定id 的图片数据

    const tid = filter(req.params.id)
    var sql3 = `select id,url,tag,name,date from imgTag where id=${tid}`
    var imgList = await db.query(sql3)
    if (imgList.length < 0 || imgList.length === 0) {
      await res.render('404', {
        text: '图片不存在'
        // hot: getJSON(hot)
      })
      return
    }
    imgList = getJSON(imgList)
    // 切割字符串
    var tagLi = imgList[0].tag.split(',')
    // 过滤字符 - 人们为表情的表情包
    tagLi.forEach((item, index) => {
      if (item === '13') {
        tagLi.splice(index, 1)
      }
    })
    var tagLiResult = []
    for (let j = 0; j < tagLi.length; j++) {
      var sql4 = `select name,id,tagid,showMenu from tag where tagid=${tagLi[j]}`
      var tagU = await db.query(sql4)
      tagLiResult.push(getJSON(tagU[0]))
    }

    //  根据第一分类查出相近的分类图片
    var sql5 = `select id,url,tag,name,date from imgTag where tag like '%${tagLi[0]}%'  and author <> '' order by rand() limit 2`
    var likeTag = await db.query(sql5)

    if (err) {
      console.log(err)
    } else {
      await res.render('biaoqing', {
        likeTag: JSON.parse(JSON.stringify(likeTag)),
        tagLiResult: tagLiResult,
        tagList: getJSON(tagList),
        result: result,
        imgList: imgList[0]
        // hot: getJSON(hot)
      })
    }
  })
})
module.exports = router
