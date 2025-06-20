/**
 * @param {number[]} nums
 * @return {number}
 */
export default function longestConsecutive(nums: number[]) {
    let nums_set = new Set(nums);
    let longest_streak = 0;
    for (const num of nums_set) {
        // if (!nums_set.has(num + 1)) {
        //     let current_num = num;
        //     let current_streak = 1;
        //     while (nums_set.has(current_num - 1)) {
        //         current_num--;
        //         current_streak++;
        //     }
        //     longest_streak = Math.max(current_streak, longest_streak);
        // } // Top_down approach
        if (!nums_set.has(num - 1)) {
            let current_num = num;
            let current_streak = 1;
            while (nums_set.has(current_num + 1)) {
                current_num++;
                current_streak++;
            }
            longest_streak = Math.max(current_streak, longest_streak)
        } // Bottom_up approach
    }
    return longest_streak;
};