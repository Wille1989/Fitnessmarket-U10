import type { ProductRating } from "../types/product/ProductRating";

export const ProductRatingFactory = {

    create: (data: ProductRating ): ProductRating => {
        return {
            average: data.average,
            sum: data.sum,
            totalRatings: data.totalRatings
        };
    },

    update: (current: ProductRating, changes: number): ProductRating => {
            const newSum = current.sum + changes;
            const newTotal = current.totalRatings +1;
            const newAverage = Number((newSum / newTotal).toFixed(2));

            return {
                sum: newSum,
                totalRatings: newTotal,
                average: newAverage,
            };
    }
};