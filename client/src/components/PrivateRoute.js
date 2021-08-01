import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

function PrivateRoute({ children, ...rest }) {
  let { user } = useUserContext();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        // if user is logged in render children, else render /signin route
        user?.username ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
