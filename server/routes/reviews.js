const router = require('express').Router();
const Review = require('../models/Review');
const Product = require('../models/Product');
const User = require('../models/User');

//API
//http://localhost:8888/api/reviews

router.get('/', (req, res, next) => {
  Review.findAll()
    .then(reviews => res.send(reviews))
    .catch(next);
});

router.get('/:productId', (req, res, next) => {
  Review.findAll({
    where: {
      productId: req.params.productId,
    },
  })
    .then(reviews => res.send(reviews))
    .catch(next);
});

// Create a new review
router.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(review => res.send(review))
    .catch(next);
});

// Update a review
router.put('/:id', (req, res, next) => {
  Review.findById(req.params.id)
    .then(review => review.update(req.body))
    .then(review => res.send(review))
    .catch(next);
});

// Delete a review
router.delete('/:id', (req, res, next) => {
  Review.findById(req.params.id)
    .then(review => review.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
