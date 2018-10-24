const router = require('express').Router();
const User = require('../models/User');

//API
//http://localhost:8888/api/users
router.get('/', (req, res) => {
  res.send('users')
})

module.exports = router;
