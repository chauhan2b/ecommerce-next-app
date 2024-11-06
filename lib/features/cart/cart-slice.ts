import { CartItem } from "@/app/lib/definitions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Function to save cart to local storage
const saveCartToLocalStorage = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Function to load cart from local storage
// const loadCartFromLocalStorage = (): CartItem[] => {
//   const cart = localStorage.getItem("cart");
//   return cart ? JSON.parse(cart) : [];
// };

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
      saveCartToLocalStorage(state);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const newState = state.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(newState);
      return newState;
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      }
      saveCartToLocalStorage(state);
    },
  },
});

export const { hydrateCart, addToCart, removeFromCart, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
