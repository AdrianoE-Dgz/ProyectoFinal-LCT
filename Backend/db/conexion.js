// db/conexion.js
const mysql = require('mysql2/promise'); //1

const pool = mysql.createPool({ //2
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true, //3
    connectionLimit: 10, //4
    queueLimit: 0, //5
    ssl: false
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error("Ocurrio un error: ", err);
    } else {
        connection.release();
    }
});

module.exports = pool;