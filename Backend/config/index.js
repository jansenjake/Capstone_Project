const mysql = require ('mysql'); 
require('dotenv').config();
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.dbUser,
    password: process.env.dbPass,
    database: process.env.dbName,
    port: process.env.dbPort,
    multipleStatements: true
});

module.exports = connection;