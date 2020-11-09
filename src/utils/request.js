import axios from "axios";
import { Message } from "element-ui";
import cache from "@/utils/cache";

const base_url =
  process.env.NODE_ENV === "development"
    ? process.env.BASE_API
    : process.env.API_ROOT;

// 创建axios实例
const instance = axios.create({
  baseURL: base_url, // 根据配置环境的改变的baseURL（/config目录下进行修改）；不需要则直接注释或者改为自定义URL
  timeout: 10 * 1000 // 请求超时时间
});

//允许携带cookie
instance.defaults.withCredentials = true;

// 设置post请求头
instance.defaults.headers.post["Content-Type"] = "application/json";

// request拦截器
instance.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (cache.getToken()) {
      config.headers["X-Token"] = cache.getToken(); // 让每个请求携带token -- ['X-Token']为自定义key 请根据实际情况自行修改
      // config.headers['Authorization'] = `Bearer ${cache.getToken()}` // 示例
    }
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// respone拦截器
instance.interceptors.response.use(
  response => {
    const res = response.data;
    if (res && res.errorMessage) {
      return Promise.reject(res.errorMessage);
    }
    return Promise.resolve(res);
  },
  error => {
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default instance;
