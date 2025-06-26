/**
 * Queue Class
 * Implements a FIFO (First In, First Out) data structure.
 * This implementation uses an internal array with head/tail pointers
 * to achieve efficient O(1) enqueue and dequeue operations,
 * avoiding the O(N) complexity of Array.shift().
 */
export class Queue<T> {
    private items: { [key: number]: T }; // Using an object as a hash map for efficient access by index
    private headIndex: number;          // Index of the first element (front of the queue)
    private tailIndex: number;          // Index where the next element will be added (end of the queue)
    private currentSize: number;        // Current number of elements in the queue
    constructor() {
        this.items = {};
        this.headIndex = 0;
        this.tailIndex = 0;
        this.currentSize = 0;
    }
    /**
     * Adds an element to the back (end) of the queue.
     * Time Complexity: O(1)
     * @param element The element to be added to the queue.
     */
    public enqueue(element: T): void {
        this.items[this.tailIndex] = element;
        this.tailIndex++;
        this.currentSize++;
    }
    /**
     * Removes and returns the element from the front of the queue.
     * Time Complexity: O(1)
     * @returns The element at the front of the queue, or undefined if the queue is empty.
     */
    public dequeue(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        const element = this.items[this.headIndex];
        delete this.items[this.headIndex]; // Remove the reference to free up memory
        this.headIndex++;
        this.currentSize--;
        return element;
    }
    /**
     * Returns the element at the front of the queue without removing it.
     * Time Complexity: O(1)
     * @returns The element at the front of the queue, or undefined if the queue is empty.
     */
    public peek(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.headIndex];
    }
    /**
     * Checks if the queue is empty.
     * Time Complexity: O(1)
     * @returns True if the queue contains no elements, false otherwise.
     */
    public isEmpty(): boolean {
        return this.currentSize === 0; // Or this.headIndex === this.tailIndex
    }
    /**
     * Returns the number of elements in the queue.
     * Time Complexity: O(1)
     * @returns The number of elements in the queue.
     */
    public getSize(): number {
        return this.currentSize; // Or this.tailIndex - this.headIndex
    }
    /**
     * Clears all elements from the queue.
     * Time Complexity: O(1) (reassigning object and resetting pointers).
     */
    public clear(): void {
        this.items = {};
        this.headIndex = 0;
        this.tailIndex = 0;
        this.currentSize = 0;
    }
    /**
     * Converts the queue to a standard JavaScript array (from front to back).
     * @returns An array representation of the queue.
     */
    public toArray(): T[] {
        const arr: T[] = [];
        for (let i = this.headIndex; i < this.tailIndex; i++) {
            arr.push(this.items[i]);
        }
        return arr;
    }
}