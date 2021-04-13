const Cars = require('./cars-model.js');

const checkCarId = (req, res, next) => {
  const id = req.params.id
  Cars.getById(id)
      .then(car => {
        if(!car){
          res.status(404).json({message:`car with id ${id} is not found`})
        }else{next()}
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
}

const checkCarPayload = (req, res, next) => {
  const {vin, make, model, mileage} = req.body
  if(!vin || !make || !model || !mileage){
    res.status(400).json({message:`info is missing`})
  }else{next()}
}

const checkVinNumberValid = (req, res, next) => {
  const {vin} = req.body
  if(typeof vin != 'string'){
    res.status(400).json({message:`vin ${vin} is invalid`})
  }else{next()}
}

const checkVinNumberUnique = (req, res, next) => {
  const {vin} = req.body
  Cars.getByVin(vin)
      .then(car => {
        if(!car){
          next()
        }else{
          res.status(400).json({message:`vin ${vin} already exists`})
        }
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}


// checkCarId returns a status 404 with a { message: "car with id <car id> is not found" } if the id in req.params does not exist in the database.

// checkCarPayload returns a status 400 with a { message: "<field name> is missing" } if any required field is missing.

// checkVinNumberValid returns a status 400 with a { message: "vin <vin number> is invalid" } if the vin number is invalid.

// checkVinNumberUnique returns a status 400 with a { message: "vin <vin number> already exists" } if the vin number already exists in the database.