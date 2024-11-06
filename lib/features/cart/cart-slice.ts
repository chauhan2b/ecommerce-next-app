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
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      }
    },
  },
});

export const { hydrateCart, addToCart, removeFromCart, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
