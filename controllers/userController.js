const Post = require('../models/post');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const bcrypt = require('bcryptjs');

exports.sign_up_get = asyncHandler(async (req, res, next) => {
  res.render('sign_up', { title: 'Sign-up', user: req.user });
});

exports.sign_up_post = [
  body('first_name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('FIrst name must contain at least 1 character'),
  body('last_name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Last name must contain at least 1 character'),
  body('email')
    .trim()
    .escape()
    .isEmail()
    .withMessage('Enter a valid E-mail')
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error('E-mail already in use');
      }
    }),
  body('password', 'Password should contain at least 8 characters').isLength({
    min: 8,
  }),
  body('passwordConfirmation', 'Password mismatch').custom((value, { req }) => {
    return value === req.body.password;
  }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const newUser = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
    });
    if (!errors.isEmpty()) {
      return res.render('sign_up', {
        title: 'Sign-up',
        newUser,
        errors: errors.array(),
      });
    }
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      newUser.password = hashedPassword;
      await newUser.save();
      res.redirect('log-in');
    });
  }),
];

exports.log_in_get = asyncHandler(async (req, res, next) => {
  res.render('log_in', { title: 'Log-in', user: req.user });
});
exports.log_in_post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: 'log-in',
});

exports.log_out_get = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});
