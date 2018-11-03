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

module.exports = router;
