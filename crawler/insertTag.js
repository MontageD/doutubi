
var requested = require('request')
var fs = require('fs')
var iLimit = 0 // 遍历单个页面的所有标签
var iArr = [] // 页面的数组
// var iTagArr = []
var iPage = 2 // 遍历的页数
var iMax = 299 // 极限页数
function readFile () {
  fs.readFile('./tag.json', function (err, data) {
    if (err) {
      return console.error(err)
    }
    var person = data.toString()// 将二进制的数据转换为字符串
    person = JSON.parse(person)// 将字符串转换为json对象
    iArr = person.tag
    middenController()
  })
}

function middenController () {
  if (iPage < iMax) {
    console.log('iPage:', iPage)
    console.log('iLimit:', iLimit)
    start(iArr[iPage][iLimit])
  } else {
    console.log('真的结束了')
  }
}

function start (name) {
  var url1 = 'https://api.maopingshou.com/api/vueAdminNewestTagId'
  var url2 = 'https://api.maopingshou.com/api/vueAdminInsertTag'
  return new Promise((resolve, reject) => {
    requested.get(url1, function (error, response, body) {
      var data = JSON.parse((body))
      resolve(data.id)
    })
  }).then((res) => {
    requested.post({
      url: url2,
      form: {
        name: name,
        hot: 0,
        pc: 0,
        showMenu: 0,
        tagid: parseInt(res) + 1
      }
    }, function (error, response, body) {
      if (iLimit < (iArr[iPage].length - 1)) {
        iLimit = iLimit + 1
        console.log(`这是第${iLimit}个标签`)
        start(iArr[iPage][iLimit])
      } else {
        // 清空和变更变量
        iLimit = 0
        iPage = iPage + 1
        middenController()
        console.log('页面插入数据结束,进入下一个页面的爬取-------------------')
      }
    })
  })
}

readFile()
