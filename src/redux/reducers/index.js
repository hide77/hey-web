import { combineReducers } from "redux";
import authentication from "hey-reducers/authentication";
import page from "hey-reducers/page";
import post from "hey-reducers/post";
import global from "hey-reducers/global";
import chat from "hey-reducers/chat";
import user from "hey-reducers/user";
import io from "hey-reducers/io";

const appReducer = combineReducers({
  authentication,
  page,
  post,
  global,
  chat,
  io,
  user
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_SUCCESS") {
    state.user = undefined;
    state.io = undefined;
    state.chat = undefined;
    state.post = undefined;
    state.page = { ...state.page, owned_pages: [], subscribed_pages: [] };
  }
  return appReducer(state, action);
};

export default rootReducer;
