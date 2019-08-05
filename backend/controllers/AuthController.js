const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.register = (req, res, next) => {
  console.log(req.body);
  const { username, email, password, password2 } = req.body;
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    bcrypt
      .hash(password, 12)
      .then(hashedPassword => {
        const user = new User({
          username,
          email,
          password: hashedPassword
        });
        return user.save();
      })
      .then(result => {
        res.status(201).json({ message: 'Success' });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  }
};
