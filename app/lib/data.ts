import { Product, ProductDetails } from "@/app/lib/definitions";

export async function fetchProducts() {
  try {
    const response = await fetch(
      "https://dummyjson.com/products?select=id,title,thumbnail,category,price,discountPercentage,rating"
    );

    if (!response.ok) {
      throw new Error(`HTTP error: Status code ${response.status}`);
    }

    const data = await response.json();
    return data.products as Product[];
  } catch (error) {
    console.log("Failed to fetch products", error);
    throw new Error("Failed to fetch products");
  }
}

export async function fetchProductDetails(id: string): Promise<ProductDetails> {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error: Status code ${response.status}`);
    }

    const productDetails = await response.json();
    return productDetails as ProductDetails;
  } catch (error) {
    console.log("Failed to fetch product details", error);
    throw new Error("Failed to fetch product details");
  }
}
