const conn = require('./conn');

const Order = conn.define('order', {
  id: {
    // UUID to make it more difficult for someone to guess a user's cart id (not sure if that matter or not).
    type: conn.Sequelize.UUID,
    defaultValue: conn.Sequelize.UUIDV4,
    primaryKey: true
  },
  complete: {
    type: conn.Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false 
  }
});

/*
Order.belongsTo(User)
User.hasMany(Order)
Order.hasMany(LineItem)
LineItem.belongsTo(Order)
*/

module.exports = Order;
