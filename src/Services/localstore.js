export const storeData = (_key, _value, _options = {}) => {
  try {
    localStorage.setItem(_key, _options.json ? JSON.stringify(_value) : _value);
  } catch (e) {
    // saving error
    console.log("STORAGE_ERROR", e);
  }
};

export const getData = (_key, _options = {}) => {
  try {
    const value = localStorage.getItem(_key);
    if (value) {
      return _options.json ? JSON.parse(value) : value;
    } else return null;
  } catch (e) {
    // error reading value
    console.log("STORAGE_ERROR", e);
  }
};

export const removeData = (_key, _cb = () => {}) => {
  try {
    localStorage.removeItem(_key);
    _cb();
  } catch (e) {
    // error reading value
    console.log("REMOVE_ERROR", e);
  }
};
