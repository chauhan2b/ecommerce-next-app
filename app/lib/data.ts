import { CartItem, Product, ProductDetails } from "@/app/lib/definitions";

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

export function getCartItems(): CartItem[] {
  return [
    {
      id: 11,
      name: "Annibale Colombo Bed",
      price: 1899.99,
      thumbnail:
        "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/thumbnail.png",
      quantity: 1,
    },
    {
      id: 12,
      name: "Annibale Colombo Sofa",
      price: 2499.99,
      thumbnail:
        "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/thumbnail.png",
      quantity: 1,
    },
    {
      id: 13,
      name: "Bedside Table African Cherry",
      price: 299.99,
      thumbnail:
        "https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20African%20Cherry/thumbnail.png",
      quantity: 1,
    },
    {
      id: 14,
      name: "Knoll Saarinen Executive Conference Chair",
      price: 499.99,
      thumbnail:
        "https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/thumbnail.png",
      quantity: 1,
    },
  ];
}
