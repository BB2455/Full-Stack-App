import {
  FETCH_ALL,
  FETCH,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  START_LOADING,
  END_LOADING,
  ERROR,
} from "../constants/actionTypes";
import * as api from "../api";

export const getUsers = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchUsers(page);

    dispatch({
      type: FETCH_ALL,
      payload: { data, currentPage, numberOfPages },
    });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: END_LOADING });
    dispatch({
      type: ERROR,
      payload: "Unable to get users, please try again later.",
    });
    console.log(error.message);
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchUser(id);
    dispatch({ type: FETCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: END_LOADING });
    dispatch({ type: ERROR, payload: "Something went wrong" });
    console.log(error.message);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchPostsBySearch(searchQuery);

    dispatch({
      type: FETCH_BY_SEARCH,
      payload: { data, currentPage, numberOfPages },
    });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: END_LOADING });
    dispatch({
      type: ERROR,
      payload: "Unable to get users, please try again later.",
    });
    console.log(error);
  }
};

export const createUser = (newUser, handleRes) => async (dispatch) => {
  try {
    const { data } = await api.createUser(newUser);
    dispatch({ type: CREATE, payload: data });
    handleRes({ message: "User has been created!", error: false });
  } catch (error) {
    console.log(error.message);
    handleRes({
      message: "Something went wrong, please try again later.",
      error: true,
    });
  }
};

export const updateUser = (userId, userData, handleRes) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(userId, userData);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    handleRes({
      message: "Something went wrong, please try again later.",
      error: true,
    });
    console.log(error.message);
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    await api.deleteUser(userId);
    dispatch({ type: DELETE, payload: userId });
  } catch (error) {
    console.log(error.message);
  }
};
