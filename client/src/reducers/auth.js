import { AUTH, LOGOUT } from "../constants/actionTypes";

const reducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      console.log("Logged out");
      localStorage.removeItem("profile");
      return { ...state, authData: null };
    default:
      return state;
  }
};
export default reducer;
