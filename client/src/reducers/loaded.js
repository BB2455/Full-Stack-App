import { LOADED } from "../constants/actionTypes";

const reducer = (loaded = false, action) => {
  switch (action.type) {
    case LOADED:
      return action.payload;
    default:
      return loaded;
  }
};

export default reducer;
