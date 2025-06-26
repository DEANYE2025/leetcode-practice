/**
 * Linked List Node Class
 * Each node contains a value and a pointer to the next node.
 */
export class ListNode<T> {
    value: T;
    next: ListNode<T> | null; // Pointer to the next node, or null if none
    constructor(value: T, next: ListNode<T> | null = null) {
        this.value = value;
        this.next = next;
    }
}

/**
 * Linked List Class
 * Provides various operations for the linked list, such as adding, removing, and searching.
 */
export class LinkedList<T> {
    private head: ListNode<T> | null; // The head node of the list
    private tail: ListNode<T> | null; // The tail node of the list (for O(1) appending)
    private size: number;            // Current number of elements in the list
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    /**
     * Get the current number of elements in the linked list.
     * @returns The number of elements
     */
    public getSize(): number {
        return this.size;
    }
    /**
     * Check if the linked list is empty.
     * @returns True if empty, false otherwise
     */
    public isEmpty(): boolean {
        return this.size === 0;
    }
    /**
     * Add an element to the end of the linked list.
     * Time Complexity: O(1)
     * @param value The element to add
     */
    public addLast(value: T): void {
        const newNode = new ListNode(value);
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail!.next = newNode; // Type assertion: tail must exist if not empty
            this.tail = newNode;
        }
        this.size++;
    }
    /**
     * Add an element to the front of the linked list.
     * Time Complexity: O(1)
     * @param value The element to add
     */
    public addFirst(value: T): void {
        const newNode = new ListNode(value, this.head);
        this.head = newNode;
        if (this.isEmpty()) { // If the list was previously empty, head and tail are the new node
            this.tail = newNode;
        }
        this.size++;
    }
    /**
     * Insert an element at a specified index.
     * Time Complexity: O(N)
     * @param index The index at which to insert
     * @param value The element to insert
     * @throws Error if index is out of bounds
     */
    public insert(index: number, value: T): void {
        if (index < 0 || index > this.size) {
            throw new Error("Index out of bounds for insert operation.");
        }
        if (index === 0) {
            this.addFirst(value);
        } else if (index === this.size) {
            this.addLast(value);
        } else {
            let current = this.head;
            for (let i = 0; i < index - 1; i++) {
                current = current!.next; // Find the node before the insertion point
            }
            const newNode = new ListNode(value, current!.next);
            current!.next = newNode;
            this.size++;
        }
    }
    /**
     * Remove the element from the head of the linked list.
     * Time Complexity: O(1)
     * @returns The removed element, or null if the list is empty
     */
    public removeFirst(): T | null {
        if (this.isEmpty()) {
            return null;
        }
        const removedValue = this.head!.value;
        this.head = this.head!.next; // Move head pointer to the next node
        this.size--;
        if (this.isEmpty()) { // If the list becomes empty after removal, tail also becomes null
            this.tail = null;
        }
        return removedValue;
    }
    /**
     * Remove the element from the tail of the linked list.
     * Time Complexity: O(N) (requires traversing to find the second-to-last node)
     * @returns The removed element, or null if the list is empty
     */
    public removeLast(): T | null {
        if (this.isEmpty()) {
            return null;
        }
        if (this.size === 1) { // If there's only one element, just clear the list
            const removedValue = this.head!.value;
            this.head = null;
            this.tail = null;
            this.size--;
            return removedValue;
        }
        let current = this.head;
        while (current!.next !== this.tail) { // Find the second-to-last node
            current = current!.next;
        }
        const removedValue = this.tail!.value;
        current!.next = null; // The second-to-last node becomes the new tail
        this.tail = current;
        this.size--;
        return removedValue;
    }
    /**
     * Remove the element at a specified index.
     * Time Complexity: O(N)
     * @param index The index of the element to remove
     * @returns The removed element
     * @throws Error if index is out of bounds
     */
    public removeAt(index: number): T {
        if (index < 0 || index >= this.size) {
            throw new Error("Index out of bounds for removeAt operation.");
        }
        if (index === 0) {
            const removed = this.removeFirst();
            if (removed === null) throw new Error("Unexpected empty list during removeAt(0)"); // Should not happen with valid size check
            return removed;
        }
        // Find the node before the node to be removed
        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            current = current!.next;
        }
        const removedNode = current!.next!; // The node to be removed
        current!.next = removedNode.next;   // Skip the removed node
        if (removedNode === this.tail) { // If the removed node was the tail, update tail
            this.tail = current;
        }
        this.size--;
        return removedNode.value;
    }
    /**
     * Remove the first occurrence of a specific value.
     * Time Complexity: O(N)
     * @param value The value to remove
     * @returns True if the value was successfully removed, false otherwise
     */
    public remove(value: T): boolean {
        if (this.isEmpty()) {
            return false;
        }
        // If the head node contains the value
        if (this.head!.value === value) {
            this.removeFirst();
            return true;
        }
        let current = this.head;
        // Find the node before the node to be removed
        while (current!.next !== null && current!.next.value !== value) {
            current = current!.next;
        }
        if (current!.next === null) { // Value not found
            return false;
        }
        // Found the node to be removed, its previous node is 'current'
        const removedNode = current!.next;
        current!.next = removedNode.next; // Skip the removed node
        if (removedNode === this.tail) { // If the removed node was the tail, update tail
            this.tail = current;
        }
        this.size--;
        return true;
    }
    /**
     * Check if the linked list contains a specific value.
     * Time Complexity: O(N)
     * @param value The value to search for
     * @returns True if the value is found, false otherwise
     */
    public contains(value: T): boolean {
        let current = this.head;
        while (current !== null) {
            if (current.value === value) {
                return true;
            }
            current = current.next;
        }
        return false;
    }
    /**
     * Find the first index of a specific value.
     * Time Complexity: O(N)
     * @param value The value to search for
     * @returns The index of the first occurrence of the element, or -1 if not found
     */
    public indexOf(value: T): number {
        let current = this.head;
        let index = 0;
        while (current !== null) {
            if (current.value === value) {
                return index;
            }
            current = current.next;
            index++;
        }
        return -1;
    }
    /**
     * Get the element at a specified index.
     * Time Complexity: O(N)
     * @param index The index
     * @returns The element at the given index
     * @throws Error if index is out of bounds
     */
    public get(index: number): T {
        if (index < 0 || index >= this.size) {
            throw new Error("Index out of bounds for get operation.");
        }
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current!.next;
        }
        return current!.value;
    }
    /**
     * Convert the linked list to a standard JavaScript array.
     * @returns A copy of the array containing all elements of the list
     */
    public toArray(): T[] {
        const arr: T[] = [];
        let current = this.head;
        while (current !== null) {
            arr.push(current.value);
            current = current.next;
        }
        return arr;
    }
}