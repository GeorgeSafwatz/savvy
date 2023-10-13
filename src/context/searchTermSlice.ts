import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

const initialState: { value: string } = { value: "" };

export const searchTermSlice = createSlice({
  name: "searchTerm",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setSearchTerm } = searchTermSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSearchTerm = (state: RootState) => state.searchTerm;

export default searchTermSlice.reducer;
