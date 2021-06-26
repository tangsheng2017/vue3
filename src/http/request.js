import axios from "axios";
import qs from "qs";
const pageConfig = require("@/utils/config.js");
import { Decrypt, Encrypt } from "./crypto-js/crypto-js";
import md5 from "js-md5";

axios.defaults.timeout = 50000;
axios.defaults.headers["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
// axios.defaults.baseURL = baseUrl;
/**
 * request 拦截器
 * */
// 请求拦截器配置
axios.interceptors.request.use(
  (config) => {
    if (config.method == "post") {
      config.data = qs.stringify(config.data);
    }
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
    axios.post(url, data, config).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
