const express = require('express');

const { 
  createCheckout, 
  getSalesByPk, 
  getSales, 
  salesCustomer,
  saleStatus,
} = require('../controllers/salesController');

const loginController = require('../controllers/loginController');
const productsController = require('../controllers/products.controller');
const registerController = require('../controllers/registerController');
const { validateLogin, validateRegister, autenticaMiddleware } = require('../middlewares');

const route = express();

// rota de login e registro
route.post('/login', validateLogin, loginController.login);
route.post('/register', validateRegister, registerController.register);

// rota de produtos
route.get('/products', autenticaMiddleware, productsController.getProducts);

// rota para criar e atualizar produtos, não é obrigatoria.
route.put('/products/:id', autenticaMiddleware, productsController.updateById);
route.post('/products', autenticaMiddleware, productsController.createProducts);

// rotas de sales
// rota onde apenas o cliente tem acesso, necessário enviar um id do cliente para headers.customer
route.get('/orders-customer', autenticaMiddleware, salesCustomer);

// rota para realizar a compra do pedido
route.post('/checkout', autenticaMiddleware, createCheckout);

// rota de detalhes do pedido, todos tem acesso.
route.get('/orders/:id', autenticaMiddleware, getSalesByPk);
route.patch('/orders/:id', saleStatus);

// rota que o vendedor tem acesso
route.get('/orders', autenticaMiddleware, getSales);

// A rota abaixo é um exemplo de como ir para outras rotas autenticado
// route.get('/teste', autenticaMiddleware, (req, res, _next) => res.send('O'));

module.exports = route;