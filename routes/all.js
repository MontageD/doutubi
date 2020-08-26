const routes = require('./index') // 表情包主页
const users = require('./users') // 用户中心 / 暂未开发
const biaoqing = require('./biaoqing') // 表情详情
const search = require('./search') // 查询
const hot = require('./hot') // 热门表情
const tag = require('./tag') // 标签库
const diy = require('./diy') // 自定义表情包 - 工具

const tool = require('./tool') // 表情包工具
const hotArticle = require('./hotArticle') // 表情包热文
const rList = require('./rList') // 排行榜
module.exports = (app) => {
  app.use('/', routes)
  app.use('/users', users)
  app.use('/biaoqing', biaoqing)
  app.use('/search', search)
  app.use('/hot', hot)
  app.use('/tag', tag)
  app.use('/diy', diy)
  app.use('/tool', tool)
  app.use('/hotArticle', hotArticle)
  app.use('/rList', rList)
}
