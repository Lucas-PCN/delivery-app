const express = require('express');
const cors = require('cors');

const app = express();
const { error } = require('../middlewares');
const route = require('./routes');

app.use(express.json());
app.use(cors());
app.use(route);
app.use(error);

module.exports = app;
