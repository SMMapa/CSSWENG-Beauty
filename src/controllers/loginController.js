async function handleLoginPageRequest(req, res) {
    res.render('login', {
        title: 'Login',
    });
}

module.exports = {
    handleLoginPageRequest,
};  