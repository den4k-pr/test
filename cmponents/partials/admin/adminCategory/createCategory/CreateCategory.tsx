"use client";

import { Category } from "@/cmponents/types/categories";
import { ChangeEvent, FormEvent, useState } from "react";

interface AdminCategoriesListProps {
  createToggle: boolean;
  handleToggleCreate: (bool: boolean) => void;
}

export const CreateCategory = ({ handleToggleCreate, createToggle }: AdminCategoriesListProps) => {
  const [formData, setFormData] = useState<Category>({
    categoryName: "",
    categorySlug: ""
  });

  const [numInputs, setNumInputs] = useState<number>(1); // Кількість інпутів для зображень

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });

      if (!res.ok) {
        throw new Error("Failed to create a category");
      }
    } catch (error) {
      console.log(error);
    }

    window.location.reload();
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div onClick={() => handleToggleCreate(false)} className={`admin__posts-post-form ${createToggle ? "admin__posts-post-formActive" : ""}`}>
        <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="post-form">
          <label className="post-form-label">CategoryName: </label>
          <input name="categoryName" onChange={handleChange} className="post-form-input" type="text" placeholder="categoryName" />
          <label className="post-form-label">CategorySlug: </label>
          <input name="categorySlug" onChange={handleChange} className="post-form-input" type="text" placeholder="categorySlug" />
          <nav className="post-form__buttons">
            <button className="post-form__buttons-save">Створити</button>
          </nav>
        </form>
      </div>
    </div>
  );
};
