const express = require('express');
const { index, addprod } = require('../controllers/ecomfncs');
const ecomroute = express.Router();

ecomroute.get('/', index);
ecomroute.get('/add', addprod);

module.exports = ecomroute;