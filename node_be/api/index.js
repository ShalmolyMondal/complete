const router = require('express').Router();
const apiRoutes = require('./routes');

// API Routes any route starting with '/api_v2'
router.use('/api_v2', apiRoutes);

module.exports = router;