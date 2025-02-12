const express = require('express');
const { signin, signup, signout } = require('../controllers/userregistrationcontroller');
const route = express.Router();

route.get('/signin', signin).post('/signin', signin);
route.get('/signup', signup).post('/signup', signup);
route.get('/signout', signout);

module.exports = route;