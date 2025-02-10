const jwt = require('jsonwebtoken');
const secret_key = 'dsklfjeue@720';

function authuser(user, next) {
    return jwt.sign({
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