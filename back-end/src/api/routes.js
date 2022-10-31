const express = require('express');
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');
const { validateLogin, validateRegister } = require('../middlewares');

const route = express();

route.post('/login', validateLogin, loginController.login);
route.post('/register', validateRegister, registerController.register);
// A rota abaixo é um exemplo de como ir para outras rotas autenticado
// route.get('/teste', autenticaMiddleware, (req, res, _next) => res.send('O'));

module.exports = route;