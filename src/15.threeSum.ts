/**
 * @param {number[]} nums
 * @return {number[][]}
 */
export default function threeSum(nums: number[]) {
    nums.sort((a, b) => a - b);
    console.log(nums);
    let res = new Array();
    let third;
    const n = nums.length;
    for (let first = 0; first < n; first++) {
        if (first > 0 && nums[first] == nums[first - 1]) {
            continue;
        }
        console.log(nums[first]);
        third = n - 1;
        for (let second = first + 1; second < n - 1; second++) {
            if (second > first + 1 && nums[second] == nums[second - 1]) {
                continue;
            }
            while (third > second && nums[first] + nums[second] + nums[third] > 0) {
                third = third - 1;
            }
            if (third == second) {
                break;
            }
            console.log(nums[first], nums[second], nums[third]);
            if (nums[first] + nums[second] + nums[third] == 0) {
                res.push([nums[first], nums[second], nums[third]]);
            }
        }
    }
    return res;
};