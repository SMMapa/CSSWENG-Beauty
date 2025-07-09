const bcrypt = require('bcrypt');
const User = require('../models/User');

async function getLoginPage(req, res) {
    res.render('login', {
        title: 'Login',
        error: null,
        success: null
    });
}

async function handleLoginRequest(req, res) {
    try {
        const { username, password } = req.body;
        
        // Basic validation
        if (!username || !password) {
            return res.render('login', {
                title: 'Login',
                error: 'Please enter both username and password',
                success: null
            });
        }

        // Find user by email or user_id
        const user = await User.findOne({
            $or: [
                { email: username.toLowerCase() },
                { user_id: username }
            ]
        });

        if (!user) {
            return res.render('login', {
                title: 'Login',
                error: 'Invalid username or password',
                success: null
            });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        
        if (!isPasswordValid) {
            return res.render('login', {
                title: 'Login',
                error: 'Invalid username or password',
                success: null
            });
        }

        // Password is correct, redirect to dashboard
        console.log('User logged in:', {
            user_id: user.user_id,
            name: user.full_name,
            email: user.email,
            role: user.role
        });

        res.render('user_dashboard', {
                name: user.full_name,
            }
        );

    } catch (error) {
        console.error('Error during login:', error);
        res.render('login', {
            title: 'Login',
            error: 'An error occurred during login. Please try again.',
            success: null
        });
    }
}

module.exports = {
    getLoginPage,
    handleLoginRequest
};  