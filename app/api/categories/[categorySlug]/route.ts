
import connectMongoDB from '@/libs/mongodb';
import Category from '@/modles/categories';
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {
  const { categorySlug } = params;
  await connectMongoDB();
  const category = await Category.findOne({ categorySlug: categorySlug });
  return NextResponse.json({ category }, { status: 200 });
}

export async function PUT(request: Request, { params }: any) {
  const { categorySlug } = params;
  const { newCategoryName, newCategorySlug } = await request.json();
  
  try {
    await connectMongoDB();
    const category = await Category.findOne({ categorySlug });

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    if (newCategoryName) category.categoryName = newCategoryName;
    if (newCategorySlug) category.categorySlug = newCategorySlug;

    await category.save();

    return NextResponse.json({ message: "Category updated" }, { status: 200 });
  } catch (error) {
    console.error("Помилка при оновленні товару:", error);
    return NextResponse.json({ error: "Не вдалося оновити товар" }, { status: 500 });
  }
}







