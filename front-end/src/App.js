import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Products from './pages/Products';

function App() {
  return (
    <Router>
      <Switch>
        <Route index path="/login" component={ Login } />
        <Route index path="/register" component={ Registration } />
        <Route path="/customer/products" component={ Products } />
        <Route index path="/customer/checkout" component={ Checkout } />
        <Route path="/" render={ () => <Redirect to="/login" /> } />
      </Switch>
    </Router>
  );
}

export default App;
