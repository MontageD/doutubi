var express = require('express')
var router = express.Router()
router.get('/', async (req, res, next) => {
  res.locals.menu = 6
  res.render('hotArticle')
})
module.exports = router
