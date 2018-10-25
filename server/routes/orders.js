const router = require('express').Router();
const Order = require('../models/Order');

//API
//http://localhost:8888/api/orders
router.get('/', (req, res) => {
  res.send('orders')
})

module.exports = router;
