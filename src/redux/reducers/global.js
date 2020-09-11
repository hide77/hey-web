import {
  SET_IS_MOBILE_SIZE,
  SET_VISIBLE_SIDE_MENU,
  SET_LOGIN_MODAL_VISIBLE,
  SET_LOGIN_MODAL_INVISIBLE,
  SET_REGISTER_MODAL_VISIBLE,
  SET_REGISTER_MODAL_INVISIBLE,
  SET_SPACE_SEARCHED
} from "hey-types/global";

const defaultState = {
  isMobileSize: false,
  visibleSideMenu: false,
  loginVisible: false,
  registerVisible: false,
  space_searched: false
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_IS_MOBILE_SIZE:
      return { ...state, ...action };
    case SET_VISIBLE_SIDE_MENU:
      return { ...state, ...action };
    case SET_LOGIN_MODAL_VISIBLE:
      return { ...state, loginVisible: true, registerVisible: false };
    case SET_LOGIN_MODAL_INVISIBLE:
      return { ...state, loginVisible: false };
    case SET_REGISTER_MODAL_VISIBLE:
      return { ...state, registerVisible: true, loginVisible: false };
    case SET_REGISTER_MODAL_INVISIBLE:
      return { ...state, registerVisible: false };
    case SET_SPACE_SEARCHED:
      return { ...state, space_searched: action.searched };
    default:
      return state;
  }
};
