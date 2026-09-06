import { NextResponse } from "next/server";
import { findProductById } from "@/data/mockProducts";

function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  await delay();

  const { id } = await context.params;
  const product = findProductById(id);

  if (!product) {
    return NextResponse.json(
      {
        error: "NOT_FOUND",
        message: "Product not found in 1Fi Marketplace.",
      },
      { status: 404 }
    );
  }

  return NextResponse.json({ product });
}
