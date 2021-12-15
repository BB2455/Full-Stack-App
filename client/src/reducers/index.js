import { combineReducers } from "redux";

import users from "./users";
import loaded from "./loaded";
import auth from "./auth";

export default combineReducers({
  users,
  loaded,
  auth,
});
