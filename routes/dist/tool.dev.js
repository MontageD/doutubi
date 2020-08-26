"use strict";

var express = require('express');

var router = express.Router();
router.get('/', function _callee(req, res, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.locals.menu = 5;
          res.render('tool');

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;