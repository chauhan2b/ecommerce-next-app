"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
// import { CartItem } from "../lib/definitions";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { removeFromCart, updateQuantity } from "@/lib/features/cart/cart-slice";
import { toast } from "sonner";

export default function Page() {
  const cartItems = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const calculateSubtotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const calculateShipping = (subtotal: number) => {
    if (subtotal > 50) {
      return 0;
    } else {
      return 10;
    }
  };

  const calculateTotal = (subtotal: number) => {
    if (subtotal > 50) {
      return subtotal.toFixed(2);
    } else {
      return (subtotal + 10).toFixed(2);
    }
  };

  const subtotal = parseFloat(calculateSubtotal());
  const shipping = calculateShipping(subtotal);

  const handleRemoveFromCart = (id: number, quantity: number) => {
    if (quantity === 1) {
      dispatch(removeFromCart(id));
      toast.success("Item removed from cart");
    } else {
      dispatch(updateQuantity({ id, quantity: quantity - 1 }));
    }
  };

  const handleAddToCart = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));
  };

  return (
    <div className="p-4 md:mx-20 2xl:mx-40">
      {/* Cart Items */}
      {cartItems.length === 0 && (
        <>
          {" "}
          <h1 className="text-2xl font-bold">Your Cart</h1>
          <div className="mt-4 flex gap-2 items-center ">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Link href="/" passHref>
              <Button
                variant="secondary"
                className="text-muted-foreground text-lg hover:shadow-md transition duration-150"
              >
                Start shopping
              </Button>
            </Link>
          </div>
        </>
      )}

      {cartItems.length > 0 && (
        <div className="lg:grid lg:grid-cols-[60%_40%] 2xl:grid-cols-[65%_35%] md:gap-12">
          {/* Cart */}
          <div>
            <h1 className="text-2xl font-bold">Your Cart</h1>
            <div className="bg-gray-50 pl-2 pr-4 py-2 rounded-xl mt-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <Image
                    src={item.thumbnail}
                    alt={item.name}
                    width={120}
                    height={120}
                    className="bg-white m-2 rounded-lg shadow-sm"
                  />
                  <div>
                    <h2 className="font-bold line-clamp-2">{item.name}</h2>
                    <p className="text-muted-foreground">
                      ${item.price} per item
                    </p>
                  </div>
                  <div className="flex flex-col flex-1 items-end space-y-2">
                    <div className="flex items-center">
                      <Button
                        className="h-8 w-8 p-1 text-lg"
                        variant="outline"
                        onClick={() =>
                          handleRemoveFromCart(item.id, item.quantity)
                        }
                      >
                        -
                      </Button>
                      <span className="px-3">{item.quantity}</span>
                      <Button
                        className="h-8 w-8 p-1 text-lg"
                        variant="outline"
                        onClick={() => handleAddToCart(item.id, item.quantity)}
                      >
                        +
                      </Button>
                    </div>
                    <div>
                      <p className="font-bold text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Checkout */}
          <div>
            <h1 className="font-bold text-2xl mt-4 lg:mt-0">Checkout</h1>
            <div className="bg-gray-50 px-4 py-2 rounded-xl mt-4">
              <div className="flex justify-between mt-2">
                <p className="text-muted-foreground">Subtotal:</p>
                <p className="text-lg">${subtotal}</p>
              </div>
              <div className="flex justify-between mt-2 items-center">
                <p className="text-muted-foreground flex flex-col">
                  Shipping:
                  <span className="text-xs">(free for orders above $50)</span>
                </p>
                {shipping == 0 ? (
                  <p className="font-bold text-green-600">Free</p>
                ) : (
                  <p className="text-muted-foreground">${shipping}</p>
                )}
              </div>
              <div className="flex justify-between mt-2">
                <p className="font-bold text-2xl">Total:</p>
                <p className="text-2xl font-bold">
                  ${calculateTotal(subtotal)}
                </p>
              </div>
            </div>

            <Button className="mt-4 w-full h-14 text-lg font-bold">
              Proceed to Payment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
