const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');
const post_controller = require('../controllers/postController');

router.get('/', post_controller.index);

router.get('/user/sign-up', user_controller.sign_up_get);
router.post('/user/sign-up', user_controller.sign_up_post);
router.get('/user/log-in', user_controller.log_in_get);
router.post('/user/log-in', user_controller.log_in_post);
router.get('/user/log-out', user_controller.log_out_get);
router.get('/user/join-the-club', user_controller.join_get);
router.post('/user/join-the-club', user_controller.join_post);
router.get('/user/admin-page', user_controller.admin_get);
module.exports = router;
