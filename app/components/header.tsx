import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <div className="shadow-md p-4">
      <div className="flex justify-between items-center">
        <Link href="/" passHref>
          <h1 className="text-xl font-bold">E-commerce</h1>
        </Link>
        <div className="flex flex-col gap-2">
          <Link href="/cart" passHref>
            <Button variant="ghost">
              <ShoppingCart />
              Cart
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
