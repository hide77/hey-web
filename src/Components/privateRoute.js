import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { store } from "hey-services";
const PrivateRoute = ({ Component, path, exact, ...rest }) => {
  // const { dispatch } = this.props;
  return (
    <Route
      exact={exact}
      path={path}
      render={props => {
        const { authentication } = store.getState();
        if (
          !authentication.isAuthenticated &&
          path !== "/" &&
          path !== "/sensei" &&
          path !== "/space/:pageID"
        ) {
          return (
            <Redirect
              to={{
                pathname: "/",
                // eslint-disable-next-line react/prop-types
                state: { from: props.location }
              }}
            />
          );
        }
        return <Component {...props} {...rest} />;
      }}
    />
  );
};
PrivateRoute.propTypes = {
  path: PropTypes.string,
  exact: PropTypes.bool,
  Component: PropTypes.any
};

export default PrivateRoute;
