const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ifsuldeminas",
  database: "ecommerce",
});

module.exports = connection;
