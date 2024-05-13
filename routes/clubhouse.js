const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');
const post_controller = require('../controllers/postController');

router.get('/', post_controller.index);

module.exports = router;
