const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const authController = require('../controllers/AuthController');

router.post(
  '/register',
  [
    check('username')
      .not()
      .isEmpty()
      .withMessage('Username must not be empty'),
    check('email')
      .isEmail()
      .withMessage('Your email is not valid'),
    check('password')
      .isLength({ min: 5 })
      .withMessage('Password must have more than 5 characters')
      .custom((value, { req }) => {
        if (value !== req.body.password2) {
          throw new Error("Passwords don't match");
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
// router.post("/login", authController.login);

module.exports = router;
