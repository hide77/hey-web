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

const defaultState = {
  isMessageGetting: false,
  error: null,
  messages: [],
  isPrivateChatGetting: false,
  private_chats: [],
  isPrivateMessageGetting: false,
  private_messages: [],
  activePrivateChatID: ""
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_CHANNEL_MESSAGE_FAILURE:
      return { ...state, ...action };
    case GET_CHANNEL_MESSAGE_REQUEST:
      return { ...state, ...action };
    case GET_CHANNEL_MESSAGE_SUCCESS:
      return { ...state, ...action };
    case GET_PRIVATE_MESSAGE_FAILURE:
      return { ...state, ...action };
    case GET_PRIVATE_MESSAGE_REQUEST:
      return { ...state, ...action };
    case GET_PRIVATE_MESSAGE_SUCCESS:
      return { ...state, ...action };
    case GET_PRIVATE_CHAT_FAILURE:
      return { ...state, ...action };
    case GET_PRIVATE_CHAT_REQUEST:
      return { ...state, ...action };
    case GET_PRIVATE_CHAT_SUCCESS:
      return { ...state, ...action };
    case LIKE_UNLIKE_MESSAGE_SUCCESS:
      var updated = state.messages.map(item => {
        if (item.id !== action.chatID) return item;
        return {
          ...item,
          liked: !item.liked,
          nb_likes: item.liked ? item.nb_likes - 1 : item.nb_likes + 1
        };
      });
      return { ...state, messages: updated };
    case LIKE_UNLIKE_PRIVATE_MESSAGE_SUCCESS:
      var updated_private = state.private_messages.map(item => {
        if (item.id !== action.chatID) return item;
        return {
          ...item,
          liked_by_to: !item.liked_by_to
        };
      });
      return { ...state, private_messages: updated_private };
    case APPEND_MESSAGE:
      return { ...state, messages: [action.message, ...state.messages] };
    case APPEND_PRIVATE_MESSAGE:
      return {
        ...state,
        private_messages: [action.message, ...state.private_messages]
      };
    case DELETE_MESSAGE_SUCCESS:
      var deleted = state.messages.filter(
        item => item.id !== action.deleted_messageID
      );
      return { ...state, messages: deleted };
    case DELETE_PRIVATE_MESSAGE_SUCCESS:
      var private_deleted = state.private_messages.filter(
        item => item.id !== action.deleted_messageID
      );
      return { ...state, private_messages: private_deleted };
    case UPDATE_PRIVATE_CHAT_SUCCESS:
      var updated_chats = state.private_chats.map(item => {
        if (item.user.id !== action.user_id) return item;
        return {
          ...item,
          newMessages: action.new_messages
        };
      });
      return { ...state, private_chats: updated_chats };
    case SET_ACTIVE_PRIVATE_CHAT:
      return { ...state, ...action };
    default:
      return state;
  }
};
