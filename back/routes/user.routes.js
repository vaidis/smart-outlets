const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/login', userController.login);
router.post('/refresh', userController.refresh);
router.post('/logout', userController.logout);
router.post('/profile', userController.postProfile);
router.get('/profile', userController.getProfile);

module.exports = router;