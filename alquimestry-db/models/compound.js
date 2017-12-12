'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupCompoundModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('compound', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    iupac: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    smiles: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    user: {
      type: Sequelize.STRING,
      allowNull: true
    }
  })
}
