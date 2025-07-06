async function getUserDashboard(req, res) {
    res.render('user_dashboard', {
        title: 'User Dashboard',
    });
}

module.exports = {
    getUserDashboard
};  