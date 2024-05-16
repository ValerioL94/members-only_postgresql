const Post = require('../models/post');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.index = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find()
    .sort({ timestamp: 1 })
    .populate('user')
    .exec();
  res.render('index', { title: 'Homepage', user: req.user, posts: allPosts });
});

exports.create_message_get = asyncHandler(async (req, res, next) => {
  res.render('create_message', { title: 'New Message', user: req.user });
});
exports.create_message_post = [
  body('postTitle', 'Title should be at least 1 character')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body(
    'comment',
    'Comment should be at least 1 character and less than 300 characters'
  )
    .trim()
    .isLength({ min: 1, max: 300 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const post = new Post({
      title: req.body.postTitle,
      comment: req.body.comment,
      user: req.user.id,
      timestamp: new Date(),
    });
    if (!errors.isEmpty()) {
      return res.render('create_message', {
        title: 'New Message',
        user: req.user,
        post,
        errors: errors.array(),
      });
    }
    await post.save();
    res.redirect('/');
  }),
];

exports.delete_message_get = asyncHandler(async (req, res, next) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect('/');
});
