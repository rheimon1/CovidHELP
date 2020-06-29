import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ModalContainer } from 'react-router-modal';

import Profile from '../pages/Profile';
import NewOrder from '../pages/NewOrder';

// import { isAuthenticated } from '../services/auth';
/* const PrivateRoute = ({ component: Component, ...rest }) => (
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
); */

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Profile} />
        <Route path="/orders/new" component={NewOrder} />
      </Switch>
      <ModalContainer />
    </BrowserRouter>
  )
};

export default AppRoutes;

