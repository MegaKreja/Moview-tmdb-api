const express = require('express');
const isAuth = require('../middleware/is-auth');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router();
const { check } = require('express-validator');

const authController = require('../controllers/AuthController');

router.post(
  '/register',
  [
    check('username')
      .not()
      .isEmpty()
      .withMessage('Username must not be empty!')
      .custom((value, { req }) => {
        return User.findOne({ username: value }).then(user => {
          if (user) {
            return Promise.reject('Username already exists!');
          }
        });
      }),
    check('email')
      .isEmail()
      .withMessage('Your email is not valid!')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(user => {
          if (user) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    check('password')
      .isLength({ min: 5 })
      .withMessage('Password must have more than 5 characters!')
      .custom((value, { req }) => {
        if (value !== req.body.password2) {
          throw new Error("Passwords don't match!");
        } else {
          return value;
        }
      }),
    check('password2')
      .isLength({ min: 5 })
      .withMessage('Confirm password must have more than 5 characters')
  ],
  authController.register
);

router.post(
  '/login',
  [
    check('username')
      .not()
      .isEmpty()
      .withMessage('Username must not be empty!')
      .custom((value, { req }) => {
        return User.findOne({ username: value }).then(user => {
          if (!user) {
            return Promise.reject('User with that username does not exists!');
          }
        });
      }),
    check('password')
      .isLength({ min: 5 })
      .withMessage('Password must have more than 5 characters!')
      .custom((value, { req }) => {
        return User.findOne({ username: req.body.username }).then(user => {
          console.log(user);
          if (!user) {
            return Promise.reject('Password is wrong!');
          } else {
            return bcrypt.compare(value, user.password).then(isEqual => {
              if (!isEqual) {
                return Promise.reject('Password is wrong!');
              }
            });
          }
        });
      })
  ],
  authController.login
);

router.post(
  '/forgot-password',
  [
    check('email')
      .isEmail()
      .withMessage('Your email is not valid!')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(user => {
          if (!user) {
            return Promise.reject('User with that email does not exists!');
          }
        });
      })
      .normalizeEmail(),
    check('password')
      .isLength({ min: 5 })
      .withMessage('Password must have more than 5 characters!')
      .custom((value, { req }) => {
        if (value !== req.body.password2) {
          throw new Error("Passwords don't match!");
        } else {
          return value;
        }
      }),
    check('password2')
      .isLength({ min: 5 })
      .withMessage('Confirm password must have more than 5 characters')
  ],
  authController.forgotPassword
);

router.get('/get-user', authController.getUser);

router.put(
  '/edit-profile',
  isAuth,
  [
    check('username')
      .not()
      .isEmpty()
      .withMessage('Username must not be empty!')
      .custom((value, { req }) => {
        return User.findOne({ username: value }).then(user => {
          if (user && value !== req.username) {
            return Promise.reject('Username already exists!');
          }
        });
      }),
    check('email')
      .isEmail()
      .withMessage('Your email is not valid!')
      .custom((value, { req }) => {
        // console.log(value, req.body.email);
        return User.findOne({ email: value }).then(user => {
          if (user && value !== req.email) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail()
  ],

  authController.editProfile
);

module.exports = router;
