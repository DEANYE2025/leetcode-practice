/**
 * @param {number[]} height
 * @return {number}
 */
export default function maxArea(height: number[]) {
    let l = 0, r = height.length - 1;
    let area, ans = 0;
    while (l < r) {
        area = Math.min(height[l], height[r]) * (r - l);
        ans = Math.max(area, ans);
        height[l] < height[r] ? l++ : r--;
    }
    return ans;
};