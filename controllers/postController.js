const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const db = require('../db/queries');

exports.index = asyncHandler(async (req, res, next) => {
  const posts = await db.getPosts();
  res.render('index', { title: 'Homepage', user: req.user, posts });
});
/*
exports.create_message_get = asyncHandler(async (req, res, next) => {
  res.render('create_message', { title: 'New Message', user: req.user });
});
exports.create_message_post = [
  body('postTitle', 'Title should be at least 1 character')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .unescape('&#x27;'),
  body(
    'comment',
    'Comment should be at least 1 character and less than 300 characters'
  )
    .trim()
    .isLength({ min: 1, max: 300 })
    .escape()
    .unescape('&#x27;'),
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
*/
