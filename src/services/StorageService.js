const Store = window.require('electron-store');
const store = new Store();

export const setData = (key, value) => {
  return store.set(key, value);
}

export const getData = (key, defaultValue) => {
  if (store.has(key)) {
    return store.get(key);
  } else {
    return defaultValue;
  }
}
