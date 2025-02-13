const express = require('express');
const { index, addprod, upload, viewprod, cart } = require('../controllers/ecomfncs');
const ecomroute = express.Router();

ecomroute.get('/', index);
ecomroute.get('/add', addprod).post('/add', upload.single('prodImg'), addprod);
ecomroute.get('/cart', cart);
ecomroute.get('/:id', viewprod).post('/:id', viewprod);

module.exports = ecomroute;