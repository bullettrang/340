var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_trangb',
  password        : '4767',
  database        : 'cs340_trangb'
});
module.exports.pool = pool;
