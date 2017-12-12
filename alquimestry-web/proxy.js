'use strict'

const express = require('express')
const request = require('request-promise-native')
const asyncify = require('express-asyncify')

const api = asyncify(express.Router())

const { endpoint, apiToken } = require('./config')

api.get('/users', (req, res) => {

})

api.get('./users/:email', (req, res) => {

})

module.exports = api