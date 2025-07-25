
const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USUARIO,
    password: process.env.DB_SENHA,
    database: process.env.DB_NOME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Usamos `promise()` para poder usar async/await nas nossas queries
module.exports = pool.promise();