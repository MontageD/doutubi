var express = require('express')
var router = express.Router()
router.get('/', async (req, res, next) => {
  res.locals.menu = 5
  res.render('tool')
})

module.exports = router
