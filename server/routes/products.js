const router = require('express').Router();
const Product = require('../models/Product');
const Review = require('../models/Review');

//API
//http://localhost:8888/api/products

// GET products
router.get('/', (req, res, next) => {
  Product.findAll({
    include: [
      {
        model: Review,
      },
    ],
  })
    .then(products => res.send(products))
    .catch(next);
});

// PAGING
router.get('/count', (req, res, next) => {
  Product.count()
    .then(count => res.send({ count }))
    .catch(next);
});

router.get('/page/:index?', (req, res, next) => {
  let index = 0;
  const limit = 2;
  if (req.params.index) { index = req.params.index * 1 };
  const offset = index * limit;
  Product.findAll({ limit, offset })
    .then(products => res.send(products))
    .catch(next);
});

// POST new product
router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.send(product))
    .catch(next);
});

// DELETE product by id
router.delete('/:id', (req, res, next) => {
  Product.findByPrimary(req.params.id)
    .then(product => product.destroy())
    .then(() => res.sendStatus(202))
    .catch(next);
});

// PUT updates to product by id
router.put('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => product.update(req.body))
    .then(product => res.send(product))
    .catch(next);
});

module.exports = router;
