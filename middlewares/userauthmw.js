const {authverify} = require('./userauth');

function verifyauth(req, res, next) {
    const token = req.cookies.token;
    
    if(!token){
        return res.redirect('/user/signin');
    }
    const verifyuser = authverify(token);
    if(!verifyuser){return res.render('singin', {error:'Validation failed! try again.'})};
    req.user = verifyuser;
    next();
}

module.exports = verifyauth;