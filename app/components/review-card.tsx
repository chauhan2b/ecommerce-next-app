import { Star } from "lucide-react";
import { Review } from "../lib/definitions";
import { formatDate } from "@/lib/utils";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex gap-2">
            <p className="text-md font-medium">{review.reviewerName}</p>
            <div className="flex gap-2">
              <Star className="w-5 h-5 text-yellow-300" fill="currentColor" />
              <p>{review.rating}</p>
            </div>
          </div>
          <p className="text-gray-500 text-sm">{review.reviewerEmail}</p>
        </div>
        <p className="text-gray-600">{formatDate(review.date)}</p>
      </div>
      <p className="text-gray-700 mt-2">{review.comment}</p>
    </div>
  );
}
