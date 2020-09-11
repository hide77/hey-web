import {
  SET_IS_MOBILE_SIZE,
  SET_VISIBLE_SIDE_MENU,
  SET_LOGIN_MODAL_VISIBLE,
  SET_LOGIN_MODAL_INVISIBLE,
  SET_REGISTER_MODAL_VISIBLE,
  SET_REGISTER_MODAL_INVISIBLE,
  SET_SPACE_SEARCHED
} from "hey-types/global";

export const setIsMobileSize = flag => ({
  type: SET_IS_MOBILE_SIZE,
  isMobileSize: flag
});

export const setVisibleSideMenu = flag => ({
  type: SET_VISIBLE_SIDE_MENU,
  visibleSideMenu: flag
});

export const setLoginModalVisible = () => ({
  type: SET_LOGIN_MODAL_VISIBLE
});

export const setLoginModalInVisible = () => ({
  type: SET_LOGIN_MODAL_INVISIBLE
});

export const setRegisterModalVisible = () => ({
  type: SET_REGISTER_MODAL_VISIBLE
});

export const setRegisterModalInVisible = () => ({
  type: SET_REGISTER_MODAL_INVISIBLE
});

export const setSpaceSearched = flag => ({
  type: SET_SPACE_SEARCHED,
  searched: flag
});
