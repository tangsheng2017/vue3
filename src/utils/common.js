const pageConfig = require("./config");

export const setlocalStorage = (key, val) => {
  localStorage.setItem(pageConfig.prefix + key, val);
};

export const getlocalStorage = (key) => {
  let item = localStorage.getItem(pageConfig.prefix + key);
  return item;
};

export const removelocalStorage = (key) => {
  localStorage.removeItem(pageConfig.prefix + key);
};

export const setsessionStorage = (key, val) => {
  sessionStorage.setItem(pageConfig.prefix + key, val);
};

export const getsessionStorage = (key) => {
  let item = sessionStorage.getItem(pageConfig.prefix + key);
  return item;
};

export const removesessionStorage = (key) => {
  sessionStorage.removeItem(pageConfig.prefix + key);
};
