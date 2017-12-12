'use strict'

module.exports = function setupCompound (CompoundModel) {
  async function createOrUpdate (compound) {
    const cond = {
      where: {
        smiles: compound.smiles
      }
    }

    const existingCompound = await CompoundModel.findOne(cond)

    if (existingCompound) {
      const updated = await CompoundModel.update(compound, cond)
      return updated ? CompoundModel.findOne(cond) : existingCompound
    }

    const result = await CompoundModel.create(compound)
    return result.toJSON()
  }

  function findByName (name) {
    return CompoundModel.findOne({
      where: {
        name
      }
    })
  }

  function findByIupac(iupac) {
      return CompoundModel.findOne({
          where: {
              iupac
          }
      })
  }

  function findBySmiles(smiles) {
      return CompoundModel.findOne({
          where: {
              smiles
          }
      })
  }

  function findByUser(user) {
    return CompoundModel.findAll({
      where: {
        user
      }
    })
  }

  function findAll () {
    return CompoundModel.findAll()
  }

  return {
    createOrUpdate,
    findByName,
    findByIupac,
    findByName,
    findByUser,
    findAll
  }
}
