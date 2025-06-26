/**
 * Interface for a key-value pair stored in the hash table.
 */
interface KeyValuePair<K, V> {
    key: K;
    value: V;
}

/**
 * HashTable Class (Separate Chaining Implementation)
 * Implements a hash table using an array as buckets and linked lists (arrays) for collision resolution.
 */
export class HashTable<K, V> {
    // Buckets to store key-value pairs. Each bucket is an array (acting as a linked list).
    private table: Array<KeyValuePair<K, V>[] | undefined>;
    private capacity: number; // The size of the internal array (number of buckets)
    private size: number;     // The number of actual key-value pairs stored
    private loadFactorThreshold: number; // When size/capacity exceeds this, resize
    private initialCapacity: number;     // Initial capacity for clearer tests/resets
    /**
     * Simple default hash function for strings.
     * Can be overridden or improved for other types.
     * @param key The key to hash.
     * @param capacity The current capacity of the hash table.
     * @returns An index within the table's capacity.
     */
    private defaultHashCode(key: K, capacity: number): number {
        if (typeof key === 'string') {
            let hash = 0;
            for (let i = 0; i < key.length; i++) {
                hash = (hash << 5) - hash + key.charCodeAt(i); // hash * 31 + charCode
                hash |= 0; // Convert to 32bit integer
            }
            return Math.abs(hash) % capacity;
        }
        // For non-string keys, a simple JSON.stringify or direct modulo if key is number
        // For complex objects, you'd need a custom hash function or rely on object identity
        if (typeof key === 'number') {
            return Math.abs(key) % capacity;
        }
        // Fallback for other types - might not be unique/efficient
        return Math.abs(String(key).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % capacity;
    }
    // A more flexible hash function property
    private hashCode: (key: K, capacity: number) => number;
    constructor(capacity: number = 53, loadFactorThreshold: number = 0.75,
                customHashCode?: (key: K, capacity: number) => number) {
        if (capacity <= 0) {
            throw new Error("Capacity must be a positive integer.");
        }
        this.initialCapacity = capacity;
        this.capacity = capacity;
        this.table = new Array(this.capacity);
        this.size = 0;
        this.loadFactorThreshold = loadFactorThreshold;
        this.hashCode = customHashCode || this.defaultHashCode;
    }
    /**
     * Returns the current number of key-value pairs in the hash table.
     * Time Complexity: O(1)
     * @returns The number of elements.
     */
    public getSize(): number {
        return this.size;
    }
    /**
     * Returns the current capacity (number of buckets) of the hash table.
     * Time Complexity: O(1)
     * @returns The capacity.
     */
    public getCapacity(): number {
        return this.capacity;
    }
    /**
     * Checks if the hash table is empty.
     * Time Complexity: O(1)
     * @returns True if empty, false otherwise.
     */
    public isEmpty(): boolean {
        return this.size === 0;
    }
    /**
     * Inserts a key-value pair into the hash table.
     * If the key already exists, its value will be updated.
     * Time Complexity: Average O(1), Worst O(N) (due to collision list traversal).
     * @param key The key to insert.
     * @param value The value associated with the key.
     */
    public set(key: K, value: V): void {
        const index = this.hashCode(key, this.capacity);
        if (this.table[index] === undefined) {
            this.table[index] = [];
        }
        const bucket = this.table[index]!;
        // Check if key already exists in the bucket
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket[i].value = value; // Update existing value
                return;
            }
        }
        // Add new key-value pair
        bucket.push({ key, value });
        this.size++;
        // Check load factor and resize if necessary
        if (this.size / this.capacity > this.loadFactorThreshold) {
            this.resize(this.capacity * 2); // Double the capacity
        }
    }
    /**
     * Retrieves the value associated with a given key.
     * Time Complexity: Average O(1), Worst O(N).
     * @param key The key to search for.
     * @returns The value associated with the key, or undefined if the key is not found.
     */
    public get(key: K): V | undefined {
        const index = this.hashCode(key, this.capacity);
        const bucket = this.table[index];
        if (bucket === undefined) {
            return undefined; // Bucket is empty
        }
        for (const pair of bucket) {
            if (pair.key === key) {
                return pair.value;
            }
        }
        return undefined; // Key not found in the bucket
    }
    /**
     * Checks if the hash table contains a specific key.
     * Time Complexity: Average O(1), Worst O(N).
     * @param key The key to check for existence.
     * @returns True if the key exists, false otherwise.
     */
    public has(key: K): boolean {
        return this.get(key) !== undefined;
    }
    /**
     * Deletes a key-value pair from the hash table.
     * Time Complexity: Average O(1), Worst O(N).
     * @param key The key to delete.
     * @returns True if the key was deleted, false if it was not found.
     */
    public delete(key: K): boolean {
        const index = this.hashCode(key, this.capacity);
        const bucket = this.table[index];
        if (bucket === undefined) {
            return false; // Key not found
        }
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket.splice(i, 1); // Remove the element from the array
                this.size--;
                // Optional: shrink if load factor is very low after deletion
                // if (this.size > this.initialCapacity && this.size / this.capacity < this.loadFactorThreshold / 4) {
                //   this.resize(Math.max(this.initialCapacity, Math.floor(this.capacity / 2)));
                // }
                return true;
            }
        }
        return false; // Key not found in the bucket
    }
    /**
     * Clears all key-value pairs from the hash table.
     * Time Complexity: O(1)
     */
    public clear(): void {
        this.table = new Array(this.initialCapacity);
        this.capacity = this.initialCapacity;
        this.size = 0;
    }
    /**
     * Internal method to resize the hash table when the load factor is exceeded.
     * Time Complexity: O(N) where N is the number of elements (must re-hash all existing elements).
     * @param newCapacity The new capacity for the hash table.
     */
    private resize(newCapacity: number): void {
        const oldTable = this.table;
        this.capacity = newCapacity;
        this.table = new Array(this.capacity);
        this.size = 0; // Reset size, as elements will be re-added
        // Re-insert all existing key-value pairs into the new table
        for (const bucket of oldTable) {
            if (bucket !== undefined) {
                for (const pair of bucket) {
                    this.set(pair.key, pair.value); // Use set() to re-hash and insert
                }
            }
        }
    }
    /**
     * Returns an array of all keys in the hash table.
     * Time Complexity: O(N + C) where N is number of elements, C is capacity (must iterate all buckets).
     * @returns An array of keys.
     */
    public keys(): K[] {
        const allKeys: K[] = [];
        for (const bucket of this.table) {
            if (bucket !== undefined) {
                for (const pair of bucket) {
                    allKeys.push(pair.key);
                }
            }
        }
        return allKeys;
    }
    /**
     * Returns an array of all values in the hash table.
     * Time Complexity: O(N + C).
     * @returns An array of values.
     */
    public values(): V[] {
        const allValues: V[] = [];
        for (const bucket of this.table) {
            if (bucket !== undefined) {
                for (const pair of bucket) {
                    allValues.push(pair.value);
                }
            }
        }
        return allValues;
    }
    /**
     * Returns an array of all key-value pairs in the hash table.
     * Time Complexity: O(N + C).
     * @returns An array of KeyValuePair objects.
     */
    public entries(): KeyValuePair<K, V>[] {
        const allEntries: KeyValuePair<K, V>[] = [];
        for (const bucket of this.table) {
            if (bucket !== undefined) {
                for (const pair of bucket) {
                    allEntries.push({ key: pair.key, value: pair.value });
                }
            }
        }
        return allEntries;
    }
}