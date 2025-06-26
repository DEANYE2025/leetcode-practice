import { HashTable } from '../../src/data_structure/7.hashTable';

// Custom hash function for testing purposes, for numbers directly
const numberHashCode = (key: number, capacity: number) => {
    return Math.abs(key) % capacity;
};

describe('HashTable (Separate Chaining)', () => {
    let hashTable: HashTable<string, number>; // Test with string keys, number values

    beforeEach(() => {
        // Use a small capacity for easier testing of collisions and resizing
        hashTable = new HashTable<string, number>(5, 0.75); // Capacity 5, threshold 0.75
    });

    test('should initialize as empty', () => {
        expect(hashTable.getSize()).toBe(0);
        expect(hashTable.isEmpty()).toBe(true);
        expect(hashTable.getCapacity()).toBe(5);
        expect(hashTable.get('test')).toBeUndefined();
        expect(hashTable.has('test')).toBe(false);
        expect(hashTable.keys()).toEqual([]);
        expect(hashTable.values()).toEqual([]);
        expect(hashTable.entries()).toEqual([]);
    });

    // --- Set Operations ---
    test('should set and retrieve values correctly', () => {
        hashTable.set('apple', 10);
        expect(hashTable.getSize()).toBe(1);
        expect(hashTable.isEmpty()).toBe(false);
        expect(hashTable.get('apple')).toBe(10);
        expect(hashTable.has('apple')).toBe(true);

        hashTable.set('banana', 20);
        expect(hashTable.getSize()).toBe(2);
        expect(hashTable.get('banana')).toBe(20);
        expect(hashTable.has('banana')).toBe(true);
    });

    test('should update value if key already exists', () => {
        hashTable.set('apple', 10);
        expect(hashTable.get('apple')).toBe(10);
        expect(hashTable.getSize()).toBe(1);

        hashTable.set('apple', 100); // Update
        expect(hashTable.get('apple')).toBe(100);
        expect(hashTable.getSize()).toBe(1); // Size should not change
    });

    test('should handle collisions using separate chaining', () => {
        // With capacity 5 and default string hash, let's find some keys that collide
        // "apple" hash is likely different from "banana"
        // Let's force a collision for testing purposes, or pick specific keys
        // For default hash, "a" and "f" might collide if simple sum of char codes % 5
        // Let's rely on default hash. "apple" and "pleap" might collide for example.
        // Or we pick keys that are known to collide for a simple modulo hash.
        // For defaultHashCode (sum of char codes, then modulo):
        // "key1" -> (k+e+y+1) % 5
        // "key2" -> (k+e+y+2) % 5
        // These may or may not collide. Let's insert enough to likely cause one.

        hashTable.set('keyA', 1);
        hashTable.set('keyB', 2);
        hashTable.set('keyC', 3);
        hashTable.set('keyD', 4);
        hashTable.set('keyE', 5); // Table size 5, might hit resize
        expect(hashTable.getSize()).toBe(5);

        // After 5 elements, it's likely some collided or it resized.
        // Let's verify values after potential collisions/resize.
        expect(hashTable.get('keyA')).toBe(1);
        expect(hashTable.get('keyB')).toBe(2);
        expect(hashTable.get('keyC')).toBe(3);
        expect(hashTable.get('keyD')).toBe(4);
        expect(hashTable.get('keyE')).toBe(5);

        // Add more to guarantee resize and collisions handled
        hashTable.set('keyF', 6); // Should definitely trigger resize
        expect(hashTable.getSize()).toBe(6);
        expect(hashTable.getCapacity()).toBeGreaterThan(5); // Capacity should have increased
        expect(hashTable.get('keyF')).toBe(6);

        // After resize, all old keys should still be retrievable
        expect(hashTable.get('keyA')).toBe(1);
        expect(hashTable.get('keyB')).toBe(2);
    });

    // --- Get/Has Operations ---
    test('should return undefined for non-existent keys', () => {
        hashTable.set('test', 123);
        expect(hashTable.get('nonexistent')).toBeUndefined();
        expect(hashTable.has('nonexistent')).toBe(false);
    });

    // --- Delete Operations ---
    test('should delete existing keys', () => {
        hashTable.set('apple', 10);
        hashTable.set('banana', 20);
        expect(hashTable.getSize()).toBe(2);

        expect(hashTable.delete('apple')).toBe(true);
        expect(hashTable.getSize()).toBe(1);
        expect(hashTable.has('apple')).toBe(false);
        expect(hashTable.get('apple')).toBeUndefined();
        expect(hashTable.get('banana')).toBe(20); // Other key should be untouched

        expect(hashTable.delete('banana')).toBe(true);
        expect(hashTable.getSize()).toBe(0);
        expect(hashTable.isEmpty()).toBe(true);
    });

    test('should return false when deleting non-existent keys', () => {
        hashTable.set('apple', 10);
        expect(hashTable.delete('nonexistent')).toBe(false);
        expect(hashTable.getSize()).toBe(1); // Size should not change
    });

    test('should handle delete in a collision bucket', () => {
        // Using a custom hash for specific collision testing
        const customHashTable = new HashTable<number, string>(3, 0.75, numberHashCode); // Capacity 3
        customHashTable.set(1, 'one'); // hash 1 % 3 = 1
        customHashTable.set(4, 'four'); // hash 4 % 3 = 1 (collision with 1)
        customHashTable.set(7, 'seven'); // hash 7 % 3 = 1 (collision with 1, 4)
        customHashTable.set(2, 'two'); // hash 2 % 3 = 2
        expect(customHashTable.getSize()).toBe(4);

        expect(customHashTable.get(1)).toBe('one');
        expect(customHashTable.get(4)).toBe('four');
        expect(customHashTable.get(7)).toBe('seven');

        // Delete a key from the middle of a collision chain
        expect(customHashTable.delete(4)).toBe(true);
        expect(customHashTable.getSize()).toBe(3);
        expect(customHashTable.has(4)).toBe(false);
        expect(customHashTable.get(1)).toBe('one'); // Other keys in chain unaffected
        expect(customHashTable.get(7)).toBe('seven');

        // Delete first key in chain
        expect(customHashTable.delete(1)).toBe(true);
        expect(customHashTable.getSize()).toBe(2);
        expect(customHashTable.has(1)).toBe(false);
        expect(customHashTable.get(7)).toBe('seven'); // Last key in chain unaffected

        // Delete last key in chain
        expect(customHashTable.delete(7)).toBe(true);
        expect(customHashTable.getSize()).toBe(1);
        expect(customHashTable.has(7)).toBe(false);

        expect(customHashTable.get(2)).toBe('two'); // Unrelated key unaffected
    });

    // --- Resize Operations ---
    test('should resize when load factor is exceeded', () => {
        // Initial capacity 5, threshold 0.75. Resize at size 5 * 0.75 = 3.75 -> 4 elements
        expect(hashTable.getCapacity()).toBe(5);

        hashTable.set('a', 1);
        hashTable.set('b', 2);
        hashTable.set('c', 3);
        expect(hashTable.getCapacity()).toBe(5); // Still 5
        expect(hashTable.getSize()).toBe(3);

        hashTable.set('d', 4); // This should trigger resize (size 4 / capacity 5 = 0.8 > 0.75)
        expect(hashTable.getSize()).toBe(4);
        expect(hashTable.getCapacity()).toBeGreaterThan(5); // Capacity should have doubled to 10 or 11 (prime number recommended)

        const newCapacity = hashTable.getCapacity();
        expect(newCapacity).toBe(10); // Or 11 if using prime numbers for capacity

        // Verify all old elements are still present after resize
        expect(hashTable.get('a')).toBe(1);
        expect(hashTable.get('b')).toBe(2);
        expect(hashTable.get('c')).toBe(3);
        expect(hashTable.get('d')).toBe(4);
    });

    // --- Clear Operation ---
    test('should clear the hash table', () => {
        hashTable.set('apple', 10);
        hashTable.set('banana', 20);
        hashTable.set('orange', 30);
        expect(hashTable.getSize()).toBe(3);
        expect(hashTable.getCapacity()).toBe(5); // Or potentially larger if resize happened

        hashTable.clear();
        expect(hashTable.getSize()).toBe(0);
        expect(hashTable.isEmpty()).toBe(true);
        expect(hashTable.getCapacity()).toBe(5); // Should reset to initial capacity
        expect(hashTable.get('apple')).toBeUndefined();
        expect(hashTable.keys()).toEqual([]);
    });

    // --- Keys, Values, Entries Operations ---
    test('should return all keys', () => {
        hashTable.set('a', 1);
        hashTable.set('b', 2);
        hashTable.set('c', 3);
        const keys = hashTable.keys().sort();
        expect(keys).toEqual(['a', 'b', 'c'].sort());
    });

    test('should return all values', () => {
        hashTable.set('a', 1);
        hashTable.set('b', 2);
        hashTable.set('c', 3);
        const values = hashTable.values().sort();
        expect(values).toEqual([1, 2, 3].sort());
    });

    test('should return all entries', () => {
        hashTable.set('a', 1);
        hashTable.set('b', 2);
        hashTable.set('c', 3);
        const entries = hashTable.entries().sort((a, b) => (a.key as string).localeCompare(b.key as string));
        expect(entries).toEqual([
        { key: 'a', value: 1 },
        { key: 'b', value: 2 },
        { key: 'c', value: 3 },
        ].sort((a, b) => (a.key as string).localeCompare(b.key as string)));
    });

    test('keys, values, entries should be empty for an empty table', () => {
        expect(hashTable.keys()).toEqual([]);
        expect(hashTable.values()).toEqual([]);
        expect(hashTable.entries()).toEqual([]);
    });
});