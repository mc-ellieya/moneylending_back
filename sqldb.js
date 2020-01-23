const credentials = require('./credentials');
const mysql = require('mysql2/promise');

module.exports = {
    pool : mysql.createPool({
        host: credentials.host,
        user: credentials.user,
        password: credentials.password,
        database: credentials.database,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    })
}