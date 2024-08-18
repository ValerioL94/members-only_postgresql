const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/postController');

router.get('/', post_controller.index);

module.exports = router;
