import { 
    Heap,
    minHeapNumberCompare,
    maxHeapNumberCompare,
    minHeapPersonByAgeCompare
} from '../../src/data_structure/8.heap';

describe('Heap', () => {
    // --- Common Initialization and Basic Checks ---
    test('should initialize as empty', () => {
        const minHeap = new Heap<number>();
        expect(minHeap.getSize()).toBe(0);
        expect(minHeap.isEmpty()).toBe(true);
        expect(minHeap.peek()).toBeUndefined();
        expect(minHeap.extract()).toBeUndefined();
        expect(minHeap.toArray()).toEqual([]);
    });

    test('should initialize with initial elements and build heap correctly (min-heap)', () => {
        const elements = [5, 3, 8, 1, 6, 2];
        const minHeap = new Heap<number>(minHeapNumberCompare, elements);
        expect(minHeap.getSize()).toBe(6);
        expect(minHeap.peek()).toBe(1); // Smallest element should be at the top
        expect(minHeap.extract()).toBe(1); // Extract smallest
        expect(minHeap.getSize()).toBe(5);
        expect(minHeap.extract()).toBe(2);
    });

    test('should initialize with initial elements and build heap correctly (max-heap)', () => {
        const elements = [5, 3, 8, 1, 6, 2];
        const maxHeap = new Heap<number>(maxHeapNumberCompare, elements);
        expect(maxHeap.getSize()).toBe(6);
        expect(maxHeap.peek()).toBe(8); // Largest element should be at the top
        expect(maxHeap.extract()).toBe(8); // Extract largest
        expect(maxHeap.getSize()).toBe(5);
        expect(maxHeap.extract()).toBe(6);
    });

    // --- Min-Heap Specific Tests ---
    describe('Min-Heap (Numbers)', () => {
        let minHeap: Heap<number>;

        beforeEach(() => {
            minHeap = new Heap<number>(minHeapNumberCompare);
        });

        test('should insert elements and maintain min-heap property', () => {
            minHeap.insert(10);
            expect(minHeap.peek()).toBe(10);
            minHeap.insert(5);
            expect(minHeap.peek()).toBe(5);
            minHeap.insert(15);
            expect(minHeap.peek()).toBe(5);
            minHeap.insert(3);
            expect(minHeap.peek()).toBe(3);
            minHeap.insert(12);
            expect(minHeap.peek()).toBe(3);
            expect(minHeap.getSize()).toBe(5);
        });

        test('should extract elements in ascending order', () => {
            minHeap.insert(10);
            minHeap.insert(5);
            minHeap.insert(15);
            minHeap.insert(3);
            minHeap.insert(12);
            minHeap.insert(1); // Smallest

            expect(minHeap.extract()).toBe(1);
            expect(minHeap.extract()).toBe(3);
            expect(minHeap.extract()).toBe(5);
            expect(minHeap.extract()).toBe(10);
            expect(minHeap.extract()).toBe(12);
            expect(minHeap.extract()).toBe(15);
            expect(minHeap.isEmpty()).toBe(true);
            expect(minHeap.extract()).toBeUndefined();
        });

        test('should handle duplicate elements correctly', () => {
            minHeap.insert(5);
            minHeap.insert(3);
            minHeap.insert(5);
            minHeap.insert(1);
            expect(minHeap.getSize()).toBe(4);
            expect(minHeap.extract()).toBe(1);
            expect(minHeap.extract()).toBe(3);
            expect(minHeap.extract()).toBe(5);
            expect(minHeap.extract()).toBe(5);
            expect(minHeap.isEmpty()).toBe(true);
        });
    });

    // --- Max-Heap Specific Tests ---
    describe('Max-Heap (Numbers)', () => {
        let maxHeap: Heap<number>;

        beforeEach(() => {
            maxHeap = new Heap<number>(maxHeapNumberCompare);
        });

        test('should insert elements and maintain max-heap property', () => {
            maxHeap.insert(10);
            expect(maxHeap.peek()).toBe(10);
            maxHeap.insert(5);
            expect(maxHeap.peek()).toBe(10);
            maxHeap.insert(15);
            expect(maxHeap.peek()).toBe(15);
            maxHeap.insert(3);
            expect(maxHeap.peek()).toBe(15);
            maxHeap.insert(12);
            expect(maxHeap.peek()).toBe(15);
            expect(maxHeap.getSize()).toBe(5);
        });

        test('should extract elements in descending order', () => {
            maxHeap.insert(10);
            maxHeap.insert(5);
            maxHeap.insert(15);
            maxHeap.insert(3);
            maxHeap.insert(12);
            maxHeap.insert(20); // Largest

            expect(maxHeap.extract()).toBe(20);
            expect(maxHeap.extract()).toBe(15);
            expect(maxHeap.extract()).toBe(12);
            expect(maxHeap.extract()).toBe(10);
            expect(maxHeap.extract()).toBe(5);
            expect(maxHeap.extract()).toBe(3);
            expect(maxHeap.isEmpty()).toBe(true);
            expect(maxHeap.extract()).toBeUndefined();
        });
    });

    // --- Custom Object Comparison Test (Min-Heap by Age) ---
    describe('Min-Heap (Custom Objects by Age)', () => {
        interface Person {
            name: string;
            age: number;
        };
        let personHeap: Heap<Person>;

        beforeEach(() => {
            personHeap = new Heap<Person>(minHeapPersonByAgeCompare);
        });

        test('should insert and extract persons by age in ascending order', () => {
            personHeap.insert({ name: 'Alice', age: 30 });
            personHeap.insert({ name: 'Bob', age: 25 });
            personHeap.insert({ name: 'Charlie', age: 35 });
            personHeap.insert({ name: 'David', age: 20 }); // Youngest

            expect(personHeap.getSize()).toBe(4);
            expect(personHeap.peek()?.name).toBe('David');
            expect(personHeap.peek()?.age).toBe(20);

            expect(personHeap.extract()?.name).toBe('David');
            expect(personHeap.extract()?.name).toBe('Bob');
            expect(personHeap.extract()?.name).toBe('Alice');
            expect(personHeap.extract()?.name).toBe('Charlie');
            expect(personHeap.isEmpty()).toBe(true);
        });
    });

    // --- Clear Operation ---
    test('should clear the heap', () => {
        const minHeap = new Heap<number>();
        minHeap.insert(10);
        minHeap.insert(5);
        expect(minHeap.getSize()).toBe(2);

        minHeap.clear();
        expect(minHeap.getSize()).toBe(0);
        expect(minHeap.isEmpty()).toBe(true);
        expect(minHeap.peek()).toBeUndefined();
    });

    // --- toArray Operation ---
    test('toArray should return a copy of the internal array', () => {
        const minHeap = new Heap<number>();
        minHeap.insert(10);
        minHeap.insert(5);
        minHeap.insert(15);
        // The internal array will not be sorted: e.g., [5, 10, 15] or [5, 15, 10]
        // We only guarantee the heap property, not full sorted order.
        const arr = minHeap.toArray();
        expect(arr.length).toBe(3);
        expect(arr.includes(5)).toBe(true);
        expect(arr.includes(10)).toBe(true);
        expect(arr.includes(15)).toBe(true);

        // Verify it's a copy
        arr.push(100);
        expect(minHeap.getSize()).toBe(3); // Original heap not affected
    });
});