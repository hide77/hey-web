import io from "socket.io-client";
import dayjs from "dayjs";
import { DEFAULT_API_URL } from "hey-mocks";
import {
  CONNECT_TO_SOCKET_SUCCESS,
  DISCONNECT_FROM_SOCKET_SUCCESS
} from "hey-types/io";
import {
  appendMessage,
  deleteMessageFromSocket,
  appendPrivateMessage,
  updatePrivateChat,
  deletePrivateMessageFromSocket,
  setMessagesAsRead
} from "hey-actions/chat";

const connectToSocketSuccess = socket => ({
  type: CONNECT_TO_SOCKET_SUCCESS,
  isSocketConnected: true,
  socket
});

export const connectToSocket = () => (dispatch, getState) => {
  if (getState().io.isSocketConnected) {
    return;
  }
  const token = getState().authentication.token;
  const socket = io(DEFAULT_API_URL, {
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: `Bearer ${token}`
        }
      }
    }
  });
  socket.on("newGiverChat", param => {
    console.log("new message from server:", param);
    const msg_obj = {
      created_at: dayjs().toJSON(),
      liked: false,
      nb_likes: 0,
      ...param
    };
    dispatch(appendMessage(msg_obj));
  });
  socket.on("privateMessage", param => {
    console.log("new private message from server:", param);
    const msg_obj = {
      created_at: dayjs().toJSON(),
      liked_by_to: false,
      liked_by_from: false,
      ...param,
      reply: param.reply ? { ...param.reply, user: param.reply.from } : null
    };
    if (getState().chat.activePrivateChatID === param.user.id) {
      dispatch(setMessagesAsRead(param.user.id));
      dispatch(appendPrivateMessage(msg_obj));
    } else {
      dispatch(updatePrivateChat(param.user.id, param.newMessages));
    }
  });

  socket.on("deletedGiverChat", param => {
    console.log("deleted message from server:", param);
    dispatch(deleteMessageFromSocket(param.channel_chat));
  });

  socket.on("deletedPrivateMessage", param => {
    console.log("deleted private message from server:", param);
    dispatch(deletePrivateMessageFromSocket(param));
  });

  dispatch(connectToSocketSuccess(socket));
  console.log("socket connected successfully!");
};
const disconnectFromSocketSuccess = () => ({
  type: DISCONNECT_FROM_SOCKET_SUCCESS,
  isSocketConnected: false
});
export const disconnectFromSocket = () => (dispatch, getState) => {
  const socket = getState().io;
  socket.disconnect();
  dispatch(disconnectFromSocketSuccess());
};
