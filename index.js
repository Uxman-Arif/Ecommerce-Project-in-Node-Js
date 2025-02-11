const express = require('express');
const path = require('path');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const route = require('./routes/userroute');
const ecomroute = require('./routes/ecomroutes');
const session = require('express-session');
const verifyauth = require('./middlewares/userauthmw');
const cookie = require('cookie-parser');


mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce');
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(flash());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg') || null;
    res.locals.error_msg = req.flash('error_msg') || null;
    next();
});
app.use(cookie());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use('/user', route);
app.use('/ecom', verifyauth, ecomroute);

app.listen(8000, ()=>console.log('Server started...!'));