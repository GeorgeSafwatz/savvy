import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import searchTermReducer from "./searchTermSlice";

export const store = configureStore({
  reducer: { user: userReducer, searchTerm: searchTermReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// For useSelector, it saves you the need to type (state: RootState) every time
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
