import { Review } from './review'

export interface Book {
    id: number
    title: string
    author: string
    year: number
    genre: string
    description: string
    reviews: Review[]
}