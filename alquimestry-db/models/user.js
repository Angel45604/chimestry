'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')
const bcrypt = require('bcrypt')

module.exports = function setupUserModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(user.password, salt)
      }
    },
    instanceMethods: {
      validPassword: (password, hash) => {
        return bcrypt.compareSync(password, hash, console.log())
      }
    }
  })
}
