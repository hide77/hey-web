import { FETCH } from "hey-mocks";
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

const AddPost = () => ({
  type: ADD_POST
});
export const addPost = (body = {}) => (dispatch, getState) => {
  dispatch(AddPost());
  return new Promise((resolve, reject) => {
    FETCH("POST /v1/givers/posts", {
      dispatch,
      json: true,
      token: getState().authentication.token,
      body: JSON.stringify(body)
    }).then(r => {
      console.log("----add Post result----", r);
      if (r.success) {
        resolve(r.result);
      } else {
        reject(r.error);
      }
    });
  });
};

export const updatePost = (postID, body = {}) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    FETCH(`PATCH /v1/givers/posts/${postID}`, {
      dispatch,
      json: true,
      token: getState().authentication.token,
      body: JSON.stringify(body)
    }).then(r => {
      console.log("----update Post result----", r);
      if (r.success) {
        resolve(r.result);
      } else {
        reject(r.error);
      }
    });
  });
};

export const deletePost = postID => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    FETCH(`DELETE /v1/givers/posts/${postID}`, {
      dispatch,
      token: getState().authentication.token
    }).then(r => {
      console.log("----delete Post result----", r);
      if (r.success) {
        resolve(r.result);
      } else {
        reject(r.error);
      }
    });
  });
};

const GetPostsRequest = () => ({
  type: GET_POSTS_REQUEST,
  isAllPostGetting: true,
  posts: []
});

const GetPostsSuccess = posts => ({
  type: GET_POSTS_SUCCESS,
  isAllPostGetting: false,
  posts
});
const GetPostsFailed = () => ({
  type: GET_POSTS_FAILED,
  isAllPostGetting: false,
  posts: []
});
export const getPostsOfPage = (
  page_id,
  date = "desc",
  limit = 50,
  after = "",
  before = ""
) => (dispatch, getState) => {
  dispatch(GetPostsRequest());
  FETCH(
    `GET /v1/givers/posts?page=${page_id}&date=${date}&limit=${limit}&after=${after}&before=${before}`,
    {
      dispatch,
      token: getState().authentication.token
    }
  ).then(r => {
    console.log("----get all Posts result----", r);
    if (r.success) {
      dispatch(GetPostsSuccess(r.result));
    } else {
      dispatch(GetPostsFailed());
    }
  });
};

export const getOnePost = postID => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    FETCH(`GET /v1/givers/posts/${postID}`, {
      dispatch,
      token: getState().authentication.token
    }).then(r => {
      console.log("----get one Posts result----", r);
      if (r.success) {
        resolve(r.result);
      } else {
        resolve(null);
      }
    });
  });
};

export const likeUnlikePost = postID => (dispatch, getState) => {
  FETCH(`POST /v1/givers/posts/${postID}/like`, {
    dispatch,
    token: getState().authentication.token
  }).then(r => {
    console.log("----like_unlike Post result----", r);
  });
};

export const getComments = postID => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    FETCH(`GET /v1/givers/posts/${postID}/comments`, {
      dispatch,
      token: getState().authentication.token
    }).then(r => {
      console.log("----get comments result----", r);
      if (r.success) {
        resolve(r.result);
      } else {
        resolve([]);
      }
    });
  });
};

export const commentToPost = (postID, body = {}) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    FETCH(`POST /v1/givers/posts/${postID}/comments`, {
      json: true,
      dispatch,
      token: getState().authentication.token,
      body: JSON.stringify(body)
    }).then(r => {
      console.log("----comment to post result----", r);
      if (r.success) {
        resolve(r.result);
      } else {
        reject(r.error);
      }
    });
  });
};

export const deleteComment = (postID, commentID) => (dispatch, getState) => {
  FETCH(`DELETE /v1/givers/posts/${postID}/comments/${commentID}`, {
    dispatch,
    token: getState().authentication.token
  }).then(r => {
    console.log("----comment to post result----", r);
  });
};

export const likeUnlikeComment = (postID, commentID) => (
  dispatch,
  getState
) => {
  FETCH(`POST /v1/givers/posts/${postID}/comments/${commentID}/like`, {
    dispatch,
    token: getState().authentication.token
  }).then(r => {
    console.log("----like_unlike comment result----", r);
  });
};
