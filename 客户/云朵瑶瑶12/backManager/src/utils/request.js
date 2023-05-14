import axios from "axios";

const service = axios.create({
  // process.env.NODE_ENV === 'development' 来判断是否开发环境
  baseURL: "/",
  timeout: 5000
});


export default service;

