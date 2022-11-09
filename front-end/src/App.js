import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Sales from './pages/Sales';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/admin/manager" component={ Admin } />
        <Route exact path="/customer/orders/:id" component={ Orders } />
        <Route exact path="/customer/orders" component={ Sales } />
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
