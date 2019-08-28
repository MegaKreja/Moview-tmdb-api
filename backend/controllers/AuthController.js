const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.register = (req, res, next) => {
  const { username, email, password, password2 } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    bcrypt
      .hash(password, 12)
      .then(hashedPassword => {
        const user = new User({
          username,
          email,
          password: hashedPassword,
          image: ''
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

exports.login = (req, res, next) => {
  let loadedUser;
  const { username, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  return User.findOne({ username })
    .then(user => {
      if (!user) {
        const error = new Error('A user with this username could not be found');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          username: loadedUser.username,
          email: loadedUser.email,
          image: '',
          userId: loadedUser._id.toString()
        },
        process.env.SECRET,
        {
          expiresIn: '6h'
        }
      );
      res.status(200).json({ token, userId: loadedUser._id.toString() });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.forgotPassword = (req, res, next) => {
  const { email, password, password2 } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  User.findOne({ email })
    .then(user => {
      bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          user.password = hashedPassword;
          user.save().then(result => {
            res
              .status(200)
              .json({ message: 'Password is successfully changed!' });
          });
        })
        .catch(err => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getUser = (req, res, next) => {
  const usertoken = req.headers.authorization;
  const token = usertoken.split(' ')[1];
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(200).json({ expired: true });
    } else {
      User.findOne({ _id: decoded.userId })
        .then(user => {
          return res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            image: user.image
          });
        })
        .catch(err => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
    }
  });
};

exports.editProfile = (req, res, next) => {
  const { username, email } = req.body;
  let imageUrl = '';
  if (req.file) {
    console.log(req.file.path);
    imageUrl = req.file.path.replace(/\\/g, '/').substring(10);
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  User.findOne({ _id: req.userId })
    .then(user => {
      user.username = username;
      user.email = email;
      user.image = imageUrl;
      user
        .save()
        .then(result => {
          res.json({ message: 'Edit of user profile completed', user: result });
        })
        .catch(err => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
