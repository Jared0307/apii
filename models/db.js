const  mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host:"mysql-jared.alwaysdata.net",
    user:"jared",
    password:"030703ramoN.",
    database:"jared_jared",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;