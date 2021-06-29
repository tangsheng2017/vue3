import axios from "axios";
// const pageConfig = require("@/utils/config.js");
import { Decrypt, Encrypt } from "./crypto-js/crypto-js";
import md5 from "js-md5";

axios.defaults.timeout = 50000;
axios.defaults.baseURL = "/api";
axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
// axios.defaults.baseURL = baseUrl;

// 对象排序
function objKeySort(arys) {
  //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  var newkey = Object.keys(arys).sort();
  //console.log('newkey='+newkey);
  var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
  for (var i = 0; i < newkey.length; i++) {
    //遍历newkey数组
    newObj[newkey[i]] = arys[newkey[i]];
    //向新创建的对象中按照排好的顺序依次增加键值对
  }
  return newObj; //返回排好序的新对象
}
// 自定义判断元素类型JS
function toType(obj) {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase();
}
// 参数过滤函数
function filterNull(o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key];
    }
    if (toType(o[key]) === "string") {
      o[key] = o[key].trim();
    } else if (toType(o[key]) === "object") {
      o[key] = filterNull(o[key]);
    } else if (toType(o[key]) === "array") {
      o[key] = filterNull(o[key]);
    }
  }
  return o;
}

/**
 * request 拦截器
 * */
// 请求拦截器配置
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.error(error);
  }
);

// response 拦截器
axios.interceptors.response.use(
  (response) => {
    return response;
    // if (response.data.errcode === "0") {
    //   return response;
    // }
    // if (response.data.msg) {
    //   throw new Error(response.data.msg);
    // } else if (errorMessage[response.data.errcode]) {
    //   throw new Error(errorMessage[response.data.errcode]);
    // } else {
    //   throw new Error("网络繁忙，请稍后再试！");
    // }
  },
  (error) => {
    return Promise.reject(error.message);
  }
);

/**
 * 封装get方法
 * @param url   地址
 * @param params  参数
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url   地址
 * @param data  参数
 * @param config 配置
 * @returns {Promise}
 */

export function post(url, data = {}, config) {
  return new Promise((resolve, reject) => {
    const timestamp = new Date().getTime();
    let paramsTemp = objKeySort(data); //升序排序
    paramsTemp = filterNull(paramsTemp);
    let sign = md5(JSON.stringify(paramsTemp) + timestamp);
    const paramsPost = {
      data: paramsTemp,
      timestamp: timestamp,
      sign: sign,
    };
    let params = Encrypt(JSON.stringify(paramsPost));

    axios.post(url, params, config).then(
      (response) => {
        resolve(JSON.parse(Decrypt(response.data)));
      },
      (err) => {
        reject(err);
      }
    );
  });
}
