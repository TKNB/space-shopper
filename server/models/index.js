const conn = require('./conn');
const LineItem = require('./LineItem');
const Order = require('./Order');
const Product = require('./Product');
const User = require('./User');

//DB Relations?
//SEED?

const sync = () => { conn.sync({ force: true }) };

module.exports = { sync }
