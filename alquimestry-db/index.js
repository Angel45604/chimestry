'use strict'

const setupDatabase = require('./lib/db')
const setupUserModel = require('./models/user')
const setupCompoundModel = require('./models/compound')
const defaults = require('defaults')

const setupCompound = require('./lib/compound')
const setupUser = require('./lib/user')

module.exports = async function (config) {
  const sequelize = setupDatabase(config)
  const UserModel = setupUserModel(config)
  const CompoundModel = setupCompoundModel(config)

  UserModel.belongsToMany(CompoundModel, {through: 'UserCompound'})
  CompoundModel.belongsToMany(UserModel, {through: 'UserCompound'})

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  // sequelize.sync()

  const User = setupUser(UserModel)
  const Compound = setupCompound(CompoundModel)

  return {
    User,
    Compound
  }
}
