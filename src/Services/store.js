import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "hey-reducers";
import { getData } from "hey-services";

let DevTools;
if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line global-require
  DevTools = require("./DevTools").default;
}

const configureStore = (initialState = {}) => {
  // Middleware and store enhancers
  const enhancers = [applyMiddleware(thunk)];

  if (process.env.NODE_ENV === "development") {
    // Enable DevTools only when rendering on client and during development.
    enhancers.push(
      typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : DevTools.instrument()
    );
  }
  const token = getData("token", { json: true });
  const activePageID = getData("activePageID");
  // dispatch(getAuthenticatedUser());
  const authentication = {
    isAuthenticated: token !== null,
    isLoading: false,
    token: token ? token.token : "",
    refresh_token: token ? token.refresh_token : ""
  };
  const init_page = {
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
    activePageID: activePageID === null ? "" : activePageID
  };
  const store = createStore(
    rootReducer,
    {
      ...initialState,
      authentication: { ...authentication },
      page: { ...init_page }
    },
    compose(...enhancers)
  );

  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./reducers", () => {
      // eslint-disable-next-line global-require
      const nextReducer = require("./reducers").default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};

const store = configureStore();
export default store;
