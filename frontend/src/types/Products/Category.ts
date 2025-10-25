export type Category = {
    _id: string
    title: string
    description: string
}

export type CreateCategory = {
    title: string
    description: string
}

export type UpdateCategory = Partial <{
    id: string
    title: string
    description: string
    updatedAt: Date
}>