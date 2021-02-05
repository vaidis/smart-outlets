const express = require('express');
const router = express.Router();
const Middleware = require("../middlewares");

const dashboard_routes = require('./dashboard.routes');
const outlet_routes = require('./outlet.routes')
const user_routes = require('./user.routes')

router.get('/status', (req, res) => { res.send({status: 'OK'}) })
router.use('/dashboard',  Middleware.checkAuth, dashboard_routes);
router.use('/outlet', Middleware.checkAuth, outlet_routes);
router.use('/user', user_routes);

module.exports = router;