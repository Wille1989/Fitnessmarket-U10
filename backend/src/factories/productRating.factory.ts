import type { ProductRating } from "../types/product/ProductRating";

export const ProductRatingFactory = {

    create: (data: ProductRating ): ProductRating => {
        return {
            average: data.average,
            sum: data.sum,
            totalRatings: data.totalRatings
        };
    }
};