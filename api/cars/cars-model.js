const db = require(`../../data/db-config.js`)

const getAll = () => {
  return db('cars')
}

const getById = (id) => {
  return db('cars').where('id',id).first()
}

const getByVin = (vin) => {
  return db('cars').where('vin',vin).first()
}

// this syntax may be incorrect.  Go back and check this. delete comment once confirmed
const create = async ({vin, make, model, mileage, title, transmission}) => {
  const [id] = await db('cars').insert({vin, make, model, mileage, title, transmission})
  return getById(id)
}

module.exports = {
  getAll,
  getById,
  getByVin,
  create,
}
