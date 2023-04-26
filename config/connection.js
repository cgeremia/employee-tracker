const mysql = require("mysql2");

require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "Employee_DB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to database')
});

module.exports = connection;
