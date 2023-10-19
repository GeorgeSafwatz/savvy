import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { UserState } from "../props/UserAuthProps";

// Define the initial state using that type
const initialState: UserState = {
  auth: "",
  uid: "",
  displayName: "",
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.auth = action.payload.auth;
      state.displayName = action.payload.displayName;
      state.uid = action.payload.uid;
    },
  },
});

export const { setUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
