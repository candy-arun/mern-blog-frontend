import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);
export const createPost = (postData, token) =>
  API.post('/posts', postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getPosts = () => API.get('/posts');
export const getPostById = (id) => API.get(`/posts/${id}`);

export default API;