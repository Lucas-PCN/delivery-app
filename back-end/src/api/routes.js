const express = require('express');

const { 
  createCheckout, 
  getSalesByPk, 
  getSales, 
  salesCustomer,
  updateStatus,
} = require('../controllers/salesController');

const loginController = require('../controllers/loginController');
const productsController = require('../controllers/products.controller');
const registerController = require('../controllers/registerController');
const { validateLogin, validateRegister, autenticaToken } = require('../middlewares');

const route = express();

// Realizar login no sistema
route.post('/login', validateLogin, loginController.login);
// Criar um novo usuário com role customer
route.post('/register', validateRegister, registerController.register);

// Buscar todos os produtos
route.get('/products', autenticaToken, productsController.getProducts);

// rota para criar e atualizar produtos, não é obrigatoria.
route.put('/products/:id', autenticaToken, productsController.updateById);
route.post('/products', autenticaToken, productsController.createProducts);

// rotas de sales
// O cliente tem acesso ao seu proprio pedido, necessário enviar um id do cliente para headers.customer
route.get('/customer-orders/:id', salesCustomer);
// Realizar a compra do pedido
route.post('/checkout', autenticaToken, createCheckout);
// Detalhes do pedido, todos tem acesso.
route.get('/customer/orders/:id', autenticaToken, getSalesByPk);
// Atualiza o campo status do pedido
route.patch('/customer/orders/:id', updateStatus);
// O vendedor tem acesso a todos os pedidos
route.get('/orders', autenticaToken, getSales);

// rota para o admin gerenciar usuarios
// Busca todos os usuários.
route.get('/admin/manage', autenticaToken, registerController.getAll);
// Cria um novo usuário na pagina do administrador
route.post('/admin/manage', autenticaToken, validateRegister, registerController.create);
// Deleta um usuário pelo ID
route.delete('/admin/manage/:id', autenticaToken, registerController.remove);
// Atualiza um usuario pelo ID no param e os dados no Body - name e role.
route.patch('/admin/manage/:id', autenticaToken, registerController.update);

// A rota abaixo é um exemplo de como ir para outras rotas autenticado
// route.get('/teste', autenticaMiddleware, (req, res, _next) => res.send('O'));

module.exports = route;