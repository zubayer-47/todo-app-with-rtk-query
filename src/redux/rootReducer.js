import { combineReducers } from "redux";
import { apiSlice } from "../features/api/apiSlice";
import filterReducer from "./filters/reducer";
import todoReducer from "./todos/reducer";

const rootReducer = combineReducers({
  todos: todoReducer,
  filters: filterReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;
