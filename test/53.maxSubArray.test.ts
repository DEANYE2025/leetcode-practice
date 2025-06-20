import maxSubArray from '../src/53.maxSubArray';

describe('maxSubArray', () => {
    test('should return 6 for example 1 ([-2,1,-3,4,-1,2,1,-5,4])', () => {
        const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
        expect(maxSubArray(nums)).toBe(6);
    });

    test('should return 1 for example 2 ([1])', () => {
        const nums = [1];
        expect(maxSubArray(nums)).toBe(1);
    });

    test('should return 23 for example 3 ([5,4,-1,7,8])', () => {
        const nums = [5, 4, -1, 7, 8];
        expect(maxSubArray(nums)).toBe(23);
    });

    test('should handle all negative numbers, returning the largest single negative number', () => {
        const nums = [-2, -1, -3, -5];
        expect(maxSubArray(nums)).toBe(-1); // The subarray is [-1]
    });

    test('should handle all positive numbers', () => {
        const nums = [1, 2, 3, 4, 5];
        expect(maxSubArray(nums)).toBe(15); // Sum of all numbers
    });

    test('should handle a mix of positive and negative numbers with max at the end', () => {
        const nums = [-1, -2, -3, 10, 20];
        expect(maxSubArray(nums)).toBe(30); // Subarray [10, 20]
    });

    test('should handle a mix of positive and negative numbers with max at the beginning', () => {
        const nums = [10, 20, -1, -2, -3];
        expect(maxSubArray(nums)).toBe(30); // Subarray [10, 20]
    });

    test('should handle a longer array with complex positive/negative sequences', () => {
        const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4, -10, 100, -1, 0, -50, 10];
        expect(maxSubArray(nums)).toBe(100); // Subarray [100] is possible if previous sum drags it down
                                             // Re-check: [-2,1,-3,4,-1,2,1,-5,4,-10,100,-1,0,-50,10]
                                             // max is 100 itself, or 100-1+0 = 99. The longest sum could be [4,-1,2,1,-5,4,-10,100,-1,0]
                                             // Let's manually trace:
                                             // -2 -> -2, -2
                                             // 1 -> 1, 1
                                             // -3 -> -2, 1
                                             // 4 -> 4, 4
                                             // -1 -> 3, 4
                                             // 2 -> 5, 5
                                             // 1 -> 6, 6
                                             // -5 -> 1, 6
                                             // 4 -> 5, 6
                                             // -10 -> -5, 6
                                             // 100 -> 100, 100
                                             // -1 -> 99, 100
                                             // 0 -> 99, 100
                                             // -50 -> 49, 100
                                             // 10 -> 59, 100
        expect(maxSubArray(nums)).toBe(100); // The result is indeed 100.
    });

    test('should handle an array with only one negative number', () => {
        const nums = [-7];
        expect(maxSubArray(nums)).toBe(-7);
    });
});