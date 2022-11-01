import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Products from './pages/Products';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Registration } />
        <Route path="/customer/products" component={ Products } />
        <Route path="/" render={ () => <Redirect to="/login" /> } />
      </Switch>
    </Router>
  );
}

export default App;
