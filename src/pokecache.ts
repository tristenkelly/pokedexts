
export type CacheEntry<T> = {
    val: T;
    createdAt: number;
};

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key: string, value: any): void {
        const entry: CacheEntry<any> = {
            val: value,
            createdAt: Date.now()
        };
        this.#cache.set(key, entry);
    }

    get<T>(key: string): T | undefined {
        const entry = this.#cache.get(key);
        if (entry) {
            return entry.val as T;
        }
    }

    #reap(): void {
        const now = Date.now();
        for (const [key, entry] of this.#cache.entries()) {
            if (now - entry.createdAt > this.#interval) {
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop(): void {
        if (this.#reapIntervalId) return;
        this.#reapIntervalId = setInterval(() => 
            this.#reap(), this.#interval);
    }
    
    stopReapLoop(): void {
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }
}