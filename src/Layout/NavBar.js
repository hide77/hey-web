import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container, Menu, Sidebar, Dropdown, Image } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import * as FileUpload from "hey-services/FileUpload";
import i18n from "I18n";
import { idx } from "hey-mocks";
import { withNamespaces } from "react-i18next";
import {
  NavItem,
  NavIcon,
  NavMenuText,
  NavBar
} from "hey-components/navComponents";
import {
  HeyIcon,
  FlexInline,
  UserPicture,
  HeyDropdownItem,
  RoundImage
} from "hey-components";
import { logoutUser } from "hey-actions/authentication";
import { getAuthenticatedUser } from "hey-actions/user";
import {
  setLoginModalVisible,
  setRegisterModalVisible,
  setSpaceSearched
} from "hey-actions/global";
import { setVisibleSideMenu } from "hey-actions/global";
import logo_header from "hey-assets/images/logo.png";

const languages = { en: "English", fr: "Français", "en-US": "English" };

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gold: 712,
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
  handleFileSelect = e => {
    e.preventDefault();
    this.fileSelector.click();
  };
  onClickItem = url => {
    const { history } = this.props;
    this.handleNavMenuVisible(false);
    history.push(url);
  };
  onLogoIcon = () => {
    const { history, dispatch, location } = this.props;
    this.handleNavMenuVisible(false);
    if (location.pathname == "/") {
      dispatch(setSpaceSearched(false));
      return;
    }

    history.push("/");
  };
  handleSideMenuVisible = visible => {
    const { dispatch } = this.props;
    dispatch(setVisibleSideMenu(visible));
  };

  handleNavMenuVisible = visible => {
    this.setState({ visibleNavMenu: visible });
  };
  onMenuItem = lang => {
    i18n.changeLanguage(lang);
  };
  onLogout = () => {
    const { dispatch, history } = this.props;
    dispatch(logoutUser());
    history.push("/");
  };
  onLogin = () => {
    const { dispatch } = this.props;
    dispatch(setLoginModalVisible());
  };
  onRegister = () => {
    const { dispatch } = this.props;
    dispatch(setRegisterModalVisible());
  };
  onCreateSpace = () => {
    const { history, subscribed_pages } = this.props;
    if (subscribed_pages.length > 0) {
      history.push(`/subscribe/pages/create`);
    } else {
      history.push(`/subscribe/create/create-page`);
    }
  };
  NavMenu = () => {
    const { location, userInfo, isAuthenticated, t } = this.props;
    var activeItem = "";
    if (location.pathname.includes("/subscribe")) {
      activeItem = "subscribe";
    } else if (location.pathname.includes("/message")) {
      activeItem = "message";
    } else if (location.pathname == "/") {
      activeItem = "search";
    } else if (location.pathname == "/notification") {
      activeItem = "notification";
    }
    return (
      <React.Fragment>
        <Menu.Menu className="inline-center" position="right">
          {isAuthenticated && userInfo && (
            <React.Fragment>
              {/*<NavItem
                as={"div"}
                className="item"
                onClick={() => this.onClickItem("/")}
              >
                <NavMenuText active={activeItem === "search"}>
                  {t("navBar.search")}
                </NavMenuText>
              </NavItem>*/}
              {/*<NavItem
                as={"div"}
                className="item"
                onClick={() => this.onClickItem("/subscribe")}
              >
                <NavMenuText active={activeItem === "subscribe"}>
                  {t("navBar.subscriptions")}
                </NavMenuText>
              </NavItem>*/}
              <NavItem
                as={"div"}
                className="item"
                onClick={() => this.onClickItem("/sensei")}
              >
                <NavMenuText active={activeItem === "sensei"}>
                  I am a sensei
                </NavMenuText>
              </NavItem>
              <NavItem
                as={"div"}
                className="item"
                onClick={() => this.onClickItem("/message")}
              >
                <NavMenuText active={activeItem === "message"}>
                  Message
                </NavMenuText>
              </NavItem>
              <NavItem as={"div"} className="item">
                <NavMenuText>
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
                </NavMenuText>
              </NavItem>
            </React.Fragment>
          )}
          {!isAuthenticated && (
            <React.Fragment>
              <NavItem as={"div"} className="item">
                <NavMenuText>
                  <Dropdown pointing="top left" text={languages[i18n.language]}>
                    <Dropdown.Menu>
                      <HeyDropdownItem onClick={() => this.onMenuItem("en")}>
                        English
                      </HeyDropdownItem>
                      <HeyDropdownItem onClick={() => this.onMenuItem("fr")}>
                        Français
                      </HeyDropdownItem>
                    </Dropdown.Menu>
                  </Dropdown>
                </NavMenuText>
              </NavItem>

              <NavItem
                as={"div"}
                className="item"
                onClick={this.onLogin}
                style={{ paddingRight: 0 }}
              >
                <NavMenuText active={true}>{t("navBar.login")}</NavMenuText>
              </NavItem>
              <NavItem
                as={"div"}
                className="item"
                style={{ paddingLeft: 0, paddingRight: 0 }}
              >
                <NavMenuText active={true}>/</NavMenuText>
              </NavItem>
              <NavItem
                as={"div"}
                className="item"
                onClick={this.onRegister}
                style={{ paddingLeft: 0 }}
              >
                <NavMenuText active={true}>{t("navBar.register")}</NavMenuText>
              </NavItem>
            </React.Fragment>
          )}
        </Menu.Menu>
      </React.Fragment>
    );
  };

  MobileNav = (sideBtnVisible, logoVisible) => {
    const {
      userInfo,
      isAuthenticated,
      currentPage,
      visibleSideMenu
    } = this.props;
    const { visibleNavMenu } = this.state;
    return (
      <React.Fragment>
        <NavBar fixed={"top"} mobile="true" size="large">
          {!isAuthenticated && (
            <React.Fragment>
              {logoVisible && (
                <NavItem>
                  <a href="/">
                    <Image src={logo_header} height={35} />
                  </a>
                </NavItem>
              )}
              {this.NavMenu()}
            </React.Fragment>
          )}
          {isAuthenticated && (
            <Container style={{ justifyContent: "space-between" }}>
              <NavItem
                onClick={() => this.handleNavMenuVisible(!visibleNavMenu)}
              >
                {visibleNavMenu ? (
                  <NavIcon name="close" />
                ) : (
                  <NavIcon name="hamburger" />
                )}
              </NavItem>
              {logoVisible && (
                <NavItem className="mx-auto">
                  <a href="/">
                    <Image src={logo_header} height={35} />
                  </a>
                </NavItem>
              )}
              {userInfo && sideBtnVisible && (
                <NavItem
                  onClick={() => this.handleSideMenuVisible(!visibleSideMenu)}
                >
                  {visibleSideMenu && (
                    <NavIcon
                      name="close"
                      style={{
                        position: "absolute",
                        backgroundColor: "rgba(255,255,255,0.5)",
                        zIndex: 100
                      }}
                    ></NavIcon>
                  )}
                  {Object.keys(currentPage).length === 0 && (
                    <RoundImage size={40} />
                  )}
                  {Object.keys(currentPage).length !== 0 && (
                    <Image
                      rounded
                      width={40}
                      height={40}
                      style={{ borderRadius: 4 }}
                      src={idx(["pictures", "default"], currentPage)}
                    />
                  )}
                </NavItem>
              )}
            </Container>
          )}
        </NavBar>
        <Sidebar
          as={Menu}
          direction="top"
          animation="overlay"
          vertical
          onHide={() => this.handleNavMenuVisible(false)}
          visible={visibleNavMenu}
          className="navbar"
        >
          {this.NavMenu()}
        </Sidebar>
      </React.Fragment>
    );
  };

  DesktopNav = (logoVisible, menuFixed) => {
    return (
      <React.Fragment>
        {menuFixed && (
          <NavBar fixed={"top"} size="large">
            <FlexInline style={{ width: "100%" }}>
              {logoVisible && (
                <NavItem>
                  <a href="/">
                    <Image src={logo_header} height={35} />
                  </a>
                </NavItem>
              )}
              {this.NavMenu()}
            </FlexInline>
          </NavBar>
        )}
        {!menuFixed && (
          <NavBar size="large" className="no-border">
            <FlexInline style={{ width: "100%" }}>
              {logoVisible && (
                <NavItem>
                  <a href="/">
                    <Image src={logo_header} height={35} />
                  </a>
                </NavItem>
              )}
              {this.NavMenu()}
            </FlexInline>
          </NavBar>
        )}
      </React.Fragment>
    );
  };

  render() {
    const { isMobileSize, location, space_searched } = this.props;
    var menuFixed = true,
      logoVisible = true,
      sideBtnVisible = true;
    if (location.pathname === "/sensei") {
      return <React.Fragment></React.Fragment>;
    }
    if (!location.pathname.includes("/subscribe")) {
      sideBtnVisible = false;
    }
    if (location.pathname === "/") {
      logoVisible = false;
      menuFixed = false;
    }
    if (location.pathname.includes("/space")) {
      logoVisible = true;
      menuFixed = false;
    }
    return (
      <React.Fragment>
        {isMobileSize
          ? this.MobileNav(sideBtnVisible, logoVisible || space_searched)
          : this.DesktopNav(logoVisible || space_searched, menuFixed)}
      </React.Fragment>
    );
  }
}

Navbar.propTypes = {
  isMobileSize: PropTypes.bool.isRequired,
  visibleSideMenu: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  userInfo: PropTypes.object,
  isUserLoading: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  dispatch: PropTypes.func,
  currentPage: PropTypes.object,
  subscribed_pages: PropTypes.array,
  token: PropTypes.string,
  space_searched: PropTypes.bool
};
function mapStateToProps(state) {
  const { me } = state.user;
  const { currentPage, subscribed_pages } = state.page;
  const { isAuthenticated, token } = state.authentication;
  const { isMobileSize, visibleSideMenu, space_searched } = state.global;
  return {
    userInfo: me,
    isAuthenticated,
    token,
    currentPage,
    subscribed_pages,
    isMobileSize,
    visibleSideMenu,
    space_searched
  };
}
export default connect(mapStateToProps)(withNamespaces()(withRouter(Navbar)));
