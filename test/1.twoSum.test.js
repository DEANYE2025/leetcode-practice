import twoSum from '../src/1.twoSum';

describe('twoSum', () => {
    test('should return indices for example 1 ([2,7,11,15], target 9)', () => {
        const nums = [2, 7, 11, 15];
        const target = 9;
        const expected = [0, 1];
        const result = twoSum(nums, target);
        // Using expect(...).toEqual() for array comparison
        expect(result).toEqual(expect.arrayContaining(expected));
        // Using arrayContaining is robust as the problem allows return in any order,
        // but for two numbers, the order [0,1] vs [1,0] is typically handled by LeetCode.
        // If order matters strictly for your specific problem, use .toEqual(expected) directly.
        // For this problem, [0,1] is generally expected due to the loop order.
        expect(result).toEqual(expected); // This is usually fine for Two Sum's map solution
    });

    test('should return indices for example 2 ([3,2,4], target 6)', () => {
        const nums = [3, 2, 4];
        const target = 6;
        const expected = [1, 2];
        const result = twoSum(nums, target);
        expect(result).toEqual(expected);
    });

    test('should return indices for example 3 ([3,3], target 6)', () => {
        const nums = [3, 3];
        const target = 6;
        const expected = [0, 1];
        const result = twoSum(nums, target);
        expect(result).toEqual(expected);
    });

    test('should handle negative numbers', () => {
        const nums = [-1, -2, -3, -4, -5];
        const target = -8; // -3 + -5 = -8
        const expected = [2, 4];
        const result = twoSum(nums, target);
        expect(result).toEqual(expected);
    });

    test('should handle target resulting from first and last elements', () => {
        const nums = [1, 2, 3, 4];
        const target = 6;
        const expected = [1, 3];
        const result = twoSum(nums, target);
        expect(result).toEqual(expected);
    });

    test('should handle duplicate numbers with different indices summing to target', () => {
        const nums = [2, 7, 11, 15, 2];
        const target = 4; // 2 + 2 = 4
        const expected = [0, 4];
        const result = twoSum(nums, target);
        expect(result).toEqual(expected);
    });
});