export interface BookType {
    id?: number
    title: string
    author: string
    publisher: string
    publishDate: Date
    genre: string
    description: string
    price: number
    stock: number
    coverImageUrl?: string
    createdAt: Date
    updatedAt: Date
}