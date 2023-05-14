

import request from "../utils/request";
// import qs from "qs";

// 获取用户信息
export function getUserInfo(data) {
  return request({
    url: '/user/getInfoByToken',
    method: "get",
    params: data
  });
}
export function updatePass(data) {
  return request({
    url: '/user/updatePass',
    method: "post",
    data: data
  });
}
export function wdUserq() {
  return request({
    url: '/admin/wd/user/q',
    method: "get",
  });
}

export function wdUser() {
  return request({
    url: '/admin/wd/user',
    method: "get",
  });
}


