import bubbleSort from '../../src/core/1.bubbleSort';

describe('bubbleSort', () => {
    test('should sort an empty array', () => {
        expect(bubbleSort([])).toEqual([]);
    });

    test('should sort an array with a single element', () => {
        expect(bubbleSort([5])).toEqual([5]);
    });

    test('should sort an array with even number of elements', () => {
        expect(bubbleSort([5, 1, 4, 2, 8])).toEqual([1, 2, 4, 5, 8]);
    });

    test('should sort an array with odd number of elements', () => {
        expect(bubbleSort([3, 1, 4, 1, 5, 9, 2, 6])).toEqual([1, 1, 2, 3, 4, 5, 6, 9]);
    });

    test('should sort an array with negative numbers', () => {
        expect(bubbleSort([-5, -1, -4, -2, -8])).toEqual([-8, -5, -4, -2, -1]);
    });

    test('should sort an array with duplicate numbers', () => {
        expect(bubbleSort([5, 1, 4, 2, 8, 1, 5])).toEqual([1, 1, 2, 4, 5, 5, 8]);
    });

    test('should sort an array that is already sorted', () => {
        expect(bubbleSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    test('should sort an array that is reverse sorted', () => {
        expect(bubbleSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });
});