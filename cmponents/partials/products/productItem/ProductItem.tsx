"use client"

import Image from "next/image"

interface Product {
    name: string,
    price: number,
    description: string
}

export const ProductItem = ({ name, price, description }: Product) => {

    return(
        <figure className="products__product">
            <div className="products__product_box">
                <Image className="products__product_box-img" src="/productimg.avif" alt="" fill />
            </div>
            <figcaption className="products__product_info">
                <span className="products__product_info-price">$ {price}</span>
                <h3 className="products__product_info-name">{name}</h3>
                <p className="products__product_info-description">{description}</p>
            </figcaption>
        </figure>
    )
}