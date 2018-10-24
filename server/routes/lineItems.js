const router = require('express').Router();
const LineItem = require('../models/LineItem');

//API
//http://localhost:8888/api/lineitems
router.get('/', (req, res) => {
  res.send('linteitems')
})

module.exports = router;
