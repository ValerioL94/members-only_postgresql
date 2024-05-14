const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');
const post_controller = require('../controllers/postController');

router.get('/', post_controller.index);

router.get('/user/sign-up', user_controller.sign_up_get);
router.post('/user/sign-up', user_controller.sign_up_post);
router.get('/user/log-in', user_controller.log_in_get);
router.post('/user/log-in', user_controller.log_in_post);

module.exports = router;