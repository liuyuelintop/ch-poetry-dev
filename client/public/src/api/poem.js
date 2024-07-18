import axios from "axios";

// API 基础 URL
const API_BASE_URL = "http://localhost:5001/api";

// 通用的 fetch 函数，用于获取诗词数据
// @param {string} endpoint - API 端点
// @param {object} params - 查询参数对象
// @returns {Promise<object>} - 返回包含数据的 Promise 对象
const fetchData = async (endpoint, params = {}) => {
  const url = new URL(`${API_BASE_URL}/${endpoint}`);
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );
  const response = await axios.get(url.toString());
  return response.data;
};

// 获取诗词的函数，可以指定 endpoint 和页码
// @param {string} endpoint - API 端点
// @param {number} page - 页码，默认为 1
// @returns {Promise<object>} - 返回包含诗词数据的 Promise 对象
export const fetchPoems = async (endpoint, page = 1) => {
  return fetchData(endpoint, { page });
};

// 获取唐诗三百首的函数，可以指定页码和每页数量
// @param {number} page - 页码，默认为 1
// @param {number} limit - 每页显示的数量，默认为 10
// @returns {Promise<object>} - 返回包含唐诗三百首数据的 Promise 对象
export const fetchTang300Poems = async (page = 1, limit = 10) => {
  return fetchData("poems/dynasty/tang", { page, limit });
};

// 获取宋词三百首的函数，可以指定页码和每页数量
// @param {number} page - 页码，默认为 1
// @param {number} limit - 每页显示的数量，默认为 10
// @returns {Promise<object>} - 返回包含宋词三百首数据的 Promise 对象
export const fetchSong300Poems = async (page = 1, limit = 10) => {
  return fetchData("poems/dynasty/song", { page, limit });
};

// 获取诗经的函数，可以指定页码和每页数量
// @param {number} page - 页码，默认为 1
// @param {number} limit - 每页显示的数量，默认为 10
// @returns {Promise<object>} - 返回包含诗经数据的 Promise 对象
export const fetchShijing = async (page = 1, limit = 10) => {
  return fetchData("shijing", { page, limit });
};

// 获取随机诗词的函数
// @returns {Promise<object>} - 返回包含随机诗词数据的 Promise 对象
export const fetchRandomPoems = async () => {
  return fetchData("poems/random-poems");
};

// 搜索诗词的函数，可以指定查询参数
// @param {object} params - 查询参数对象，包括作者、标题、标签、朝代、页码和每页数量
// @returns {Promise<object>} - 返回包含诗词数据的 Promise 对象
export const searchPoetry = async (params) => {
  return fetchData("search/poetry", params);
};

// 搜索诗经的函数，可以指定查询参数
// @param {object} params - 查询参数对象，包括标题、章节、部分、页码和每页数量
// @returns {Promise<object>} - 返回包含诗经数据的 Promise 对象
export const searchShijing = async (params) => {
  return fetchData("search/shijing", params);
};

// 点赞诗词的函数
// @param {string} id - 诗词的唯一标识符
// @returns {Promise<object>} - 返回包含点赞结果的 Promise 对象
export const likePoem = async (id) => {
  const response = await axios.post(`${API_BASE_URL}/poems/like/${id}`);
  return response.data;
};
