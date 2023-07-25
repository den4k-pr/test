"use client"

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setBurgerValue } from "@/redux/state/togleBurger";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Header() {

    const [scrolled, setScrolled] = useState(false);

    let headerList = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY >= 163) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
        };

        handleScroll(); // Викликаємо функцію для перевірки після завантаження сторінки

        window.addEventListener("scroll", handleScroll);

        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const burgerValue = useAppSelector((state: RootState) => state.boorger.burgerValue);

    const dispatch = useAppDispatch();

    const handleButtonClick = () => {
        dispatch(setBurgerValue());
    };

    return(
        <header ref={headerList} className="header">
            <div className="header__top">
                <div className="header__top-contacts">
                    <p className="header__top-contacts-email">emigracjapl@gmail.com</p>
                    <p className="header__top-contacts-phone">+ 48 730724244</p>
                </div>
            </div>
            <div className={`header__bottom ${scrolled ? "fixed" : ""}`}>
                <Image src="/logo.png" alt="logo" width={113} height={113} />
                <ul className={`header__bottom-list${burgerValue ? " active" : ""}`}>
                    <li className="header__bottom-list-li">
                        <Link className="header__bottom-list-link" href="/">Головна</Link>
                    </li>
                    <li className="header__bottom-list-li">
                        <Link className="header__bottom-list-link" href="/">Про нас</Link>
                    </li>
                    <li className="header__bottom-list-li">
                        <Link className="header__bottom-list-link" href="/">Каталог</Link>
                    </li>
                    <li className="header__bottom-list-li">
                        <Link className="header__bottom-list-link" href="/">Роботи партнерів</Link>
                    </li>
                    <li className="header__bottom-list-li">
                        <Link className="header__bottom-list-link" href="/">Блог</Link>
                    </li>
                    <li className="header__bottom-list-li">
                        <Link className="header__bottom-list-link" href="/">Контакти</Link>
                    </li>
                    <li className="header__bottom-list-li">
                        <Link className="header__bottom-list-link" href="/">Наші роботи</Link>
                    </li>
                </ul>
                <button onClick={handleButtonClick} className={`header__bottom-burger${burgerValue ? " active" : ""}`}>
                    <span className="header__bottom-burger-line"></span>
                    <span className="header__bottom-burger-line"></span>
                    <span className="header__bottom-burger-line"></span>
                </button>
            </div>
        </header>
    )
}