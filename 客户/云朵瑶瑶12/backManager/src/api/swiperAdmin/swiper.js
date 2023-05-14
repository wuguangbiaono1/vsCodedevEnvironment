

import request from "../../utils/request";
// import qs from "qs";


// 获取所有轮播图
export function getAllSwiper(params) {
  return request({
    url: '/swiper/getList',
    method: "get",
    params: params
  });
}

// 添加轮播图
export function addSwiper(params) {
  return request({
    url: '/swiper/add',
    method: "post",
    data: params
  });
}

export function updateSwiper(params) {
  return request({
    url: '/swiper/updateSwiper',
    method: "post",
    data: params
  });
}

// 删除轮播图
export function delSwiper(params) {
  return request({
    url: '/swiper/delete/'+params,
    method: "delete"
  });
}
