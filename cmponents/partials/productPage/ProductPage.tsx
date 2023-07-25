"use client"

import useCart from "@/hooks/useLocalStorage"
import { UseProduct } from "@/hooks/useProduct"
import { UseProducts } from "@/hooks/useProducts"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

export const ProductPartPage = () => {
    const { displayedProducts, loading } = UseProducts();

    const getParams = useParams();
    const productSlug = Array.isArray(getParams.slug) ? getParams.slug[0] : getParams.slug;

    const { product } = UseProduct({ slug: productSlug })

    const {cart, addToCart, removeFromCart} = useCart();

    const handleAddToCart = (): void => {
        if (product) {
          addToCart(product);
        }
      };

    return(
        <section>
            <div className="productPage">
                <div className="productPage__left" onClick={handleAddToCart}>
                    <Image src="/productimg.avif" fill alt="" />
                </div>
                <div className="productPage__right">
                    <h2 className="productPage__right-title">{product?.name}</h2>
                    <span className="productPage__right-price">$ {product?.price}</span>
                    <p className="productPage__right-category">Category: <span>{product?.category}</span></p>
                    <h3 className="productPage__right-titleDescription">Decription:</h3>
                    <p className="productPage__right-description">{product?.description}</p>
                </div>
            </div>
            <div className="productPage">
                <h2 className="productPage__otherFiles-title">Схожі товари</h2>

                <div className="productPage__products">
                {
                    displayedProducts.filter((productDown) => productDown.categorySlug == product?.categorySlug && productDown.slug !== product?.slug).map(productDown =>
                        <Link key={productDown.slug} href={"/product/" + productDown.slug}>
                            <figure className="productPage__products__product">
                                    <div className="productPage__products__product-imgBox">
                                        <Image className="productPage__products__product-imgBox-img" src="/productimg.avif" alt="" fill />
                                    </div>
                                    <figcaption className="productPage__products__product-info">
                                        <span className="productPage__products__product-info-price">$ {productDown.price}</span>
                                        <h3 className="productPage__products__product-info-name">{productDown.name}</h3>
                                    </figcaption>
                            </figure>
                       </Link>
                    )
                }
                </div>
            </div>
        </section>
    )
}