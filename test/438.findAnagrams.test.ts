import findAnagrams from '../src/438.findAnagrams';

describe('findAnagrams', () => {
    test('should find anagrams correctly for example 1 ("cbaebabacd", "abc")', () => {
        const s = "cbaebabacd";
        const p = "abc";
        const expected = [0, 6];
        const result = findAnagrams(s, p);
        expect(result.sort((a, b) => a - b)).toEqual(expected.sort((a, b) => a - b));
    });

    test('should find anagrams correctly for example 2 ("abab", "ab")', () => {
        const s = "abab";
        const p = "ab";
        const expected = [0, 1, 2];
        const result = findAnagrams(s, p);
        expect(result.sort((a, b) => a - b)).toEqual(expected.sort((a, b) => a - b));
    });

    test('should return an empty array if s is shorter than p', () => {
        const s = "a";
        const p = "ab";
        const expected: number[] = [];
        const result = findAnagrams(s, p);
        expect(result).toEqual(expected);
    });

    test('should return an empty array if no anagrams are found', () => {
        const s = "abcdefg";
        const p = "xyz";
        const expected: number[] = [];
        const result = findAnagrams(s, p);
        expect(result).toEqual(expected);
    });

    test('should handle single character strings', () => {
        const s = "a";
        const p = "a";
        const expected = [0];
        const result = findAnagrams(s, p);
        expect(result).toEqual(expected);
    });

    test('should handle empty strings', () => {
        const s = "";
        const p = ""; // Problem constraints usually state non-empty, but good to test
        const expected = []; // Or [0] if an empty string is an anagram of itself at index 0. LeetCode usually implies no solution for empty p.
        // Based on typical LeetCode behavior for p="", it often returns [0,1,2...s.length-1].
        // However, constraints for this problem specify "1 <= s.length, p.length", so empty strings are not typically inputs.
        // Let's test with non-empty p and s.
        const s2 = "abc";
        const p2 = "";
        expect(findAnagrams(s2, p2)).toEqual([]); // Consistent with standard interpretation of constraints
    });

    test('should handle p being an anagram of s itself', () => {
        const s = "abcdef";
        const p = "fedcba";
        const expected = [0];
        const result = findAnagrams(s, p);
        expect(result).toEqual(expected);
    });

    test('should handle string with repeating characters', () => {
        const s = "baa";
        const p = "aa";
        const expected = [1];
        const result = findAnagrams(s, p);
        expect(result.sort((a, b) => a - b)).toEqual(expected.sort((a, b) => a - b));
    });

    test('should handle longer strings with scattered anagrams', () => {
        const s = "acbdacbda";
        const p = "abc";
        const expected = [0, 4];
        const result = findAnagrams(s, p);
        expect(result.sort((a, b) => a - b)).toEqual(expected.sort((a, b) => a - b));
    });
});