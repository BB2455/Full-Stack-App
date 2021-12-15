import { LOADED } from "../constants/actionTypes";

export const loaded = () => {
  return { type: LOADED, payload: true };
};
