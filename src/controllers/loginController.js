// Handle authorization events here

async function handleLoginPageRequest(req, res) {

    res.render('login', {
        title: 'Test Login Page',
    });
}


module.exports = {
    handleLoginPageRequest,
};  