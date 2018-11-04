const conn = require('./conn');

const User = conn.define('users', {
  id: {
    type: conn.Sequelize.UUID,
    defaultValue: conn.Sequelize.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  firstName: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      is: ['^[a-z]+$', 'i'],
    },
  },
  lastName: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      is: ['^[a-z]+$', 'i'],
    },
  },
  password: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

User.prototype.toJSON = function() {
  var values = Object.assign({}, this.get());

  delete values.password;
  return values;
};

module.exports = User;
