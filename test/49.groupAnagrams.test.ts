import groupAnagrams from '../src/49.groupAnagrams';

// Helper function to sort the output for consistent testing.
// The problem allows returning the answer in any order (both outer and inner arrays).
// To make `toEqual` work reliably, we sort both.
const normalizeOutput = (arr: string[][]) => {
    return arr.map(subArr => subArr.sort()) // Sort strings within each sub-array
              .sort((a, b) => { // Sort sub-arrays themselves based on stringified content
                  return a.join('') < b.join('') ? -1 : (a.join('') > b.join('') ? 1 : 0);
              });
};

describe('groupAnagrams', () => {
    test('should group anagrams correctly for example 1', () => {
        const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
        const expected = [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]];
        const result = groupAnagrams(strs);

        // Normalize both the result and expected arrays for comparison
        expect(normalizeOutput(result)).toEqual(normalizeOutput(expected));
    });

    test('should handle an empty array input (Example 2)', () => {
        const strs = [""];
        const expected = [[""]];
        const result = groupAnagrams(strs);
        expect(normalizeOutput(result)).toEqual(normalizeOutput(expected));
    });

    test('should handle a single character string (Example 3)', () => {
        const strs = ["a"];
        const expected = [["a"]];
        const result = groupAnagrams(strs);
        expect(normalizeOutput(result)).toEqual(normalizeOutput(expected));
    });

    test('should handle multiple groups of anagrams', () => {
        const strs = ["flow", "wolf", "fowl", "top", "pot", "opt"];
        const expected = [
            ["flow", "wolf", "fowl"],
            ["top", "pot", "opt"]
        ];
        const result = groupAnagrams(strs);
        expect(normalizeOutput(result)).toEqual(normalizeOutput(expected));
    });

    test('should handle no anagrams (all unique strings)', () => {
        const strs = ["a", "b", "c"];
        const expected = [["a"], ["b"], ["c"]];
        const result = groupAnagrams(strs);
        expect(normalizeOutput(result)).toEqual(normalizeOutput(expected));
    });

    test('should handle strings with different lengths', () => {
        const strs = ["abc", "bca", "ac", "ca", "de", "edc"];
        const expected = [
            ["ac", "ca"],
            ["abc", "bca"],
            ["de"],
            ["edc"]
        ];
        const result = groupAnagrams(strs);
        expect(normalizeOutput(result)).toEqual(normalizeOutput(expected));
    });

    test('should handle mixed case strings (if problem allows, though typically lowercase)', () => {
        // Note: Standard LeetCode problems assume lowercase unless specified.
        // If your solution needs to be case-insensitive, you'd convert to lowercase first.
        // Current solution is case-sensitive.
        const strs = ["Eat", "Tea", "tan", "ate"];
        const expected = [
            ["Eat"], ["Tea"], ["tan"], ["ate"]
        ]; // They are not anagrams in a case-sensitive way
        const result = groupAnagrams(strs);
        expect(normalizeOutput(result)).toEqual(normalizeOutput(expected));
    });
});