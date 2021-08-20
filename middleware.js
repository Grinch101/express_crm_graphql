const { Pool } = require("pg");
require("dotenv/config");

const getConn = function () {
  if (process.env.ENV === "DEV") {
    const pool = new Pool({
      user: "grinch",
      host: "localhost",
      database: "express_crm_test",
      port: 5432,
      password: "1",
    });
    console.log(process.env.ENV);
    return pool;
  }
  if (process.env.ENV === "PRO") {
    const pool = new Pool({
      user: "grinch",
      host: "localhost",
      database: "express_crm",
      port: 5432,
      password: "1",
    });
    console.log(process.env.ENV);
    return pool;
  }
};

// Middleware:
const getClient = async function (req, res, next) {
  const pool = getConn();
  const client = await pool.connect();
  await client.query("BEGIN");
  console.log("transcation begin");
  req.client = client;
  next();
};

module.exports = getClient;
