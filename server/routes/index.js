const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/products', require('./products'));
router.use('/orders', require('./orders'));
router.use('/lineitems', require('./lineItems'));
router.use('/images', require('./images'));

router.use((req, res, next) => {
  res.status(404).send("Oops, that page fell into a blackhole!");
});

module.exports = router;
