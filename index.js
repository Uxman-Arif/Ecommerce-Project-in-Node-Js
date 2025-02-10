const express = require('express');
const path = require('path');
const route = require('./routes/userroute');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use('/user', route);

app.listen(8000, ()=>console.log('Server started...!'));