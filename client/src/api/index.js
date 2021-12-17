import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchUsers = (page) => API.get(`/users/${page}`);
export const fetchUser = (userId) => API.get(`/users/id/${userId}`);
export const createUser = (newUser) => API.post("/users", newUser);
export const updateUser = (userId, updatedUser) =>
  API.patch(`/users/${userId}`, updatedUser);
export const deleteUser = (userId) => API.delete(`/users/id/${userId}`);

export const login = (formData) => API.post(`/admin/login`, formData);
