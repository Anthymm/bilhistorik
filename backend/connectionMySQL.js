const mysql = require('mysql');
const connectionMySQL = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'CARDB'
});

module.exports = connectionMySQL;
