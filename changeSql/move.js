const db = require('../db')
const chalk = require('chalk')
var moment = require('moment');
const utils = require('./utils')
var imgList = []
var tagList = []
moment().format();
var selecData = {}
// 查询所有文章
selecData.imgProcess = () => {
  return new Promise((reslove, reject) => {
    // var sql = "select url,tag,name,author,ishow,date_format(date, '%Y-%m-%d %H:%m:%s') as myDate,userid,date,userid from imgTag limit 1,200"
    var sql = "select name,tag,cid from art_content"
    db.query(sql).then(res => {
      let result = JSON.parse(JSON.stringify(res))
      imgList = result
      // console.log('result',chalk.red(result))
      reslove()
    })
  })
}
// 查询所有标签
selecData.taglist = () => {
  return new Promise((reslove, reject) => {
    var sql = 'select id,name,tagid,hot,showMenu,pic,pc from tag  '
    db.query(sql).then(res => {
      let result = JSON.parse(JSON.stringify(res))
      tagList = result
      // console.log('result',chalk.red(result))
      reslove()
    })
  })
}


selecData.deal = async () => {


  // tagList
  // { id: 16,
  //   name: '明星日常',
  //   tagid: 16,
  //   hot: 0,
  //   showMenu: '0',
  //   pic: null,
  //   pc: 0 }
  // for (var res of tagList) {
  //   var result = {}
  //   for (var r in res) {
  //     result[r] =  utils.filter(res[r])
  //   }
  //   var sqlinsert = `insert into art_metas (name,showMenu,hot,pic,pc)` +
  //     ` VALUES('${result.name}','${result.showMenu}',${result.hot},'${result.pic}',${result.pc})`
  //   await db.query(sqlinsert)
  // }
  // imgList {
  //   id: 117,
  //   url: 'affca7b52644c.gif',
  //   tag: '',
  //   name: '小杂种',
  //   author: null,
  //   ishow: 0,
  //   date: null,
  //   userid: null }
  // console.log('imgList', imgList)
  for (var res of imgList) {
    var result = {}
    console.log('res', res)
    for (var r in res) {
      result[r] = utils.filter(res[r])

      if (r == 'myDate') {
        result[r] = result[r].length > 1 ? `'${result[r]}'` : 'NULL'
      }


      if (r == 'tag' && result[r]) {
        var arr = result[r].split(',')
        if (Array.isArray(arr) && arr.length > 0) {
          result[r] = utils.unique(arr).join(",")
        }
      }
    }
    var sqlinsert = `insert into art_content (name,url,tag,author,date,userid,ishow)` +
      ` VALUES('${result.name}','${result.url}','${result.tag}','${result.author}',${result.myDate},'${result.userid}',${result.ishow})`
    console.log(sqlinsert)
    await db.query(sqlinsert)
  }

}
selecData.dealData = async () => {
  // 处理最后的外建表
  for (var res of imgList) {
    var obj = res
    var cid = obj.cid
    var midArr = []
    for (var r in res) {
      if (r == 'tag' && res[r]) {
        var tag = res[r].split(',')
        midArr = tag
      }
    }

    // 开始遍历tagid
    console.log('开始遍历tagid')
    for (var mid of midArr) {
      if (cid != 0 && mid != 0) {
        console.log('cid,mid', cid, mid)
        var sqlinsert = `insert into art_relationship (cid,mid)` +
          ` VALUES(${parseInt(cid)},${parseInt(mid)})`
        await db.query(sqlinsert)
      }
    }
    // console.log('cid', cid)
  }

  //   var sqlinsert = `insert into art_relationship (cid,mid)` +
  //   ` VALUES(${result.cid},${result.mid})`
  // console.log(sqlinsert)
}




(async () => {
  console.log('开始启动服务', chalk.blue(moment().format('h:mm:ss')))
  await selecData.imgProcess()
  // await selecData.taglist()
  // await selecData.deal()
  await selecData.dealData()
  console.log('结束启动服务', chalk.blue(moment().format('h:mm:ss')))
  await process.exit()
})()