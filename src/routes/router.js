const express = require('express');
const path = require('path');
const router = express.Router();

// To people assigned to backend: please follow the practice here! Controllers will contain the logic
const { handleLoginPageRequest } = require('../controllers/loginController');

router.get('/', handleLoginPageRequest);

module.exports = router;