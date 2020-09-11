import {
  DEFAULT_API_URL as _DEFAULT_API_URL,
  STORAGE_KEY as _STORAGE_KEY,
  STRIPE_PUBLIC_KEY as _STRIPE_PUBLIC_KEY
} from "hey-config";
export const DEFAULT_API_URL = _DEFAULT_API_URL;
export const STORAGE_KEY = _STORAGE_KEY;
export const STRIPE_PUBLIC_KEY = _STRIPE_PUBLIC_KEY;

export const WRONG_TOKEN = "wrong_token";
import { logoutUser } from "hey-actions/authentication";

function getQueryString(p) {
  const e = encodeURIComponent;
  return p
    ? `?${Object.keys(p)
        .map(k => `${e(k)}=${e(p[k])}`)
        .join("&")}`
    : "";
}

export const FETCH = (
  _path,
  {
    stringify,
    token,
    path = "",
    headers = {},
    params,
    body,
    method = "GET",
    json = false,
    dispatch = () => {}
  } = {}
) => {
  const req = {
    method,
    headers
  };
  let __path = path || _path;
  if (__path.indexOf(" ") > -1) {
    __path = __path.split(" ");
    req.method = __path[0];
    __path = __path[1];
  }
  if (token) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }
  if (json) {
    req.headers["Content-Type"] = "application/json";
    req.headers["Accept"] = "application/json";
  }
  if (body) {
    req.body = stringify ? JSON.stringify(body) : body;
  }
  return new Promise(resolve => {
    fetch(`${DEFAULT_API_URL}${__path}${getQueryString(params)}`, req)
      .then(r => {
        return r.json();
      })
      .then(r => {
        if (r.error === WRONG_TOKEN) {
          dispatch(logoutUser());
        }
        resolve(r);
      })
      .catch(r => {
        resolve(r);
      });
  });
};

export const idx = (p, o, d = null) => {
  return p.reduce((xs, x) => (xs && xs[x] ? xs[x] : d), o);
};

export const stateDelete = (a, k, v) => {
  return k ? a.filter(i => i[k] !== v) : a.filter(i => i !== v);
};

export const stateUpdate = (a, k, v) => {
  return a.map(i => {
    return i[k] === v[k] ? v : i;
  });
};

export const isKeyinArray = (k, v, a) => {
  return a.some(function(e) {
    return e[k] === v;
  });
};
