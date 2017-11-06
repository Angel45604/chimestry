'use strict'

const Sequelize = require('sequelize')
const setupDatabase = requie('../lib/db')

module.exports = function setupUserModel (config) {
    const sequelize = setupDatabase(config)


    return sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type= Sequelize.STRING,
            allowNull: false
        },
        password: {
            type= Sequelize.STRING,
            allowNull: false
        }
    })
}