const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const db = require('../db/queries');

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
      const email = await db.getUserByEmail(value);
      if (email) {
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
    const newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
    };
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
      await db.addUser(newUser);
      res.redirect('log-in');
    });
  }),
];

exports.log_in_get = asyncHandler(async (req, res, next) => {
  res.render('log_in', {
    title: 'Log-in',
    user: req.user,
    errors: req.session.messages,
  });
  delete req.session.messages;
  req.session.save();
});

exports.log_in_post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/user/log-in',
  failureMessage: true,
});

exports.log_out_get = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});
/*
exports.join_get = asyncHandler(async (req, res, next) => {
  res.render('join.ejs', { title: 'Join the Club', user: req.user });
});
exports.join_post = [
  body('secretPassword', 'Wrong secret password')
    .trim()
    .isLength({ min: 1 })
    .toLowerCase()
    .escape()
    .equals(process.env.SECRET_PSW),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('join.ejs', {
        title: 'Join the Club',
        user: req.user,
        errors: errors.array(),
      });
    } else {
      await User.findByIdAndUpdate(req.user.id, { status: 'Exclusive-member' });
      res.redirect('join-the-club');
    }
  }),
];

exports.admin_get = asyncHandler(async (req, res, next) => {
  res.render('admin.ejs', { title: 'Join the Admins', user: req.user });
});

exports.admin_post = [
  body('adminPassword', 'Wrong admin password')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .equals(process.env.ADMIN_PSW),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('admin.ejs', {
        title: 'Join the Admins',
        user: req.user,
        errors: errors.array(),
      });
    } else {
      await User.findByIdAndUpdate(req.user.id, {
        status: 'Admin',
        is_admin: true,
      });
      res.redirect('admin-page');
    }
  }),
];
*/
