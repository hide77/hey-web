import { FETCH, WRONG_TOKEN } from "hey-mocks";
import {
  GET_ME_REQUEST,
  GET_ME_SUCCESS,
  GET_ME_FAILURE,
  UPLOAD_PICTURE_REQUEST,
  UPLOAD_PICTURE_SUCCESS,
  UPLOAD_PICTURE_FAILURE
} from "hey-types/user";
import { logoutUser } from "./authentication";

const getMeRequest = () => ({
  type: GET_ME_REQUEST,
  isLoading: true
});

const getMeSuccess = result => ({
  type: GET_ME_SUCCESS,
  isLoading: false,
  isAnonymous: false,
  error: "",
  me: result
});

const getMeFailure = error => ({
  type: GET_ME_FAILURE,
  isLoading: false,
  isAnonymous: true,
  error
});

export const getAuthenticatedUser = (_token = null, _cb = () => {}) => (
  dispatch,
  getState
) => {
  const token = _token ? _token : getState().authentication.token;
  dispatch(getMeRequest());
  if (!token) {
    dispatch(getMeFailure("user is anonymous"));
    dispatch(logoutUser());
    return;
  } else {
    FETCH(`GET /v1/me`, {
      dispatch,
      token
    })
      .then(r => {
        if (r.success) {
          // console.log("Authenticated User:", r.result);
          dispatch(getMeSuccess(r.result));
        } else {
          dispatch(getMeFailure(r.error));
        }
      })
      .catch(r => {
        dispatch(logoutUser());
        dispatch(getMeFailure(r.error));
      });
  }
};

export const setCreditWithStripe = token => (dispatch, getState) => {
  const body = {
    token: token
  };
  return new Promise((resolve, reject) => {
    FETCH("POST /v1/me/billing", {
      token: getState.authentication.token,
      body: JSON.stringify(body)
    }).then(r => {
      if (r.success) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

const uploadPictureRequest = () => ({
  type: UPLOAD_PICTURE_REQUEST
});

const uploadPictureSuccess = result => ({
  type: UPLOAD_PICTURE_SUCCESS
});

const uploadPictureFailure = error => ({
  type: UPLOAD_PICTURE_FAILURE
});

export const uploadPicture = (_picture, _cb = () => {}) => (
  dispatch,
  getState
) => {
  const token = getState().authentication.token;
  dispatch(uploadPictureRequest());
  if (!token) {
    // dispatch(uploadPictureFailure("user is anonymous"));
    dispatch(logoutUser());
    return;
  } else {
    FETCH(`POST /v1/pictures/users`, {
      dispatch,
      token
    })
      .then(r => {
        if (r.success) {
          dispatch(uploadPictureSuccess(r.result));
        } else {
          dispatch(uploadPictureFailure(r.error));
        }
        _cb(r);
      })
      .catch(r => {
        dispatch(logoutUser());
        dispatch(uploadPictureFailure(r.error));
      });
  }
};
