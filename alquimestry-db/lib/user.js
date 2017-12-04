'use strict'

module.exports = function setupUser (UserModel) {
  async function createOrUpdate (user) {
    const cond = {
      where: {
        email: user.email
      }
    }

    const existingUser = await UserModel.findOne(cond)

    if (existingUser) {
      const updated = await UserModel.update(user, cond)
      return updated ? UserModel.findOne(cond) : existingUser
    }

    const result = await UserModel.create(user)
    return result.toJSON()
  }

  function findById (id) {
    return UserModel.findById(id)
  }

  function findByUserName (username) {
    return UserModel.findOne({
      where: {
        username
      }
    })
  }

  function validPassword (password) {
    console.log(`PASSWORD ${password}`)
    console.log(UserModel)
    return UserModel.validPassword(password)
  }

  function findByEmail (email) {
    return UserModel.findOne({
      where: {
        email
      }
    })
  }

  return {
    createOrUpdate,
    findById,
    findByUserName,
    findByEmail,
    validPassword
  }
}
