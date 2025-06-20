/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
export default function moveZeroes(nums: number[]) {
    let n = nums.length;
    let left = 0;
    for (let i = 0; i < n; i++) {
        if (nums[i] != 0) {
            if (i != left) {
                let temp = nums[i];
                nums[i] = nums[left];
                nums[left] = temp;
            }
            left++;
        }
    }
};