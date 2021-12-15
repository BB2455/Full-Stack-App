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

export const fetchUsers = () => API.get("/users");
export const createUser = (newUser) => API.post("/users", newUser);
export const updateUser = (userID, updatedUser) =>
  API.patch(`/users/${userID}`, updatedUser);
export const deleteUser = (userID) => API.delete(`/users/${userID}`);

export const login = (formData) => API.post(`/admin/login`, formData);
