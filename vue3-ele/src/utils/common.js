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

//深拷贝
export const deepCopy = (obj) => {
  let newObj = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === "object") {
    for (let key in obj) {
      if (obj.hasOwnProperty.call(obj, key)) {
        newObj[key] =
          obj && typeof obj[key] === "object" ? deepCopy(obj[key]) : obj[key];
      }
    }
  }
  return newObj;
};

export const getUrlParam = (name) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg);  //匹配目标参数
  if (r != null) return decodeURIComponent(r[2]); return null; //返回参数值
};