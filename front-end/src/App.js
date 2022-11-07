import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Products from './pages/Products';
import Sales from './pages/Sales';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Registration } />
        <Route exact path="/customer/products" component={ Products } />
        <Route exact path="/customer/checkout" component={ Checkout } />
        <Route exact path="/customer/orders" component={ Sales } />
        <Route exact path="/" render={ () => <Redirect to="/login" /> } />
      </Switch>
    </Router>
  );
}

export default App;
