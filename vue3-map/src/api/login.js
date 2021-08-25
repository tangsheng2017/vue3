import { post } from "@/http/axios.js";

/** 我的考勤 */

/**
 * 获取我的星级考核信息
 * @param {string} username  用户名
 * @param {string} password 用户密码
 * @param {string} radio 级别选择
 */
export const userLogin = ({ username, password, radio }) =>
  post("Admin/Sys/User/login", {
    username,
    password,
    radio,
  });
