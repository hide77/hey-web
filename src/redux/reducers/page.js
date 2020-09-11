import {
  CREATE_PAGE_REQUEST,
  CREATE_PAGE_SUCCESS,
  CREATE_PAGE_ERROR,
  UPDATE_PAGE_SUCCESS,
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
  SUBSCRIBE_TO_PAGE_REQUEST,
  SUBSCRIBE_TO_PAGE_SUCCESS,
  SUBSCRIBE_TO_PAGE_FAILED,
  UNSUBSCRIBE_TO_PAGE_SUCCESS,
  ADD_FOLDER_REQUEST,
  ADD_FILE_REQUEST,
  ADD_FILE_IN_FOLDER_REQUEST,
  ADD_FOLDER_SUCCESS,
  ADD_FILE_SUCCESS,
  ADD_FILE_IN_FOLDER_SUCCESS,
  EDIT_FILE_SUCCESS,
  DELETE_FILE_SUCCESS,
  ADD_CHANNEL_REQUEST,
  ADD_CHANNEL_SUCCESS
} from "hey-types/page";

const defaultState = {
  isPageCreating: false,
  isPageSubscribing: false,
  isPageCreated: false,
  error: null,
  isAllPageGetting: false,
  all_pages: [],
  getPageLoading: false,
  currentPage: {},
  isSearchPageGetting: false,
  search_pages: [],
  GetSubscribedPageLoading: false,
  GetOwnedPageLoading: false,
  subscribed_pages: [],
  owned_pages: [],
  isGetting: false,
  isGettingAllFiles: false,
  isAddingModule: false,
  isAddingChannel: false,
  activePageID: ""
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case CREATE_PAGE_REQUEST:
      return { ...state, ...action };
    case CREATE_PAGE_SUCCESS:
      return {
        ...state,
        ...action,
        subscribed_pages: [...state.subscribed_pages, action.newPage],
        currentPage: action.newPage,
        activePageID: action.newPage.id
      };
    case CREATE_PAGE_ERROR:
      return { ...state, ...action };
    case UPDATE_PAGE_SUCCESS:
      var updated_array = state.subscribed_pages.map(item => {
        if (item.id !== action.updatedPage.id) return item;
        return action.updatedPage;
      });
      return {
        ...state,
        subscribed_pages: updated_array,
        currentPage: action.updatedPage
      };
    case SUBSCRIBE_TO_PAGE_REQUEST:
      return { ...state, ...action };
    case SUBSCRIBE_TO_PAGE_SUCCESS:
      return {
        ...state,
        subscribed_pages: [...state.subscribed_pages, action.newPage],
        currentPage: action.newPage,
        activePageID: action.newPage.id,
        ...action
      };
    case SUBSCRIBE_TO_PAGE_FAILED:
      return { ...state, ...action };
    case UNSUBSCRIBE_TO_PAGE_SUCCESS:
      var updated_subscribe_array = state.subscribed_pages.filter(item => {
        return item.id !== action.pageID;
      });
      return {
        ...state,
        subscribed_pages: updated_subscribe_array,
        currentPage: {},
        activePageID: ""
      };
    case GET_ALL_PAGE_REQUEST:
      return { ...state, ...action };
    case GET_ALL_PAGE_SUCCESS:
      return { ...state, ...action };
    case GET_PAGE_REQUEST:
      return { ...state, ...action };
    case GET_PAGE_SUCCESS:
      return { ...state, ...action };
    case SET_CURRENT_PAGE_SUCCESS:
      return {
        ...state,
        currentPage: action.page,
        activePageID: action.page.id
      };
    case GET_SUBSCRIBED_PAGE_REQUEST:
      return { ...state, ...action };
    case GET_SUBSCRIBED_PAGE_SUCCESS:
      return { ...state, ...action };
    case GET_OWNED_PAGE_REQUEST:
      return { ...state, ...action };
    case GET_OWNED_PAGE_SUCCESS:
      return { ...state, ...action };
    case SEARCH_PAGE_REQUEST:
      return { ...state, ...action };
    case SEARCH_PAGE_SUCCESS:
      return { ...state, ...action };
    case SET_ACTIVE_PAGE_ID:
      return { ...state, ...action };
    case ADD_FILE_REQUEST:
      return { ...state, ...action };
    case ADD_FILE_SUCCESS:
      state.currentPage.modules = action.modules;
      return { ...state, ...action };
    case ADD_FOLDER_REQUEST:
      return { ...state, ...action };
    case ADD_FOLDER_SUCCESS:
      state.currentPage.modules = action.modules;
      return { ...state, ...action };
    case ADD_FILE_IN_FOLDER_REQUEST:
      return { ...state, ...action };
    case ADD_FILE_IN_FOLDER_SUCCESS:
      state.currentPage.modules = action.modules;
      return { ...state, ...action };
    case EDIT_FILE_SUCCESS:
      state.currentPage.modules = action.modules;
      return { ...state, ...action };
    case DELETE_FILE_SUCCESS:
      state.currentPage.modules = action.modules;
      return { ...state, ...action };
    case ADD_CHANNEL_REQUEST:
      return { ...state, ...action };
    case ADD_CHANNEL_SUCCESS:
      var updated_channels = [...state.currentPage.channels, action.newChannel];
      return {
        ...state,
        currentPage: { ...state.currentPage, channels: updated_channels },
        ...action
      };
    default:
      return state;
  }
};
