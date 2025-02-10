const express = require('express');
const { signin, signup } = require('../controllers/userregistrationcontroller');
const route = express.Router();

route.get('/signin', signin).post('/signin', signin);
route.get('/signup', signup).post('/signup', signup);

module.exports = route;