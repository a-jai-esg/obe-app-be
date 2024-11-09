import mysql2 from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const isProduction = Boolean(process.env.NODE_ENV) === true ? true : false;

const pool = mysql2.createPool({
  host: isProduction
    ? process.env.PRODUCTION_HOST
    : process.env.DEVELOPMENT_HOST,
  user: isProduction
    ? process.env.PRODUCTION_USER
    : process.env.DEVELOPMENT_USER,
  password: isProduction
    ? process.env.PRODUCTION_PASSWORD
    : process.env.DEVELOPMENT_PASSWORD,
  database: isProduction
    ? process.env.PRODUCTION_DATABASE
    : process.env.DEVELOPMENT_DATABASE,
  waitForConnections: true,
  connectionLimit: process.env.CONNECTION_LIMIT,
  queueLimit: 0,
  port: 3306,
});

export default pool;
