// https://fabiaoqing.com/tag
var cheerio = require('cheerio')
var request = require('sync-request')
var requested = require('request')
var fs = require('fs')
// var url = 'https://fabiaoqing.com/search/search/keyword/%E5%90%B4%E5%BD%A6%E7%A5%96' // 这里是举个例子而已，豆瓣的具体的电影网址可以自己替换
var iLimit = 0
var outObj = {
  tag: []
}

function handleDB (html) {
  var $ = cheerio.load(html) // 引入cheerio的方法。这样的引入方法可以很好的结合jQuery的用法。
  // outObj.tag.push([])

  $('#bqb .segment').find('.tags').each(function () {
    console.log($(this).text())
    outObj.tag[iLimit].push(
      $(this).text()
    )
  })
}

function getHandleDB () {
  console.log('递归iLimit:', iLimit)
  if (iLimit < 300) {
    let url = `https://fabiaoqing.com/tag/index/page/${iLimit}.html`
    // let html = request('GET', url).getBody().toString()
    requested(url, function (err, res, body) {
      var html = body.toString()
      outObj.tag[iLimit] = []
      handleDB(html)
      iLimit = iLimit + 1
      console.log('进入递归:', iLimit)
      getHandleDB()
    })
  } else {
    console.log('结束')
    var str = JSON.stringify(outObj)
    fs.writeFile('./tag.json', str, function (err) {
      if (err) {
        console.error(err)
      }
      console.log('----------新增成功-------------')
    })
  }
}

// 最后启动的线程
function markUrl () {
  getHandleDB()
}

markUrl()
// start()
