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
    let port = PORT;

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
      timeout: 10000,
      waitForDns: true,
    });

    await client.connect();

    console.log("Connected to Postgres Server at Port", port);

    const res = await client.query(
      "SELECT * FROM pg_stat_activity where state='active'"
    );
    await client.end();

    return res.rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDb };
