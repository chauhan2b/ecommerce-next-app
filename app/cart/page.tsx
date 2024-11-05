import Image from "next/image";
import { getCartItems } from "../lib/data";
import { Button } from "@/components/ui/button";
// import { CartItem } from "../lib/definitions";
import Link from "next/link";

export default function Page() {
  const cartItems = getCartItems();
  // const cartItems = [] as CartItem[];

  return (
    <div className="h-screen p-4">
      <h1 className="text-2xl font-bold">Your Cart</h1>

      {/* Cart Items */}
      {cartItems.length === 0 && (
        <div className="mt-4 flex gap-2 items-center">
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

      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center space-x-4">
          <Image
            src={item.thumbnail}
            alt={item.name}
            width={120}
            height={120}
          />
          <div>
            <h2 className="font-bold">{item.name}</h2>
            <p className="text-muted-foreground">${item.price} per item</p>
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
              <p className="font-bold text-lg">${item.price * item.quantity}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Total */}
      {cartItems.length > 0 && (
        <div className="mt-4">
          <h1 className="font-bold text-2xl">Checkout</h1>
        </div>
      )}
    </div>
  );
}
