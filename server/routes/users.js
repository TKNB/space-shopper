const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jwt-simple');
//API
//http://localhost:8888/api/users

// MIDDLEWARE, going to index.js ??
router.use((req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next();
  }
  let id;
  try {
    id = jwt.decode(token, process.env.JWT_SECRET || 'TKNB').id;
  } catch (ex) {
    return next({ status: 401 });
  }
  User.findById(id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(next);
});

// Token Authentication

router.post('/auth', (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({
    where: {
      username,
      password: jwt.encode(password, process.env.JWT_SECRET || 'TKNB'),
    },
  })
    .then(user => {
      if (!user) {
        return next({ status: 401 });
      }
      const token = jwt.encode(
        { id: user.id },
        process.env.JWT_SECRET || 'TKNB'
      );
      res.send({ token });
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});

router.get('/auth', (req, res, next) => {
  if (!req.user) {
    return next({ status: 401 });
  }
  res.send(req.user);
});

// Create a new user
router.post('/', (req, res, next) => {
  const { username, firstName, lastName, password } = req.body;
  const encryptPass = jwt.encode(password, process.env.JWT_SECRET || 'TKNB');
  User.create({ username, firstName, lastName, password: encryptPass })
    .then(user => res.send(user))
    .catch(next);
});

// Update a user
router.put('/:id', (req, res, next) => {
  const { username, firstName, lastName } = req.body;
  User.findById(req.params.id)
    .then(user => user.update({ username, firstName, lastName }))
    .then(user => res.send(user))
    .catch(next);
});

// Delete a user
router.delete('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
