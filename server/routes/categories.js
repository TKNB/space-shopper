const router = require('express').Router();
const Category = require('../models/Category');
const Product = require('../models/Product');

//API
//http://localhost:8888/api/categories
router.get('/', (req, res, next) => {
  Category.findAll({
    include: [{ model: Product }],
  })
    .then(categories => res.send(categories))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Category.findAll({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
      },
    ],
  })
    .then(category => res.send(category))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Category.create(req.body)
    .then(category => res.send(category))
    .catch(next);
});

// Update a user
router.put('/:id', (req, res, next) => {
  Category.findById(req.params.id)
    .then(category => category.update(req.body))
    .then(category => res.send(category))
    .catch(next);
});

// Delete a user
router.delete('/:id', (req, res, next) => {
  Category.findById(req.params.id)
    .then(category => category.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
