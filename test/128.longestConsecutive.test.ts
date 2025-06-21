import longestConsecutive from '../src/128.longestConsecutive';

describe('longestConsecutive', () => {
    test('should return 4 for example 1 ([100,4,200,1,3,2])', () => {
        const nums = [100, 4, 200, 1, 3, 2];
        expect(longestConsecutive(nums)).toBe(4);
    });

    test('should return 9 for example 2 ([0,3,7,2,5,8,4,6,0,1])', () => {
        const nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1];
        expect(longestConsecutive(nums)).toBe(9);
    });

    test('should return 3 for example 3 ([1,0,1,2])', () => {
        const nums = [1, 0, 1, 2];
        expect(longestConsecutive(nums)).toBe(3); // Sequence [0,1,2]
    });

    test('should return 0 for an empty array', () => {
        const nums: number[] = [];
        expect(longestConsecutive(nums)).toBe(0);
    });

    test('should return 1 for an array with a single element', () => {
        const nums = [1];
        expect(longestConsecutive(nums)).toBe(1);
    });

    test('should return 1 for an array with no consecutive elements', () => {
        const nums = [10, 20, 30, 40];
        expect(longestConsecutive(nums)).toBe(1);
    });

    test('should handle negative numbers', () => {
        const nums = [-1, 0, 1, -2, -3];
        expect(longestConsecutive(nums)).toBe(5); // Sequence [-3,-2,-1,0,1]
    });

    test('should handle duplicates correctly without affecting length', () => {
        const nums = [1, 2, 0, 1, 3, 2, 4];
        expect(longestConsecutive(nums)).toBe(5); // Sequence [0,1,2,3,4]
    });

    test('should handle a long sequence', () => {
        const nums = Array.from({ length: 100 }, (_, i) => i); // [0, 1, ..., 99]
        expect(longestConsecutive(nums)).toBe(100);
    });

    test('should handle a sequence with large gaps', () => {
        const nums = [1, 100, 2, 200, 3, 300, 4, 400];
        expect(longestConsecutive(nums)).toBe(4); // Sequence [1,2,3,4]
    });
});