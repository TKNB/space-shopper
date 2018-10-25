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
  },
  // Keeps track of when the cart was first started.
  createdAt: {
    type: conn.Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') 
  },
  // Keeps track of when the cart was turned into an order.
  completedAt: {
    type: conn.Sequelize.DATE,
    allowNull: true,
    defaultValue: null 
  }
}, {
    hooks: {
      // When an order is marked as complete, this hook will automatically update the completedAt column.
      beforeUpdate: order => {
        if(order.complete === true) {
            order.completedAt = Sequelize.literal('CURRENT_TIMESTAMP');
        }
      }
    }
});

/*
Order.belongsTo(User)
User.hasMany(Order)
Order.hasMany(LineItem)
LineItem.belongsTo(Order)
*/

module.exports = Order;