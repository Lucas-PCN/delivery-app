import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Registration from './pages/Registration';

function App() {
  return (
    <Router>
      <Switch>
        <Route index path="/login" component={ Login } />
        <Route index path="/register" component={ Registration } />
        <Route index path="/customer/checkout" component={ Checkout } />
      </Switch>
    </Router>
  );
}

export default App;
