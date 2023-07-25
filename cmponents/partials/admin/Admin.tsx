"use client"

import { useAppSelector } from "@/redux/hooks";
import { AdminProducts } from "./adminProducts/AdminProducts"
import { RootState } from "@/redux/store";
import { AdminCategories } from "./adminCategory/AdminCategory";


export const Admin = () => {

    const chooseValue = useAppSelector((state: RootState) => state.adminChoose.chooseValue);

    return(
        <section className="admin">
            {
                chooseValue == "products" ?
                <AdminProducts />
                :
                <AdminCategories />
            }
        </section>
    )
}