import axios from "axios";
import LRUCache from "lru-cache";

const cache = new LRUCache({
  max: 100,
  ttl: 1000 * 60 * 5, // 5 minutes
});

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  if (config.method === "get") {
    const cachedData = cache.get(config.url);
    if (cachedData) {
      return Promise.reject({
        isCache: true,
        data: cachedData,
      });
    }
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.config.method === "get" && response.config.url) {
      cache.set(response.config.url, response.data);
    }
    return response;
  },
  (error) => {
    if (error.isCache) {
      return Promise.resolve({
        data: error.data,
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
