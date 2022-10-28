const express = require('express');

const app = express();
const { error } = require('../middlewares');
const route = require('./routes');

app.use(express.json());
// app.get('/teste', autenticaMiddleware, (req, res) => res.send('ok'));
app.use(route);

app.use(error);

module.exports = app;
