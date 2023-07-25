import connectMongoDB from "@/libs/mongodb";
import Product from "@/modles/products";
import { NextResponse, NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const { name,
        description,
        price,
        sale,
        slug,
        category, 
        categorySlug,
        images } = await request.json();
  await connectMongoDB();
  await Product.create({ 
        name,
        description,
        price,
        sale,
        slug,
        category, 
        categorySlug,
        images });
  return NextResponse.json({ message: "Product Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const products = await Product.find();
  return NextResponse.json(products);
}


export async function DELETE(request: Request) {
  // @ts-ignore
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  try {
    await connectMongoDB();
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete Product" }, { status: 500 });
  }
}