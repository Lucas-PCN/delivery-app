const express = require('express');
const { join } = require('path');
const cors = require('cors');

const app = express();
const { error } = require('../middlewares');
const route = require('./routes');

app.use(express.json());
app.use(cors());
app.use('/images', express.static(join(__dirname, './../../public/images')));
console.log(join(__dirname, './../../public/images'));
app.use(route);
app.use(error);

module.exports = app;
