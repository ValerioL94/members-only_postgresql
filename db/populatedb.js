#! /usr/bin/env node

const { Client } = require('pg');
const { CONNECTION_STRING } = process.env;

const SQL1 = `
CREATE TYPE status AS ENUM ('Anonymous', 'Exclusive Member', 'Admin');

CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL UNIQUE,
password VARCHAR(100) NOT NULL,
status status DEFAULT 'Anonymous'
);
`;

const SQL2 = `
CREATE TABLE IF NOT EXISTS posts (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
title VARCHAR (50) NOT NULL,
comment VARCHAR(200) NOT NULL,
user_id INTEGER REFERENCES users,
timestamp TIMESTAMP WITH TIME ZONE DEFAULT now()
);
`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: CONNECTION_STRING,
  });
  await client.connect();
  await client.query(SQL1);
  await client.query(SQL2);

  await client.end();
  console.log('done');
}

main();
