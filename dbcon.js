var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'mmafighter.cwclg24yv0or.us-east-2.rds.amazonaws.com',
  user            : 'bullettrang',
  database        : 'mmafighter'
});
module.exports.pool = pool;
