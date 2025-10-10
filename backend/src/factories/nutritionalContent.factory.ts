import type { NutritionalContent, UpdateNutritionalContent } from "../types/product/NutritionalContent";

export const NutritionalContentFactory = {
    create: (
        formBody: NutritionalContent) : 
        NutritionalContent => {
        return {
            energy: formBody.energy,
            fat: formBody.fat,
            saturatedfat: formBody.saturatedfat,
            protein: formBody.protein,
            salt: formBody.salt
        }
    },
    update: (
        current: NutritionalContent, 
        changes: UpdateNutritionalContent) : 
        NutritionalContent => {
        return {
            ...current,
            ...changes,
            updatedAt: new Date()
        }
    }
};