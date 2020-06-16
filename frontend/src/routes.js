import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { isAuthenticated } from './services/auth';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewOrder from './pages/NewOrder';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      ) 
    }
  />
);


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Logon} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/incidents/new" component={NewOrder} />
      </Switch>
    </BrowserRouter>
  );
}