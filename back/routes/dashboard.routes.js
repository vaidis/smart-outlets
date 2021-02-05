const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');

router.use('/', dashboardController.get);

module.exports = router;