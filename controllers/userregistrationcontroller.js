const usermodel = require('../models/usermodel');
const { authuser } = require('../middlewares/userauth');

async function signin(req, res) {
    data = req.body;
    if (req.method=='POST'){
        data = req.body;
        const loginuser = await usermodel.findOne({username:data.username});
        if(loginuser){
            try {
                const passwordverify = await usermodel.matchPassword(data.username, data.password);
                if (passwordverify){
                    const token = authuser(data.username, data.password);
                    res.cookie('token', token);
                }
                return res.redirect('/ecom');
            } catch (error) {
                return res.render('signin', { error: error.message });
            }
        }else{
            return res.json({err:'wrong username or password'});
        }
    }
    return res.render('signin');
};

async function signup(req, res) {
    data = req.body;
    if (req.method=='POST'){
        await usermodel.create({username:data.username, email:data.email, role:data.role, password:data.password})
    }
    return res.render('signup');
}

module.exports = {
    signin,
    signup,
}