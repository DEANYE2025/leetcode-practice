import radixSort from '../../src/core/8.radixSort';

describe('radixSort', () => {
    test('should sort an empty array', () => {
        expect(radixSort([])).toEqual([]);
    });

    test('should sort an array with a single element', () => {
        expect(radixSort([5])).toEqual([5]);
    });

    test('should sort an array with positive numbers (varying digits)', () => {
        const arr = [5, 1, 4, 2, 8];
        expect(radixSort(arr)).toEqual(arr.sort());
    });

    test('should sort an array with duplicate numbers', () => {
        const arr = [329, 457, 657, 839, 436, 720, 355];
        expect(radixSort(arr)).toEqual(arr.sort());
    });

    test('should sort an array with numbers of different lengths', () => {
        const arr = [1, 10, 100, 2, 20];
        expect(radixSort(arr)).toEqual(arr.sort((a, b) => a - b));
    });

    test('should sort an array that is already sorted', () => {
        const arr = [1, 2, 3, 4, 5];
        expect(radixSort(arr)).toEqual(arr.sort());
    });

    test('should sort an array that is reverse sorted', () => {
        const arr = [5, 4, 3, 2, 1];
        expect(radixSort(arr)).toEqual(arr.sort());
    });

    test('should handle arrays with zeros', () => {
        const arr = [0, 5, 1, 0, 4];
        expect(radixSort(arr)).toEqual(arr.sort());
    });

    // Radix sort typically handles non-negative integers. If your implementation supports negative numbers,
    // you would need additional logic (e.g., separating positive/negative, sorting, then merging).
    // For this basic example, we assume non-negative.
});