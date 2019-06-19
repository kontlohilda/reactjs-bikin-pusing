import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import App from "./App";
import UserApp from "./UserApp";
import * as serviceWorker from "./serviceWorker";
import Edit from "./components/Edit";
import Create from "./components/Create";
import Show from "./components/Show";
import ShowUser from "./components/ShowUser";
import Login from "./components/Login";
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  <CookiesProvider>
  <Router>
    <div>
    <Route path="/login" exact component={Login} />
      <Route exact path="/" component={UserApp} />
      <Route path="/edit/:id" component={Edit} />
      <Route path="/create" component={Create} />
      <Route path="/show/:id" component={ShowUser} />
      <Route path="/showadmin/:id" component={Show} />
      <Route exact path="/admin/" component={App} />

    </div>
  </Router>
  </CookiesProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
