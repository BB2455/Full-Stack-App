import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const fetchUsers = () => API.get("/users");
export const createUser = (newUser) => API.post("/users", newUser);
export const updateUser = (userID, updatedUser) =>
  API.patch(`/users/${userID}`, updatedUser);
export const deleteUser = (userID) => API.delete(`/users/${userID}`);
