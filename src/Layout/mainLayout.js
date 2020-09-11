import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Switch, Redirect, Route } from "react-router-dom";

import { SubscribeLayout, CreateLayout, MessageLayout } from "hey-layout";
import {
  SearchPage,
  ErrorPage,
  SpaceSubscribePage,
  LandingPage
} from "hey-pages";
import { PrivateRoute } from "hey-components";

import Navbar from "./NavBar";

class MainLayout extends Component {
  constructor(props) {
    super(props);
  }

  onContextMenu = e => {
    e.preventDefault();
  };
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }
  render() {
    const { isMobileSize, location } = this.props;

    var menuFixed = true;
    if (location.pathname === "/" || location.pathname.includes("/space")) {
      menuFixed = false;
    }
    return (
      <React.Fragment>
        <Switch>
          <Route path="/">
            <Navbar onLogin={this.onLogin} onRegister={this.onRegister} />
            <PrivateRoute path="/sensei" exact Component={LandingPage} />
            <div
              style={{
                paddingTop: isMobileSize ? 60 : menuFixed ? 70 : 0,
                height: menuFixed
                  ? "unset"
                  : `calc(100vh - ${isMobileSize ? 60 : 70}px)`
              }}
              onContextMenu={this.onContextMenu}
            >
              <PrivateRoute
                path="/"
                exact
                Component={SearchPage}
                onLogin={this.onLogin}
                onRegister={this.onRegister}
              />

              <PrivateRoute path="/error" exact Component={ErrorPage} />
              <Route path="/subscribe">
                <Switch>
                  <PrivateRoute
                    path="/subscribe/pages"
                    Component={SubscribeLayout}
                  />
                  <PrivateRoute
                    path="/subscribe/create"
                    Component={CreateLayout}
                  />
                  <Redirect
                    to={{
                      pathname: `/subscribe/pages`
                    }}
                  />
                </Switch>
              </Route>
              <PrivateRoute
                path="/space/:pageID"
                Component={SpaceSubscribePage}
                onLogin={this.onLogin}
              />
              <PrivateRoute path="/message" Component={MessageLayout} />
              <PrivateRoute path="/notification" exact Component={ErrorPage} />
              {/* <Redirect to={{ pathname: "/" }} /> */}
            </div>
          </Route>
        </Switch>
      </React.Fragment>
    );
  }
}

MainLayout.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  isMobileSize: PropTypes.bool
};

function mapStateToProps(state) {
  const { isMobileSize } = state.global;
  return {
    isMobileSize
  };
}
export default connect(mapStateToProps)(MainLayout);
