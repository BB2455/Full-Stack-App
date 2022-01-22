// eslint-disable-next-line
import { AUTH, LOGOUT, REGISTER } from "../constants/actionTypes";
import * as api from "../api";

export const login = (formData, navigate, errorHandler) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    if (data.isBoom) {
      throw new Error(data.output.statusCode)
    }
    dispatch({ type: AUTH, data });

    navigate("/", { replace: true });
  } catch (error) {
    console.log(error.message);
    errorHandler(error.message);
  }
};

export const register = (formData, navigate) => async (dispatch) => {
  console.log("registered!")
  navigate("/", { replace: true });
}

export const logout = () => {
  return { type: LOGOUT };
};
