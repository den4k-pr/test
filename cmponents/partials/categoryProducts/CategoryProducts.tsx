"use client"

// import { products } from "@/cmponents/types/products"
import { Navigation } from "../products/navigation/Navigation"
import { ProductItem } from "../products/productItem/ProductItem"
import { useParams } from "next/navigation"
import Link from "next/link"
import { UseProducts } from "@/hooks/useProducts"

export const CategoryProducts = () => {

    const getParams = useParams()
    const slug = getParams.category

    const { displayedProducts, loading } = UseProducts()

    return (
        <section>
            <Navigation />
            <div className="products">
                {displayedProducts.filter((product) => product.categorySlug == slug).map(product =>
                    <Link key={product.slug} href={"/product/" + product.slug}>
                        <ProductItem name={product.name} description={product.description} price={product.price} />
                    </Link>
                )}
            </div>
        </section>
    );
}
