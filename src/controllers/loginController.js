const bcrypt = require('bcrypt');
const User = require('../models/User');
const { getVendorProducts } = require('./productController');

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

        switch(user.role) {
            case "employee":
                try {
                    req.session.user = {
                    id: user._id,
                    user_id: user.user_id,
                    full_name: user.full_name,
                    email: user.email,
                    role: user.role
                };
                    return res.redirect("/user_dashboard");
                } catch (err) {
                    console.error(err);
                    return res.status(403).send(err.message);
                }
            case "vendor":
                try {
                    req.session.user = {
                    id: user._id,
                    user_id: user.user_id,
                    full_name: user.full_name,
                    email: user.email,
                    role: user.role,
                    brand_name: user.brand_name
                };
                    return res.redirect("/vendor_dashboard");
                } catch (err) {
                    console.error(err);
                    return res.status(403).send(err.message);
                }
            case "admin":
                break;
            default:
               return res.status(500).render("Who are you?");
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.render('login', {
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