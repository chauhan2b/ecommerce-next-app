import { fetchProducts } from "@/app/lib/data";
import { Star } from "lucide-react";
import Image from "next/image";

export default async function Home() {
  const products = await fetchProducts();

  return (
    <div className="flex justify-center bg-gray-50">
      <div className="grid md:grid-cols-3 2xl:grid-cols-4 gap-6 p-4">
        {products.map((product) => {
          const { id, title, thumbnail, price, discountPercentage, rating } =
            product;
          const discountedPrice = (
            price -
            (price * discountPercentage) / 100
          ).toFixed(2);

          return (
            <div
              key={id}
              className="flex flex-col items-start p-4 max-w-sm bg-white rounded-lg shadow-sm"
            >
              <div className="flex justify-center w-full">
                <Image
                  src={thumbnail}
                  alt={title}
                  height={300}
                  width={300}
                  className="rounded-lg"
                />
              </div>
              <div className="gap-1 flex flex-col w-full mt-4">
                <h1 className="text-xl font-bold">{title}</h1>
                <p className="text-gray-600 line-through text-sm">${price}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <p className="text-2xl font-bold">${discountedPrice}</p>
                    <p className="bg-green-600 px-2 py-1 rounded-lg text-white font-bold text-sm">
                      {discountPercentage}% off
                    </p>
                  </div>
                  <div className="flex gap-2 items-center ">
                    <Star
                      className="w-5 h-5 text-yellow-300"
                      fill="currentColor"
                    />
                    {rating}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
