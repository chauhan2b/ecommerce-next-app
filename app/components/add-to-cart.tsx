"use client";

import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { CartItem } from "../lib/definitions";
import { addToCart } from "@/lib/features/cart/cart-slice";

export default function AddToCart({ cartItem }: { cartItem: CartItem }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(cartItem));
  };

  return (
    <Button className="w-full p-6 text-xl font-bold" onClick={handleAddToCart}>
      Add to cart
    </Button>
  );
}
