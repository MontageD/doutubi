const mysql = require('mysql')
const gConfig = require('../config/gConfig')
const chalk = require('chalk')
const pool = mysql.createPool({
  host: gConfig.mysql.host,
  user: gConfig.mysql.user,
  password: gConfig.mysql.password,
  database: gConfig.mysql.database,
  port: gConfig.mysql.port
})

var query = function (sql, values) {
  // 返回一个 Promise
  console.log(chalk.red('执行sql', sql))
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (error, rows) => {
          if (error) {
            reject(error)
          } else {
            resolve(rows)
          }
          // 结束会话
          connection.release()
        })
      }
    })
  }).catch(function (err) {
    console.log('catch', err)
  })
}

// 普通查询
var select = (name, post) => {
  return new Promise((resolve, reject) => {
    query(`SELECT * FROM ${name} WHERE ?`, post).then(res => {
      resolve(res)
    })
  })
}
module.exports = {
  query: query,
  select: select
}
