import { FETCH } from "hey-mocks";
import { storeData, removeData } from "hey-services";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  READ_STORAGE,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESET_ERRORS,
  SET_TOKEN_SUCCESS,
  RESET_PASSWORD_SUCCESS
} from "hey-types/authentication";
import { getAuthenticatedUser } from "./user";
import { getSubscribedPages, getOwnedPages } from "./page";

const setTokenSuccess = ({ token, refresh_token }) => ({
  type: SET_TOKEN_SUCCESS,
  token,
  refresh_token,
  isAuthenticated: true
});
export const setToken = ({ token, refresh_token }) => dispatch => {
  dispatch(setTokenSuccess(token, refresh_token));
};

const readStorage = token => ({
  type: READ_STORAGE,
  isAuthenticated: true,
  token
});

const loginRequest = () => ({
  type: LOGIN_REQUEST,
  isLoading: true,
  error: null
});

const loginSuccess = ({ token, refresh_token }) => ({
  type: LOGIN_SUCCESS,
  isLoading: false,
  isAuthenticated: true,
  token,
  refresh_token,
  error: null,
  loggedOut: false
});

const loginFailure = error => ({
  type: LOGIN_FAILURE,
  isLoading: false,
  isAuthenticated: false,
  error
});

export const loginUser = (body = {}) => (dispatch, getState) => {
  dispatch(loginRequest());
  return new Promise((resolve, reject) => {
    FETCH("POST /v1/auth/generate", {
      dispatch,
      json: true,
      body: JSON.stringify(body)
    }).then(r => {
      if (r.success) {
        try {
          storeData("token", r.result, { json: true });
          resolve();
        } catch (error) {
          reject();
        }
        dispatch(loginSuccess(r.result));
        dispatch(getAuthenticatedUser(r.result.token));
        dispatch(getSubscribedPages());
        dispatch(getOwnedPages());
      } else {
        dispatch(loginFailure(r.error));
        reject();
      }
    });
  });
};

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
  isAuthenticated: false,
  token: "",
  loggedOut: true
});

export const logoutUser = ({ _refresh = false } = {}) => (
  dispatch,
  getState
) => {
  const refresh_token = getState().authentication.refresh_token;
  if (_refresh && refresh_token) {
    // TO DO, waiting for backend
  } else {
    dispatch(logoutSuccess());
    removeData("token");
    removeData("activePageID");
    // goToAuth();
  }
};

const registerRequest = () => ({ type: REGISTER_REQUEST, isLoading: true });

const registerSuccess = () => ({
  type: REGISTER_SUCCESS,
  isLoading: false
});

const registerFailure = error => ({
  type: REGISTER_FAILURE,
  isLoading: false,
  error
});

export const registerUser = body => dispatch => {
  dispatch(registerRequest());
  return new Promise((resolve, reject) => {
    FETCH("POST /v1/users", {
      dispatch,
      json: true,
      body: JSON.stringify(body)
    }).then(r => {
      if (r.success && r.result) {
        console.log("register-result:", r);
        dispatch(registerSuccess());
        dispatch(loginUser(body)).then(() => {
          resolve();
        });
      } else {
        const errorMessage =
          (r.error.email && r.error.email.message) || r.error;
        dispatch(
          registerFailure(
            typeof errorMessage === "string"
              ? errorMessage.replace("_", " ")
              : "Unknown error"
          )
        );
        reject();
      }
    });
  });
};

const resetPasswordSuccess = forgotStatus => ({
  type: RESET_PASSWORD_SUCCESS,
  forgotStatus
});

export const resetPassword = body => dispatch => {
  FETCH("POST /v1/password/reset", {
    dispatch,
    json: true,
    body: JSON.stringify(body)
  }).then(r => {
    if (r.success) dispatch(resetPasswordSuccess(r.result));
  });
};

const resetErrorsSuccess = () => ({ type: RESET_ERRORS });

export const resetErrors = () => dispatch => {
  dispatch(resetErrorsSuccess());
};
