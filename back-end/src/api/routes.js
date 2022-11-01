const express = require('express');
const { createCheckout } = require('../controllers/checkoutController');
const loginController = require('../controllers/loginController');
const productsController = require('../controllers/products.controller');
const registerController = require('../controllers/registerController');
const { validateLogin, validateRegister } = require('../middlewares');

const route = express();

route.post('/login', validateLogin, loginController.login);
route.post('/register', validateRegister, registerController.register);
route.post('/products', productsController.createProducts);
route.get('/products', productsController.getProducts);
route.post('/checkout', createCheckout);
// A rota abaixo é um exemplo de como ir para outras rotas autenticado
// route.get('/teste', autenticaMiddleware, (req, res, _next) => res.send('O'));

module.exports = route;