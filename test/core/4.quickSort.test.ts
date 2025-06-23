import quickSort from '../../src/core/4.quickSort';

describe('quickSort', () => {
    test('should sort an empty array', () => {
        expect(quickSort([])).toEqual([]);
    });

    test('should sort an array with a single element', () => {
        expect(quickSort([5])).toEqual([5]);
    });

    test('should sort an array with even number of elements', () => {
        const arr = [5, 1, 4, 2, 8];
        expect(quickSort(arr)).toEqual(arr.sort());
    });

    test('should sort an array with odd number of elements', () => {
        const arr = [3, 1, 4, 1, 5, 9, 2, 6];
        expect(quickSort(arr)).toEqual(arr.sort());
    });

    test('should sort an array with negative numbers', () => {
        const arr = [-5, -1, -4, -2, -8];
        expect(quickSort(arr)).toEqual(arr.sort());
    });

    test('should sort an array with duplicate numbers', () => {
        const arr = [5, 1, 4, 2, 8, 1, 5];
        expect(quickSort(arr)).toEqual(arr.sort());
    });

    test('should sort an array that is already sorted', () => {
        const arr = [1, 2, 3, 4, 5];
        expect(quickSort(arr)).toEqual(arr.sort());
    });

    test('should sort an array that is reverse sorted', () => {
        const arr = [5, 4, 3, 2, 1];
        expect(quickSort(arr)).toEqual(arr.sort());
    });
});