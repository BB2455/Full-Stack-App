import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
})

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).accessToken
    }`
  }
  return req
})

export const fetchUsers = (page) => API.get(`/users/${page}`)
export const fetchUser = (userId) => API.get(`/users/id/${userId}`)
export const fetchPostsBySearch = (searchQuery) =>
  API.get(`/users/search${searchQuery.url || '?page=1'}`)
export const createUser = (newUser) => API.post('/users', newUser)
export const updateUser = (userId, updatedUser) =>
  API.patch(`/users/id/${userId}`, updatedUser)
export const deleteUser = (userId) => API.delete(`/users/id/${userId}`)

export const login = (formData) => API.post(`/admin/login`, formData)
export const register = (formData) => API.post(`/admin/register`, formData)
export const forgotPassword = (formData) =>
  API.post(`/admin/forgotPassword`, formData)
export const resetPassword = (formData, token, uid) =>
  API.patch(`/admin/resetPassword?token=${token}&uid=${uid}`, formData)
export const getUsersByToken = (token) =>
  API.get(`admin/getUsersByToken/${token}`)
export const logout = () => API.delete(`/admin/logout`)
export const changePassword = (formData) => API.patch(`/admin/changePassword`, formData)