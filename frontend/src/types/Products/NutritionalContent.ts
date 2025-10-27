export type NutritionalContent = {
    _id?: string
    energy: number
    fat: number
    saturatedfat: number
    protein: number
    salt: number
    createdAt?: Date
    updatedAt?: Date
}

export type UpdateNutritionalContent = Partial<{
    _id?: string
    energy: string
    fat: string
    saturatedfat: string
    protein: string
    salt: string
    createdAt?: Date
    updatedAt?: Date
}>