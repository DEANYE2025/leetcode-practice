import countingSort from '../../src/sort/7.countingSort';

describe('countingSort', () => {
    test('should sort an empty array', () => {
        expect(countingSort([])).toEqual([]);
    });

    test('should sort an array with a single element', () => {
        expect(countingSort([5])).toEqual([5]);
    });

    test('should sort an array with positive numbers', () => {
        const arr = [5, 1, 4, 2, 8];
        expect(countingSort(arr)).toEqual(arr.sort());
    });

    test('should sort an array with duplicate positive numbers', () => {
        const arr = [3, 1, 4, 1, 5, 9, 2, 6];
        expect(countingSort(arr)).toEqual(arr.sort());
    });

    test('should sort an array with zero and positive numbers', () => {
        const arr = [0, 5, 1, 0, 4];
        expect(countingSort(arr)).toEqual(arr.sort());
    });

    test('should sort an array with all same numbers', () => {
        const arr = [7, 7, 7, 7];
        expect(countingSort(arr)).toEqual(arr.sort());
    });

    test('should sort an array that is already sorted', () => {
        const arr = [1, 2, 3, 4, 5];
        expect(countingSort(arr)).toEqual(arr.sort());
    });

    test('should sort an array that is reverse sorted', () => {
        const arr = [5, 4, 3, 2, 1];
        expect(countingSort(arr)).toEqual(arr.sort());
    });

    // Special test for negative numbers: Counting Sort usually requires non-negative integers or needs adjustment for range.
    // If your countingSort handles negative numbers by shifting, then add tests for it.
    // For this generic example, assume positive integers or adjusted range.
    test('should handle a narrow range of numbers', () => {
        const arr = [2, 1, 3, 2, 1, 3];
        expect(countingSort(arr)).toEqual(arr.sort());
    });
});