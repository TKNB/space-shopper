const router = require('express').Router();
const Order = require('../models/Order');
const LineItem = require('../models/LineItem');
const Product = require('../models/Product');

//API
//http://localhost:8888/api/orders

// Begin Order API calls

// Get all orders
router.get('/', (req, res, next) => {
  Order.findAll({
    include: [{ model: LineItem, include: Product }]
  })
    .then(orders => res.send(orders))
    .catch(next)
})

// Get a user's active cart
router.get('/:id/cart', (req, res, next) => {
  Order.findOne({
    where: {
      userId: req.params.id,
      complete: false,
    },
    include: [{
      model: LineItem,
      order: [['createdAt', 'ASC']],
      include: Product
    }]
  })
    .then(cart => res.send(cart))
    .catch(next)
})

// Get all orders for a specific user
router.get('/:id', (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.params.id
    },
    include: [LineItem]
  })
    .then(orders => res.send(orders))
    .catch(next)
})

// Create a new order
router.post('/:id', (req, res, next) => {
  Order.create({ userId: req.params.id })
    .then(order => res.send(order))
    .catch(next)
})

// Update an order (mark it as complete)
router.put('/:id', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => order.update(req.body))
    .then(order => res.send(order))
    .catch(next)
})

// Delete an order (this may not be necessary)
router.delete('/:id', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => order.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
})

// End Order API calls

// Begin LineItem API calls

// Get all line items for an order (not sure if we'll need this or not)
router.get('/:id/line_item/', (req, res, next) => {
  LineItem.findAll({
    where: {
      orderId: req.params.id
    }
  })
    .then(lineItems => res.send(lineItems))
    .catch(next)
})

// Create a new line item
router.post('/:id/line_item/', (req, res, next) => {
  LineItem.create({ ...req.body, orderId: req.params.id })
    .then(lineItem => res.send(lineItem))
    .catch(next)
})

// Update a line item. Excluded the order id in req params, because it is irrelevant to the update. Would it make sense to include it for consistency?
router.put('/line_item/:id', (req, res, next) => {
  LineItem.findById(req.params.id)
    .then(lineItem => lineItem.update(req.body))
    .then(lineItem => res.send(lineItem))
    .catch(next)
})

// Delete a line item
router.delete('/line_item/:id', (req, res, next) => {
  LineItem.findById(req.params.id)
    .then(lineItem => lineItem.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router;
