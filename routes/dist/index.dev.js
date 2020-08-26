"use strict";

var app = require('express');

var router = app.Router();

var db = require('../db');

var async = require('async');

var gconfig = require('../config/gConfig'); // let responseJSON = function (res, ret) {
//   if (typeof ret === 'undefined') {
//     res.json({
//       code: '-200', msg: '操作失败'
//     })
//   } else {
//     res.json(ret)
//   }
// }


function getJSON(val) {
  return JSON.parse(JSON.stringify(val));
} // app.locals.gconfig = gconfig

/* GET home page. */


router.get('/', function _callee3(req, res, next) {
  var sql, result, rows, row;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // res.locals.menu = 1
          // var sql = `select * from tag where pc = 1 order by id desc limit 4  `
          // var result = []
          // var rows = await db.query(sql)
          // var row = JSON.parse(JSON.stringify(rows))
          // // 构建多分类的目录
          // await async.map(row, async (item, callback) => {
          //   var sqlLink = `select * from imgTag where tag like '%${item.tagid}%' and author <> '' order by rand() desc  limit 4`
          //   var sqlNum = `select count(id) from imgTag where tag like '%${item.tagid}%' and author <> '' order by rand() desc `
          //   var tmp = await db.query(sqlLink)
          //   var tmpNum = await db.query(sqlNum)
          //   // 重组数据结构
          //   var obj = Object.assign({}, item)
          //   obj.tmp = getJSON(tmp)
          //   obj.num = (getJSON(tmpNum))[0]['count(id)']
          //   result.push(obj)
          // }, async (err, results) => {
          //   var sql = `select * from imgTag where tag like '%13%'  and author <> '' order by rand() limit 24`
          //   var hot = await db.query(sql)
          //   if (err) {
          //     console.log(err)
          //   } else {
          //     await res.render('index', {
          //       result: result,
          //       hot: getJSON(hot)
          //     })
          //   }
          // })

          /***** */
          // var limitNum = 60
          // var result = []
          // var sql = `select * from tag limit ${limitNum}`
          // var tagResult = await db.query(sql)
          // res.render('index', {
          //   tagResult: tagResult,
          //   result: result
          // })

          /* **/
          res.locals.menu = 1;
          sql = "select * from tag where pc = 1 order by id desc limit 4  ";
          result = [];
          _context3.next = 5;
          return regeneratorRuntime.awrap(db.query(sql));

        case 5:
          rows = _context3.sent;
          row = JSON.parse(JSON.stringify(rows)); // 构建多分类的目录

          _context3.next = 9;
          return regeneratorRuntime.awrap(async.map(row, function _callee(item, callback) {
            var sqlLink, sqlNum, tmp, tmpNum, obj;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    sqlLink = "select * from imgTag where tag like '%".concat(item.tagid, "%' and author <> '' order by rand() desc  limit 4");
                    sqlNum = "select count(id) from imgTag where tag like '%".concat(item.tagid, "%' and author <> '' order by rand() desc ");
                    _context.next = 4;
                    return regeneratorRuntime.awrap(db.query(sqlLink));

                  case 4:
                    tmp = _context.sent;
                    _context.next = 7;
                    return regeneratorRuntime.awrap(db.query(sqlNum));

                  case 7:
                    tmpNum = _context.sent;
                    // 重组数据结构
                    obj = Object.assign({}, item);
                    obj.tmp = getJSON(tmp);
                    obj.num = getJSON(tmpNum)[0]['count(id)'];
                    result.push(obj);

                  case 12:
                  case "end":
                    return _context.stop();
                }
              }
            });
          }, function _callee2(err, results) {
            var sqlLink, tagList, sql, hot;
            return regeneratorRuntime.async(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    // 查询右边标签页
                    sqlLink = "select * from tag where id < ".concat(gconfig.limitTag, " order by rand() limit 25  ");
                    _context2.next = 3;
                    return regeneratorRuntime.awrap(db.query(sqlLink));

                  case 3:
                    tagList = _context2.sent;
                    // 今日最新的表情
                    sql = "select * from imgTag where tag like '%13%'  and author <> '' order by rand() limit 24";
                    _context2.next = 7;
                    return regeneratorRuntime.awrap(db.query(sql));

                  case 7:
                    hot = _context2.sent;

                    if (!err) {
                      _context2.next = 12;
                      break;
                    }

                    console.log(err);
                    _context2.next = 14;
                    break;

                  case 12:
                    _context2.next = 14;
                    return regeneratorRuntime.awrap(res.render('index', {
                      result: result,
                      tagList: getJSON(tagList),
                      hot: getJSON(hot)
                    }));

                  case 14:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          }));

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = router;