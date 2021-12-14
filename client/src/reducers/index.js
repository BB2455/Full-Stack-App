import { combineReducers } from "redux";

import users from "./users";
import loaded from "./loaded";

export default combineReducers({
  users,
  loaded,
});
