"use client"

import Image from "next/image";
import Link from "next/link";

import 'animate.css';

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { UseCategories } from "@/hooks/useCategories";
import useCart from "@/hooks/useLocalStorage";

export default function Aside() {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [isOptionsVisible, setOptionsVisible] = useState<boolean>(false);

    const {cart, addToCart, removeFromCart, getTotalPrice, getTotalLength} = useCart();


    const { categories, loading } = UseCategories()

    const pathname = usePathname()

    console.log(pathname)

    const handleOptionClick = (optionValue: string): void => {
        setSelectedOption(optionValue);
        setOptionsVisible(false);
    };


    const elementRef = useRef<HTMLAnchorElement>(null);


    const animateSwing = () => {
        const element = elementRef.current;
        if (element) {
            element.classList.add('animate__tada');
            setTimeout(() => {
                element.classList.remove('animate__tada');
            }, 2000);
        }
    };
    useEffect(() => {
        if (getTotalLength() !== 0) {
            const interval = setInterval(animateSwing, 3000);
            return () => {
                clearInterval(interval);
            };
        }
    }, [getTotalLength()]);

    if(pathname == "/admin") {
        return null
    }

    return(
        <aside className="aside">
            <h2 className="aside-title">Категорії</h2>
            <ul className="aside__listCategories">
                <li>
                    <Link className="aside__listCategories-category" href="/">Всі</Link>
                </li>
                {categories.map(category => 
                    <li key={category.categorySlug}>
                        <Link className="aside__listCategories-category" href={`/${category.categorySlug}`}>{category.categoryName}</Link>
                    </li>  
                )}
            </ul>
            <div className="aside__select">
                <div
                    className="aside__selected-option"
                    onClick={() => setOptionsVisible(!isOptionsVisible)}
                >
                    {selectedOption ? selectedOption : 'Виберіть категорію'}
                </div>
                {isOptionsVisible && (
                    <ul className="aside__options">
                        <li
                            className="aside__option"
                            onClick={() => handleOptionClick('Оберіть категорію')}
                        >
                            <Link className="aside__option-link" href="/">Всі</Link>
                        </li>
                        <li
                            className="aside__option"
                            onClick={() => handleOptionClick('category1')}
                        >
                            <Link className="aside__option-link" href="/category1">category1</Link>
                        </li>
                        <li
                            className="aside__option"
                            onClick={() => handleOptionClick('category2')}
                        >
                            <Link className="aside__option-link" href="/category2">category2</Link>
                        </li>
                        <li
                            className="aside__option"
                            onClick={() => handleOptionClick('category3')}
                        >
                            <Link className="aside__option-link" href="/category3">category3</Link>
                        </li>
                        <li
                            className="aside__option"
                            onClick={() => handleOptionClick('category4')}
                        >
                            <Link className="aside__option-link" href="/category4">category4</Link>
                        </li>
                        <li
                            className="aside__option"
                            onClick={() => handleOptionClick('category5')}
                        >
                            <Link className="aside__option-link" href="/category5">category5</Link>
                        </li>
                    </ul>
                )}
            </div>
            <nav className="aside-busket">
                <Link href="/cart" ref={elementRef} className="aside-busket_button animate__animated">
                    <Image className="aside-busket_button-img" src="/busket.png" alt="" width={40} height={40} />
                    <span className="aside-busket_button-length">{getTotalLength()}</span>
                </Link>
            </nav>
        </aside>
    )
}