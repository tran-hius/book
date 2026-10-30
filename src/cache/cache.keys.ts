export class CacheKeys {
    static book(id: number): string {
        return `book:${id}`;
    }

    static bookList(page: number, limit: number): string {
        return `books:list:${page}:${limit}`;
    }

    static bookListVersion(): string {
        return "books:list:version";
    }
}