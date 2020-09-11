import {
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  LIKE_UNLIKE_POST,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILED,
  GET_ONE_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  LIKE_UNLIKE_COMMENT,
  GET_COMMENTS_OF_POST
} from "hey-types/post";

const defaultState = {
  isAllPostGetting: false,
  posts: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_POST:
      return { ...state, ...action };
    case GET_POSTS_REQUEST:
      return { ...state, ...action };
    case GET_POSTS_SUCCESS:
      return { ...state, ...action };
    case GET_POSTS_FAILED:
      return { ...state, ...action };
    default:
      return state;
  }
};
