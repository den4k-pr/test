"use client";

import { Category } from "@/cmponents/types/categories";
import { ProductAdmin } from "@/cmponents/types/products";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface AdminProductsListProps {
  createToggle: boolean;
  handleToggleCreate: (bool: boolean) => void;
}

export const CreateProduct = ({ handleToggleCreate, createToggle }: AdminProductsListProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<ProductAdmin>({
    name: "",
    description: "",
    price: NaN,
    sale: false,
    slug: "",
    category: "",
    categorySlug: "",
    images: [],
  });

  const [numInputs, setNumInputs] = useState<number>(1); // Кількість інпутів для зображень

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryName = e.target.value;
    const selectedCategory = categories.find(category => category.categoryName === selectedCategoryName);
    if (selectedCategory) {
      setFormData(prevState => ({
        ...prevState,
        categorySlug: selectedCategory.categorySlug,
        category: selectedCategoryName // Оновити значення category в стані formData
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });

      if (!res.ok) {
        throw new Error("Failed to create a product");
      }
    } catch (error) {
      console.log(error);
    }

    window.location.reload();
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const files = e.target.files;
    if (!files) return;

    const imagesArray: string[] = [...formData.images];
    const readFilePromises: Promise<void>[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      readFilePromises.push(
        new Promise<void>((resolve, reject) => {
          reader.onloadend = () => {
            if (reader.result) {
              imagesArray[index] = reader.result as string;
              resolve();
            } else {
              reject(new Error("Failed to read file"));
            }
          };
          reader.readAsDataURL(file);
        })
      );
    }

    try {
      await Promise.all(readFilePromises);
      setFormData((prevState) => ({ ...prevState, images: imagesArray }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddInput = () => {
    setNumInputs((prevNum) => prevNum + 1);
  };

  const handleRemoveInput = () => {
    if (numInputs > 1) {
      setNumInputs((prevNum) => prevNum - 1);
      setFormData((prevState) => {
        const images = [...prevState.images];
        images.pop(); // Видалити останнє зображення
        return { ...prevState, images };
      });
    }
  };

  const renderImageInputs = () => {
    const inputs = [];
    for (let i = 0; i < numInputs; i++) {
      inputs.push(
        <div style={{display: "flex", flexDirection: "column"}} key={i}>
          <label className="post-form-label">Зображення-{i + 1}: </label>
          <input
            name={`image${i + 1}`}
            onChange={(e) => handleImageChange(e, i)}
            style={{ minHeight: "40px" }}
            className="post-form-input"
            type="file"
            accept="image/*"
            multiple
          />
        </div>
      );
    }
    return inputs;
  };


  const getCategories = async () => {
    try {
      const res = await fetch('/api/categories', {
        cache: 'no-store',
      });
  
      if (!res.ok) {
        throw new Error('Failed to fetch Category');
      }
  
      return res.json();
    } catch (error) {
      console.log('Error loading Category: ', error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        // Handle any errors here
        console.log('Error fetching Categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div onClick={() => handleToggleCreate(false)} className={`admin__posts-post-form ${createToggle ? "admin__posts-post-formActive" : ""}`}>
        <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="post-form">
          <h3>Створити</h3>
          <label className="post-form-label">Name: </label>
          <input name="name" onChange={handleChange} className="post-form-input" type="text" placeholder="name" required/>
          {renderImageInputs()}
          <div className="post-form-box">
            <button className="adminButton" type="button" onClick={handleAddInput}>
              +
            </button>
            <button className="adminButton" type="button" onClick={handleRemoveInput}>
              -
            </button>
          </div>
          <label className="post-form-label">Description: </label>
          <textarea name="description" onChange={handleChange} className="post-form-input" placeholder="description" required/>
          <label className="post-form-label">Price: </label>
          <input name="price" onChange={handleChange} className="post-form-input" type="number" placeholder="price" required/>
          <label className="post-form-label">Slug: </label>
          <input name="slug" onChange={handleChange} className="post-form-input" type="text" placeholder="slug" required/>
          <label className="post-form-label">Category: </label>
          <select className="post-form-select" name="category" id="" onChange={handleChangeCategory} required>
            <option value="" selected>Оберіть Категорію</option>  
            {
              categories.map(category =>
                <option key={category.categorySlug} value={category.categoryName}>{category.categoryName}</option>   
              )
            }
          </select>
          <nav className="post-form__buttons">
            <button className="post-form__buttons-save">Створити</button>
          </nav>
        </form>
      </div>
    </div>
  );
};
