const router = require('express').Router();
const Product = require('../models/Product');

//API
//http://localhost:8888/api/products

// GET products
router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next)
})

// POST new product
router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.send(product))
    .catch(next)
})

// DELETE product by id
router.delete('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => product.destroy())
    .then(() => res.sendStatus(202))
    .catch(next)
})

// PUT updates to product by id
router.put('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then( product => product.update(req.body))
    .then( product => res.send(product))
    .catch(next)
})

module.exports = router;
