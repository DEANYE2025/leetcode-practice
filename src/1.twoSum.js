/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
export default function twoSum(nums, target) {
    const map = new Map();
    for(let i = 0; i < nums.length; i++) {
        const complemnent = target - nums[i];
        if (map.has(complemnent)) {
            return [map.get(complemnent), i];
        }
        map.set(nums[i], i);
    }
    return [];
};