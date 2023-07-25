"use client"

import { Category } from "@/cmponents/types/categories";
import { useEffect, useState } from "react";

export const UseCategories = () => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        fetch('/api/categories')
            .then(response => response.json())
            .then(data => {
                setCategories(data);
                setLoading(false)
            })
            .catch(error => console.log('Error fetching categories:', error));
    }, []);

    return { categories, loading };
}