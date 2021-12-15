import { AUTH, LOGOUT } from "../constants/actionTypes";
import * as api from "../api";

export const login = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);

    dispatch({ type: AUTH, data });

    navigate("/", { replace: true });
  } catch (error) {
    console.log(error.message);
  }
};

export const logout = () => {
  return { type: LOGOUT };
};
