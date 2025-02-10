const express = require('express');
const { signin, signup } = require('../controllers/userregistrationcontroller');
const route = express.Router();

route.get('/signin', signin);
route.get('/signup', signup);

module.exports = route;