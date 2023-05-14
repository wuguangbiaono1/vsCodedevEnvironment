

import request from "../../utils/request";
// import qs from "qs";

// 列表
export function adminNewsList(data) {
  return request({
    url: '/admin/news',
    method: "get",
    params: data
  });
}
export function adminCookBookList(data) {
  return request({
    url: '/admin/cookbook',
    method: "get",
    params: data
  });
}


export function adminNewsDelete(data) {
  return request({
    url: '/admin/news',
    method: "delete",
    params: data
  });
}

export function adminCookBookDelete(data) {
  return request({
    url: '/admin/cookbook',
    method: "delete",
    params: data
  });
}

export function adminNewsPost(data) {
  return request({
    url: '/admin/news',
    method: "post",
    data: data
  });
}

export function adminCookBookPost(data) {
  return request({
    url: '/admin/cookbook',
    method: "post",
    data: data
  });
}
