const express = require('express');
const router = express.Router();
const healthEndPointPath = "/health"

router.get(healthEndPointPath, (req, res) => res.send('The user profiling service is healthy'))

module.exports = router
