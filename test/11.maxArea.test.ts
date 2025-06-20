import maxArea from '../src/11.maxArea';

describe('maxArea', () => {
    test('should return 49 for example 1 ([1,8,6,2,5,4,8,3,7])', () => {
        const height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
        expect(maxArea(height)).toBe(49);
    });

    test('should return 1 for example 2 ([1,1])', () => {
        const height = [1, 1];
        expect(maxArea(height)).toBe(1);
    });

    test('should return 0 for an empty array', () => {
        const height: number[] = [];
        expect(maxArea(height)).toBe(0);
    });

    test('should return 0 for an array with only one element', () => {
        const height = [5];
        expect(maxArea(height)).toBe(0);
    });

    test('should return correct area for a simple ascending array', () => {
        const height = [1, 2, 3, 4, 5];
        // min(1,5) * (4-0) = 1 * 4 = 4
        // min(2,5) * (4-1) = 2 * 3 = 6
        // min(3,5) * (4-2) = 3 * 2 = 6
        // Result should be from 5 and first element: min(1,5)*(5-1) = 1*4 = 4.
        // No, this is wrong. Max area is 6 formed by [2,4] or [3,3].
        // For [1,2,3,4,5], the calculation:
        // (1,5) -> min(1,5)*4 = 4
        // (2,5) -> min(2,5)*3 = 6
        // (3,5) -> min(3,5)*2 = 6
        // (4,5) -> min(4,5)*1 = 4
        // Max is 6.
        expect(maxArea(height)).toBe(6);
    });

    test('should return correct area for a simple descending array', () => {
        const height = [5, 4, 3, 2, 1];
        // min(5,1)*4 = 4
        // min(5,2)*3 = 6
        // min(5,3)*2 = 6
        // min(5,4)*1 = 4
        // Max is 6.
        expect(maxArea(height)).toBe(6);
    });

    test('should handle V-shaped array', () => {
        const height = [5, 1, 2, 1, 5];
        // (5,5) -> min(5,5)*4 = 20
        expect(maxArea(height)).toBe(20);
    });

    test('should handle A-shaped array', () => {
        const height = [1, 5, 2, 5, 1];
        // (1,1) -> min(1,1)*4 = 4
        // (5,5) -> min(5,5)*2 = 10
        expect(maxArea(height)).toBe(10);
    });

    test('should handle complex array with multiple local maxima', () => {
        const height = [4, 3, 2, 1, 4];
        // min(4,4) * 4 = 16
        expect(maxArea(height)).toBe(16);
    });
});