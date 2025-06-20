import isPalindrome from '../src/9.isPalindrome';

describe('isPalindrome', () => {
    test('should return true for 121 (Example 1)', () => { //
        expect(isPalindrome(121)).toBe(true); //
    });

    test('should return false for -121 (Example 2)', () => { //
        expect(isPalindrome(-121)).toBe(false); //
    });

    test('should return false for 10 (Example 3)', () => { //
        expect(isPalindrome(10)).toBe(false); //
    });

    test('should return true for 0', () => {
        expect(isPalindrome(0)).toBe(true);
    });

    test('should return true for single digit numbers (e.g., 7)', () => {
        expect(isPalindrome(7)).toBe(true);
    });

    test('should return true for numbers with even length that are palindromes (e.g., 1221)', () => {
        expect(isPalindrome(1221)).toBe(true);
    });

    test('should return false for numbers with even length that are not palindromes (e.g., 1234)', () => {
        expect(isPalindrome(1234)).toBe(false);
    });

    test('should return false for numbers with odd length that are not palindromes (e.g., 123)', () => {
        expect(isPalindrome(123)).toBe(false);
    });

    test('should return true for large palindrome numbers', () => {
        expect(isPalindrome(123454321)).toBe(true);
    });

    test('should return false for large non-palindrome numbers', () => {
        expect(isPalindrome(123456789)).toBe(false);
    });
});