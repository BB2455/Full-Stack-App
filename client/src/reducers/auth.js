import { AUTH, REGISTER, LOGOUT } from "../constants/actionTypes";

const reducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case REGISTER:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return
    case LOGOUT:
      localStorage.removeItem("profile");
      return { ...state, authData: null };
    default:
      return state;
  }
};
export default reducer;
