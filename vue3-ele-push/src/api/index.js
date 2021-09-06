import { post } from "@/http/axios.js";

/** 首页 */

/**
 * 首页数据
 */
export const getHomeRescueData = () =>
  post("Admin/Rescue/Rescue/getHomeRescueData", {});
