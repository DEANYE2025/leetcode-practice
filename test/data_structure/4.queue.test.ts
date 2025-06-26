import { Queue } from '../../src/data_structure/4.queue';

describe('Queue', () => {
    let queue: Queue<number>;

    beforeEach(() => {
        queue = new Queue<number>();
    });

    test('should initialize as empty', () => {
        expect(queue.getSize()).toBe(0);
        expect(queue.isEmpty()).toBe(true);
        expect(queue.peek()).toBeUndefined();
        expect(queue.dequeue()).toBeUndefined();
        expect(queue.toArray()).toEqual([]);
    });

    // --- Enqueue Operations ---
    test('should enqueue elements to the back of the queue', () => {
        queue.enqueue(10);
        expect(queue.getSize()).toBe(1);
        expect(queue.isEmpty()).toBe(false);
        expect(queue.peek()).toBe(10); // 10 is at the front
        expect(queue.toArray()).toEqual([10]);

        queue.enqueue(20);
        expect(queue.getSize()).toBe(2);
        expect(queue.peek()).toBe(10); // 10 is still at the front
        expect(queue.toArray()).toEqual([10, 20]);

        queue.enqueue(30);
        expect(queue.getSize()).toBe(3);
        expect(queue.peek()).toBe(10); // 10 is still at the front
        expect(queue.toArray()).toEqual([10, 20, 30]);
    });

    // --- Dequeue Operations ---
    test('should dequeue elements from the front of the queue in FIFO order', () => {
        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30); // Queue: [10, 20, 30] (front to back)

        let dequeued = queue.dequeue();
        expect(dequeued).toBe(10);
        expect(queue.getSize()).toBe(2);
        expect(queue.peek()).toBe(20); // 20 is new front
        expect(queue.toArray()).toEqual([20, 30]);

        dequeued = queue.dequeue();
        expect(dequeued).toBe(20);
        expect(queue.getSize()).toBe(1);
        expect(queue.peek()).toBe(30); // 30 is new front
        expect(queue.toArray()).toEqual([30]);

        dequeued = queue.dequeue();
        expect(dequeued).toBe(30);
        expect(queue.getSize()).toBe(0);
        expect(queue.peek()).toBeUndefined();
        expect(queue.isEmpty()).toBe(true);
        expect(queue.toArray()).toEqual([]);
    });

    test('should return undefined when dequeuing from an empty queue', () => {
        expect(queue.dequeue()).toBeUndefined();
        expect(queue.isEmpty()).toBe(true);
        expect(queue.getSize()).toBe(0);
    });

    // --- Peek Operations ---
    test('should peek the front element without removing it', () => {
        queue.enqueue(10);
        queue.enqueue(20);
        expect(queue.peek()).toBe(10);
        expect(queue.getSize()).toBe(2); // Size should not change after peek
    });

    test('should return undefined when peeking an empty queue', () => {
        expect(queue.peek()).toBeUndefined();
    });

    // --- isEmpty Operation ---
    test('isEmpty should return true for an empty queue and false otherwise', () => {
        expect(queue.isEmpty()).toBe(true);
        queue.enqueue(10);
        expect(queue.isEmpty()).toBe(false);
        queue.dequeue();
        expect(queue.isEmpty()).toBe(true);
    });

    // --- getSize Operation ---
    test('getSize should return the correct number of elements', () => {
        expect(queue.getSize()).toBe(0);
        queue.enqueue(1);
        expect(queue.getSize()).toBe(1);
        queue.enqueue(2);
        queue.enqueue(3);
        expect(queue.getSize()).toBe(3);
        queue.dequeue();
        expect(queue.getSize()).toBe(2);
        queue.clear();
        expect(queue.getSize()).toBe(0);
    });

    // --- Clear Operation ---
    test('should clear all elements from the queue', () => {
        queue.enqueue(10);
        queue.enqueue(20);
        queue.clear();
        expect(queue.getSize()).toBe(0);
        expect(queue.isEmpty()).toBe(true);
        expect(queue.peek()).toBeUndefined();
        expect(queue.toArray()).toEqual([]);
    });

    // --- toArray Operation ---
    test('should convert queue to array correctly', () => {
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        expect(queue.toArray()).toEqual([1, 2, 3]);
    });

    test('should convert empty queue to empty array', () => {
        expect(queue.toArray()).toEqual([]);
    });
});