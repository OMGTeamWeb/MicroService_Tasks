var router = require('express').Router();

// api router will mount other routers
// for all our resources

router.use('/task', require('./task/taskRoutes'));

module.exports = router;
