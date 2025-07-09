const { getVendorProducts } = require('./productController');

// Middleware: require user to be logged in
function requireLogin(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.redirect('/login');
    }
    next();
}

// GET /user_dashboard - for employees
async function getUserDashboard(req, res) {
    const user = req.session.user;

    if (user.role !== 'employee') {
        return res.status(403).send("Access denied.");
    }

    printDebug(user);

    res.render('user_dashboard', {
        name: user.full_name
    });
}

// GET /vendor_dashboard - for vendors
async function getVendorDashboard(req, res) {
    const user = req.session.user;

    if (user.role !== 'vendor') {
        return res.status(403).send("Access denied.");
    }

    try {
        const products = await getVendorProducts(user);
        printDebug(user, products);
        res.render('vendor_dashboard', {
            u: user,
            p: products
        });
    } catch (error) {
        console.error("Failed to load vendor dashboard:", error);
        res.status(500).send("Server error loading vendor dashboard.");
    }
}

async function printDebug(user) {
    console.log(user.role + ' logged in:', {
        user_id: user.user_id,
        name: user.full_name,
        email: user.email,
        role: user.role
    });
}

async function printDebug(user, product) {
    console.log(user.role + ' logged in:', {
        user_id: user.user_id,
        name: user.full_name,
        email: user.email,
        role: user.role,
        brand_name: user.brand_name
    });

    if (product != null) {
        console.log(product);
    }
    else {
        console.log("Product is empty.");
    }
}

module.exports = {
    requireLogin,
    getUserDashboard,
    getVendorDashboard
};
