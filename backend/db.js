const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "garage_app",
  password: "Likidc@1822",
  port: 5432,
});

module.exports = pool;