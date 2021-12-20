import {
  FETCH_ALL,
  FETCH,
  CREATE,
  UPDATE,
  DELETE,
  START_LOADING,
  END_LOADING,
  ERROR,
  FETCH_BY_SEARCH,
} from "../constants/actionTypes";

const initialUsers = {
  users: [],
  currentPage: null,
  numberOfPages: null,
  user: null,
  isLoading: true,
  error: null,
};

const reducer = (state = initialUsers, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        users: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
        error: null,
      };
    case FETCH:
      return { ...state, user: action.payload, error: null };
    case FETCH_BY_SEARCH:
      return {
        ...state,
        users: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
        error: null,
      };
    case CREATE:
      return { ...state, users: [...state.users, action.payload], error: null };
    case UPDATE:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
        user: action.payload,
        error: null,
      };
    case DELETE:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
        error: null,
      };
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
