/**
 * Type definition for a comparison function.
 * It should return:
 * - A negative number if a is considered "less than" b
 * - 0 if a and b are considered "equal"
 * - A positive number if a is considered "greater than" b
 *
 * For a MIN-HEAP, (a, b) => a - b
 * For a MAX-HEAP, (a, b) => b - a
 */
export type CompareFunction<T> = (a: T, b: T) => number;

/**
 * Default comparison function for a Min-Heap (for numbers).
 */
const defaultMinHeapCompare = (a: number, b: number): number => a - b;

/**
 * Heap Class (Array-based Implementation)
 * Implements a min-heap or max-heap based on the provided comparison function.
 * Uses an array to represent the complete binary tree structure.
 */
export class Heap<T> {
    private heap: T[];
    private compare: CompareFunction<T>;
    /**
     * Constructs a new Heap instance.
     * @param compareFn Optional. A comparison function to determine heap type.
     * For a min-heap: (a, b) => a - b (for numbers)
     * For a max-heap: (a, b) => b - a (for numbers)
     * If not provided, a default min-heap comparison for numbers is used.
     * @param initialElements Optional. An array of elements to initialize the heap with.
     */
    constructor(compareFn?: CompareFunction<T>, initialElements: T[] = []) {
        this.heap = [];
        // If no custom comparator is provided, and T is number, use defaultMinHeapCompare
        if (compareFn) {
            this.compare = compareFn;
        } else {
            // Default to a Min-Heap if type T is number, otherwise throw error
            // This cast assumes the user will either provide a compareFn or use numbers
            this.compare = defaultMinHeapCompare as CompareFunction<T>;
        }
        if (initialElements.length > 0) {
            this.heap = [...initialElements]; // Copy elements
            this.buildHeap(); // Build heap from initial elements
        }
    }
    /**
     * Returns the number of elements in the heap.
     * Time Complexity: O(1)
     * @returns The number of elements.
     */
    public getSize(): number {
        return this.heap.length;
    }
    /**
     * Checks if the heap is empty.
     * Time Complexity: O(1)
     * @returns True if empty, false otherwise.
     */
    public isEmpty(): boolean {
        return this.heap.length === 0;
    }
    /**
     * Returns the top element of the heap (min for min-heap, max for max-heap) without removing it.
     * Time Complexity: O(1)
     * @returns The top element, or undefined if the heap is empty.
     */
    public peek(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.heap[0];
    }
    /**
     * Inserts an element into the heap.
     * Time Complexity: O(logN)
     * @param element The element to insert.
     */
    public insert(element: T): void {
        this.heap.push(element); // Add to the end
        this.heapifyUp(this.heap.length - 1); // Restore heap property by bubbling up
    }
    /**
     * Removes and returns the top element of the heap (min for min-heap, max for max-heap).
     * Time Complexity: O(logN)
     * @returns The top element, or undefined if the heap is empty.
     */
    public extract(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        if (this.heap.length === 1) {
            return this.heap.pop(); // Only one element, just remove it
        }
        const root = this.heap[0];
        this.heap[0] = this.heap.pop()!; // Move last element to root
        this.heapifyDown(0); // Restore heap property by bubbling down
        return root;
    }
    /**
     * Restores the heap property by moving an element up the heap.
     * Used after insertion.
     * @param index The index of the element to heapify up.
     */
    private heapifyUp(index: number): void {
        let currentIndex = index;
        // As long as it's not the root and the current element violates heap property with its parent
        while (currentIndex > 0 && this.compare(this.heap[currentIndex], this.heap[this.getParentIndex(currentIndex)]) < 0) {
            this.swap(currentIndex, this.getParentIndex(currentIndex));
            currentIndex = this.getParentIndex(currentIndex);
        }
    }
    /**
     * Restores the heap property by moving an element down the heap.
     * Used after extraction (removing root).
     * @param index The index of the element to heapify down.
     */
    private heapifyDown(index: number): void {
        let currentIndex = index;
        const lastIndex = this.heap.length - 1;
        while (true) {
            const leftChildIndex = this.getLeftChildIndex(currentIndex);
            const rightChildIndex = this.getRightChildIndex(currentIndex);
            let smallestOrLargestIndex = currentIndex; // Assume current is smallest/largest
            // Check left child
            if (leftChildIndex <= lastIndex && this.compare(this.heap[leftChildIndex], this.heap[smallestOrLargestIndex]) < 0) {
                smallestOrLargestIndex = leftChildIndex;
            }
            // Check right child
            if (rightChildIndex <= lastIndex && this.compare(this.heap[rightChildIndex], this.heap[smallestOrLargestIndex]) < 0) {
                smallestOrLargestIndex = rightChildIndex;
            }
            // If current element is already in correct position relative to children
            if (smallestOrLargestIndex === currentIndex) {
                break;
            }
            // Otherwise, swap and continue heapifying down
            this.swap(currentIndex, smallestOrLargestIndex);
            currentIndex = smallestOrLargestIndex;
        }
    }
    /**
     * Builds a heap from an initial array of elements.
     * Time Complexity: O(N) (can be optimized from naive O(N logN)).
     * This is done by starting from the last non-leaf node and heapifying down.
     */
    private buildHeap(): void {
        const firstNonLeafIndex = Math.floor(this.heap.length / 2) - 1;
        for (let i = firstNonLeafIndex; i >= 0; i--) {
            this.heapifyDown(i);
        }
    }
    /**
     * Helper method to get the parent index.
     * @param childIndex The index of the child node.
     * @returns The index of the parent node.
     */
    private getParentIndex(childIndex: number): number {
        return Math.floor((childIndex - 1) / 2);
    }
    /**
     * Helper method to get the left child index.
     * @param parentIndex The index of the parent node.
     * @returns The index of the left child node.
     */
    private getLeftChildIndex(parentIndex: number): number {
        return 2 * parentIndex + 1;
    }
    /**
     * Helper method to get the right child index.
     * @param parentIndex The index of the parent node.
     * @returns The index of the right child node.
     */
    private getRightChildIndex(parentIndex: number): number {
        return 2 * parentIndex + 2;
    }
    /**
     * Helper method to swap two elements in the heap array.
     * @param i Index of the first element.
     * @param j Index of the second element.
     */
    private swap(i: number, j: number): void {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
    /**
     * Clears the heap, making it empty.
     * Time Complexity: O(1)
     */
    public clear(): void {
        this.heap = [];
    }
    /**
     * Returns a copy of the internal heap array.
     * Note: This exposes the internal array, which might not always represent the
     * logical tree structure directly after insertions/extractions without visualization.
     * It's primarily for debugging or specific testing.
     * @returns A copy of the heap array.
     */
    public toArray(): T[] {
        return [...this.heap];
    }
}

// Example usage of comparison functions for numbers:
export const minHeapNumberCompare: CompareFunction<number> = (a, b) => a - b;
export const maxHeapNumberCompare: CompareFunction<number> = (a, b) => b - a;

// Example for a custom object comparison (e.g., sorting by age for a Min-Heap)
interface Person {
  name: string;
  age: number;
}
export const minHeapPersonByAgeCompare: CompareFunction<Person> = (p1, p2) => p1.age - p2.age;
export const maxHeapPersonByAgeCompare: CompareFunction<Person> = (p1, p2) => p2.age - p1.age;