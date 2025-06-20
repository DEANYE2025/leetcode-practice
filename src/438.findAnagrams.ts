/**
 * Helper function to create a character frequency map from a string.
 * (This helper is optional if you stick to Array(26) for counts for ASCII chars,
 * but kept here if you prefer Map for character counts as discussed previously)
 * @param {string} str The input string.
 * @returns {Map<string, number>} A map where keys are characters and values are their counts.
 */
function getCharCountMap(str: string) {
    const map = new Map();
    for (const char of str) {
        map.set(char, (map.get(char) || 0) + 1);
    }
    return map;
}

/**
 * Helper function to compare two character frequency maps.
 * (This helper is optional if you stick to Array(26) for counts for ASCII chars,
 * but kept here if you prefer Map for character counts as discussed previously)
 * @param {Map<string, number>} map1 The first frequency map.
 * @param {Map<string, number>} map2 The second frequency map.
 * @returns {boolean} True if the maps are identical (same keys and same values for those keys), false otherwise.
 */
function isMapsEqual(map1: Map<string, number>, map2: Map<string, number>) {
    if (map1.size !== map2.size) return false;
    for (const [key, value] of map1.entries()) {
        if (map2.get(key) !== value) {
            return false;
        }
    }
    return true;
}

/**
 * Helper function to output the map.
 * @param {Map<string, number>} map The output map.
 */
function outputMap(title: string, map: Map<string, number>) {
    console.log(`${title}: ${JSON.stringify(Array.from(map.entries()))}`);
}

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
const findAnagrams = function(s: string, p: string) {
    console.log(`Input strings: s = "${s}", p = "${p}"`);
    const sLen = s.length, pLen = p.length;

    if (sLen < pLen || pLen == 0) {
        return [];
    }

    const ans = [];
    const pCount = getCharCountMap(p);
    let sCount = getCharCountMap(s.substring(0, pLen));

    if (isMapsEqual(sCount, pCount)) {
        outputMap('Start', sCount);
        ans.push(0);
    }

    for (let i = 0; i < sLen - pLen; ++i) {
        const charToRemove = s[i];
        const charToAdd = s[i + pLen];

        // Update the sliding window character counts
        sCount.set(charToRemove, sCount.get(charToRemove) - 1);
        if (sCount.get(charToRemove) == 0) {
            sCount.delete(charToRemove);
        }
        sCount.set(charToAdd, (sCount.get(charToAdd) || 0) + 1);

        // Compare maps
        if (isMapsEqual(sCount, pCount)) {
            outputMap('Sliding window', sCount);
            ans.push(i + 1);
        }
    }

    return ans;
}

export default findAnagrams;

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
// export default function findAnagrams(s: string, p: string) {
//     console.log(`Input strings: s = "${s}", p = "${p}"`);
//     const sLen = s.length, pLen = p.length;

//     if (sLen < pLen || pLen == 0) {
//         return [];
//     }

//     const ans = [];
//     const sCount = new Array(26).fill(0);
//     const pCount = new Array(26).fill(0);
//     for (let i = 0; i < pLen; ++i) {
//         console.log(`Processing characters: s[${i}] = ${s[i]}, p[${i}] = ${p[i]}`);
//         ++sCount[s[i].charCodeAt() - 'a'.charCodeAt()];
//         ++pCount[p[i].charCodeAt() - 'a'.charCodeAt()];
//     }

//     if (sCount.toString() === pCount.toString()) {
//         ans.push(0);
//     }

//     for (let i = 0; i < sLen - pLen; ++i) {
//         console.log(s.substring(i + 1, i + pLen + 1));
//         --sCount[s[i].charCodeAt() - 'a'.charCodeAt()];
//         ++sCount[s[i + pLen].charCodeAt() - 'a'.charCodeAt()];
//         console.log(`Sliding window: sCount = ${sCount}, pCount = ${pCount}`);
//         if (sCount.toString() === pCount.toString()) {
//             ans.push(i + 1);
//         }
//     }

//     return ans;
// };