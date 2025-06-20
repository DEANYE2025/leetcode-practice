interface StringArraysObject {
    [key: string]: string[];
}

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
export default function groupAnagrams(strs: string[]) {
    const map: StringArraysObject = {};
    for (let s of strs) {
        const count: number[] = new Array(26).fill(0);
        for (let c of s) {
            count[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }
        const key = count.toString();
        map[key] ? map[key].push(s) : map[key] = [s];
    }
    return Object.values(map);
};