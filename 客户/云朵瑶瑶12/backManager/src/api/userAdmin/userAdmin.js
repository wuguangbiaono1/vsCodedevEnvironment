

import request from "../../utils/request";
// import qs from "qs";


export function getUserAllList(data) {
  return request({
    url: '/user/findAll',
    method: "get",
    params: data
  });
}
export function getUserBySearch(data) {
  return request({
    url: '/user/search',
    method: "get",
    params: data
  });
}
export function addUser(data) {
  return request({
    url: '/user/add',
    method: "post",
    data: data
  });
}
export function getRoleList(data) {
  return request({
    url: '/role/getRoleList',
    method: "get",
    params: data
  });
}
export function updateInfo(data) {
  return request({
    url: '/user/updateInfo',
    method: "post",
    data: data
  });
}
export function deleteUser(data) {
  return request({
    url: '/user/delete/'+data,
    method: "delete",
  });
}
export function bansUser(data) {
  return request({
    url: '/user/bans',
    method: "get",
    params: data
  });
}

