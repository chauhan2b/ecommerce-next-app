import AddToCart from "@/app/components/add-to-cart";
import ReviewCard from "@/app/components/review-card";
import { fetchProductDetails } from "@/app/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Star, Truck } from "lucide-react";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const id = (await params).id;

  if (!id) {
    return <div className="h-screen">Invalid product ID</div>;
  }

  const product = await fetchProductDetails(id! as string);
  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  const cartItem = {
    id: product.id,
    name: product.title,
    price: parseFloat(discountedPrice),
    quantity: 1,
    thumbnail: product.thumbnail,
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 justify-center items-center xl:px-40 md:max-h-min my-4">
        <div className="flex justify-center">
          <Image
            src={product.images[0]}
            width={500}
            height={500}
            objectFit="cover"
            alt={product.title}
            className="rounded-lg lg:max-h-[700px] w-auto"
          />
        </div>
        <div className="p-2 md: pl-6 gap-4 flex flex-col lg:min-w-[500px] lg:max-w-[650px]">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <div className="flex gap-2 items-center ">
            <Star className="w-5 h-5 text-yellow-300" fill="currentColor" />
            {product.rating}
            <p className="pl-2 text-gray-500">
              {product.reviews.length} reviews
            </p>
            <p>{product.stock} in stock</p>
          </div>
          <div>
            <p className="text-gray-600 line-through text-sm">
              ${product.price}
            </p>
            <div className="flex gap-2 items-center">
              <p className="text-2xl font-bold">${discountedPrice}</p>
              <p className="bg-green-600 px-2 py-1 rounded-lg text-white font-bold text-sm">
                {product.discountPercentage}% off
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <AddToCart cartItem={cartItem} />
            <Button className="p-6" variant="outline">
              <Heart className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex gap-2 items-center text-gray-500">
            <Truck />
            <p>{product.shippingInformation}</p>
          </div>
          <div className="hidden lg:block">
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-bold mt-2">Description</h1>
              <p className="text-lg text-muted-foreground">
                {product.description}
              </p>
            </div>
            <div className=" flex flex-col gap-2">
              <h1 className="text-xl font-bold mt-2">Tags</h1>
              {product.tags.length > 0 && (
                <div className="flex gap-2">
                  {product.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="text-sm bg-gray-100 text-black font-normal hover:text-white"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 lg:hidden md:mx-20">
        <div className=" flex flex-col gap-2">
          <h1 className="text-xl font-bold mt-2">Description</h1>
          <p className="text-lg text-muted-foreground">{product.description}</p>
        </div>
        <div className=" flex flex-col gap-2">
          <h1 className="text-xl font-bold mt-2">Tags</h1>
          {product.tags.length > 0 && (
            <div className="flex gap-2">
              {product.tags.map((tag) => (
                <Badge
                  key={tag}
                  className="text-sm bg-gray-100 text-black font-normal hover:text-white"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 md:mx-20 xl:mx-40 px-6 pb-4">
        <h1 className="text-xl font-bold mt-4">Reviews</h1>
        <div className="grid lg:grid-cols-2 gap-4">
          {product.reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}
