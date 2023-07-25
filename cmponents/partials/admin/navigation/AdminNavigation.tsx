"use client"

import { useAppDispatch } from "@/redux/hooks";
import { setAdminValue } from "@/redux/state/togleAdminChoose";


export const AminNavigation = () => {

    const dispatch = useAppDispatch();

    const handleButtonClick = (value: string) => {
        dispatch(setAdminValue(value));
    };

    return(
        <section className="adminNavigation">
            <button onClick={() => handleButtonClick("products")} className="adminNavigation-button">Товари</button>
            <button onClick={() => handleButtonClick("categories")} className="adminNavigation-button">Категорії</button>
        </section>
    )
}