'use strict'

const debug = require('debug')('alquimestry:db:setup')
const db = require('./')

async function setup () {

    const config = {
        database: process.env.DB_NAME || 'alquimestry',
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'n0m3l0',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: s => debug(s),
        setup: true,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
          },
    }

    await db(config).catch(handleFatalError)
    
    console.log('Success!')
    process.exit(0)
}

function handleFatalError(err) {
    console.error(err.message)
    console.error(err.stack)
    process.exit(1)
}

setup()