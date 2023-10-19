import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface NetworkStatusProp {
  online: boolean | null;
}
// Define the initial state using that type
const initialState: NetworkStatusProp = {
  online: null,
};

export const networkSlice = createSlice({
  name: "network",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setNetwork: (state, action: PayloadAction<NetworkStatusProp>) => {
      state.online = action.payload.online;
    },
  },
});

export const { setNetwork } = networkSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectNetwork = (state: RootState) => state.network;

export default networkSlice.reducer;
