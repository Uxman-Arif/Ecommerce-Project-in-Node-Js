const {authverify} = require('./userauth');

function verifyauth(req, res, next) {
    const token = req.cookies.token;
    const verifyuser = authverify(token);
    if(!verifyuser){return res.json({msg:'invalid credentials'})};
    next();
}

module.exports = verifyauth;