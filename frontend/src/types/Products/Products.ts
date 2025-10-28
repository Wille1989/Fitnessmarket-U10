import type { NutritionalContent, UpdateNutritionalContent } from "./NutritionalContent"

export type Product = {
    
    _id: string
    title: string
    price: number
    weight: number
    imageUrl: string
    originCountry: string
    rating: ProductRating
    nutritionalContent: NutritionalContent
    createdAt?: Date
    updatedAt?: Date

}

export type CreateProduct = {
  title: string;
  price: string;
  weight: string;
  imageUrl: string
  originCountry: string;
  nutritionalContent: {
    energy: string;
    fat: string;
    saturatedfat: string;
    salt: string;
    protein: string;
  };
};

export type UpdateProduct = Partial<{
    
    _id: string
    title: string
    price: string
    weight: string
    imageUrl: string
    originCountry: string
    rating: ProductRating
    nutritionalContent: UpdateNutritionalContent
    createdAt?: Date
    updatedAt?: Date

}>

export type ProductRating = {
    average: number
    sum: number
    totalRatings: number
}

export type ComparedProducts = {
  comparedProducts: string[];
  comparison: {
    field: string;
    productA: number;
    productB: number;
    comparedData: number;
  }[];
};