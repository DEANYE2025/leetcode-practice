/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height: number[]) {
    let ans = 0;
    const stack: number[] = [];
    const n = height.length;
    for (let i = 0; i < n; ++i) {
        while (stack.length && height[i] > height[stack[stack.length - 1]]) {
            const top = stack.pop() || 0;
            if (!stack.length) {
                break;
            }
            const left = stack[stack.length - 1];
            const currWidth = i - left - 1;
            const currHeight = Math.min(height[left], height[i]) - height[top];
            ans += currWidth * currHeight;
        }
        stack.push(i);
        console.log(`i: ${i}, stack: ${stack.map(item => height[item])}, ans: ${ans}`);
    }
    return ans;
};

export default trap;