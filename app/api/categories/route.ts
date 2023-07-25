import connectMongoDB from "@/libs/mongodb";
import Category from "@/modles/categories";
import { NextResponse, NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const { 
    categoryName,
    categorySlug
  } = await request.json();
  await connectMongoDB();
  await Category.create({ 
    categoryName,
    categorySlug 
  });
  return NextResponse.json({ message: "Category Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const categories = await Category.find();
  return NextResponse.json(categories);
}


export async function DELETE(request: Request) {
  // @ts-ignore
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Invalid category ID" }, { status: 400 });
  }

  try {
    await connectMongoDB();
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete Category" }, { status: 500 });
  }
}