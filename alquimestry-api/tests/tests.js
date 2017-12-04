const test = require('ava')
const util = require('util')
const request = require('supertest')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

test.serial('Database', t => {
  t.pass()
})
test.serial('Database/Models', t => {
  t.pass()
})
test.serial('Database/Lib', t => {
  t.pass()
})
test.serial('Core-Functionality', t => {
  t.pass()
})
test.serial('Core-Functionality/Compound-Identifier', t => {
  t.pass()
})
test.serial('Core-Functionality/Compound-Graph', t => {
  t.pass()
})
test.serial('Core-Functionality/SMILES-Interpreter', t => {
  t.pass()
})
test.serial('Core-Functionality/Builder', t => {
  t.pass()
})
test.serial.todo('Api -unfinished')
test.serial('Api/Auth', t => {
  t.pass()
})
test.serial('Api/Compound-to-SMILES', t => {
  t.pass()
})
test.serial('Api/Translate', t => {
  t.pass()
})
test.serial.todo('Api/sessionStorage')
