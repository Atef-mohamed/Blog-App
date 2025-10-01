import { configureStore } from "@reduxjs/toolkit";
import { postApiSlice } from "./features/postsSlice/PostApiSlice";
import { userApiSlice } from "./features/userSLice/userApiSlice";

export const store = configureStore({
  reducer: {
    [postApiSlice.reducerPath]: postApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(postApiSlice.middleware, userApiSlice.middleware),
});
