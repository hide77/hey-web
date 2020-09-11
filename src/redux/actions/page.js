import { FETCH } from "hey-mocks";
import {
  CREATE_PAGE_REQUEST,
  CREATE_PAGE_SUCCESS,
  CREATE_PAGE_ERROR,
  UPDATE_PAGE_SUCCESS,
  SUBSCRIBE_TO_PAGE_REQUEST,
  SUBSCRIBE_TO_PAGE_SUCCESS,
  SUBSCRIBE_TO_PAGE_FAILED,
  UNSUBSCRIBE_TO_PAGE_SUCCESS,
  GET_PAGE_REQUEST,
  GET_PAGE_SUCCESS,
  SET_CURRENT_PAGE_SUCCESS,
  GET_ALL_PAGE_REQUEST,
  GET_ALL_PAGE_SUCCESS,
  GET_SUBSCRIBED_PAGE_REQUEST,
  GET_SUBSCRIBED_PAGE_SUCCESS,
  GET_OWNED_PAGE_REQUEST,
  GET_OWNED_PAGE_SUCCESS,
  SEARCH_PAGE_REQUEST,
  SEARCH_PAGE_SUCCESS,
  SET_ACTIVE_PAGE_ID,
  // FILES
  GET_ALL_FILES_REQUEST,
  ADD_FOLDER_REQUEST,
  ADD_FILE_REQUEST,
  ADD_FILE_IN_FOLDER_REQUEST,
  GET_FILE_REQUEST,
  DELETE_FILE_REQUEST,
  EDIT_FILE_REQUEST,
  GET_ALL_FILES_SUCCESS,
  ADD_FOLDER_SUCCESS,
  ADD_FILE_SUCCESS,
  ADD_FILE_IN_FOLDER_SUCCESS,
  GET_FILE_SUCCESS,
  DELETE_FILE_SUCCESS,
  EDIT_FILE_SUCCESS,
  ADD_CHANNEL_REQUEST,
  ADD_CHANNEL_SUCCESS
} from "hey-types/page";

const CreatePageRequest = () => ({
  type: CREATE_PAGE_REQUEST,
  error: null
});
const CreatePageSuccess = r => ({
  type: CREATE_PAGE_SUCCESS,
  newPage: r
});
const CreatePageError = r => ({
  type: CREATE_PAGE_ERROR,
  error: r
});
export const createPage = (body = {}) => (dispatch, getState) => {
  dispatch(CreatePageRequest());
  return new Promise((resolve, reject) => {
    FETCH("POST /v1/givers/pages", {
      dispatch,
      json: true,
      token: getState().authentication.token,
      body: JSON.stringify(body)
    }).then(r => {
      console.log("----create Page result----", r);
      if (r.success) {
        dispatch(CreatePageSuccess(r.result));
        resolve(r.result);
      } else {
        dispatch(CreatePageError(r.error));
        reject(r.error);
      }
    });
  });
};
const UpdatePageSuccess = r => ({
  type: UPDATE_PAGE_SUCCESS,
  updatedPage: r
});
export const updatePage = (pageID, body = {}) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    FETCH(`PATCH /v1/givers/pages/${pageID}`, {
      dispatch,
      json: true,
      token: getState().authentication.token,
      body: JSON.stringify(body)
    }).then(r => {
      console.log("----update Page result----", r);
      if (r.success) {
        dispatch(UpdatePageSuccess(r.result));
        resolve(r.result);
      } else {
        reject(r.error);
      }
    });
  });
};

const SubscribeToPageRequest = r => ({
  type: SUBSCRIBE_TO_PAGE_REQUEST,
  isPageSubscribing: true,
  newPage: r
});

const SubscribeToPageSuccess = r => ({
  type: SUBSCRIBE_TO_PAGE_SUCCESS,
  isPageSubscribing: false,
  newPage: r
});
const SubscribeToPageFailed = error => ({
  type: SUBSCRIBE_TO_PAGE_FAILED,
  isPageSubscribing: false,
  error: error
});
export const subscribeToPage = pageID => (dispatch, getState) => {
  dispatch(SubscribeToPageRequest());
  return new Promise((resolve, reject) => {
    FETCH(`POST /v1/givers/pages/${pageID}/subscribe`, {
      dispatch,
      token: getState().authentication.token
    }).then(r => {
      // console.log("----subscribe to Page result----", r);
      if (r.success) {
        dispatch(SubscribeToPageSuccess(r.result));
        resolve(r.result);
      } else {
        dispatch(SubscribeToPageFailed(r.error));
        // console.log("subscribe error:", r.error);
        reject(r.error);
      }
    });
  });
};

const UnSubscribeToPageSuccess = pageID => ({
  type: UNSUBSCRIBE_TO_PAGE_SUCCESS,
  pageID
});

export const unSubscribeToPage = pageID => (dispatch, getState) => {
  dispatch(UnSubscribeToPageSuccess(pageID));
  FETCH(`POST /v1/givers/pages/${pageID}/unsubscribe`, {
    dispatch,
    token: getState().authentication.token
  }).then(r => {
    console.log("----unsubscribe to Page result----", r);
  });
};

export const addLevelToPage = (pageID, body = {}) => (dispatch, getState) => {
  console.log(body);
  return new Promise((resolve, reject) => {
    FETCH(`POST /v1/givers/pages/${pageID}/levels`, {
      dispatch,
      token: getState().authentication.token,
      json: true,
      body: JSON.stringify(body)
    }).then(r => {
      // console.log("----add level to Page result----", r);
      if (r.success) {
        resolve(r);
      } else {
        reject(r.error);
      }
    });
  });
};

const GetPageRequest = () => ({
  type: GET_PAGE_REQUEST,
  getPageLoading: true
});

const GetPageSuccess = r => ({
  type: GET_PAGE_SUCCESS,
  getPageLoading: false,
  currentPage: r
});

export const getPage = page_id => (dispatch, getState) => {
  if (getState().page.getPageLoading) {
    return;
  }
  dispatch(GetPageRequest());
  FETCH(`GET /v1/givers/pages/${page_id}`, {
    dispatch,
    token: getState().authentication.token
  }).then(r => {
    // console.log("----get a Page result----", r);
    if (r.success) {
      try {
        dispatch(GetPageSuccess(r.result));
      } catch (error) {
        dispatch(GetPageSuccess([]));
      }
    } else {
      dispatch(GetPageSuccess([]));
    }
  });
};

export const setCurrentPage = page => ({
  type: SET_CURRENT_PAGE_SUCCESS,
  page
});

const GetAllPageRequest = () => ({
  type: GET_ALL_PAGE_REQUEST,
  isAllPageGetting: true
});

const GetAllPageSuccess = r => ({
  type: GET_ALL_PAGE_SUCCESS,
  isAllPageGetting: false,
  all_pages: r
});

export const getAllPages = () => (dispatch, getState) => {
  dispatch(GetAllPageRequest());
  FETCH("GET /v1/givers/pages", {
    dispatch,
    token: getState().authentication.token
  }).then(r => {
    // console.log("----get Page result----", r);
    if (r.success) {
      try {
        dispatch(GetAllPageSuccess(r.result));
      } catch (error) {
        dispatch(GetAllPageSuccess([]));
      }
    } else {
      dispatch(GetAllPageSuccess([]));
    }
  });
};

const GetSubscribedPageRequest = () => ({
  type: GET_SUBSCRIBED_PAGE_REQUEST,
  GetSubscribedPageLoading: true
});

const GetSubscribedPageSuccess = r => ({
  type: GET_SUBSCRIBED_PAGE_SUCCESS,
  GetSubscribedPageLoading: false,
  subscribed_pages: r
});

export const getSubscribedPages = () => (dispatch, getState) => {
  if (getState().page.GetSubscribedPageLoading) {
    return;
  }
  dispatch(GetSubscribedPageRequest());
  FETCH("GET /v1/me/givers/pages", {
    dispatch,
    token: getState().authentication.token
  }).then(r => {
    // console.log("subscribed pages", r);
    if (r.success) {
      try {
        dispatch(GetSubscribedPageSuccess(r.result));
      } catch (error) {
        dispatch(GetSubscribedPageSuccess([]));
      }
    } else {
      dispatch(GetSubscribedPageSuccess([]));
    }
  });
};

const GetOwnedPageRequest = () => ({
  type: GET_OWNED_PAGE_REQUEST,
  GetOwnedPageLoading: true
});

const GetOwnedPageSuccess = r => ({
  type: GET_OWNED_PAGE_SUCCESS,
  GetOwnedPageLoading: false,
  owned_pages: r
});

export const getOwnedPages = () => (dispatch, getState) => {
  if (getState().page.GetOwnedPageLoading) {
    return;
  }
  dispatch(GetOwnedPageRequest());

  FETCH("GET /v1/me/givers/pages/owner", {
    dispatch,
    token: getState().authentication.token
  }).then(r => {
    // console.log("owned pages", r);
    if (r.success) {
      try {
        dispatch(GetOwnedPageSuccess(r.result));
      } catch (error) {
        dispatch(GetOwnedPageSuccess([]));
      }
    } else {
      dispatch(GetOwnedPageSuccess([]));
    }
  });
};

const SetActivePageID = pageID => ({
  type: SET_ACTIVE_PAGE_ID,
  activePageID: pageID
});
export const setActivePageId = pageID => dispatch => {
  dispatch(SetActivePageID(pageID));
};

const SearchPageRequest = () => ({
  type: SEARCH_PAGE_REQUEST,
  isSearchPageGetting: true
});

const SearchPageSuccess = r => ({
  type: SEARCH_PAGE_SUCCESS,
  isSearchPageGetting: false,
  search_pages: r
});

export const searchPage = (keyWord = "", deep = true, limit = 50, skip = 0) => (
  dispatch,
  getState
) => {
  const token = getState().authentication.token;
  let req = {
    dispatch
  };
  if (token) {
    req.token = token;
  }
  dispatch(SearchPageRequest());
  FETCH(
    `GET /v1/givers/pages?search=${keyWord}&deep=${deep}&limit=${limit}&skip=${skip}`,
    req
  ).then(r => {
    // console.log("searched:", r);
    if (r.success) {
      try {
        dispatch(SearchPageSuccess(r.result));
      } catch (error) {
        dispatch(SearchPageSuccess([]));
      }
    } else {
      dispatch(SearchPageSuccess([]));
    }
  });
};

// ███████╗██╗██╗     ███████╗███████╗
// ██╔════╝██║██║     ██╔════╝██╔════╝
// █████╗  ██║██║     █████╗  ███████╗
// ██╔══╝  ██║██║     ██╔══╝  ╚════██║
// ██║     ██║███████╗███████╗███████║
// ╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝
const GetAllFilesRequest = () => ({
  type: GET_ALL_FILES_REQUEST,
  isGettingAllFiles: true
});

const GetAllFilesSuccess = r => ({
  type: GET_ALL_FILES_SUCCESS,
  isGettingAllFiles: false,
  allFiles: r
});

export const GetAllFiles = ({ page_id }) => (dispatch, getState) => {
  if (getState().chat.GetSubscribedPageLoaded) {
    return;
  }
  dispatch(GetAllFilesRequest());

  FETCH(`GET /v1/me/givers/pages/${page_id}/modules`, {
    dispatch,
    token: getState().authentication.token
  }).then(r => {
    if (r.success) {
      try {
        dispatch(GetAllFilesSuccess(r.result));
      } catch (error) {
        dispatch(GetAllFilesSuccess([]));
      }
    } else {
      dispatch(GetAllFilesSuccess([]));
    }
  });
};
const AddFolderRequest = () => ({
  type: ADD_FOLDER_REQUEST,
  isAddingModule: true
});
const AddFolderSuccess = r => ({
  type: ADD_FOLDER_SUCCESS,
  isAddingModule: false,
  modules: r
});

export const addFolder = (page_id, body = {}) => (dispatch, getState) => {
  dispatch(AddFolderRequest());
  FETCH(`POST /v1/givers/pages/${page_id}/modules`, {
    dispatch,
    token: getState().authentication.token,
    json: true,
    body: JSON.stringify(body)
  }).then(r => {
    // console.log("add folder result:", r);
    if (r.success) {
      dispatch(AddFolderSuccess(r.result));
    } else {
      dispatch(AddFolderSuccess(null));
    }
  });
};

const AddFileRequest = () => ({
  type: ADD_FILE_REQUEST,
  isAddingModule: true
});
const AddFileSuccess = r => ({
  type: ADD_FILE_SUCCESS,
  isAddingModule: false,
  modules: r
});

export const addFile = (page_id, body = {}) => (dispatch, getState) => {
  dispatch(AddFileRequest());
  FETCH(`POST /v1/givers/pages/${page_id}/modules`, {
    dispatch,
    token: getState().authentication.token,
    json: true,
    body: JSON.stringify(body)
  }).then(r => {
    // console.log("add file result:", r);
    if (r.success) {
      dispatch(AddFileSuccess(r.result));
    } else {
      dispatch(AddFileSuccess(null));
    }
  });
};

const AddFileInFolderRequest = () => ({
  type: ADD_FILE_IN_FOLDER_REQUEST,
  isAddingModule: true
});
const AddFileInFolderSuccess = r => ({
  type: ADD_FILE_IN_FOLDER_SUCCESS,
  isAddingModule: false,
  modules: r
});

export const addFileInFolder = (module_id, body = {}) => (
  dispatch,
  getState
) => {
  dispatch(AddFileInFolderRequest());
  FETCH(`POST /v1/givers/modules/${module_id}/modules`, {
    dispatch,
    token: getState().authentication.token,
    json: true,
    body: JSON.stringify(body)
  }).then(r => {
    // console.log("add file in folder result:", r);
    if (r.success) {
      dispatch(AddFileInFolderSuccess(r.result));
    } else {
      dispatch(AddFileInFolderSuccess(null));
    }
  });
};

const EditFileSuccess = r => ({
  type: EDIT_FILE_SUCCESS,
  modules: r
});

export const editFile = (module_id, body = {}) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    FETCH(`PATCH /v1/givers/modules/${module_id}`, {
      dispatch,
      token: getState().authentication.token,
      json: true,
      body: JSON.stringify(body)
    }).then(r => {
      // console.log("edit file result:", r);
      if (r.success) {
        dispatch(EditFileSuccess(r.result));
        resolve();
      } else {
        reject(r.error);
      }
    });
  });
};

const DeleteFileSuccess = r => ({
  type: DELETE_FILE_SUCCESS,
  modules: r
});

export const deleteFile = module_id => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    FETCH(`DELETE /v1/givers/modules/${module_id}`, {
      dispatch,
      token: getState().authentication.token
    }).then(r => {
      // console.log("delete file result:", r);
      if (r.success) {
        dispatch(DeleteFileSuccess(r.result));
        resolve();
      } else {
        reject(r.error);
      }
    });
  });
};

///////// Channel /////////////////

const AddChannelRequest = () => ({
  type: ADD_CHANNEL_REQUEST,
  isAddingChannel: true
});
const AddChannelSuccess = r => ({
  type: ADD_CHANNEL_SUCCESS,
  isAddingChannel: false,
  newChannel: r
});

export const addChannel = (page_id, body = {}) => (dispatch, getState) => {
  dispatch(AddChannelRequest());
  FETCH(`POST /v1/givers/pages/${page_id}/channels`, {
    dispatch,
    token: getState().authentication.token,
    json: true,
    body: JSON.stringify(body)
  }).then(r => {
    console.log("add channel result:", r);
    if (r.success) {
      dispatch(AddChannelSuccess(r.result));
    } else {
      dispatch(AddChannelSuccess(null));
    }
  });
};
