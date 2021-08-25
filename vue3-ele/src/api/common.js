import { post } from "@/http/axios.js";

/** 公用 */

/**
 * 获取字典数据
 * @param {string} dicttype 字典id
 */
export const getAuth = ({ dicttype }) =>
  post("Common/getDictcode", {
    dicttype,
  });

/**
 * 获取公司数据
 */
export const getCompanyData = () => post("Common/getTeamData", {});
