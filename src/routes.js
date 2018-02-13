import React from 'react';
import { Redirect, Route, Router } from 'react-router-dom';
import App from './App';
import Networks from './Networks/Networks';
import Callback from './Callback/Callback';
import Profile from './Profile/Profile';
import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

export const makeMainRoutes = () => {
  return (
    <Router history={history} component={App}>
      <div>
        <Route path="/" render={props => <App auth={auth} {...props} />} />
        <Route
          path="/networks"
          render={props => <Networks auth={auth} {...props} />}
        />
        <Route
          path="/profile"
          render={props =>
            !auth.isAuthenticated() ? (
              <Redirect to="/" />
            ) : (
              <Profile auth={auth} {...props} />
            )
          }
        />
        <Route
          path="/callback"
          render={props => {
            handleAuthentication(props);
            return <Callback {...props} />;
          }}
        />
      </div>
    </Router>
  );
};
