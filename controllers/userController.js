const Post = require('../models/post');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const passport = require('passport');

exports.sign_up_get = asyncHandler(async (req, res, next) => {
  res.render('sign_up', { title: 'Sign-up' });
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
  body('username')
    .trim()
    .escape()
    .isEmail()
    .withMessage('Enter a valid E-mail')
    .custom(async (value) => {
      const email = await User.findOne({ username: value });
      if (email) {
        throw new Error('E-mail already in use');
      }
    }),
  body('password', 'Password should contain at least 5 characters').isLength({
    min: 5,
  }),
  body('passwordConfirmation').custom((value, { req }) => {
    return value === req.body.password;
  }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const user = new User({
      first_name: req.body.name,
      last_name: req.body.last_name,
      username: req.body.username,
    });
    if (!errors.isEmpty()) {
      return res.render('sign_up', {
        title: 'Sign-up',
        user,
        errors: errors.array(),
      });
    }
    bcrypt.hash(req.body.password),
      10,
      async (err, hashedPassword) => {
        if (err) {
          return next(err);
        }
        user.password = hashedPassword;
      };
    await user.save();
    res.redirect('/');
  }),
];

exports.log_in_get = asyncHandler(async (req, res, next) => {
  res.render('log_in', { title: 'Log-in' });
});
exports.log_in_post = asyncHandler(async (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/clubhouse/user/log-in',
  });
});

exports.log_out_get = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});
