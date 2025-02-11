const { render } = require('express/lib/response');
const jwt = require('jsonwebtoken');
const secret_key = 'dsklfjeue@720';

function authuser(user) {
    return jwt.sign({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
    }, secret_key)
};

function authverify(token){
    return jwt.verify(token, secret_key);
};

module.exports = {
    authuser, authverify,
}