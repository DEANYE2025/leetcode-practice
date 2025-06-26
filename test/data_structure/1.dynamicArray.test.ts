import { INITIAL_CAPACITY, DynamicArray } from '../../src/data_structure/1.dynamicArray';

describe('DynamicArray', () => {
    let arr: DynamicArray<number>;

    beforeEach(() => {
        arr = new DynamicArray<number>(2);
    });

    test('should initialize with correct size and capacity', () => {
        expect(arr.getSize()).toBe(0);
        expect(arr.getCapacity()).toBe(2);
        expect(arr.isEmpty()).toBe(true);
    });

    test('should add elements and increase size', () => {
        arr.add(10);
        expect(arr.getSize()).toBe(1);
        expect(arr.get(0)).toBe(10);
        expect(arr.isEmpty()).toBe(false);

        arr.add(20);
        expect(arr.getSize()).toBe(2);
        expect(arr.get(1)).toBe(20);
    });

    test('should resize when capacity is full', () => {
        arr.add(10); // size = 1, capacity = 2
        arr.add(20); // size = 2, capacity = 2
        expect(arr.getCapacity()).toBe(2); // Still 2 before next add triggers resize

        arr.add(30); // size = 3, should trigger resize
        expect(arr.getSize()).toBe(3);
        expect(arr.getCapacity()).toBe(4); // Capacity should double
        expect(arr.get(2)).toBe(30);
    });

    test('should get elements at specific index', () => {
        arr.add(10);
        arr.add(20);
        arr.add(30);
        expect(arr.get(0)).toBe(10);
        expect(arr.get(1)).toBe(20);
        expect(arr.get(2)).toBe(30);
    });

    test('should throw error when getting out of bounds index', () => {
        arr.add(10);
        expect(() => arr.get(-1)).toThrow("Index out of bounds for get operation.");
        expect(() => arr.get(1)).toThrow("Index out of bounds for get operation."); // size is 1, index 1 is out of bounds
    });

    test('should set elements at specific index', () => {
        arr.add(10);
        arr.add(20);
        arr.set(0, 15);
        expect(arr.get(0)).toBe(15);
        expect(arr.get(1)).toBe(20);
        expect(arr.getSize()).toBe(2);
    });

    test('should throw error when setting out of bounds index', () => {
        arr.add(10);
        expect(() => arr.set(-1, 5)).toThrow("Index out of bounds for set operation.");
        expect(() => arr.set(1, 25)).toThrow("Index out of bounds for set operation.");
    });

    test('should insert elements at specific index', () => {
        arr.add(10); // [10, _]
        arr.add(20); // [10, 20]
        arr.insert(1, 15); // [10, 15, 20]
        expect(arr.getSize()).toBe(3);
        expect(arr.get(0)).toBe(10);
        expect(arr.get(1)).toBe(15);
        expect(arr.get(2)).toBe(20);
        expect(arr.getCapacity()).toBe(4); // Should have resized

        arr.insert(0, 5); // [5, 10, 15, 20]
        expect(arr.getSize()).toBe(4);
        expect(arr.get(0)).toBe(5);

        arr.insert(4, 25); // [5, 10, 15, 20, 25] - insert at end, triggers resize
        expect(arr.getSize()).toBe(5);
        expect(arr.get(4)).toBe(25);
        expect(arr.getCapacity()).toBe(8); // Should have resized again
    });

    test('should throw error when inserting out of bounds index (negative)', () => {
        expect(() => arr.insert(-1, 5)).toThrow("Index out of bounds for insert operation.");
    });

    test('should remove element at specific index', () => {
        arr.add(10); // [10, _]
        arr.add(20); // [10, 20]
        arr.add(30); // [10, 20, 30]
        arr.add(40); // [10, 20, 30, 40] - capacity 4
        expect(arr.getSize()).toBe(4);
        expect(arr.getCapacity()).toBe(4);

        const removed = arr.remove(1); // Remove 20 => [10, 30, 40]
        expect(removed).toBe(20);
        expect(arr.getSize()).toBe(3);
        expect(arr.get(0)).toBe(10);
        expect(arr.get(1)).toBe(30);
        expect(arr.get(2)).toBe(40);
        expect(arr.getCapacity()).toBe(4); // Capacity stays 4

        arr.remove(0); // Remove 10 => [30, 40]
        expect(arr.getSize()).toBe(2);
        expect(arr.get(0)).toBe(30);
        expect(arr.get(1)).toBe(40);
        expect(arr.getCapacity()).toBe(4); // Capacity stays 4

        arr.remove(0); // Remove 30 => [40]
        expect(arr.getSize()).toBe(1);
        expect(arr.get(0)).toBe(40);
        expect(arr.getCapacity()).toBe(2); // Should have shrunk (4/2 = 2)

        arr.remove(0); // Remove 40 => []
        expect(arr.getSize()).toBe(0);
        expect(arr.getCapacity()).toBe(INITIAL_CAPACITY); // Should shrink to initial 10 if lower than 1/4 of capacity
        expect(arr.isEmpty()).toBe(true);
    });

    test('should throw error when removing out of bounds index', () => {
        arr.add(10);
        expect(() => arr.remove(-1)).toThrow("Index out of bounds for remove operation.");
        expect(() => arr.remove(1)).toThrow("Index out of bounds for remove operation.");
    });

    test('should find index of an element', () => {
        arr.add(10);
        arr.add(20);
        arr.add(30);
        expect(arr.indexOf(20)).toBe(1);
        expect(arr.indexOf(10)).toBe(0);
        expect(arr.indexOf(30)).toBe(2);
        expect(arr.indexOf(99)).toBe(-1); // Not found
    });

    test('should convert to standard array correctly', () => {
        arr.add(1);
        arr.add(2);
        arr.add(3);
        expect(arr.toArray()).toEqual([1, 2, 3]);
        expect(arr.toArray()).not.toBe(arr.toArray());
    });

    test('should handle empty array conversions', () => {
        expect(arr.toArray()).toEqual([]);
    });
});