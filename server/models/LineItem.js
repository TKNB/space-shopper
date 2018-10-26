const conn = require('./conn');

const LineItem = conn.define('lineItem', {
  id: {
    type: conn.Sequelize.UUID,
    defaultValue: conn.Sequelize.UUIDV4,
    primaryKey: true
  },
  qty: {
    type: conn.Sequelize.INT,
    defaultValue: 1 
  }
});

module.exports = LineItem;
