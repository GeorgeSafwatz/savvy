import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

const search = window.location.pathname.split("/");
const initialState: { value: string } = {
  value:
    search.length === 3 && search[1] === "search"
      ? search[2]
      : search.length === 2
      ? search[1]
      : "",
};

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
