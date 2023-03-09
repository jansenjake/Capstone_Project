const express = require('express');

const route = express.Router();

const path = require('path');

const bodyParser = require('body-parser');

const {User, Product} = require('../model');

const product = new Product();

const user = new User();


route.get('/', async (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../view/index.html'));
})


route.post('/login', bodyParser.json(), (req, res) => {
    user.login(req, res);
});

route.post('/register', bodyParser.json(), (req, res) => {
    user.createUser(req, res);
});

route.get('/user', (req, res) => {
    user.fetchUsers(req, res);
});

route.delete('/user/:id', (req, res) => {
    user.deleteUser(req, res);
});

route.put('/user/:id', bodyParser.json(), (req, res) => {
    user.updateUser(req, res);
});

route.post('/user', bodyParser.json(), (req, res) => {
    user.addUser(req, res);
});


route.get('/product', (req, res) => {
    product.fetchProducts(req, res);
});

route.get('/product/:id', (req, res) => {
    product.fetchProduct(req, res);
});

route.put('/product/:id', bodyParser.json(), (req, res) => {
    product.updateProduct(req, res);
});

route.delete('/product/:id', (req, res) => {
    product.deleteProduct(req, res);
});

route.post('/product', bodyParser.json(), (req, res) => {
    product.addProduct(req, res);
});


module.exports = route;
