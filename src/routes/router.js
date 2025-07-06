const express = require('express');
const path = require('path');
const router = express.Router();

const { handleLoginPageRequest } = require('../controllers/loginController');

router.get('/', handleLoginPageRequest);


module.exports = router;