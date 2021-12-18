import {
  FETCH_ALL,
  FETCH,
  CREATE,
  UPDATE,
  DELETE,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";

const initialUsers = {
  users: [],
  currentPage: null,
  numberOfPages: null,
  user: null,
  isLoading: true,
};

const reducer = (state = initialUsers, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        users: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH:
      return { ...state, user: action.payload };
    case CREATE:
      return { ...state, users: [...state.users, action.payload] };
    case UPDATE:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
        user: action.payload,
      };
    case DELETE:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default reducer;
