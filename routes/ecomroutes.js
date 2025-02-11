const express = require('express');
const { index, addprod, upload } = require('../controllers/ecomfncs');
const ecomroute = express.Router();

ecomroute.get('/', index);
ecomroute.get('/add', addprod).post('/add', upload.single('prodImg'), addprod);

module.exports = ecomroute;