const express = require('express');
const path = require('path');
const router = express.Router();

// To people assigned to backend: please follow the practice here! Controllers will contain the logic.
const { getLoginPage, handleLoginRequest } = require('../controllers/loginController');
const { getUserDashboard } = require('../controllers/userController');

router.get('/', getLoginPage);
router.post('/user_dashboard', handleLoginRequest);
router.get('/user_dashboard', getUserDashboard);

module.exports = router;