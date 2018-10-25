const conn = require('./conn');
const Sequelize = require('sequelize');

const User = conn.define('users', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
    validate: {
      isEmail: true,
    },
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
    validate: {
      is: ['^[a-z]+$', 'i'],
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
    validate: {
      is: ['^[a-z]+$', 'i'],
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
});

module.exports = User;
