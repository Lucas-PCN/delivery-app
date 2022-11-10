import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Products from './pages/Products';
import OrdersCustomerDetails from './pages/OrdersCustomerDetails';
import OrdersCustomer from './pages/OrdersCustomer';
import OrdersSellerDetails from './pages/OrdersSellerDetails';
import OrdersSeller from './pages/OrdersSeller';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/admin/manage" component={ Admin } />
        <Route exact path="/seller/orders/:id" component={ OrdersSellerDetails } />
        <Route exact path="/seller/orders" component={ OrdersSeller } />
        <Route exact path="/customer/orders/:id" component={ OrdersCustomerDetails } />
        <Route exact path="/customer/orders" component={ OrdersCustomer } />
        <Route exact path="/customer/checkout" component={ Checkout } />
        <Route exact path="/customer/products" component={ Products } />
        <Route exact path="/register" component={ Registration } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/" render={ () => <Redirect to="/login" /> } />
      </Switch>
    </Router>
  );
}

export default App;
