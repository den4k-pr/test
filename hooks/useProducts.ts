"use client"

import { Product } from "@/cmponents/types/products";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";

export const UseProducts = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const toggleValue = useAppSelector(
        (state: RootState) => state.togle.selectedValue
    );

    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
    const reverseSortedProducts = [...products].sort((a, b) => b.price - a.price);

    let displayedProducts: typeof products = [];

    if (toggleValue === "") {
        displayedProducts = products;
      } else if (toggleValue === "up") {
        displayedProducts = sortedProducts;
      } else if (toggleValue === "down") {
        displayedProducts = reverseSortedProducts;
      }
    
      useEffect(() => {
        fetch('/api/products')
          .then(response => response.json())
          .then(data => {
            setProducts(data);
            setLoading(false)
          })
          .catch(error => console.log('Error fetching products:', error));
      }, []);

      return { displayedProducts, loading };
}