const router = require('express').Router();
const Product = require('../models/Product');

//API
//http://localhost:8888/api/products
router.get('/', (req, res) => {
  res.send('products')
})

module.exports = router;
