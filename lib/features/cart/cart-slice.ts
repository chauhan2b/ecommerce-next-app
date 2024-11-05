import { CartItem } from "@/app/lib/definitions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// initial state
const initialState: CartItem[] = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrateCart: (_, action: PayloadAction<CartItem[]>) => {
      return action.payload;
    },
  },
});

export const { hydrateCart } = cartSlice.actions;

export default cartSlice.reducer;
