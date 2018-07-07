const express = require('express');
const router = express.Router();
const userRegistrationController = require('../controllers/UserRegistrationController')
const userRegistrationEndPointPath = "/register"

router.post(userRegistrationEndPointPath, userRegistrationController.register)

module.exports = router;