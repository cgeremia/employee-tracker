const mysql = require("mysql2");

require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "Employee_DB",
});

module.exports = connection;
