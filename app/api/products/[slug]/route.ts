
import connectMongoDB from '@/libs/mongodb';
import Product from '@/modles/products';
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {
  const { slug } = params;
  await connectMongoDB();
  const product = await Product.findOne({ slug: slug });
  return NextResponse.json(product, { status: 200 });
}

export async function PUT(request: Request, { params }: any) {
  const { slug } = params;
  const { newImages, newName, newDescription, newPrice, newSale, newCategory, newCategorySlug } = await request.json();
  
  try {
    await connectMongoDB();
    const product = await Product.findOne({ slug });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (newImages) product.images = newImages;
    if (newName) product.name = newName;
    if (newDescription) product.description = newDescription;
    if (newPrice) product.price = newPrice;
    if (newSale) product.sale = newSale;
    if (newCategory) product.category = newCategory;
    if (newCategorySlug) product.categorySlug = newCategorySlug;

    await product.save();

    return NextResponse.json({ message: "Product updated" }, { status: 200 });
  } catch (error) {
    console.error("Помилка при оновленні товару:", error);
    return NextResponse.json({ error: "Не вдалося оновити товар" }, { status: 500 });
  }
}






