'use strict'

const test = require('ava')

let config = {
  logging: function () {}
}

let db = null

test.beforeEach(async () => {
  const setupDatabase = require('../')
  db = await setupDatabase(config)
})

test('User', t => {
  t.truthy(db.User, 'User service should exist')
})
