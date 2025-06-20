import threeSum from '../src/15.threeSum';

// Helper function to sort nested arrays for consistent comparison
const sortAndStringify = (arr: number[][]) => {
    return arr.map(subArr => subArr.sort((a, b) => a - b).join(','))
              .sort()
              .join(';');
};

describe('threeSum', () => {
    test('should return all unique triplets that sum to zero for example 1', () => {
        const nums = [-1, 0, 1, 2, -1, -4];
        // Expected output is [-1, -1, 2], [-1, 0, 1]
        // Note: The order of triplets and numbers within triplets doesn't matter for the problem,
        // but for testing, we need to handle it consistently.
        const expected = [[-1, -1, 2], [-1, 0, 1]];
        const result = threeSum(nums);

        // Sort both the actual and expected results for reliable comparison
        expect(sortAndStringify(result)).toBe(sortAndStringify(expected));
    });

    test('should return an empty array for no valid triplets (example 2)', () => {
        const nums = [0, 1, 1];
        const expected: number[][] = [];
        const result = threeSum(nums);
        expect(result).toEqual(expected);
    });

    test('should handle arrays with all zeros (example 3)', () => {
        const nums = [0, 0, 0];
        const expected = [[0, 0, 0]];
        const result = threeSum(nums);
        expect(result).toEqual(expected);
    });

    test('should handle arrays with mixed positive and negative numbers', () => {
        const nums = [-2, 0, 1, 1, 2];
        const expected = [[-2, 0, 2], [-2, 1, 1]];
        const result = threeSum(nums);
        expect(sortAndStringify(result)).toBe(sortAndStringify(expected));
    });

    test('should handle arrays with no triplets', () => {
        const nums = [1, 2, 3];
        const expected: number[][] = [];
        const result = threeSum(nums);
        expect(result).toEqual(expected);
    });

    test('should handle arrays with less than 3 elements', () => {
        const nums1: number[] = [];
        const nums2 = [1];
        const nums3 = [1, 2];
        expect(threeSum(nums1)).toEqual([]);
        expect(threeSum(nums2)).toEqual([]);
        expect(threeSum(nums3)).toEqual([]);
    });
});