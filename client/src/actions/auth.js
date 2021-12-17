import { AUTH, LOGOUT } from "../constants/actionTypes";
import * as api from "../api";

export const login = (formData, navigate, errorHandler) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);

    dispatch({ type: AUTH, data });

    navigate("/", { replace: true });
  } catch (error) {
    console.log(error.message);
    errorHandler(error.message);
  }
};

export const logout = () => {
  return { type: LOGOUT };
};
