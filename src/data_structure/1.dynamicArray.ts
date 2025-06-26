export const INITIAL_CAPACITY = 10; // Default initial capacity for the dynamic array
/**
 * Dynamic Array Class
 * Simulates an array data structure that can automatically resize.
 */
export class DynamicArray<T> {
    private data: T[];      // Internal array to store data
    private capacity: number; // Current capacity of the array
    private size: number;     // Current number of elements stored
    /**
     * Constructor
     * @param initialCapacity Initial capacity, defaults to 10
     */
    constructor(initialCapacity: number = INITIAL_CAPACITY) {
        if (initialCapacity <= 0) {
            throw new Error("Initial capacity must be positive.");
        }
        this.capacity = initialCapacity;
        this.data = new Array<T>(this.capacity);
        this.size = 0;
    }
    /**
     * Get the current number of elements in the array.
     * @returns The number of elements
     */
    public getSize(): number {
        return this.size;
    }
    /**
     * Get the current capacity of the array.
     * @returns The array's capacity
     */
    public getCapacity(): number {
        return this.capacity;
    }
    /**
     * Check if the array is empty.
     * @returns True if empty, false otherwise
     */
    public isEmpty(): boolean {
        return this.size === 0;
    }
    /**
     * Get the element at a specified index.
     * @param index The index
     * @returns The element at the given index
     * @throws Error if index is out of bounds
     */
    public get(index: number): T {
        if (index < 0 || index >= this.size) {
            throw new Error("Index out of bounds for get operation.");
        }
        return this.data[index];
    }
    /**
     * Set the value of an element at a specified index.
     * @param index The index
     * @param value The value to set
     * @throws Error if index is out of bounds
     */
    public set(index: number, value: T): void {
        if (index < 0 || index >= this.size) {
            throw new Error("Index out of bounds for set operation.");
        }
        this.data[index] = value;
    }
    /**
     * Add an element to the end of the array.
     * @param value The element to add
     */
    public add(value: T): void {
        if (this.size === this.capacity) {
            this.resize(this.capacity * 2); // Resize (double capacity)
        }
        this.data[this.size] = value;
        this.size++;
    }
    /**
     * Insert an element at a specified index.
     * @param index The index at which to insert
     * @param value The element to insert
     * @throws Error if index is out of bounds (allows insertion at `size`, equivalent to `add`)
     */
    public insert(index: number, value: T): void {
        if (index < 0 || index > this.size) { // Allow insertion at 'size' (end)
            throw new Error("Index out of bounds for insert operation.");
        }
        if (this.size === this.capacity) {
            this.resize(this.capacity * 2); // Resize (double capacity)
        }
        // Shift elements from 'index' onwards to the right by one position
        for (let i = this.size; i > index; i--) {
            this.data[i] = this.data[i - 1];
        }
        this.data[index] = value;
        this.size++;
    }
    /**
     * Remove the element at a specified index.
     * @param index The index of the element to remove
     * @returns The removed element
     * @throws Error if index is out of bounds
     */
    public remove(index: number): T {
        if (index < 0 || index >= this.size) {
            throw new Error("Index out of bounds for remove operation.");
        }
        const removedValue = this.data[index];
        // Shift elements from 'index' onwards to the left by one position
        for (let i = index; i < this.size - 1; i++) {
            this.data[i] = this.data[i + 1];
        }
        this.size--;
        // Shrink capacity (optional: when number of elements is too small)
        if (this.size <= this.capacity / 4) { // Shrink when size is <= 1/4 of capacity
            let resizedCapacity = Math.floor(this.capacity / 2);
            resizedCapacity = resizedCapacity <= 1 ? INITIAL_CAPACITY : resizedCapacity;
            this.resize(resizedCapacity);
        }
        return removedValue;
    }
    /**
     * Find the index of an element.
     * @param value The element to search for
     * @returns The index of the first occurrence of the element, or -1 if not found
     */
    public indexOf(value: T): number {
        for (let i = 0; i < this.size; i++) {
            if (this.data[i] === value) {
                return i;
            }
        }
        return -1;
    }
    /**
     * Convert the dynamic array to a standard JavaScript array.
     * @returns A copy of the array containing all current elements
     */
    public toArray(): T[] {
        // Slice the portion containing current valid elements
        return this.data.slice(0, this.size);
    }
    /**
     * Internal method: Adjusts the capacity of the array.
     * @param newCapacity The new capacity
     */
    private resize(newCapacity: number): void {
        const newData = new Array<T>(newCapacity);
        for (let i = 0; i < this.size; i++) {
            newData[i] = this.data[i];
        }
        this.data = newData;
        this.capacity = newCapacity;
        // console.log(`Resized to capacity: ${newCapacity}, size: ${this.size}`); // For debugging
    }
}