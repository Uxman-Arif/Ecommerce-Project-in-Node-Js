function signin(req, res) {
    return res.render('signin');
};

function signup(req, res) {
    console.log('working.................');
    return res.render('signup');
}

module.exports = {
    signin,
    signup,
}