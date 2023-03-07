const express = require('express');

const route = require('./controller');

const cors = require('cors');

const port = parseInt(process.env.PORT) || 3000;

const app = express();

const {errorHandling} = require('./middleware/errorHandling');

const cookieParser = require('cookie-parser');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
});