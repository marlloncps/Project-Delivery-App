import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import CustomerCheckout from './pages/customer/CustomerCheckout';
import CustomerOrders from './pages/customer/CustomerOrders';
import CustomerDetails from './pages/customer/CustomerDetails';
import SellerOrders from './pages/seller/SellerOrders';
import SellerDetails from './pages/seller/SellerDetails';
import Manager from './pages/admin/Manager';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ Products } />
      <Route exact path="/customer/checkout" component={ CustomerCheckout } />
      <Route exact path="/customer/orders" component={ CustomerOrders } />
      <Route exact path="/customer/orders/:id" component={ CustomerDetails } />
      <Route exact path="/seller/orders" component={ SellerOrders } />
      <Route exact path="/seller/orders/:id" component={ SellerDetails } />
      <Route exact path="/admin/manage" component={ Manager } />
    </Switch>
  );
}

export default App;
