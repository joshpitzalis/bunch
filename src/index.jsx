import React from "react";
import ReactDOM from "react-dom";

import { ZEITUIProvider, CSSBaseline } from "@zeit-ui/react";
import "./styles/index.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from './pages/Dashboard.jsx';
import Order from './pages/Order.jsx';
import * as serviceWorker from "./serviceWorker";
import Navbar from "./features/header/Navbar";
import Footer from "./features/footer/Footer";
import firebase from "./utils/firebase";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ auth, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )}
    />
  );
}

const Routes = () => {
  const [auth, setAuth] = React.useState(false);

  React.useEffect(() => {
    firebase &&
      firebase.auth() &&
      firebase.auth().onAuthStateChanged(user => setAuth(user));
  }, []);

  return (
    <BrowserRouter>
      {auth && <Navbar auth={auth} />}
      <Switch>
        <Route exact path="/">
          <Login auth={auth} />
        </Route>
        <PrivateRoute auth={auth} path="/dashboard/:userId">
          <Dashboard auth={auth} />
        </PrivateRoute>
        <Route path="/order/:orderId">
          <Order auth={auth} />
        </Route>
      </Switch>
      <Footer auth={auth} />
    </BrowserRouter>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ZEITUIProvider>
      <CSSBaseline />
      <Routes />
    </ZEITUIProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
