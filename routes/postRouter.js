const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/postController');

router.get('/new-message', post_controller.create_message_get);
router.post('/post/new-message', post_controller.create_message_post);
router.get('/:id/delete', post_controller.delete_message_get);

module.exports = router;
