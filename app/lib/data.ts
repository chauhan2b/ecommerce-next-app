import { Product } from "@/app/lib/definitions";

export async function fetchProducts() {
  try {
    const response = await fetch(
      "https://dummyjson.com/products?select=id,title,thumbnail,category,price,discountPercentage,rating"
    );
    const data = await response.json();
    const products = data.products as Product[];

    return products;
  } catch (error) {
    console.log("Failed to fetch products", error);
    throw new Error("Failed to fetch products");
  }
}
