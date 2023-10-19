import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import searchTermReducer from "./searchTermSlice";
import pricePropsReducer from "./fetchPropsSlice";
import networkReducer from "./networkSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    searchTerm: searchTermReducer,
    priceProps: pricePropsReducer,
    network: networkReducer,
    cart: cartReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// For useSelector, it saves you the need to type (state: RootState) every time
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
