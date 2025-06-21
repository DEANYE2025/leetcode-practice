import radixSort from '../../src/core/8.radixSort';

describe('radixSort', () => {
    test('should sort an empty array', () => {
        expect(radixSort([])).toEqual([]);
    });

    test('should sort an array with a single element', () => {
        expect(radixSort([5])).toEqual([5]);
    });

    test('should sort an array with positive numbers (varying digits)', () => {
        expect(radixSort([170, 45, 75, 90, 802, 24, 2, 66])).toEqual([2, 24, 45, 66, 75, 90, 170, 802]);
    });

    test('should sort an array with duplicate numbers', () => {
        expect(radixSort([329, 457, 657, 839, 436, 720, 355])).toEqual([329, 355, 436, 457, 657, 720, 839]);
    });

    test('should sort an array with numbers of different lengths', () => {
        expect(radixSort([1, 10, 100, 2, 20])).toEqual([1, 2, 10, 20, 100]);
    });

    test('should sort an array that is already sorted', () => {
        expect(radixSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    test('should sort an array that is reverse sorted', () => {
        expect(radixSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });

    test('should handle arrays with zeros', () => {
        expect(radixSort([0, 5, 1, 0, 4])).toEqual([0, 0, 1, 4, 5]);
    });

    // Radix sort typically handles non-negative integers. If your implementation supports negative numbers,
    // you would need additional logic (e.g., separating positive/negative, sorting, then merging).
    // For this basic example, we assume non-negative.
});