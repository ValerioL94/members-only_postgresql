const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');

router.get('/sign-up', user_controller.sign_up_get);
router.post('/sign-up', user_controller.sign_up_post);
router.get('/log-in', user_controller.log_in_get);
router.post('/log-in', user_controller.log_in_post);
router.get('/log-out', user_controller.log_out_get);
router.get('/join-the-club', user_controller.join_get);
router.post('/join-the-club', user_controller.join_post);
router.get('/admin-page', user_controller.admin_get);
router.post('/admin-page', user_controller.admin_post);
