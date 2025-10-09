import type { NutritionalContent, UpdateNutritionalContent } from "../types/product/NutritionalContent";

export const NutritionalContentFactory = {

    create: (input: NutritionalContent): NutritionalContent => {
        return {

            energy: input.energy,
            fat: input.fat,
            saturatedfat: input.saturatedfat,
            protein: input.protein,
            salt: input.salt
        }
    },

    read: (orderInfo: NutritionalContent): NutritionalContent => {
        return {

            ...orderInfo

        }
    },

    update: (changes: UpdateNutritionalContent): UpdateNutritionalContent => {
        return {

            ...changes,
            updatedAt: new Date
        }
    }
    
};