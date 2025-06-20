import moveZeroes from '../src/283.moveZeros';

describe('moveZeroes', () => {
    test('should move zeros to the end while maintaining relative order (Example 1)', () => {
        const nums = [0, 1, 0, 3, 12];
        const expected = [1, 3, 12, 0, 0];
        moveZeroes(nums); // Function modifies nums in-place
        expect(nums).toEqual(expected);
    });

    test('should handle an array with only a single zero (Example 2)', () => {
        const nums = [0];
        const expected = [0];
        moveZeroes(nums);
        expect(nums).toEqual(expected);
    });

    test('should handle an array with no zeros', () => {
        const nums = [1, 2, 3, 4, 5];
        const expected = [1, 2, 3, 4, 5];
        moveZeroes(nums);
        expect(nums).toEqual(expected);
    });

    test('should handle an array with all zeros', () => {
        const nums = [0, 0, 0, 0];
        const expected = [0, 0, 0, 0];
        moveZeroes(nums);
        expect(nums).toEqual(expected);
    });

    test('should handle an empty array', () => {
        const nums: number[] = [];
        const expected: number[] = [];
        moveZeroes(nums);
        expect(nums).toEqual(expected);
    });

    test('should handle zeros at the end already', () => {
        const nums = [1, 2, 3, 0, 0];
        const expected = [1, 2, 3, 0, 0];
        moveZeroes(nums);
        expect(nums).toEqual(expected);
    });

    test('should handle zeros at the beginning', () => {
        const nums = [0, 0, 1, 2, 3];
        const expected = [1, 2, 3, 0, 0];
        moveZeroes(nums);
        expect(nums).toEqual(expected);
    });

    test('should handle mixed zeros and non-zeros', () => {
        const nums = [4, 0, 1, 0, 2, 0, 3, 0, 5];
        const expected = [4, 1, 2, 3, 5, 0, 0, 0, 0];
        moveZeroes(nums);
        expect(nums).toEqual(expected);
    });

    test('should handle duplicates of non-zero elements', () => {
        const nums = [1, 0, 1, 0, 2, 2];
        const expected = [1, 1, 2, 2, 0, 0];
        moveZeroes(nums);
        expect(nums).toEqual(expected);
    });

});