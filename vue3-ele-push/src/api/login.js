import { post } from "@/http/axios.js";

/** 登录 */

/**
 * 登录
 * @param {string} username  用户名
 * @param {string} password 用户密码
 */
export const loginIn = ({ username, password, radio }) =>
  post("Admin/Sys/User/login", {
    username,
    password,
  });

/**
 * 获取菜单
 * @param {string} userid
 * @param {string} uuid
 */
export const getAuth = ({ userid, uuid }) =>
  post("Admin/Sys/User/getAuth", {
    userid,
    uuid,
  });
