const express = require('express');
const loginController = require('../controllers/loginController');

const app = express();

app.use(express.json());
app.post('/login', loginController.login);

module.exports = app;
