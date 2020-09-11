import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withNamespaces } from "react-i18next";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { Container, Image, Menu, Sidebar, Dropdown } from "semantic-ui-react";
import { LandingMenuText, LandingMenuItem } from "./components";

import {
  setLoginModalVisible,
  setRegisterModalVisible
} from "hey-actions/global";
import * as FileUpload from "hey-services/FileUpload";
import { logoutUser } from "hey-actions/authentication";
import { getAuthenticatedUser } from "hey-actions/user";
import {
  TouchableOpacity,
  HeyIcon,
  HeyDropdownItem,
  UserPicture
} from "hey-components";
import logo_header from "hey-assets/images/logo.png";

const SignupBtn = styled(TouchableOpacity)`
  font-family: "MuseoSansRounded-900";
  font-size: 14px;
  height: 42px;
  padding: 0 20px;
`;
class NavMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleNavMenu: false
    };
  }
  componentDidMount() {
    this.fileSelector = FileUpload.buildFileSelector(e => {
      FileUpload.userPicture({
        token: this.props.token,
        file: e.target.files[0],
        cb: imagePath => {
          console.log("image uploaded: ", imagePath);
          this.props.dispatch(getAuthenticatedUser());
        }
      });
    });
  }
  onLogin = () => {
    const { dispatch } = this.props;
    dispatch(setLoginModalVisible());
  };
  onRegister = () => {
    const { dispatch } = this.props;
    dispatch(setRegisterModalVisible());
  };
  onClickItem = url => {
    const { history } = this.props;
    this.handleNavMenuVisible(false);
    history.push(url);
  };
  handleFileSelect = e => {
    e.preventDefault();
    this.fileSelector.click();
  };
  onCreateSpace = () => {
    const { history, activePageID } = this.props;

    if (activePageID && activePageID !== "undefined") {
      history.push(`/subscribe/pages/${activePageID}/create`);
    } else {
      history.push(`/subscribe/create/create-page`);
    }
  };
  onLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
    history.push("/");
  };
  handleNavMenuVisible = visible => {
    this.setState({ visibleNavMenu: visible });
  };
  navbar = () => {
    const { isAuthenticated, t, userInfo } = this.props;
    return (
      <React.Fragment>
        <Menu.Menu position="right">
          {!isAuthenticated && (
            <React.Fragment>
              <LandingMenuItem onClick={this.onLogin}>
                <LandingMenuText fontSize={14} color="#4179e2">
                  Sign in
                </LandingMenuText>
              </LandingMenuItem>
              <LandingMenuItem>
                <SignupBtn
                  customStyle={"landingSignup"}
                  onClick={this.onRegister}
                >
                  Sign up
                </SignupBtn>
              </LandingMenuItem>
            </React.Fragment>
          )}
          {isAuthenticated && (
            <LandingMenuItem className="user-icon">
              <Dropdown
                icon={null}
                trigger={<UserPicture user={userInfo} size={40} />}
              >
                <Dropdown.Menu
                  style={{
                    marginTop: 10,
                    boxShadow: "0px 1px 11px rgba(43, 53, 124, 0.241961)",
                    borderRadius: 4,
                    border: "none"
                  }}
                >
                  <HeyDropdownItem
                    className="user-menu"
                    onClick={this.handleFileSelect}
                  >
                    {t("navBar.upload_picture")}
                  </HeyDropdownItem>
                  <HeyDropdownItem
                    className="user-menu"
                    onClick={() => this.onClickItem("/subscribe")}
                  >
                    {t("navBar.subscriptions")}
                  </HeyDropdownItem>
                  <HeyDropdownItem
                    className="user-menu"
                    onClick={this.onCreateSpace}
                  >
                    {t("navBar.create_space")}
                  </HeyDropdownItem>
                  <HeyDropdownItem
                    className="user-menu red-color no-border"
                    onClick={this.onLogout}
                  >
                    {t("navBar.logout")}
                  </HeyDropdownItem>
                </Dropdown.Menu>
              </Dropdown>
            </LandingMenuItem>
          )}
        </Menu.Menu>
      </React.Fragment>
    );
  };
  MobileNav = () => {
    const { visibleNavMenu } = this.state;
    return (
      <React.Fragment>
        <Menu fixed={"top"} size="large" style={{ height: 60 }}>
          <Container style={{ justifyContent: "space-between" }}>
            <LandingMenuItem onClick={() => this.onClickItem("/")}>
              <Image src={logo_header} height={42} />
            </LandingMenuItem>
            <LandingMenuItem
              onClick={() => this.handleNavMenuVisible(!visibleNavMenu)}
            >
              {visibleNavMenu ? (
                <HeyIcon name="close" />
              ) : (
                <HeyIcon name="hamburger" />
              )}
            </LandingMenuItem>
          </Container>
        </Menu>
        <Sidebar
          as={Menu}
          direction="top"
          animation="overlay"
          vertical
          onHide={() => this.handleNavMenuVisible(false)}
          visible={visibleNavMenu}
          className="navbar"
          style={{ textAlign: "center" }}
        >
          {this.navbar()}
        </Sidebar>
      </React.Fragment>
    );
  };
  DesktopNav = () => {
    return (
      <Menu secondary>
        <LandingMenuItem onClick={() => this.onClickItem("/")}>
          <Image src={logo_header} height={42} />
        </LandingMenuItem>
        {this.navbar()}
      </Menu>
    );
  };
  render() {
    const { isMobileSize } = this.props;
    return (
      <Container>
        {isMobileSize ? this.MobileNav() : this.DesktopNav()}
      </Container>
    );
  }
}

NavMenu.propTypes = {
  t: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  dispatch: PropTypes.func,
  isMobileSize: PropTypes.bool,
  history: PropTypes.object,
  userInfo: PropTypes.object,
  activePageID: PropTypes.string
};
function mapStateToProps(state) {
  const { me } = state.user;
  const { activePageID } = state.page;
  const { isAuthenticated, token } = state.authentication;
  const { isMobileSize } = state.global;
  return {
    userInfo: me,
    activePageID,
    isAuthenticated,
    isMobileSize,
    token
  };
}
export default connect(mapStateToProps)(withNamespaces()(withRouter(NavMenu)));
