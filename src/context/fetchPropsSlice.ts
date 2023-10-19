import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { SortProps } from "../props/fetchProductProps";

const initialState: { maxValue: number; minValue: number; sort: SortProps } = {
  maxValue: localStorage.getItem("maxPrice")
    ? Number(localStorage.getItem("maxPrice"))
    : 1000,
  minValue: localStorage.getItem("minPrice")
    ? Number(localStorage.getItem("minPrice"))
    : 0,
  sort: "freshness",
};

export const pricePropsSlice = createSlice({
  name: "price-props",
  initialState,
  reducers: {
    setPriceMin: (state, action: PayloadAction<number>) => {
      state.minValue = action.payload;
    },
    setPriceMax: (state, action: PayloadAction<number>) => {
      state.minValue = action.payload;
    },
    setSort: (state, action: PayloadAction<SortProps>) => {
      state.sort = action.payload;
    },
  },
});

export const { setPriceMax, setPriceMin, setSort } = pricePropsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPriceProps = (state: RootState) => state.priceProps;

export default pricePropsSlice.reducer;
