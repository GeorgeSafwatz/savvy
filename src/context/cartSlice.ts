import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { CartProps } from "../props/CartProps";
import { ProductDetails } from "../props/ShopProps";

// Define the initial state using that type
const initialState: { cartValue: CartProps[] | [] } = {
  cartValue: JSON.parse(localStorage.getItem("cart") || "[]"),
};

export const cartSlice = createSlice({
  name: "cart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartValue = [];
    },
    removeItem: (state, action: PayloadAction<ProductDetails | CartProps>) => {
      const newCartList = state.cartValue.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartValue = newCartList;
    },
    addItem: (state, action: PayloadAction<ProductDetails>) => {
      const newItem: CartProps = {
        id: action.payload.id,
        img: action.payload.imageUrl,
        price: action.payload.price.current.value,
        productName: action.payload.name,
        quantity: 1,
      };
      state.cartValue = [...state.cartValue, newItem];
    },
    increase: (state, action: PayloadAction<CartProps>) => {
      for (let i = 0; i < state.cartValue.length; i++) {
        if (state.cartValue[i].id === action.payload.id) {
          if (state.cartValue[i].quantity === 20) {
            break;
          } else {
            state.cartValue[i].quantity++;
          }
        }
      }
    },
    decrease: (state, action: PayloadAction<CartProps>) => {
      for (let i = 0; i < state.cartValue.length; i++) {
        if (state.cartValue[i].id === action.payload.id) {
          if (state.cartValue[i].quantity === 1) {
            state.cartValue = state.cartValue.filter((i) => {
              return i.id !== action.payload.id;
            });
            const json = JSON.stringify([]);
            localStorage.setItem("cart", json);
          } else {
            state.cartValue[i].quantity--;
          }
        }
      }
    },
  },
});

export const { removeItem, addItem, increase, decrease, clearCart } =
  cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
