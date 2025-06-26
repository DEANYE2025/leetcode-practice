import { LinkedList } from '../../src/data_structure/2.linkedList';

describe('LinkedList', () => {
    let list: LinkedList<number>;

    beforeEach(() => {
        list = new LinkedList<number>();
    });

    test('should initialize as empty', () => {
        expect(list.getSize()).toBe(0);
        expect(list.isEmpty()).toBe(true);
        expect(list.toArray()).toEqual([]);
    });

    // --- Add Operations ---
    test('should add elements to the end (addLast)', () => {
        list.addLast(10);
        expect(list.getSize()).toBe(1);
        expect(list.isEmpty()).toBe(false);
        expect(list.get(0)).toBe(10);
        expect(list.toArray()).toEqual([10]);

        list.addLast(20);
        expect(list.getSize()).toBe(2);
        expect(list.get(1)).toBe(20);
        expect(list.toArray()).toEqual([10, 20]);
    });

    test('should add elements to the front (addFirst)', () => {
        list.addFirst(10); // [10]
        expect(list.getSize()).toBe(1);
        expect(list.get(0)).toBe(10);
        expect(list.toArray()).toEqual([10]);

        list.addFirst(5); // [5, 10]
        expect(list.getSize()).toBe(2);
        expect(list.get(0)).toBe(5);
        expect(list.get(1)).toBe(10);
        expect(list.toArray()).toEqual([5, 10]);
    });

    test('should insert elements at specific index', () => {
        list.addLast(10); // [10]
        list.addLast(30); // [10, 30]

        list.insert(1, 20); // [10, 20, 30]
        expect(list.getSize()).toBe(3);
        expect(list.toArray()).toEqual([10, 20, 30]);

        list.insert(0, 5); // [5, 10, 20, 30]
        expect(list.getSize()).toBe(4);
        expect(list.toArray()).toEqual([5, 10, 20, 30]);

        list.insert(4, 40); // [5, 10, 20, 30, 40] (insert at end)
        expect(list.getSize()).toBe(5);
        expect(list.toArray()).toEqual([5, 10, 20, 30, 40]);
    });

    test('should throw error when inserting out of bounds index', () => {
        expect(() => list.insert(-1, 5)).toThrow("Index out of bounds for insert operation.");
        expect(() => list.insert(1, 5)).toThrow("Index out of bounds for insert operation."); // List is empty
    });

    // --- Remove Operations ---
    test('should remove the first element (removeFirst)', () => {
        list.addLast(10);
        list.addLast(20);
        list.addLast(30); // [10, 20, 30]

        const removed = list.removeFirst(); // Removes 10
        expect(removed).toBe(10);
        expect(list.getSize()).toBe(2);
        expect(list.toArray()).toEqual([20, 30]);

        list.removeFirst(); // Removes 20
        expect(list.toArray()).toEqual([30]);

        list.removeFirst(); // Removes 30
        expect(list.toArray()).toEqual([]);
        expect(list.isEmpty()).toBe(true);
        expect(list.getSize()).toBe(0);

        expect(list.removeFirst()).toBeNull(); // Removing from empty list
    });

    test('should remove the last element (removeLast)', () => {
        list.addLast(10);
        list.addLast(20);
        list.addLast(30); // [10, 20, 30]

        const removed = list.removeLast(); // Removes 30
        expect(removed).toBe(30);
        expect(list.getSize()).toBe(2);
        expect(list.toArray()).toEqual([10, 20]);

        list.removeLast(); // Removes 20
        expect(list.toArray()).toEqual([10]);

        list.removeLast(); // Removes 10
        expect(list.toArray()).toEqual([]);
        expect(list.isEmpty()).toBe(true);
        expect(list.getSize()).toBe(0);

        expect(list.removeLast()).toBeNull(); // Removing from empty list
    });

    test('should remove element at specific index (removeAt)', () => {
        list.addLast(10);
        list.addLast(20);
        list.addLast(30);
        list.addLast(40); // [10, 20, 30, 40]

        let removed = list.removeAt(1); // Remove 20 => [10, 30, 40]
        expect(removed).toBe(20);
        expect(list.getSize()).toBe(3);
        expect(list.toArray()).toEqual([10, 30, 40]);

        removed = list.removeAt(0); // Remove 10 => [30, 40]
        expect(removed).toBe(10);
        expect(list.getSize()).toBe(2);
        expect(list.toArray()).toEqual([30, 40]);

        removed = list.removeAt(1); // Remove 40 (new tail) => [30]
        expect(removed).toBe(40);
        expect(list.getSize()).toBe(1);
        expect(list.toArray()).toEqual([30]);
        // Ensure tail is updated correctly
        expect(list.get(0)).toBe(30); // Assuming get(0) still works for single element
    });

    test('should throw error when removing at out of bounds index (removeAt)', () => {
        list.addLast(10);
        expect(() => list.removeAt(-1)).toThrow("Index out of bounds for removeAt operation.");
        expect(() => list.removeAt(1)).toThrow("Index out of bounds for removeAt operation.");
    });

    test('should remove first occurrence of a specific value (remove)', () => {
        list.addLast(10);
        list.addLast(20);
        list.addLast(10); // [10, 20, 10]

        expect(list.remove(10)).toBe(true); // Removes first 10 => [20, 10]
        expect(list.getSize()).toBe(2);
        expect(list.toArray()).toEqual([20, 10]);

        expect(list.remove(30)).toBe(false); // 30 not found
        expect(list.getSize()).toBe(2);
        expect(list.toArray()).toEqual([20, 10]);

        expect(list.remove(20)).toBe(true); // Removes 20 => [10]
        expect(list.getSize()).toBe(1);
        expect(list.toArray()).toEqual([10]);

        expect(list.remove(10)).toBe(true); // Removes last 10 => []
        expect(list.getSize()).toBe(0);
        expect(list.toArray()).toEqual([]);
        expect(list.isEmpty()).toBe(true);

        expect(list.remove(5)).toBe(false); // Remove from empty list
    });

    // --- Query Operations ---
    test('should check if list contains a value', () => {
        list.addLast(10);
        list.addLast(20);
        list.addLast(30);

        expect(list.contains(20)).toBe(true);
        expect(list.contains(10)).toBe(true);
        expect(list.contains(30)).toBe(true);
        expect(list.contains(99)).toBe(false);
        expect(list.contains(0)).toBe(false); // For empty list
    });

    test('should find index of an element', () => {
        list.addLast(10);
        list.addLast(20);
        list.addLast(30);

        expect(list.indexOf(10)).toBe(0);
        expect(list.indexOf(20)).toBe(1);
        expect(list.indexOf(30)).toBe(2);
        expect(list.indexOf(99)).toBe(-1); // Not found
        expect(new LinkedList().indexOf(5)).toBe(-1); // For empty list
    });

    test('should get element at specific index', () => {
        list.addLast(10);
        list.addLast(20);
        list.addLast(30);

        expect(list.get(0)).toBe(10);
        expect(list.get(1)).toBe(20);
        expect(list.get(2)).toBe(30);
    });

    test('should throw error when getting out of bounds index', () => {
        list.addLast(10);
        expect(() => list.get(-1)).toThrow("Index out of bounds for get operation.");
        expect(() => list.get(1)).toThrow("Index out of bounds for get operation."); // size is 1
    });

    test('should convert to standard array correctly', () => {
        list.addLast(1);
        list.addLast(2);
        list.addLast(3);
        expect(list.toArray()).toEqual([1, 2, 3]);
    });

    test('should handle empty list conversion to array', () => {
        expect(list.toArray()).toEqual([]);
    });
});