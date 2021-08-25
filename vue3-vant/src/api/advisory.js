import { post } from "@/http/axios.js";

/** 我的考勤 */

/**
 * 获取我的星级考核信息
 * @param {string} index  员工id
 * @param {string} size 月份 格式：yy-mm
 */
export const getNewsList = ({ index, size }) =>
  post("Api/App/Administration/newsList", {
    index,
    size,
    userid: "ec1d1ba2-dec7-11ea-991f-525400cb9d54",
    username: "王飞",
  });
