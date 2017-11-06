'use strict'

const Sequelize = require('sequelize')
const setupDatabase = requie('../lib/db')

module.exports = function setupCompoundModel (config) {
    const sequelize = setupDatabase(config)

    return sequelize.define('compound', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type= Sequelize.STRING,
            allowNull: false
        },
    })
}