const express = require('express');
const cors = require('cors');
const login = require('../routes/login');
const register = require('../routes/register');
const customer = require('../routes/customer');
const user = require('../routes/user');
const sale = require('../routes/sales');
const seller = require('../routes/seller');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static('public'));

app.use('/login', login);

app.use('/register', register);

app.use('/customer', customer);

app.use('/user', user);

app.use('/sale', sale);

app.use('/seller', seller);

module.exports = app;
