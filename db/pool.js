const { Pool } = require('pg');
const {
  PGHOST,
  PGDATABASE,
  PGUSER,
  PGPASSWORD,
  ENDPOINT_ID,
  CONNECTION_STRING,
} = process.env;

module.exports = new Pool({
  connectionString: CONNECTION_STRING,
  // host: PGHOST,
  // database: PGDATABASE,
  // user: PGUSER,
  // password: PGPASSWORD,
  // port: 5432,
  // ssl: {
  //   require: true,
  // },
});
