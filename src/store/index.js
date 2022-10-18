import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import postReducer from "../components/postReducer";
import useReducer from "../components/useSlice";

export default configureStore({
  reducer: {
    user: useReducer,
    posts: postReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
