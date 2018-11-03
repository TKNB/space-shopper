const conn = require('./conn');
const Sequelize = conn.Sequelize;

const Review = conn.define('review', {
  id: {
    type: conn.Sequelize.UUID,
    defaultValue: conn.Sequelize.UUIDV4,
    primaryKey: true,
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
  review: {
    type: Sequelize.TEXT,
  },
});

module.exports = Review;
