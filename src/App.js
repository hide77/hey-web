import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { HashRouter } from "react-router-dom";
import { Responsive } from "semantic-ui-react";
import { MainLayout } from "hey-layout";
import "babel-polyfill";
import { LoginDialog, RegisterDialog, PrivateRoute } from "hey-components";
import { setIsMobileSize } from "hey-actions/global";
import { getAuthenticatedUser } from "hey-actions/user";
import { getAllPages, getSubscribedPages } from "hey-actions/page";

let DevTools;
if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line global-require
  DevTools = require("hey-services/DevTools").default;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false
    };
  }
  updateWidth = () => {
    const isSSR = typeof window === "undefined";
    const width = isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
    const { dispatch } = this.props;
    if (width < Responsive.onlyTablet.minWidth) dispatch(setIsMobileSize(true));
    else dispatch(setIsMobileSize(false));
  };
  componentDidMount() {
    window.addEventListener("resize", this.updateWidth);
    this.updateWidth();
    this.setState({ isMounted: true });
    const { isAuthenticated, dispatch } = this.props;
    dispatch(getAllPages());
    if (!isAuthenticated) return;
    dispatch(getAuthenticatedUser());
    dispatch(getSubscribedPages());
  }

  render() {
    const { isMounted } = this.state;
    return (
      <React.Fragment>
        {isMounted &&
          !window.devToolsExtension &&
          process.env.NODE_ENV === "development" && <DevTools />}
        <HashRouter>
          <PrivateRoute path="/" Component={MainLayout} />
        </HashRouter>
        <LoginDialog />
        <RegisterDialog />
      </React.Fragment>
    );
  }
}
App.propTypes = {
  isAuthenticated: PropTypes.bool,
  dispatch: PropTypes.func
};
function mapStateToProps(state) {
  const { isAuthenticated } = state.authentication;
  return {
    isAuthenticated
  };
}
export default connect(mapStateToProps)(App);
