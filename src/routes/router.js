const express = require('express');
const path = require('path');
const router = express.Router();

// To people assigned to backend: please follow the practice here! Controllers will contain the logic. View-specific scripts can be defined in middleware for now (idk if that's even the correct practice)
const { getLoginPage, handleLoginRequest } = require('../controllers/loginController');
const { requireLogin, getUserDashboard, getVendorDashboard } = require('../controllers/userController');

router.get('/', getLoginPage);
router.post('/login', handleLoginRequest);
router.get('/user_dashboard', requireLogin, getUserDashboard);
router.get('/vendor_dashboard', requireLogin, getVendorDashboard);

module.exports = router;