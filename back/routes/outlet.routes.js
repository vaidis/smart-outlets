const express = require('express');
const router = express.Router();
const outletController = require('../controllers/outlet.controller');

router.get('/:id', outletController.get);
router.post('/', outletController.post);

module.exports = router;
