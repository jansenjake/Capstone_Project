const express = require('express');

const route = express.Router();

const bodyParser = require('body-parser');

route.get('/', async (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
})

const user = require('../model');

const user = new User();

route.post('/login', bodyParser.json(), (req, res) => {
    user.login(req, res);
});

route.get('/user', (req, res) => {
    user.fetchUsers(req, res);
});

route.post('/register', bodyParser.json(), (req, res) => {
    user.createUser(req, res);
});

route.delete('/user/:id', (req, res) => {
    user.deleteUser(req, res);
});

route.put('/user/:id', bodyParser.json(), (req, res) => {
    user.updateUser(req, res);
});

const product = require('../model');

const product = new Product();

route.get('/product', (req, res) => {
    product.fetchProducts(req, res);
});

route.get('/product/:id', (req, res) => {
    product.fetchProduct(req, res);
});

route.put('/product/:id', bodyParser.json(), (req, res) => {
    product.updateProduct(req, res);
});

modules.exports = router;
