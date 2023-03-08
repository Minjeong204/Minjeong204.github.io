import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/counter";
import todoSlice from "../redux/todoSlice";

const store = configureStore({
  reducer: { counter: counterReducer, todo: todoSlice },
});

export default store;
