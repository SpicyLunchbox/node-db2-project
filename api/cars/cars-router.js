const Cars = require('./cars-model.js');
const mw = require('./cars-middleware.js');
const router = require('express').Router()


// [GET] /api/cars returns an array of cars sorted by id (or an empty array if there aren't any).
router.get('/', (req, res, next) => {
    Cars.getAll()
        .then(cars => {
            res.status(200).json(cars)
        })
        .catch(err => {
            next(err)
        })
})


// [GET] /api/cars/:id returns a car by the given id.
router.get('/:id', mw.checkCarId, (req, res, next) => {
    Cars.getById(req.params.id)
        .then(car => {
            res.status(200).json(car)
        })
        .catch(err => {
            next(err)
        })
})


// [POST] /api/cars returns the created car.

router.post('/', mw.checkCarPayload, mw.checkVinNumberValid, mw.checkVinNumberUnique, (req, res, next) => {
    Cars.create(req.body)
        .then(car => {
            res.status(201).json(car)
        })
        .catch(err => {
            next(err)
        })
})


router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({ message: err.message, stack: err.stack })
  })

  module.exports = router;