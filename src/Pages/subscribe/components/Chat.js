import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { STYLE_CONFIG } from "hey-config";
import dayjs from "dayjs";
import { idx } from "hey-mocks";
import {
  likeUnlikeMessage,
  likeUnlikePrivateMessage,
  deleteMessage,
  deletePrivateMessage
} from "hey-actions/chat";
import AutoLinkText from "react-autolink-text2";
import {
  Text,
  FlexInline,
  HeyIcon,
  Label,
  UserPicture,
  HeyContextMenu,
  HeyContextMenuItem,
  HeyContextMenuTrigger
} from "hey-components";

const Message = styled(Text)`
  font-size: 21px;
  line-height: 38px;
  font-weight: normal;
  white-space: pre-line;
  letter-spacing: ${STYLE_CONFIG.letterSpace}px;
`;

const ChatSegment = styled.div`
  & {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: ${props => (props.right ? "20px" : "7px")};
    border-bottom-right-radius: ${props => (props.right ? "7px" : "20px")};
    background: ${props => (props.right ? "#50aff0" : "white")};
    max-width: 60%;
    width: 512px;
    margin-right: ${props => (props.right ? "16px" : "auto")};
    margin-left: ${props => (props.right ? "auto" : "16px")};
    margin-bottom: 16px;
    margin-top: 16px;
    padding: 12px;
  }

  @media only screen and (max-width: 1200px) {
    & {
      max-width: 80%;
    }
  }

  @media only screen and (max-width: 600px) {
    & {
      max-width: 96%;
    }
  }
`;

ChatSegment.defaultProps = {
  right: false
};

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ReplySection = styled.div`
  & {
    margin-bottom: 13px;
    position: relative;
    padding-left: 12px;
  }

  &:before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    height: 100%;
    width: 4px;
    background: ${props => (props.isSendMsg ? "white" : "#568af2")};
  }
`;

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = { broken_src: false };
  }
  componentDidMount() {}
  onLike = sending => {
    const { isPrivate } = this.props;
    if (sending) return;
    const { dispatch, message } = this.props;
    if (isPrivate) dispatch(likeUnlikePrivateMessage(message.id));
    else dispatch(likeUnlikeMessage(message.id));
  };
  onCopy = () => {
    this.copyBtn.click();
  };
  onReply = () => {
    const { setReplyMsg, message } = this.props;
    setReplyMsg(message);
  };
  onDelete = () => {
    const { dispatch, message, isPrivate } = this.props;
    if (isPrivate) {
      dispatch(deletePrivateMessage(message.id));
    } else {
      dispatch(deleteMessage(message.id));
    }
  };
  findAndClearLinks = _txt => {
    let _txt_array = _txt.split(" "),
      _link;
    for (var i = 0; i < _txt_array.length; i++) {
      if (_txt_array[i].toLowerCase().match(/\.(jpg|png|gif)/g)) {
        _link = _txt_array[i];
        break;
      }
    }
    return {
      txt: _txt_array.join(" "),
      link: _link
    };
  };
  brokenSrc = () => {
    this.setState({ broken_src: true });
  };
  render() {
    const { message, curUser, isMobileSize, isPrivate } = this.props;
    let find_links = this.findAndClearLinks(message.message);
    message.message = find_links.txt;
    let img_attachement = find_links.link;
    const isSendMsg = curUser.id == message.user.id;
    var now = dayjs();
    var msgTime = dayjs(message.created_at);
    var minute = now.diff(msgTime, "minute");
    var hour = parseInt(minute / 60);
    minute %= 60;
    var day = parseInt(hour / 24);
    hour %= 24;
    return (
      <React.Fragment>
        <ChatSegment right={isSendMsg}>
          <HeyContextMenuTrigger id={`chat${message.id}`}>
            {message.reply && (
              <ReplySection isSendMsg={isSendMsg}>
                <Text
                  color={isSendMsg ? "white" : "#21252B"}
                  style={{ padding: 2 }}
                  fontWeight="800"
                  fontSize="15px"
                >
                  Reply to {message.reply.user.username}
                </Text>
                <Message
                  color={isSendMsg ? "white" : "#21252B"}
                  style={{ whiteSpace: "initial" }}
                  fontWeight="normal"
                >
                  {message.reply.message}
                </Message>
              </ReplySection>
            )}
            {message.attachments && message.attachments.length > 0 && (
              <div>
                {message.attachments[0].type.startsWith("image/") && (
                  <img
                    src={message.attachments[0].url}
                    style={{ width: "100%", borderRadius: 10 }}
                  />
                )}
                {!message.attachments[0].type.startsWith("image/") && (
                  <FlexInline style={{ marginBottom: 10 }}>
                    <div>
                      <HeyIcon
                        name="attach"
                        fill={isSendMsg ? "#FFFFFF" : "#21252B"}
                      />
                    </div>
                    <ReplySection
                      isSendMsg={isSendMsg}
                      style={{ marginLeft: 10, marginBottom: 0 }}
                    >
                      <Text
                        color={isSendMsg ? "white" : "#21252B"}
                        style={{ padding: 2 }}
                        fontWeight="500"
                        fontSize="15px"
                      >
                        attachments
                      </Text>
                      <a
                        href={message.attachments[0].url}
                        download={message.attachments[0].fileName}
                      >
                        <Text
                          color={isSendMsg ? "white" : "#21252B"}
                          style={{ padding: 2 }}
                          fontWeight="bold"
                          fontSize="15px"
                        >
                          {message.attachments[0].fileName}
                        </Text>
                      </a>
                    </ReplySection>
                  </FlexInline>
                )}
              </div>
            )}
            <FlexInline top>
              {message.message && img_attachement && !this.state.broken_src && (
                <div>
                  <img
                    onError={this.brokenSrc}
                    src={img_attachement}
                    style={{ width: "100%", borderRadius: 10 }}
                  />
                </div>
              )}
              {!isSendMsg && (
                <UserPicture user={message.user} rounded size={33} />
              )}
              <div style={{ paddingLeft: 16 }}>
                {!isSendMsg && (
                  <FlexInline>
                    <Text
                      color={isSendMsg ? "white" : "#21252B"}
                      fontSize="15px"
                      fontWeight="800"
                    >
                      {message.user.username}
                    </Text>
                    {/* {label && <Label color="white">{label}</Label>} */}
                  </FlexInline>
                )}
                <Message
                  color={isSendMsg ? "white" : "#21252B"}
                  fontWeight="normal"
                >
                  <AutoLinkText
                    linkProps={{
                      target: "_blank",
                      style: {
                        color: isSendMsg ? "white" : "#68afeb",
                        textDecoration: "none",
                        fontWeight: "bold"
                      }
                    }}
                    text={message.message}
                  />
                </Message>
              </div>
            </FlexInline>
            <Footer>
              <FlexInline>
                <React.Fragment>
                  <HeyIcon
                    name={isSendMsg ? "subscrib_filled_white" : "chat_like"}
                    width={17}
                    height={13}
                    active={
                      isPrivate
                        ? isSendMsg
                          ? message.liked_by_from
                          : message.liked_by_to
                        : message.liked
                    }
                    viewBox="0 0 21 17"
                    onClick={() => this.onLike(isSendMsg)}
                  />
                  {!isPrivate && (
                    <Text
                      fontSize="15.4px"
                      fontWeight="bold"
                      color={isSendMsg ? "white" : "#E95751"}
                      style={{ paddingLeft: 6 }}
                    >
                      {message.nb_likes}
                    </Text>
                  )}
                </React.Fragment>
              </FlexInline>
              <Text fontSize="10px" color={isSendMsg ? "white" : "#969eac"}>
                {day > 0
                  ? `${day} d `
                  : hour > 0
                  ? `${hour} h `
                  : `${minute} m`}
                ago
              </Text>
            </Footer>
          </HeyContextMenuTrigger>
        </ChatSegment>
        <CopyToClipboard text={message.message} style={{ display: "none" }}>
          <button ref={e => (this.copyBtn = e)} />
        </CopyToClipboard>
        <HeyContextMenu
          id={`chat${message.id}`}
          style={{
            marginTop: isMobileSize
              ? -60 - (isPrivate ? 70 : 0)
              : -70 - (isPrivate ? 70 : 0)
          }}
        >
          <HeyContextMenuItem onClick={this.onReply}>Reply</HeyContextMenuItem>
          <HeyContextMenuItem onClick={this.onCopy}>
            Copy Text
          </HeyContextMenuItem>
          {curUser.id === message.user.id && (
            <HeyContextMenuItem
              className="red-color no-border"
              onClick={this.onDelete}
            >
              Delete
            </HeyContextMenuItem>
          )}
          {curUser.id !== message.user.id && (
            <HeyContextMenuItem className="red-color no-border">
              Report
            </HeyContextMenuItem>
          )}
        </HeyContextMenu>
      </React.Fragment>
    );
  }
}

Chat.propTypes = {
  message: PropTypes.object.isRequired,
  isPrivate: PropTypes.bool,
  curUser: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  isMobileSize: PropTypes.bool,
  setReplyMsg: PropTypes.func
};

function mapStateToProps(state) {
  const { me } = state.user;
  const { isMobileSize } = state.global;
  return {
    curUser: me,
    isMobileSize
  };
}

export default connect(mapStateToProps)(Chat);
