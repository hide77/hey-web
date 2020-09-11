import {
  CONNECT_TO_SOCKET_SUCCESS,
  DISCONNECT_FROM_SOCKET_SUCCESS
} from "hey-types/io";

const defaultState = {
  isSocketConnected: false,
  socket: null
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case CONNECT_TO_SOCKET_SUCCESS:
      return { ...state, ...action };
    case DISCONNECT_FROM_SOCKET_SUCCESS:
      return { ...state, ...action };
    default:
      return state;
  }
};
