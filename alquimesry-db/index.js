'use strict'

const setupDatabase = require('./lib/db')
const setupUserModel = require('./models/user')
const setupCompoundModel = require('./models/compound')

module.exports = async function (config) {
  const sequelize = setupDatabase(config)
  const UserModel = setupUserModel(config)
  const CompoundModel = setupCompoundModel(config)

  UserModel.hasMany(CompoundModel)
  CompoundModel.belongsTo(UserModel)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  // sequelize.sync()

  const User = {}
  const Compound = {}

  return {
    User,
    Compound
  }
}
