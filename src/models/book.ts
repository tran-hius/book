import { BookType } from "../types/book.type.js";
import { BookResponseDTO } from "../dtos/book.js";

export class Book implements BookType {
    public id?: number | undefined;
    public title: string;
    public author: string;
    public publisher: string;
    public publishDate: Date;
    public genre: string;
    public description: string;
    public price: number;
    public stock: number;
    public coverImageUrl?: string | undefined;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(
        title: string,
        author: string,
        publisher: string,
        publishDate: Date,
        genre: string,
        description: string,
        price: number,
        stock: number,
        createdAt: Date,
        updatedAt: Date,
        id?: number,
        coverImageUrl?: string
    ) {
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.publishDate = publishDate;
        this.genre = genre;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.id = id;
        this.coverImageUrl = coverImageUrl;
    }

    static toObject(raw: Record<string, any>): Book {
        return new Book(
            raw.title,
            raw.author,
            raw.publisher,
            raw.publish_date,
            raw.genre,
            raw.description,
            raw.price,
            raw.stock,
            raw.created_at,
            raw.updated_at,
            raw.id,
            raw.cover_image_url
        );
    }

    toJSON(): BookResponseDTO {
        return {
            id: this.id!,
            title: this.title,
            author: this.author,
            publisher: this.publisher,
            publish_date: this.publishDate,
            genre: this.genre,
            description: this.description,
            price: this.price,
            stock: this.stock,
            cover_image_url: this.coverImageUrl,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        }
    }

    toResponseDTO(): BookResponseDTO {
        return this.toJSON();
    }
}
