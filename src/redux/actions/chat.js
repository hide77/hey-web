import { FETCH } from "hey-mocks";
import {
  GET_CHANNEL_MESSAGE_REQUEST,
  GET_CHANNEL_MESSAGE_SUCCESS,
  GET_CHANNEL_MESSAGE_FAILURE,
  GET_PRIVATE_CHAT_REQUEST,
  GET_PRIVATE_CHAT_SUCCESS,
  GET_PRIVATE_CHAT_FAILURE,
  GET_PRIVATE_MESSAGE_REQUEST,
  GET_PRIVATE_MESSAGE_SUCCESS,
  GET_PRIVATE_MESSAGE_FAILURE,
  LIKE_UNLIKE_MESSAGE_SUCCESS,
  LIKE_UNLIKE_PRIVATE_MESSAGE_SUCCESS,
  APPEND_MESSAGE,
  APPEND_PRIVATE_MESSAGE,
  DELETE_MESSAGE_SUCCESS,
  DELETE_PRIVATE_MESSAGE_SUCCESS,
  UPDATE_PRIVATE_CHAT_SUCCESS,
  SET_ACTIVE_PRIVATE_CHAT
} from "hey-types/chat";

const GetChannelMessageRequest = () => ({
  type: GET_CHANNEL_MESSAGE_REQUEST,
  isMessageGetting: true,
  error: null
});

const GetChannelMessageSuccess = r => ({
  type: GET_CHANNEL_MESSAGE_SUCCESS,
  isMessageGetting: false,
  messages: r,
  error: null
});

const GetChannelMessageFailure = error => ({
  type: GET_CHANNEL_MESSAGE_FAILURE,
  isMessageGetting: false,
  error: error
});

export const getChannelMessage = channel_id => (dispatch, getState) => {
  dispatch(GetChannelMessageRequest());
  return new Promise(resolve => {
    FETCH(`GET /v1/givers/channels/${channel_id}/chats`, {
      token: getState().authentication.token
    }).then(r => {
      if (r.success) {
        console.log("get channel message result:", r.result);
        try {
          dispatch(GetChannelMessageSuccess(r.result));
          resolve();
        } catch (error) {
          dispatch(GetChannelMessageFailure(error));
          resolve();
        }
      } else {
        dispatch(GetChannelMessageFailure(r.error));
        resolve();
      }
    });
  });
};

const GetPrivateChatRequest = () => ({
  type: GET_PRIVATE_CHAT_REQUEST,
  isPrivateChatGetting: true,
  error: null
});

const GetPrivateChatSuccess = r => ({
  type: GET_PRIVATE_CHAT_SUCCESS,
  isPrivateChatGetting: false,
  private_chats: r,
  error: null
});

const GetPrivateChatFailure = error => ({
  type: GET_PRIVATE_CHAT_FAILURE,
  isPrivateChatGetting: false,
  error: error
});

export const getPrivateChat = () => (dispatch, getState) => {
  dispatch(GetPrivateChatRequest());
  return new Promise(resolve => {
    FETCH(`GET /v1/chats/private`, {
      token: getState().authentication.token
    }).then(r => {
      if (r.success) {
        console.log("get private chat result:", r.result);
        try {
          dispatch(GetPrivateChatSuccess(r.result));
          resolve();
        } catch (error) {
          dispatch(GetPrivateChatFailure(error));
          resolve();
        }
      } else {
        dispatch(GetPrivateChatFailure(r.error));
        resolve();
      }
    });
  });
};

const GetPrivateMessageRequest = () => ({
  type: GET_PRIVATE_MESSAGE_REQUEST,
  isPrivateMessageGetting: true,
  error: null
});

const GetPrivateMessageSuccess = r => ({
  type: GET_PRIVATE_MESSAGE_SUCCESS,
  isPrivateMessageGetting: false,
  private_messages: r,
  error: null
});

const GetPrivateMessageFailure = error => ({
  type: GET_PRIVATE_MESSAGE_FAILURE,
  isPrivateMessageGetting: false,
  error: error
});

export const getPrivateMessage = user_id => (dispatch, getState) => {
  dispatch(GetPrivateMessageRequest());
  return new Promise(resolve => {
    FETCH(`GET /v1/users/${user_id}/messages`, {
      token: getState().authentication.token,
      params: {}
    }).then(r => {
      console.log("get private message result:", r);
      if (r.success) {
        dispatch(GetPrivateMessageSuccess(r.result));
        resolve();
      } else {
        console.log("get private message error:", r.error);
        dispatch(GetPrivateMessageFailure(r.error));
        resolve();
      }
    });
  });
};

const AppendMessageSuccess = message => ({
  type: APPEND_MESSAGE,
  message
});
export const appendMessage = message => dispatch => {
  dispatch(AppendMessageSuccess(message));
  return Promise.resolve();
};

const AppendPrivateMessageSuccess = message => ({
  type: APPEND_PRIVATE_MESSAGE,
  message
});
export const appendPrivateMessage = message => dispatch => {
  dispatch(AppendPrivateMessageSuccess(message));
  return Promise.resolve();
};

const LikeUnlikeMessageSuccess = chatID => ({
  type: LIKE_UNLIKE_MESSAGE_SUCCESS,
  chatID
});
export const likeUnlikeMessage = chatID => (dispatch, getState) => {
  dispatch(LikeUnlikeMessageSuccess(chatID));
  FETCH(`POST /v1/givers/channels/chats/${chatID}/like`, {
    token: getState().authentication.token
  }).then(r => {
    if (r.success) {
      console.log("like or Unlike Chat result:", r.result);
    } else {
      console.log("like or Unlike Chat error:", r.error);
    }
  });
};

const LikeUnlikePrivateMessageSuccess = chatID => ({
  type: LIKE_UNLIKE_PRIVATE_MESSAGE_SUCCESS,
  chatID
});
export const likeUnlikePrivateMessage = chatID => (dispatch, getState) => {
  dispatch(LikeUnlikePrivateMessageSuccess(chatID));
  FETCH(`POST /v1/chats/private/${chatID}/like`, {
    token: getState().authentication.token
  }).then(r => {
    if (r.success) {
      console.log("like or Unlike private Chat result:", r.result);
    } else {
      console.log("like or Unlike private Chat error:", r.error);
    }
  });
};

const DeleteMessageSuccess = chatID => ({
  type: DELETE_MESSAGE_SUCCESS,
  deleted_messageID: chatID
});

export const deleteMessage = chatID => (dispatch, getState) => {
  FETCH(`DELETE /v1/givers/channels/chats/${chatID}`, {
    token: getState().authentication.token
  }).then(r => {
    console.log("delete message result:", r);
    if (r.success) {
      dispatch(DeleteMessageSuccess(chatID));
    } else {
      console.log("delete message error:", r.error);
    }
  });
};

export const deleteMessageFromSocket = chatID => dispatch => {
  dispatch(DeleteMessageSuccess(chatID));
};

const DeletePrivateMessageSuccess = chatID => ({
  type: DELETE_PRIVATE_MESSAGE_SUCCESS,
  deleted_messageID: chatID
});

export const deletePrivateMessage = chatID => (dispatch, getState) => {
  FETCH(`DELETE /v1/chats/private/${chatID}`, {
    token: getState().authentication.token
  }).then(r => {
    console.log("delete private message result:", r);
    if (r.success) {
      dispatch(DeletePrivateMessageSuccess(chatID));
    } else {
      console.log("delete private message error:", r.error);
    }
  });
};

export const deletePrivateMessageFromSocket = param => (dispatch, getState) => {
  if (param.user !== getState().chat.activePrivateChatID) return;
  dispatch(DeletePrivateMessageSuccess(param.message));
};

const UpdatePrivateChatSuccess = (user_id, new_messages) => ({
  type: UPDATE_PRIVATE_CHAT_SUCCESS,
  user_id,
  new_messages
});

export const updatePrivateChat = (user_id, new_messages) => (
  dispatch,
  getState
) => {
  if (getState().chat.activePrivateChatID === user_id) return;
  dispatch(UpdatePrivateChatSuccess(user_id, new_messages));
};

export const setMessagesAsRead = user_id => (dispatch, getState) => {
  FETCH(`POST /v1/users/${user_id}/read`, {
    token: getState().authentication.token
  }).then(r => {
    console.log("set message as read result:", r);
    if (r.success) {
      dispatch(UpdatePrivateChatSuccess(user_id, 0));
    } else {
      console.log("set message as read error:", r.error);
    }
  });
};

export const createPrivateChat = userID => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    FETCH(`POST /v1/users/${userID}/private`, {
      token: getState().authentication.token
    }).then(r => {
      console.log("create private chat result:", r);
      if (r.success) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

const SetActivePrivateChat = userID => ({
  type: SET_ACTIVE_PRIVATE_CHAT,
  activePrivateChatID: userID
});
export const setActivePrivateChat = userID => dispatch => {
  dispatch(SetActivePrivateChat(userID));
};
