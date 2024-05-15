const Post = require('../models/post');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.index = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find().exec();
  res.render('index', { title: 'Homepage', user: req.user });
});

exports.create_message_get = asyncHandler(async (req, res, next) => {
  res.render('create_message', { title: 'New Message', user: req.user });
});
exports.create_message_post = [
  body(),
  asyncHandler(async (req, res, next) => {}),
];
