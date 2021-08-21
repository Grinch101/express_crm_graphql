const { Pool } = require("pg");
const domain = require("domain");
require("dotenv/config");

const DOMAIN = domain.create();

const getConn = function () {
  if (process.env.ENV === "DEV") {
    const pool = new Pool({
      user: "grinch",
      host: "localhost",
      database: "express_crm_test",
      port: 5432,
      password: "1",
    });
    console.log("running on ENV: ", process.env.ENV);
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
    console.log("running on ENV: ", process.env.ENV);
    return pool;
  }
};

// Middleware:
const getClient = async function (req, res, next) {
  const pool = getConn();
  const client = await pool.connect();
  console.log("Client to PSQL created");
  await client.query("BEGIN");
  console.log("BEGIN");
  DOMAIN.client = client;
  next();
};

const commitClient = async function () {
  const client = DOMAIN.client;
  await client.query("COMMIT;");
  console.log("COMMIT");
  client.release();
  console.log('Client Released!')
  DOMAIN.exit();
  console.log("Domain Exit")
};

module.exports = { getClient, commitClient, DOMAIN };
