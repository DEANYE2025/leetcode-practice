/**
 * Stack Class
 * Implements a LIFO (Last In, First Out) data structure.
 * This implementation uses a JavaScript array internally.
 */
export class Stack<T> {
    private items: T[]; // Internal array to store stack elements
    private size: number; // Current number of elements in the stack
    constructor() {
        this.items = [];
        this.size = 0;
    }
    /**
     * Pushes an element onto the top of the stack.
     * Time Complexity: O(1) on average (amortized due to array resizing in JS), O(N) in worst case (rare resize).
     * @param element The element to be pushed onto the stack.
     */
    public push(element: T): void {
        this.items.push(element);
        this.size++;
    }
    /**
     * Removes and returns the element at the top of the stack.
     * Time Complexity: O(1) on average.
     * @returns The element at the top of the stack, or undefined if the stack is empty.
     */
    public pop(): T | undefined {
        if (this.isEmpty()) {
            return undefined; // Or throw an error
        }
        this.size--;
        return this.items.pop();
    }
    /**
     * Returns the element at the top of the stack without removing it.
     * Time Complexity: O(1).
     * @returns The element at the top of the stack, or undefined if the stack is empty.
     */
    public peek(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.size - 1]; // Or this.items[this.items.length - 1];
    }
    /**
     * Checks if the stack is empty.
     * Time Complexity: O(1).
     * @returns True if the stack contains no elements, false otherwise.
     */
    public isEmpty(): boolean {
        return this.size === 0; // Or this.items.length === 0;
    }
    /**
     * Returns the number of elements in the stack.
     * Time Complexity: O(1).
     * @returns The number of elements in the stack.
     */
    public getSize(): number {
        return this.size; // Or this.items.length;
    }
    /**
     * Clears all elements from the stack.
     * Time Complexity: O(1) (reassigning array reference).
     */
    public clear(): void {
        this.items = [];
        this.size = 0;
    }
    /**
     * Converts the stack to a standard JavaScript array (from bottom to top).
     * @returns An array representation of the stack.
     */
    public toArray(): T[] {
        return [...this.items]; // Return a shallow copy
    }
}