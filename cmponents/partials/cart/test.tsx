"use client"

import { Product } from '@/cmponents/types/products';
import { useState, useEffect } from 'react';

const CART_STORAGE_KEY = 'cart';

const getInitialCartFromLocalStorage = (): Product[] => {
  const cartJson = window.localStorage.getItem(CART_STORAGE_KEY) || '[]';
  return JSON.parse(cartJson) as Product[];
};

const useCart = (): {
  cart: Product[];
  addToCart: (item: Product) => void;
  removeFromCart: (itemId: string) => void;
  getTotalPrice: () => number;
  getTotalLength: () => number;
} => {
  const [cart, setCart] = useState<Product[]>(getInitialCartFromLocalStorage);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalLength, setTotalLength] = useState<number>(0);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    const price = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotalPrice(price);

    const length = cart.reduce((total, item) => total + item.quantity, 0);
    setTotalLength(length);
  }, [cart]);

  const addToCart = (item: Product): void => {
    const existingItemIndex = cart.findIndex((cartItem) => cartItem._id === item._id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: string): void => {
    const updatedCart = cart.filter((item) => item._id !== itemId);
    setCart(updatedCart);
  };

  const getTotalPrice = (): number => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalLength = (): number => {
    return totalLength;
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    getTotalPrice,
    getTotalLength,
  };
};

export default useCart;
