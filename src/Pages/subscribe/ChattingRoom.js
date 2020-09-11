import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import styled from "styled-components";
import { Segment } from "semantic-ui-react";

import dayjs from "dayjs";
import { Chat } from "./components";
import * as FileUpload from "hey-services/FileUpload";
import {
  getChannelMessage,
  getPrivateMessage,
  appendMessage,
  appendPrivateMessage
} from "hey-actions/chat";

import {
  ChannelText,
  TouchableOpacity,
  InputBox,
  HeyIcon,
  UserPicture,
  Text,
  FlexInline,
  RoundImage
} from "hey-components";
import { LoadingPage } from "hey-pages";

const ChattingPageContainer = styled(Segment)`
  &.ui.segment {
    padding: 0;
    background-color: #f6f6f6;
    height: 100%;
  }
`;

const ChatContainer = styled.div`
  & {
    height: ${props => `calc(100% - ${props.minusHeight}px)`};
    overflow: auto;
    margin: 0;
  }
`;

const Channel = styled.div`
  & {
    box-shadow: unset !important;
    border-bottom: solid 3px #e5e5e5;
    background: white;
    padding: 0 64px;
    align-items: center;
    display: flex;
    height: 90px;
  }
`;
const MessageInputContainer = styled.div`
  & {
    width: 100%;
    padding: 0px 40px 0 20px;
    background-color: white;
    border-top: 2px solid #e5e5e5;
    display: flex;
    align-items: center;
    height: 70px;
  }
`;
const MessageInput = styled(InputBox)`
  & {
    border: none;
    width: 100%;
    margin: 0;
  }
  &:focus {
    border: none;
  }
  &::placeholder {
    text-transform: unset;
  }
`;
const AttachButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;
const ReplyContainer = styled.div`
  width: 100%;
  padding: 0px 40px 0 20px;
  background-color: white;
  border-top: 2px solid #e5e5e5;
  display: flex;
  align-items: center;
  height: 70px;
`;

class ChattingRoomPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_msg: "",
      isFileAttached: false,
      filePath: "",
      fileName: "",
      fileType: "",
      curReplyMsg: null,
      isReplyShow: false
    };
    this.chat_container = React.createRef();
  }
  scrollToBottom() {
    var ele = this.chat_container.current;
    ele.scrollTop = ele.scrollHeight;
    console.log("scroll bottom");
  }
  componentDidUpdate(prevProps) {
    const { user_ID, dispatch } = this.props;
    if (prevProps.user_ID !== user_ID) {
      dispatch(getPrivateMessage(user_ID)).then(() => {
        this.scrollToBottom();
      });
    }
  }
  componentDidMount() {
    const { isPrivate, channel_ID, user_ID, dispatch, socket } = this.props;
    this.fileSelector = FileUpload.buildFileSelector(e => {
      console.log("file upload", e.target.files[0]);
      this.setState({
        fileName: e.target.files[0].name,
        fileType: e.target.files[0].type
      });
      FileUpload.post({
        token: this.props.token,
        file: e.target.files[0],
        cb: filePath => {
          console.log("file uploaded: ", filePath);
          this.setState({
            filePath:
              filePath.indexOf("http") === 0 ? filePath : `https://${filePath}`,
            isFileAttached: true
          });
        }
      });
    });
    if (isPrivate) {
      dispatch(getPrivateMessage(user_ID)).then(() => {
        this.scrollToBottom();
      });
    } else {
      socket.emit("joinGiverChannel", { channel: channel_ID });
      dispatch(getChannelMessage(channel_ID)).then(() => {
        this.scrollToBottom();
      });
    }
  }

  onSend = () => {
    const {
      cur_msg,
      curReplyMsg,
      isReplyShow,
      filePath,
      isFileAttached,
      fileName,
      fileType
    } = this.state;
    if (!isFileAttached && cur_msg === "") {
      return;
    }
    const {
      isPrivate,
      user_ID,
      socket,
      channel_ID,
      dispatch,
      curUser
    } = this.props;

    var params;
    if (isPrivate) {
      params = {
        user: user_ID,
        message: cur_msg,
        reply: isReplyShow ? curReplyMsg.id : "",
        attachments: isFileAttached
          ? [{ type: fileType, url: filePath, fileName: fileName }]
          : []
      };
    } else {
      params = {
        channel: channel_ID,
        message: cur_msg,
        reply: isReplyShow ? curReplyMsg.id : "",
        attachments: isFileAttached
          ? [{ type: fileType, url: filePath, fileName: fileName }]
          : []
      };
    }
    socket.emit(isPrivate ? "privateMessage" : "giverChat", params, data => {
      console.log("message-sent:", data);
      if (isPrivate) {
        const msg_obj = {
          created_at: dayjs().toJSON(),
          liked: false,
          message: cur_msg,
          nb_likes: 0,
          user: curUser,
          reply: isReplyShow ? curReplyMsg : null,
          attachments: data.attachments,
          id: data._id
        };
        dispatch(appendPrivateMessage(msg_obj)).then(() => {
          this.scrollToBottom();
        });
      } else {
        const msg_obj = {
          created_at: dayjs().toJSON(),
          liked: false,
          message: cur_msg,
          nb_likes: 0,
          user: curUser,
          reply: isReplyShow ? curReplyMsg : null,
          attachments: data.attachments,
          id: data._id
        };
        dispatch(appendMessage(msg_obj)).then(() => {
          this.scrollToBottom();
        });
      }
    });

    this.setState({
      cur_msg: "",
      isReplyShow: false,
      isFileAttached: false,
      fileName: "",
      filePath: ""
    });
  };
  onChangeInput = e => {
    this.setState({
      cur_msg: e.target.value
    });
  };
  keyPress = e => {
    if (e.keyCode == 13) {
      e.preventDefault();
      this.onSend();
    }
  };
  setCurReplyMsg = msg_obj => {
    this.setState({ curReplyMsg: msg_obj, isReplyShow: true });
  };
  onFileAttach = () => {
    this.fileSelector.click();
  };
  render() {
    var {
      isPrivate,
      title,
      messages,
      private_messages,
      isMessageGetting,
      isPrivateMessageGetting
    } = this.props;
    const {
      isFileAttached,
      isReplyShow,
      curReplyMsg,
      cur_msg,
      filePath,
      fileName,
      fileType
    } = this.state;
    const chat_height =
      (isFileAttached ? 70 : 0) +
      (isReplyShow ? 70 : 0) +
      70 +
      (isPrivate ? 0 : 90);
    return (
      <ChattingPageContainer>
        {(isMessageGetting || isPrivateMessageGetting) && <LoadingPage />}
        {!isPrivate && (
          <Channel>
            <ChannelText uppercase fontSize="28px">
              {title}
            </ChannelText>
          </Channel>
        )}
        <ChatContainer
          basic
          ref={this.chat_container}
          minusHeight={chat_height}
        >
          {!isPrivate &&
            !isMessageGetting &&
            [...messages]
              .reverse()
              .map((item, index) => (
                <Chat
                  key={index}
                  message={item}
                  setReplyMsg={this.setCurReplyMsg}
                  isPrivate={false}
                />
              ))}
          {isPrivate &&
            !isPrivateMessageGetting &&
            [...private_messages]
              .reverse()
              .map((item, index) => (
                <Chat
                  key={index}
                  message={item}
                  setReplyMsg={this.setCurReplyMsg}
                  isPrivate={true}
                />
              ))}
        </ChatContainer>
        {isReplyShow && (
          <ReplyContainer>
            <UserPicture user={curReplyMsg.user} rounded size={50} />
            <div style={{ marginLeft: 10 }}>
              <FlexInline>
                <Text
                  color="#21252B"
                  fontSize="15px"
                  fontWeight="800"
                  style={{ marginRight: 5 }}
                >
                  Reply to
                </Text>
                <Text fontSize="15px" fontWeight="800" active>
                  {curReplyMsg.user.name}
                </Text>
              </FlexInline>
              <Text color="#ADAFB1" fontSize="18px" fontWeight="500">
                {curReplyMsg.message}
              </Text>
            </div>
          </ReplyContainer>
        )}
        {isFileAttached && (
          <ReplyContainer>
            {!fileType.startsWith("image/") && (
              <RoundImage size={50} style={{ borderRadius: 4 }} />
            )}
            {fileType.startsWith("image/") && (
              <RoundImage
                src={filePath}
                size={50}
                style={{ borderRadius: 4 }}
              />
            )}
            <div style={{ marginLeft: 10 }}>
              <Text color="#AFAFAF" fontSize="15px" fontWeight="500">
                attached:
              </Text>
              <Text active fontSize="18px" fontWeight="bold">
                {fileName}
              </Text>
            </div>
          </ReplyContainer>
        )}
        <MessageInputContainer>
          <AttachButton onClick={this.onFileAttach}>
            <HeyIcon name="attach" active={isFileAttached} />
          </AttachButton>
          <MessageInput
            placeholder="Write a message"
            value={cur_msg}
            onKeyDown={this.keyPress}
            onChange={this.onChangeInput}
          />
          <TouchableOpacity
            customStyle={"focus"}
            style={{
              paddingLeft: "25px",
              paddingRight: "25px",
              margin: 0,
              marginLeft: "auto"
            }}
            onClick={this.onSend}
          >
            Send
          </TouchableOpacity>
        </MessageInputContainer>
      </ChattingPageContainer>
    );
  }
}

ChattingRoomPage.propTypes = {
  title: PropTypes.string,
  channel_ID: PropTypes.string,
  user_ID: PropTypes.string,
  isPrivate: PropTypes.bool,
  isMessageGetting: PropTypes.bool,
  isPrivateMessageGetting: PropTypes.bool,
  messages: PropTypes.array,
  private_messages: PropTypes.array,
  error: PropTypes.string,
  dispatch: PropTypes.func,
  socket: PropTypes.object,
  curUser: PropTypes.object,
  token: PropTypes.string
};
function mapStateToProps(state) {
  const {
    messages,
    isMessageGetting,
    private_messages,
    isPrivateMessageGetting,
    error,
    activePrivateChatID
  } = state.chat;
  const { me } = state.user;
  const { socket } = state.io;
  const { token } = state.authentication;
  return {
    isMessageGetting,
    isPrivateMessageGetting,
    messages,
    private_messages,
    error,
    socket,
    curUser: me,
    token,
    user_ID: activePrivateChatID
  };
}

export default connect(mapStateToProps)(ChattingRoomPage);
