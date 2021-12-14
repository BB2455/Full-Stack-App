import { LOADED } from "../constants/actionTypes";

export const loaded = () => {
  console.log("Loaded");
  return { type: LOADED, payload: true };
};
