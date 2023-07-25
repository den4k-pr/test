"use client"

import useCart from "@/hooks/useLocalStorage";
import Image from "next/image";

export const Cart = () => {

    const {cart, addToCart, removeFromCart, getTotalPrice, getTotalLength} = useCart();

    return(
        <section className="cart">
            {cart.length == 0 ?
                
                <h3>Корзина пуста</h3>

                :

                cart.map((cartItem => 
                    <figure className="cart-item">
                        <Image src="/productimg.avif" alt="" width={150} height={150} />
                        <figcaption className="cart-item__info">
                            <h3 className="cart-item__info-name">{cartItem.name}</h3>
                            <p>x {cartItem.quantity}</p>
                            <p className="cart-item__info-category">{cartItem.category}</p>
                            <span className="cart-item__info-price">$ {cartItem.price}</span>
                            <button onClick={() => removeFromCart(cartItem._id)} className="cart-item__info-close">&times;</button>
                        </figcaption>
                    </figure>
                ))
            }
            <h3 className="cart-total">Загальна ціна: <span style={{color: "red"}}>$ {getTotalPrice().toFixed(2)}</span></h3>
        </section>
    )
}