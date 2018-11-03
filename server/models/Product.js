const conn = require('./conn');
const Sequelize = require('sequelize');

const Product = conn.define('product', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
  featured: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    defaultValue: null,
    validate: {
      isDecimal: true,
      max: 5,
      min: 0,
    },
  },
  reviews: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
  //userId:
});

module.exports = Product;
