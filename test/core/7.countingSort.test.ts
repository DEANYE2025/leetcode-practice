import countingSort from '../../src/core/7.countingSort';

describe('countingSort', () => {
    test('should sort an empty array', () => {
        expect(countingSort([])).toEqual([]);
    });

    test('should sort an array with a single element', () => {
        expect(countingSort([5])).toEqual([5]);
    });

    test('should sort an array with positive numbers', () => {
        expect(countingSort([5, 1, 4, 2, 8])).toEqual([1, 2, 4, 5, 8]);
    });

    test('should sort an array with duplicate positive numbers', () => {
        expect(countingSort([3, 1, 4, 1, 5, 9, 2, 6])).toEqual([1, 1, 2, 3, 4, 5, 6, 9]);
    });

    test('should sort an array with zero and positive numbers', () => {
        expect(countingSort([0, 5, 1, 0, 4])).toEqual([0, 0, 1, 4, 5]);
    });

    test('should sort an array with all same numbers', () => {
        expect(countingSort([7, 7, 7, 7])).toEqual([7, 7, 7, 7]);
    });

    test('should sort an array that is already sorted', () => {
        expect(countingSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    test('should sort an array that is reverse sorted', () => {
        expect(countingSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });

    // Special test for negative numbers: Counting Sort usually requires non-negative integers or needs adjustment for range.
    // If your countingSort handles negative numbers by shifting, then add tests for it.
    // For this generic example, assume positive integers or adjusted range.
    test('should handle a narrow range of numbers', () => {
        expect(countingSort([2, 1, 3, 2, 1, 3])).toEqual([1, 1, 2, 2, 3, 3]);
    });
});