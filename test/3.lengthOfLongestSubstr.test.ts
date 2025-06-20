import lengthOfLongestSubstr from '../src/3.lengthOfLongestSubstr';

describe('lengthOfLongestSubstr', () => {
    test('should return 3 for "abcabcbb" (Example 1)', () => {
        const s = "abcabcbb";
        expect(lengthOfLongestSubstr(s)).toBe(3);
    });

    test('should return 1 for "bbbbb" (Example 2)', () => {
        const s = "bbbbb";
        expect(lengthOfLongestSubstr(s)).toBe(1);
    });

    test('should return 3 for "pwwkew" (Example 3)', () => {
        const s = "pwwkew";
        expect(lengthOfLongestSubstr(s)).toBe(3);
    });

    test('should return 0 for an empty string', () => {
        const s = "";
        expect(lengthOfLongestSubstr(s)).toBe(0);
    });

    test('should return 1 for a single character string', () => {
        const s = "a";
        expect(lengthOfLongestSubstr(s)).toBe(1);
    });

    test('should return correct length for a string with all unique characters', () => {
        const s = "abcdefg";
        expect(lengthOfLongestSubstr(s)).toBe(7);
    });

    test('should handle string with two unique characters alternating', () => {
        const s = "ababa"; // Longest is "aba" or "bab" but distinct substring is "ab", "ba" -> length 2
        // Wait, for "ababa", longest unique substring is "aba" (No, this is wrong, 'a' repeats).
        // Longest unique substrings are "ab", "ba", "ab", "ba". Max length is 2.
        expect(lengthOfLongestSubstr(s)).toBe(2);
    });

    test('should handle string with various repeating characters', () => {
        const s = "dvdf"; // Longest unique is "vdf" or "dvd" -> No. "vdf" -> length 3
        expect(lengthOfLongestSubstr(s)).toBe(3);
    });

    test('should handle long string with few repeating chars', () => {
        const s = "asjrgapa"; // "sjrga" -> 5
        expect(lengthOfLongestSubstr(s)).toBe(6); // Correct: "sjrgap" (index 1 to 6)
    });

    test('should handle repeating characters at the start', () => {
        const s = "aaabcc"; // "abc" -> 3
        expect(lengthOfLongestSubstr(s)).toBe(3);
    });
});