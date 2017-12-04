'use strict'

const debug = require('debug')('alquimestry:api:db')

module.exports = {
  db: {
    database: process.env.DB_NAME || 'alquimestry',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'n0m3l0',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: s => debug(s)
  },
  auth: {
    secret: process.env.SECRET || 'miclave'
  }
}
