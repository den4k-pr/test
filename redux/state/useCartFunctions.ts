"use client"

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/cmponents/types/products';

const CART_STORAGE_KEY = 'cart';
const getInitialCartFromLocalStorage = (): Product[] => {
  const cartJson = window.localStorage.getItem(CART_STORAGE_KEY) || '[]';
  return JSON.parse(cartJson) as Product[];
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: getInitialCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.find((item) => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item._id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
