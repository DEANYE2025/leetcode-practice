/**
 * @param {string} s
 * @return {number}
 */
export default function lengthOfLongestSubstr(s: string) {
    const last = new Array(128).fill(-1);
    let n = s.length;
    let len = 0, start = 0;
    for (let i = 0; i < n; i++) {
        let code = s.charCodeAt(i);
        start = Math.max(start, last[code] + 1);
        len = Math.max(len, i - start + 1);
        last[code] = i;
    }
    return len;
};