import { GET_ME_REQUEST, GET_ME_SUCCESS, GET_ME_FAILURE } from "hey-types/user";

const defaultState = {
  isLoading: false,
  me: null,
  isAnonymous: false
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_ME_REQUEST:
      return { ...state, ...action };
    case GET_ME_SUCCESS:
      return { ...state, ...action };
    case GET_ME_FAILURE:
      return { ...state, ...action };
    default:
      return state;
  }
};
