const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost', 
    user: 'usuario',
    password: '1234',
    database: 'photodb'
});

module.exports = pool;
