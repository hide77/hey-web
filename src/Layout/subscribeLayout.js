import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { Switch, Redirect } from "react-router-dom";
import { connectToSocket } from "hey-actions/io";
import { Sidebar, Segment, Menu, Dropdown } from "semantic-ui-react";
import HeyTreeView from "./HeyTreeView";
import LibraryEditPanel from "./LibraryEditPanel";
import ChannelEditPanel from "./ChannelEditPanel";
import DynamicFont from "react-dynamic-font";
import { STYLE_CONFIG } from "hey-config";
import {
  Text,
  HeyIcon,
  ChannelText,
  PrivateRoute,
  RoundImage
} from "hey-components";
import {
  getPage,
  setCurrentPage,
  addFolder,
  addFile,
  addFileInFolder,
  addChannel,
  setActivePageId
} from "hey-actions/page";
import {
  setActivePrivateChat,
  createPrivateChat,
  getPrivateMessage
} from "hey-actions/chat";
import { setVisibleSideMenu } from "hey-actions/global";
import { storeData } from "hey-services";
import { idx } from "hey-mocks";
import { withNamespaces } from "react-i18next";

import {
  SubscribeContentPage,
  ChattingRoomPage,
  CreatePage,
  ErrorPage,
  LoadingPage,
  SettingPage,
  EditPage,
  AboutPage,
  PostPage
} from "hey-pages";

import {
  NavItem,
  DropDownMenu,
  NavText,
  MenuSubHead,
  MenuText
} from "hey-components/navComponents";

const Section = styled.div`
  & {
    padding-top: 8px;
    padding-bottom: 8px;
  }
`;

const RoundDiv = styled.div`
  & {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background-color: #dae1ee;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const EditBtn = styled(Text)`
  & {
    font-family: Dosis;
    font-style: normal;
    font-weight: bold;
    font-size: 12.4px;
    line-height: 16px;
    letter-spacing: ${STYLE_CONFIG.letterSpace}px;
    text-transform: uppercase;
    color: #969eac;
  }
  &:hover {
    cursor: pointer;
  }
`;
const SidebarContainer = styled.div`
  height: ${props =>
    props.isMobileSize
      ? "50vh"
      : props.isLibraryEditing
      ? "calc(100vh - 200px)"
      : props.isChannelEditing
      ? "calc(100vh - 150px)"
      : "calc(100vh - 70px)"};
  overflow-y: auto;
  overflow-x: hidden;
  padding: 25px 10px;
`;

class SubscribeLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleDropdown: false,
      isLibraryEditing: false,
      isChannelEditing: false,
      showEditLavel: false,
      showChannelEditPanel: false,
      isOnlyArticle: false,
      cur_folderID: ""
    };
  }
  componentDidMount() {
    const { dispatch, history, subscribed_pages, activePageID } = this.props;
    dispatch(connectToSocket());
    if (activePageID !== "") {
      this.getPageData(activePageID);
    } else {
      if (subscribed_pages[0]) {
        dispatch(setCurrentPage(subscribed_pages[0]));
      } else {
        history.push("/subscribe/create");
      }
    }
  }
  getPageData = page_id => {
    const { dispatch } = this.props;
    dispatch(setActivePageId(page_id));
    dispatch(setVisibleSideMenu(false));
    dispatch(getPage(page_id));
    storeData("activePageID", page_id, { json: false });
  };
  pathToActiveItem() {
    const { match, location } = this.props;
    var path = match.url;
    var pathname = location.pathname;
    var activeItem = pathname.substr(
      path.length + 1,
      pathname.length - path.length - 1
    );
    return activeItem;
  }
  goToUrl = url => {
    const { dispatch, history } = this.props;
    history.push(url);
    dispatch(setVisibleSideMenu(false));
  };
  dropDownMenu(currentPage) {
    const {
      GetSubscribedPageLoading,
      subscribed_pages,
      myInfo,
      t
    } = this.props;
    if (GetSubscribedPageLoading) {
      return;
    }
    return (
      <DropDownMenu
        trigger={
          <NavItem className="title-item">
            <RoundImage
              src={`${idx(["pictures", "default"], currentPage)}`}
              size={40}
            />
            <Text
              color="#3c3c3c"
              fontWeight="bold"
              fontSize="25.2px"
              style={{
                width: "155px",
                padding: 0,
                paddingLeft: 12,
                wordBreak: "break-all"
              }}
            >
              <DynamicFont content={currentPage.name} />
            </Text>
            <HeyIcon
              name="select"
              style={{ marginLeft: "10px", marginTop: "10px" }}
            />
          </NavItem>
        }
      >
        <Dropdown.Menu>
          {subscribed_pages &&
            subscribed_pages.map((item, key) => {
              var name = item.name;
              if (name.length > 20) {
                name = name.slice(0, 17) + "...";
              }
              return (
                <Dropdown.Item
                  onClick={() => {
                    this.getPageData(item._id);
                  }}
                  key={key}
                >
                  <HeyIcon name="dot" />
                  <RoundImage
                    src={`${idx(["pictures", "default"], item)}`}
                    size={40}
                    style={{
                      marginLeft: 10
                    }}
                  />
                  <div style={{ paddingLeft: 12 }}>
                    <Text
                      color="#3c3c3c"
                      fontWeight="bold"
                      fontSize="14.2px"
                      style={{ padding: 0 }}
                    >
                      {`${item.owner.id === myInfo.id ? "👑 " : ""}${name}`}
                      {name}
                    </Text>
                    <Text
                      color="#B3B5CC"
                      fontSize="9.2px"
                      style={{ padding: 0 }}
                    >
                      {t("space.subscribers", { count: item.nb_users })}
                    </Text>
                  </div>
                  {item.id == currentPage.id && <HeyIcon name="check" />}
                </Dropdown.Item>
              );
            })}
          <Dropdown.Item
            onClick={() => this.goToUrl(`/subscribe/pages/create`)}
          >
            <RoundDiv style={{ marginLeft: "16px" }}>
              <HeyIcon name="cross" />
            </RoundDiv>
            <Text
              color="#3c3c3c"
              fontWeight="bold"
              fontSize="14.2px"
              style={{ paddingLeft: 12 }}
            >
              {t("editSpacePage.create_title")}
            </Text>
          </Dropdown.Item>
        </Dropdown.Menu>
      </DropDownMenu>
    );
  }
  onLibraryEdit = () => {
    const { isChannelEditing } = this.state;
    if (isChannelEditing) this.onChannelEdit();
    this.setState(prev => ({
      isLibraryEditing: !prev.isLibraryEditing,
      showEditLavel: prev.isLibraryEditing
    }));
  };
  onChannelEdit = () => {
    const { isLibraryEditing } = this.state;
    if (isLibraryEditing) this.onLibraryEdit();
    this.setState(prev => ({
      isChannelEditing: !prev.isChannelEditing,
      showChannelEditPanel: prev.isChannelEditing
    }));
  };
  onAddLibrary = (name, isfolder) => {
    const { isOnlyArticle, cur_folderID } = this.state;
    const { dispatch, currentPage } = this.props;
    if (isfolder) {
      dispatch(addFolder(currentPage.id, { type: "folder", title: name }));
    } else if (isOnlyArticle) {
      dispatch(
        addFileInFolder(cur_folderID, {
          type: "md",
          title: name,
          content: ""
        })
      );
    } else {
      dispatch(
        addFile(currentPage.id, { type: "md", title: name, content: "" })
      );
    }
  };
  onAddArticleOrFolder = () => {
    this.setState({ isOnlyArticle: false, showEditLavel: true });
  };
  onAddArticle = folderID => {
    this.setState({
      cur_folderID: folderID,
      isOnlyArticle: true,
      showEditLavel: true
    });
  };
  onAddChannelTextBtn = () => {
    this.setState({ showChannelEditPanel: true });
  };
  onAddChannel = name => {
    const { dispatch, currentPage } = this.props;
    dispatch(addChannel(currentPage.id, { name: name }));
  };
  hideSideMenu = () => {
    const { dispatch } = this.props;
    dispatch(setVisibleSideMenu(false));
  };
  onSendMessage = () => {
    const { currentPage, dispatch } = this.props;
    dispatch(createPrivateChat(currentPage.owner.id)).then(() => {
      dispatch(setActivePrivateChat(currentPage.owner.id));
      dispatch(getPrivateMessage(currentPage.owner.id));
      this.goToUrl("/message");
    });
  };
  render() {
    const {
      isMobileSize,
      visibleSideMenu,
      subscribed_pages,
      currentPage,
      GetSubscribedPageLoading,
      getPageLoading,
      t,
      myInfo,
      isUserLoading,
      isAddingModule,
      isAddingChannel
    } = this.props;
    const {
      isLibraryEditing,
      isChannelEditing,
      isOnlyArticle,
      showEditLavel,
      showChannelEditPanel
    } = this.state;

    var activeItem = "";
    activeItem = this.pathToActiveItem();
    if (GetSubscribedPageLoading || isUserLoading || getPageLoading) {
      return <LoadingPage />;
    }
    // if (!GetSubscribedPageLoading && subscribed_pages.length === 0) {
    //   return <Redirect to={{ pathname: "/subscribe/create" }} />;
    // }
    if (Object.keys(currentPage).length === 0) {
      return <LoadingPage />;
    }
    return (
      <React.Fragment>
        {(isAddingModule || isAddingChannel) && <LoadingPage />}
        <Sidebar.Pushable style={{ overflow: "hidden" }}>
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
            <SidebarContainer
              isMobileSize={isMobileSize}
              isLibraryEditing={isLibraryEditing && showEditLavel}
              isChannelEditing={isChannelEditing && showChannelEditPanel}
            >
              {this.dropDownMenu(currentPage)}
              <Section style={{ paddingLeft: "40px" }}>
                <NavItem
                  name="about"
                  onClick={() => this.goToUrl(`/subscribe/pages/about`)}
                >
                  <HeyIcon name="about" active={activeItem === "about"} />
                  <NavText active={activeItem === "about"}>
                    {t("sideMenu.about")}
                  </NavText>
                </NavItem>
                {currentPage.owner && currentPage.owner.id === myInfo.id && (
                  <NavItem
                    name="updates"
                    onClick={() => this.goToUrl(`/subscribe/pages/post`)}
                  >
                    <HeyIcon name="updates" active={activeItem === "post"} />
                    <NavText active={activeItem === "post"}>
                      {t("sideMenu.posts")}
                    </NavText>
                  </NavItem>
                )}
                {currentPage.owner && currentPage.owner.id !== myInfo.id && (
                  <NavItem name="talk" onClick={this.onSendMessage}>
                    <HeyIcon name="talk" active={activeItem === "talk"} />
                    <NavText active={activeItem === "talk"}>
                      Talk to {currentPage.owner.name}
                    </NavText>
                  </NavItem>
                )}

                <NavItem
                  name="settings"
                  onClick={() =>
                    this.goToUrl(
                      `/subscribe/pages/${
                        currentPage.owner.id === myInfo.id ? "edit" : "setting"
                      }`
                    )
                  }
                >
                  <HeyIcon
                    name="settings"
                    active={activeItem === "setting" || activeItem === "edit"}
                  />
                  <NavText
                    active={activeItem === "setting" || activeItem === "edit"}
                  >
                    {t("sideMenu.settings")}
                  </NavText>
                </NavItem>
              </Section>

              <Section>
                <NavItem
                  className="title"
                  style={{ justifyContent: "space-between" }}
                >
                  <MenuSubHead>{t("sideMenu.modules.chatrooms")}</MenuSubHead>
                  {currentPage.owner && currentPage.owner.id === myInfo.id && (
                    <EditBtn
                      active={isChannelEditing}
                      onClick={this.onChannelEdit}
                    >
                      {isChannelEditing
                        ? t("editorPage.save_modules")
                        : t("editorPage.edit_modules")}
                    </EditBtn>
                  )}
                </NavItem>
                {isChannelEditing && (
                  <NavItem onClick={this.onAddChannelTextBtn}>
                    <HeyIcon name={"rect_cross"} />
                    <MenuText active={true}>Add Channel</MenuText>
                  </NavItem>
                )}
                {currentPage.channels &&
                  currentPage.channels.map((item, key) => (
                    <NavItem
                      name={item.name}
                      key={key}
                      onClick={() =>
                        this.goToUrl(`/subscribe/pages/channel/${item.id}`)
                      }
                    >
                      <ChannelText
                        active={activeItem === `channel/${item.id}`}
                        fontSize="22.32px"
                      >
                        {item.name}
                      </ChannelText>
                    </NavItem>
                  ))}
              </Section>

              {((currentPage.owner && currentPage.owner.id === myInfo.id) ||
                (currentPage.modules && currentPage.modules.length > 0)) && (
                <Section>
                  <NavItem
                    style={{ justifyContent: "space-between" }}
                    className="title"
                  >
                    <MenuSubHead>{t("sideMenu.modules.library")}</MenuSubHead>
                    {currentPage.owner && currentPage.owner.id === myInfo.id && (
                      <EditBtn
                        active={isLibraryEditing}
                        onClick={this.onLibraryEdit}
                      >
                        {isLibraryEditing
                          ? t("editorPage.save_modules")
                          : t("editorPage.edit_modules")}
                      </EditBtn>
                    )}
                  </NavItem>
                  {isLibraryEditing && (
                    <NavItem onClick={this.onAddArticleOrFolder}>
                      <HeyIcon name={"rect_cross"} />
                      <MenuText active={true}>
                        {t("editorPage.add_folder_article")}
                      </MenuText>
                    </NavItem>
                  )}
                  {currentPage.modules &&
                    currentPage.modules.map((node, i) => (
                      <HeyTreeView
                        key={i}
                        dataSource={node}
                        activeID={activeItem}
                        link={`/subscribe/pages/library`}
                        onItem={this.goToUrl}
                        isLibraryEditing={isLibraryEditing}
                        onAddArticle={this.onAddArticle}
                      />
                    ))}
                </Section>
              )}
            </SidebarContainer>
            {isLibraryEditing && showEditLavel && (
              <LibraryEditPanel
                isOnlyArticle={isOnlyArticle}
                onAdd={this.onAddLibrary}
              />
            )}
            {isChannelEditing && showChannelEditPanel && (
              <ChannelEditPanel onAdd={this.onAddChannel} />
            )}
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
                {currentPage.channels &&
                  currentPage.channels.map((item, key) => (
                    <PrivateRoute
                      key={key}
                      path={`/subscribe/pages/channel/${item.id}`}
                      exact
                      Component={ChattingRoomPage}
                      title={item.name}
                      channel_ID={item.id}
                      isPrivate={false}
                    />
                  ))}
                {currentPage.id && (
                  <PrivateRoute
                    path="/subscribe/pages/about"
                    exact
                    Component={AboutPage}
                    pageInfo={currentPage}
                  />
                )}
                <PrivateRoute
                  path="/subscribe/pages/create"
                  exact
                  Component={CreatePage}
                  pageInfo={currentPage}
                />
                <PrivateRoute
                  path="/subscribe/pages/post"
                  Component={PostPage}
                />
                <PrivateRoute
                  path="/subscribe/pages/edit"
                  exact
                  Component={EditPage}
                  pageInfo={currentPage}
                />
                <PrivateRoute
                  path="/subscribe/pages/setting"
                  exact
                  Component={SettingPage}
                  pageInfo={currentPage}
                />
                <PrivateRoute
                  path="/subscribe/pages/library/:moduleID"
                  exact
                  Component={SubscribeContentPage}
                  moduleID={activeItem}
                />
                <Redirect to={{ pathname: `/subscribe/pages/about` }} />
              </Switch>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </React.Fragment>
    );
  }
}

SubscribeLayout.propTypes = {
  t: PropTypes.func,
  isMobileSize: PropTypes.bool.isRequired,
  visibleSideMenu: PropTypes.bool.isRequired,
  GetSubscribedPageLoading: PropTypes.bool.isRequired,
  subscribed_pages: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  history: PropTypes.object,
  currentPage: PropTypes.object,
  activePageID: PropTypes.string,
  socket: PropTypes.object,
  myInfo: PropTypes.object,
  isUserLoading: PropTypes.bool,
  getPageLoading: PropTypes.bool,
  isAddingModule: PropTypes.bool,
  isAddingChannel: PropTypes.bool
};

function mapStateToProps(state) {
  const {
    subscribed_pages,
    GetSubscribedPageLoading,
    currentPage,
    activePageID,
    getPageLoading,
    isAddingModule,
    isAddingChannel
  } = state.page;
  const { visibleSideMenu, isMobileSize } = state.global;
  const { me, isLoading } = state.user;
  const { socket } = state.io;
  return {
    activePageID,
    GetSubscribedPageLoading,
    subscribed_pages,
    currentPage,
    socket,
    getPageLoading,
    isUserLoading: isLoading,
    myInfo: me,
    isAddingModule,
    isAddingChannel,
    visibleSideMenu,
    isMobileSize
  };
}

export default connect(mapStateToProps)(withNamespaces()(SubscribeLayout));
