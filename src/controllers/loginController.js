async function getLoginPage(req, res) {
    res.render('login', {
        title: 'Login',
    });
}

async function handleLoginRequest(req, res) {
    const { username, password } = req.body;
    // do stuff here. navigate to dashboard for now
    res.redirect('/user_dashboard');
}

module.exports = {
    getLoginPage,
    handleLoginRequest
};  