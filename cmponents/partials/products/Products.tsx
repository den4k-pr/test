"use client"

import { UseProducts } from "@/hooks/useProducts";
import { Navigation } from "./navigation/Navigation";
import { ProductItem } from "./productItem/ProductItem";
import Link from "next/link";

export const Products = () => {
  const { displayedProducts, loading } = UseProducts()

  return (
    <section>
      <Navigation />
      <div className="products">
        {displayedProducts.map((product: any) => (
          <Link key={product.slug} href={"/product/" + product.slug}>
            <ProductItem
              name={product.name}
              description={product.description}
              price={product.price}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};


{/* <section className="spinearBody">
  <div className="spinner"></div>
</section> */}