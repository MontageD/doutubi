var mysql
var moment = require('moment')
if (process.env.NODE_ENV === 'development') {
  // 开发环境
  mysql = {
    host: '119.29.253.246', // 数据库ip 地址
    user: 'root', // 数据库用户名
    password: 'dexing07', // 数据库密码
    database: 'cAuth', // 数据库表
    port: 3306 // 数据库端口号
  }
} else {
  // 生产环境
  mysql = {
    host: '119.29.253.246', // 数据库ip 地址
    user: 'root', // 数据库用户名
    password: 'dexing07', // 数据库密码
    database: 'cAuth', // 数据库表
    port: 3306 // 数据库端口号
  }
}

const gconfig = {
  seo: {
    title: '表情包斗图制作',
    description: '表情包仓库，表情制作器，斗图神器！一款使用的表情分享工具，并提供丰富表情资源库，DIY表情模版，有了它，聊天思想表情更到位',
    keywords: '表情包,聊天表情,微信表情包,QQ表情包,发表情,暴漫表情包,金馆长表情包,搞笑表情包,张学友表情包,蘑菇头,表情包大全,表情包下载,表情下载,贴吧表情包,表情包集中营,斗图,斗图大会,表情包制作,DIY表情'
  },
  mysql: mysql,
  cdn: {
    img: 'https://img.maopingshou.com/'
  },
  limitTag: 500, // 爬虫存在数据的标签数
  dateFormat: function (date) {
    return moment(date).format('YYYY年MM月DD日 hh:mm:ss')
  }
}

module.exports = gconfig
