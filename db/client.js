const { Client } = require("pg");
const waitPort = require("wait-port");
const dotenv = require("dotenv");
dotenv.config();

let client;
const connectDb = async () => {
  try {
    let { PGUSER, PGPASS, PGDB, PORT, HOST } = process.env;
    let user = PGUSER;
    let host = HOST;
    let database = PGDB;
    let password = PGPASS;
    let port = parseInt(PORT);

    client = new Client({
      user,
      host,
      database,
      password,
      port,
    });

    await waitPort({
      host,
      port,
      timeout: 4000,
      waitForDns: true,
    });

    await client.connect();
  } catch (error) {
    console.log(error);
  }
};

const getActiveUsers = async (req, res) => {
  const response = await client.query(
    "SELECT * FROM pg_stat_activity where state='active'"
  );
  res.json(response.rows);
};

module.exports = { connectDb, getActiveUsers };
