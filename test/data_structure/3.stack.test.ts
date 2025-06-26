import { Stack } from '../../src/data_structure/3.stack';

describe('Stack', () => {
    let stack: Stack<number>;

    beforeEach(() => {
        stack = new Stack<number>();
    });

    test('should initialize as empty', () => {
        expect(stack.getSize()).toBe(0);
        expect(stack.isEmpty()).toBe(true);
        expect(stack.peek()).toBeUndefined();
        expect(stack.pop()).toBeUndefined();
        expect(stack.toArray()).toEqual([]);
    });

    // --- Push Operations ---
    test('should push elements onto the stack', () => {
        stack.push(10);
        expect(stack.getSize()).toBe(1);
        expect(stack.isEmpty()).toBe(false);
        expect(stack.peek()).toBe(10);
        expect(stack.toArray()).toEqual([10]);

        stack.push(20);
        expect(stack.getSize()).toBe(2);
        expect(stack.peek()).toBe(20); // 20 is on top
        expect(stack.toArray()).toEqual([10, 20]);

        stack.push(30);
        expect(stack.getSize()).toBe(3);
        expect(stack.peek()).toBe(30); // 30 is on top
        expect(stack.toArray()).toEqual([10, 20, 30]);
    });

    // --- Pop Operations ---
    test('should pop elements off the stack in LIFO order', () => {
        stack.push(10);
        stack.push(20);
        stack.push(30); // Stack: [10, 20, 30] (bottom to top)

        let popped = stack.pop();
        expect(popped).toBe(30);
        expect(stack.getSize()).toBe(2);
        expect(stack.peek()).toBe(20);
        expect(stack.toArray()).toEqual([10, 20]);

        popped = stack.pop();
        expect(popped).toBe(20);
        expect(stack.getSize()).toBe(1);
        expect(stack.peek()).toBe(10);
        expect(stack.toArray()).toEqual([10]);

        popped = stack.pop();
        expect(popped).toBe(10);
        expect(stack.getSize()).toBe(0);
        expect(stack.peek()).toBeUndefined();
        expect(stack.isEmpty()).toBe(true);
        expect(stack.toArray()).toEqual([]);
    });

    test('should return undefined when popping from an empty stack', () => {
        expect(stack.pop()).toBeUndefined();
        expect(stack.isEmpty()).toBe(true);
        expect(stack.getSize()).toBe(0);
    });

    // --- Peek Operations ---
    test('should peek the top element without removing it', () => {
        stack.push(10);
        stack.push(20);
        expect(stack.peek()).toBe(20);
        expect(stack.getSize()).toBe(2); // Size should not change after peek
    });

    test('should return undefined when peeking an empty stack', () => {
        expect(stack.peek()).toBeUndefined();
    });

    // --- isEmpty Operation ---
    test('isEmpty should return true for an empty stack and false otherwise', () => {
        expect(stack.isEmpty()).toBe(true);
        stack.push(10);
        expect(stack.isEmpty()).toBe(false);
        stack.pop();
        expect(stack.isEmpty()).toBe(true);
    });

    // --- getSize Operation ---
    test('getSize should return the correct number of elements', () => {
        expect(stack.getSize()).toBe(0);
        stack.push(1);
        expect(stack.getSize()).toBe(1);
        stack.push(2);
        stack.push(3);
        expect(stack.getSize()).toBe(3);
        stack.pop();
        expect(stack.getSize()).toBe(2);
        stack.clear();
        expect(stack.getSize()).toBe(0);
    });

    // --- Clear Operation ---
    test('should clear all elements from the stack', () => {
        stack.push(10);
        stack.push(20);
        stack.clear();
        expect(stack.getSize()).toBe(0);
        expect(stack.isEmpty()).toBe(true);
        expect(stack.peek()).toBeUndefined();
        expect(stack.toArray()).toEqual([]);
    });

    // --- toArray Operation ---
    test('should convert stack to array correctly', () => {
        stack.push(1);
        stack.push(2);
        stack.push(3);
        expect(stack.toArray()).toEqual([1, 2, 3]);
    });

    test('should convert empty stack to empty array', () => {
        expect(stack.toArray()).toEqual([]);
    });
});