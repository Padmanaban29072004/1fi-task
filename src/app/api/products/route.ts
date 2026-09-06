import { NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/data/mockProducts";

/** Simulated network latency for realistic loading states. */
function delay(ms = 450) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET() {
  await delay();

  return NextResponse.json({
    products: MOCK_PRODUCTS,
    total: MOCK_PRODUCTS.length,
  });
}
