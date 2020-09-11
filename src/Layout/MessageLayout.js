import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { Switch, Redirect } from "react-router-dom";
import { connectToSocket } from "hey-actions/io";
import { Sidebar, Segment, Menu, Icon, Input } from "semantic-ui-react";
import { STYLE_CONFIG } from "hey-config";
import dayjs from "dayjs";
import {
  Text,
  HeyIcon,
  ChannelText,
  PrivateRoute,
  FlexInline,
  UserPicture
} from "hey-components";
import { setVisibleSideMenu } from "hey-actions/global";
import {
  getPrivateChat,
  setActivePrivateChat,
  getPrivateMessage,
  setMessagesAsRead
} from "hey-actions/chat";
import { storeData } from "hey-services";
import { idx } from "hey-mocks";
import { withNamespaces } from "react-i18next";

import { ChattingRoomPage, LoadingPage } from "hey-pages";

import { NavItem } from "hey-components/navComponents";

const SidebarContainer = styled.div`
  height: ${props =>
    props.isMobileSize
      ? `calc(100vh - 60px - 70px)`
      : `calc(100vh - 70px - 70px)`};
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
`;
const PrivateChatText = styled.p`
  & {
    margin: 0;
    font-family: Dosis;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: ${STYLE_CONFIG.letterSpace}px;
    color: #9eacc3;
  }
  &.name {
    font-size: 18px;
    letter-spacing: ${STYLE_CONFIG.letterSpace}px;
    color: #3c3c3c;
  }
`;
const PrivateChatItem = styled(NavItem)`
  .ui.menu.vertical.sidebar_grey &.item {
    background: ${props => (props.active ? "#e6f3fd" : "white")};
    width: 100%;
    height: 80px;
    margin: 0;
    padding: 10px 20px;
    border-bottom: 1px solid #c5cddc;
  }
`;
const SearchBox = styled(Input)`
  &.ui.icon.input > i.icon {
    left: 5px;
    font-size: 14px;
    color: #c5cddc;
    top: 1px;
  }
  &.ui.input {
    width: 200px;
  }
  &.ui.input > input {
    border: none;
    border-radius: 40px;
    background: #ffffff;
    padding: 8px 14px;
    font-family: Dosis;
    font-weight: 500;
    font-size: 14px;
    letter-spacing: ${STYLE_CONFIG.letterSpace}px;
    line-height: 18px;
    color: #2f2f2f;
    border: 1px solid #c5cddc;
    box-sizing: border-box;
  }
  &.ui.input > input::placeholder {
    color: #d2d9e5;
  }
`;
const NewMessageLabel = styled.div`
  & {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    align-items: center;
    background-color: #50aff0;
    display: flex;
    justify-content: center;
    font-family: Dosis;
    font-style: normal;
    font-weight: 500;
    font-size: 11.04px;
    line-height: 14px;
    text-align: center;
    letter-spacing: ${STYLE_CONFIG.letterSpace}px;
    text-transform: uppercase;
    color: #ffffff;
  }
  & p {
    width: 20px;
    line-height: unset;
  }
`;
const PrivateChatHeader = styled.div`
  height: 70px;
  background: white;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  & .input-box {
    width: 280px;
    padding: 0 20px;
  }
  & .user-box {
    padding: 0 20px;
  }
`;
class MessageLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getPrivateChat());
    dispatch(connectToSocket());
  }

  goToUrl = url => {
    const { history } = this.props;
    history.push(url);
  };
  onPrivateItem = userID => {
    const { dispatch } = this.props;
    dispatch(setActivePrivateChat(userID));
    dispatch(setMessagesAsRead(userID));
  };
  render() {
    const {
      isMobileSize,
      t,
      isPrivateChatGetting,
      private_chats,
      activePrivateChatID
    } = this.props;
    if (isPrivateChatGetting) {
      return <LoadingPage />;
    }
    const curPrivateChat = private_chats.find(
      item => item.user.id === activePrivateChatID
    );
    return (
      <React.Fragment>
        <PrivateChatHeader>
          <div className="input-box">
            <SearchBox icon iconPosition="left" onKeyDown={this.keyPress}>
              <Icon name="search" />
              <input placeholder="Search in Messages" />
            </SearchBox>
          </div>
          <div className="user-box">
            {typeof curPrivateChat !== "undefined" && (
              <FlexInline>
                <UserPicture user={curPrivateChat.user} rounded size={35} />
                <div style={{ margin: "0 8px" }}>
                  <PrivateChatText className="name">
                    {curPrivateChat.user.name}
                  </PrivateChatText>
                  <PrivateChatText>
                    {`@${curPrivateChat.user.username_lower}`}
                  </PrivateChatText>
                </div>
              </FlexInline>
            )}
          </div>
        </PrivateChatHeader>
        <Sidebar.Pushable style={{ overflow: "hidden" }}>
          <Sidebar
            as={Menu}
            animation="push"
            direction="left"
            secondary={true}
            vertical
            visible={true}
            className="sidebar_grey"
          >
            <SidebarContainer isMobileSize={isMobileSize}>
              {private_chats.map((item, i) => {
                var now = dayjs();
                var msgTime = dayjs(item.last_message_at);
                var minute = now.diff(msgTime, "minute");
                var hour = parseInt(minute / 60);
                minute %= 60;
                var day = parseInt(hour / 24);
                hour %= 24;
                return (
                  <PrivateChatItem
                    onClick={() => this.onPrivateItem(item.user.id)}
                    key={i}
                    active={activePrivateChatID === item.user.id}
                  >
                    <UserPicture user={item.user} rounded size={35} />
                    <div style={{ margin: "0 8px", width: "100%" }}>
                      <PrivateChatText className="name">
                        {item.user.name}
                      </PrivateChatText>
                      <PrivateChatText>
                        {`@${item.user.username_lower} — `}
                        {day > 0
                          ? `${day} days `
                          : hour > 0
                          ? `${hour} hours `
                          : `${minute} mimutes `}
                        ago
                      </PrivateChatText>
                    </div>
                    {item.newMessages > 0 && (
                      <NewMessageLabel>
                        <p>{item.newMessages}</p>
                      </NewMessageLabel>
                    )}
                  </PrivateChatItem>
                );
              })}
            </SidebarContainer>
          </Sidebar>
          <Sidebar.Pusher dimmed={false}>
            <Segment
              basic
              style={{
                marginLeft: 280,
                padding: 0,
                height: `calc(100vh - ${isMobileSize ? "60" : "70"}px - 70px)`
              }}
            >
              {activePrivateChatID !== "" && (
                <ChattingRoomPage isPrivate={true} />
              )}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </React.Fragment>
    );
  }
}

MessageLayout.propTypes = {
  t: PropTypes.func,
  isMobileSize: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  history: PropTypes.object,
  socket: PropTypes.object,
  myInfo: PropTypes.object,
  isUserLoading: PropTypes.bool,
  isPrivateChatGetting: PropTypes.bool,
  private_chats: PropTypes.array,
  activePrivateChatID: PropTypes.string
};

function mapStateToProps(state) {
  const { isMobileSize } = state.global;
  const {
    private_chats,
    isPrivateChatGetting,
    activePrivateChatID
  } = state.chat;
  const { me, isLoading } = state.user;
  const { socket } = state.io;
  return {
    socket,
    isUserLoading: isLoading,
    private_chats,
    isPrivateChatGetting,
    myInfo: me,
    isMobileSize,
    activePrivateChatID
  };
}

export default connect(mapStateToProps)(withNamespaces()(MessageLayout));
