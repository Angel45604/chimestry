'use strict'

const debug = require('debug')('alquimestry:web')
const http = require('http')
const path = require('path')
const express = require('express')
const asyncify = require('express-asyncify')
const chalk = require('chalk')

const proxy = require('./proxy')

const port = process.env.PORT || 8080
const app = asyncify(express())
const server = http.createServer(app)

app.use(express.static(path.join(__dirname, 'public')))
app.use('/', proxy)

function handleFatalError (err) {
    console.error(`${chalk.red('[fatal error]')} ${err.message}`)
    console.error(err.stack)
    process.exit(1)
}

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

server.listen(port, () => {
    console.log(`${chalk.green('[alquimestry-web]')} server listening on port ${port}`)
})