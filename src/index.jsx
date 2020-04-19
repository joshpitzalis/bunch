import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Order from './pages/Order.jsx';
import * as serviceWorker from './serviceWorker';
import Navbar from './features/header/Navbar'
import Footer from './features/footer/Footer'
import {
  BrowserRouter ,
  Switch,
  Route
} from "react-router-dom";

const Routes = () => 
<BrowserRouter>
  <Navbar />
  <Switch>
    <Route  exact path="/">
      <Login/> 
    </Route>
    <Route path="/dashboard/:userId">
      <Dashboard/>
    </Route>
    <Route path="/order/:orderId">
      <Order/> 
    </Route>
  </Switch>
  <Footer/>
</BrowserRouter>
  


ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
