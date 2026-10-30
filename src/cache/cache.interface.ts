export interface ICache {
    get<T>(key: string): Promise<T | null>
    set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>
    del(...keys: string[]): Promise<void>

    remember<T>(key: string, loader: () => Promise<T | null>, ttlSeconds?: number): Promise<T | null>;
}
