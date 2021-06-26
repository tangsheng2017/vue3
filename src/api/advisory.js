import { post } from "@/http/request.js";

/** 我的考勤 */

/**
 * 获取我的星级考核信息
 * @param {string} empid  员工id
 * @param {string} month 月份 格式：yy-mm
 */
export const getMyStarsAssessment = ({ empid, month }) =>
  post("/Scheduling/getStartScore", {
    empid,
    month,
  });
