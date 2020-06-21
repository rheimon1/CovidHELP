const environment = process.env.NODE_ENV || 'development';
const config = require('../../knexfile')[environment];
module.exports = require('knex')(config);

/* require('dotenv').config()
const { Pool } = require('pg')
const isProduction = process.env.NODE_ENV === 'production' 
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({ connectionString: isProduction ? process.env.DATABASE_URL : connectionString, ssl: isProduction, })
 */