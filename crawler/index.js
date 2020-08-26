var cheerio = require('cheerio')
// var request = require('sync-request')
var requested = require('request')
var fs = require('fs')
var moment = require('moment')
var QinIu = require('./qiniu.js')
var allObj = []
var spiderLimit = []
// var url = 'https://fabiaoqing.com/search/search/keyword/%E5%90%B4%E5%BD%A6%E7%A5%96' // 这里是举个例子而已，豆瓣的具体的电影网址可以自己替换

var markUrl = 'https://fabiaoqing.com/'
// var recursiveTabLength = 0  // 一个页面有多少个标签
var recursiveTab = [] // 一个页面有多少个标签的集合
var recursiveLimit = 0 // 遍历的标签集
var codeList = [] //  总的分页
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: '119.29.253.246',
  user: 'root',
  password: 'dexing07',
  database: 'cAuth'
})

// <!--- 配置选项--- >
function markTag () {
  // 读取文件中的
  fs.readFile('./tag.json', function (err, data) {
    if (err) {
      return console.error(err)
    }
    var person = data.toString()// 将二进制的数据转换为字符串
    person = JSON.parse(person)// 将字符串转换为json对象
    // recursiveTab = person.tag[0].length
    recursiveTab = person.tag[0]
    recursive()
    console.log(person.tag[0])
  })
}
// 每个标签递归
function recursive () {
  if (recursiveLimit < recursiveTab.length) {
    handleDB()
    recursiveLimit++
  }
}
var html = ''

function handleDB (h) {
  var $ = cheerio.load(h) // 引入cheerio的方法。这样的引入方法可以很好的结合jQuery的用法。
  if ($('#mobilepages').next().find('.item').length > 1) {
    console.log('这是存在多分页的')
    var tagName = (allObj.name)
    var tagid = allObj.tag
    console.log('这是我要遍历的标签:', tagName)
    console.log(`select count(id) from imgTag where tag = '${tagid}'`)
    connection.query(`select count(id) from imgTag where tag = '${tagid}'`, function (error, res, fields) {
      if (error) throw error
      var result = JSON.parse(JSON.stringify(res))
      console.log('result:', result)
      // 检查数据库是否已经有插入的数据
      if (result[0]['count(id)'] === 0) {
        console.log('不存在数据')
        $('#mobilepages').next().find('.item').each(function () {
          var codeUrl = markUrl + $(this).attr('href')
          console.log(codeUrl)
          downImgDOM(codeUrl)
        })
      } else {
        console.log('存在数据')
      }
    })
  } else {
    console.log('这是存在只有一个页面的')
    var codeUrl = (`https://fabiaoqing.com/search/search/keyword/${encodeURIComponent(allObj.name)}`)
    downImgDOM(codeUrl)
  }
  console.log('最终答案+++++')
  console.log(codeList)
  // downImgDOM($)
}

function downImgDOM (url) {
  return new Promise((resolve, reject) => {
    requested(url, function (error, response, body) {
      var htmling = body.toString()
      var $ = cheerio.load(htmling)
      var allList = []
      var tagdiv = $('.tagbqppdiv') //  指代每一存在图片的dom 节点
      tagdiv.each(function (index) {
      // console.log($(this).find('a').attr('title'))
        var obj = {
          url: '',
          name: ''
        }
        // var urlList = (($(this).find('a img').attr('data-original')).split('/'))
        obj.url = $(this).find('a img').attr('data-original')
        obj.name = $(this).find('a').attr('title')
        console.log('开始进入插入数据的操作')
        geaData(obj.url, obj.name, () => {
          resolve(allList)
        })
        // allList.push(obj)
      })
      console.log('最终答案')
      console.log('allList', allList)
      codeList.push(allList)
    })
  })
}

function geaData (urlInert, fileName, call) {
  var insertUrl = 'https://api.maopingshou.com/api/vueImgData'
  // var urlInert = 'http://ww3.sinaimg.cn/bmiddle/006r3PQBjw1fb5n5h77t8j30bz0b6js2.jpg'
  var urlList = urlInert.split('/')
  var imgType = urlList[urlList.length - 1].split('.')
  var urlOut = `${imgType[0]}${parseInt(Math.random() * 100)}.${imgType[1]}`

  console.log('爬取的文件名:', urlInert)
  console.log('输出的文件名:', urlOut)
  QinIu.fetchQinIu(urlInert, urlOut, (res) => {
    console.log('回调结果为:')
    console.log(res)
    console.log('开始插入数据库数据')
    var obj = {
      url: res.key,
      tag: allObj.tag,
      name: fileName,
      author: '马丁克',
      ishow: 1, // 是否显示
      date: moment().format('YYYY-MM-DD HH:MM:ss'),
      userid: ''
    }

    requested.post({ url: insertUrl, form: obj }, function (err, res, body) {
      console.log(body)
      console.log('插入数据结束')
      call()
    })
  })

  // console.log(obj)
}

// 最终执行

// geaData()
// 执行函数部分
// markTag()
function start () {
  spiderLimit = [580, 600]
  // connection.connect()
  connection.query(`select * from tag where id BETWEEN ${spiderLimit[0]} AND ${spiderLimit[1]}`, function (error, res, fields) {
    if (error) throw error
    var result = JSON.parse(JSON.stringify(res))
    // console.log('The solution is: ', result)
    // result.forEach((item, index) => {
    // console.log(item.tagid)
    // var name = item.name
    allObj.result = result
    allObj.len = result.length
    allObj.limit = 0
    diguiResult()
  })

  // connection.end()
  // 先查出标签信息再进入页面爬取信息
  // allObj = {
  //   tag: 111
  // }

  // var url = 'https://fabiaoqing.com/search/search/keyword/%E6%97%A0%E8%AF%AD'
  // requested(url, function (error, response, body) {
  //   var h = body.toString()
  //   handleDB(h)
  // })
}

function diguiResult () {
  if (allObj.limit < (allObj.len - 1)) {
    allObj.limit = allObj.limit + 1
    console.log('limit:', allObj.limit)
    // var name = allObj.result[allObj.limit].name
    allObj.tag = allObj.result[allObj.limit].tagid
    allObj.name = allObj.result[allObj.limit].name
    allObj.url = (`https://fabiaoqing.com/search/search/keyword/${encodeURIComponent(allObj.name)}`)
    console.log('allObj.url:', allObj.url)
    // console.log('url :', allObj.url)
    // console.log('limit :', allObj.limit)
    requested(allObj.url, function (error, response, body) {
      var h = body.toString()
      handleDB(h)
      setTimeout(() => {
        diguiResult()
        console.log('爬完，下一个')
        console.log('limit :', allObj.limit)
        console.log('allObj.tag :', allObj.tag)
        console.log('allObj.name :', allObj.name)
      }, 10000)
    })
  } else {
    // 最终退出
    console.log('最终结束')
  }
}
start()
