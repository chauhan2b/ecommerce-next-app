import Image from "next/image";
import { getCartItems } from "../lib/data";
import { Button } from "@/components/ui/button";
// import { CartItem } from "../lib/definitions";
import Link from "next/link";

export default function Page() {
  const cartItems = getCartItems();
  // const cartItems = [] as CartItem[];

  const calculateSubtotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="h-screen p-4 md:mx-20 2xl:mx-40">
      {/* Cart Items */}
      {cartItems.length === 0 && (
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
      )}

      <div className="lg:grid lg:grid-cols-[60%_40%] 2xl:grid-cols-[65%_35%] md:gap-12">
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
                />
                <div>
                  <h2 className="font-bold line-clamp-2">{item.name}</h2>
                  <p className="text-muted-foreground">
                    ${item.price} per item
                  </p>
                </div>
                <div className="flex flex-col flex-1 items-end space-y-2">
                  <div className="flex items-center">
                    <Button className="h-8 w-8 p-1 text-lg" variant="outline">
                      -
                    </Button>
                    <span className="px-3">1</span>
                    <Button className="h-8 w-8 p-1 text-lg" variant="outline">
                      +
                    </Button>
                  </div>
                  <div>
                    <p className="font-bold text-lg">
                      ${item.price * item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div>
          {cartItems.length > 0 && (
            <h1 className="font-bold text-2xl mt-4 lg:mt-0">Checkout</h1>
          )}
          {cartItems.length > 0 && (
            <div className="bg-gray-50 px-4 py-2 rounded-xl mt-4">
              <div className="flex justify-between mt-2">
                <p className="text-muted-foreground">Subtotal:</p>
                <p className="text-lg">${calculateSubtotal()}</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-muted-foreground">Shipping:</p>
                <p className="font-bold text-green-600">Free</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="font-bold text-2xl">Total:</p>
                <p className="text-2xl font-bold">${calculateSubtotal()}</p>
              </div>
            </div>
          )}
          {cartItems.length > 0 && (
            <Button className="mt-4 w-full h-14 text-lg font-bold">
              Proceed to Payment
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
