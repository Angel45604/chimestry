'use strict'

const debug = require('debug')('alquimestry:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const db = require('alquimestry-db')

const config = require('./config')

const api = asyncify(express.Router())

api.use(morgan('dev'))

api.use(bodyParser.urlencoded({extended: true}))

let services, User, Compound

api.use('*', async (req, res, next) => {
  if (!services) {
    debug('Connecting to database')
    try {
      services = await db(config.db)
    } catch (e) {
      return next(e)
    }

    Compound = services.Compound
    User = services.User
  }
  next()
})

api.post('/users', async (req, res, next) => {
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
  let user = {
    username,
    email,
    password
  }

  try {
    await User.createOrUpdate(user)
  } catch (e) {
    return next(e)
  }

  res.send(user)
})

api.get('/users', async (req, res, next) => {
  debug('A request has come to /users')

  let users = []
  try {
    users = await User.findAll()
  } catch (e) {
    return next(e)
  }

  res.send(users)
})

api.get('/compounds', async (req, res, next) => {
  debug('A request has come to /compounds')

  let compounds = []
  try {
    compounds = await Compound.findAll()
  } catch (e) {
    return next(e)
  }

  res.send(compounds)
})

api.post('/compounds', async (req, res, next) => {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password
  let user = {
    username,
    email,
    password
  }

  try {
    await User.createOrUpdate(user)
  } catch (e) {
    return next(e)
  }

  res.send(user)
})

api.get('/compounds/:name', async (req, res, next) => {
  const { name } = req.params
  debug(`A requrest has come to /compounds/${name}`)

  let compound

  try {
    compound = Compound.findByName(name)
  } catch(e) {
    return next(e)
  }

  if(!compound) {
    return next(new Error(`Compound not found with name ${name}`))
  }

  res.send(compound)
})

module.exports = api
