const dotenv = require("dotenv");

dotenv.config();

const db_name = process.env.DB_NAME;
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const db_type = process.env.DB_TYPE;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

const mongoURI = `${db_type}://${user}:${pass}@${host}:${port}/${db_name}?authSource=admin`;

module.exports = { mongoURI, db_name };
