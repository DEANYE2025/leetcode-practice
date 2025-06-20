/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums: number[]) {
    console.log(`Input array: ${nums}`);
    let pre = 0, maxAns = nums[0];
    let tempRange: number[] = [];
    let maxRange: number[] = [nums[0]];
    for (let i = 0; i < nums.length; i++) {
        if (pre + nums[i] < nums[i]) {
            pre = nums[i];
            tempRange = [nums[i]];
        } else {
            pre += nums[i];
            tempRange.push(nums[i]);
        }
        console.log(`Current subarray: ${tempRange}`);
        if (pre > maxAns) {
            maxAns = pre;
            maxRange = [...tempRange];
            console.log(`New max found: ${maxAns} with subarray: ${maxRange}`);
        }
        console.log(`Index ${i} Number ${nums[i]} Current sum ${pre} Max so far ${maxAns}`);
    }
    return maxAns;
};

export default maxSubArray;