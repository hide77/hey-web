import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { Switch, Redirect, Link } from "react-router-dom";
import { Sidebar, Segment, Menu } from "semantic-ui-react";

import { Text, HeyIcon, PrivateRoute } from "hey-components";

import { withNamespaces } from "react-i18next";

import { LoadingPage, NoSubscriptionPage, CreatePage } from "hey-pages";
import { setVisibleSideMenu } from "hey-actions/global";
import { NavItem } from "hey-components/navComponents";

const RoundDiv = styled.div`
  & {
    width: 40px;
    height: 40px;
    border-radius: 8.54px;
    background-color: #dae1ee;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

class CreateLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleDropdown: false
    };
  }
  componentDidMount() {}
  hideSideMenu = () => {
    const { dispatch } = this.props;
    dispatch(setVisibleSideMenu(false));
  };
  render() {
    const {
      isMobileSize,
      visibleSideMenu,
      subscribed_pages,
      GetSubscribedPageLoading,
      GetOwnedPageLoading,
      owned_pages,
      t
    } = this.props;

    if (GetSubscribedPageLoading || GetOwnedPageLoading) {
      return <LoadingPage />;
    }
    if (
      (!GetSubscribedPageLoading && subscribed_pages.length > 0) ||
      (!GetOwnedPageLoading && owned_pages.length > 0)
    ) {
      return <Redirect to={{ pathname: "/subscribe" }} />;
    }

    return (
      <React.Fragment>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation={isMobileSize ? "overlay" : "push"}
            direction={isMobileSize ? "top" : "left"}
            secondary={isMobileSize ? false : true}
            onHide={this.hideSideMenu}
            vertical
            visible={(visibleSideMenu && isMobileSize) || !isMobileSize}
            className="sidebar_grey"
          >
            <div style={{ padding: "20px 0" }}>
              <Link to="/main/subscribe/create/create-page">
                <NavItem>
                  <RoundDiv>
                    <HeyIcon name="cross" />
                  </RoundDiv>
                  <Text
                    color="#3c3c3c"
                    fontWeight="bold"
                    fontSize="14.2px"
                    style={{ paddingLeft: 12 }}
                  >
                    {t("noSpacePage.sideMenuCreate")}
                  </Text>
                </NavItem>
              </Link>
            </div>
          </Sidebar>
          <Sidebar.Pusher dimmed={false}>
            <Segment
              basic
              style={{
                marginLeft: isMobileSize ? 0 : 280,
                padding: 0,
                height: `calc(100vh - ${isMobileSize ? "60" : "70"}px)`
              }}
            >
              <Switch>
                <PrivateRoute
                  path="/main/subscribe/create"
                  exact
                  Component={NoSubscriptionPage}
                />
                <PrivateRoute
                  path="/main/subscribe/create/create-page"
                  exact
                  Component={CreatePage}
                />
                <Redirect to={{ pathname: `/main/subscribe/create` }} />
              </Switch>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </React.Fragment>
    );
  }
}

CreateLayout.propTypes = {
  t: PropTypes.func,
  isMobileSize: PropTypes.bool.isRequired,
  visibleSideMenu: PropTypes.bool.isRequired,
  GetSubscribedPageLoading: PropTypes.bool.isRequired,
  subscribed_pages: PropTypes.array.isRequired,
  GetOwnedPageLoading: PropTypes.bool,
  owned_pages: PropTypes.array,
  dispatch: PropTypes.func,
  history: PropTypes.object
};

function mapStateToProps(state) {
  const {
    subscribed_pages,
    GetSubscribedPageLoading,
    GetOwnedPageLoading,
    owned_pages
  } = state.page;
  const { isMobileSize, visibleSideMenu } = state.global;
  return {
    GetSubscribedPageLoading,
    subscribed_pages,
    GetOwnedPageLoading,
    owned_pages,
    isMobileSize,
    visibleSideMenu
  };
}

export default connect(mapStateToProps)(withNamespaces()(CreateLayout));
