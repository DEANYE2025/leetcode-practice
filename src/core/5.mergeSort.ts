/**
 * Merge Sort Algorithm
 * @param {number[]} arr - The array to be sorted
 * @returns {number[]} - The sorted array
 */
function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }
    console.log(`Initial array: ${arr}`);
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid); // Left half of the array
    const right = arr.slice(mid); // Right half of the array
    console.log(`Divided array into left: ${left} and right: ${right}`);
    // Recursively sort the two halves
    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);
    // Merge the sorted halves
    arr = merge(sortedLeft, sortedRight);
    console.log(`Sorted array: ${arr}`);
    return arr;
}
// Helper function: Merges two sorted arrays
function merge(leftArr: number[], rightArr: number[]) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    console.log(`Merging left ${leftArr} and right ${rightArr}`);
    while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
        // Compare elements from both arrays and push the smaller one to the result
        const isLeftLessThanRight = leftArr[leftIndex] <= rightArr[rightIndex];
        console.log(`Comparing left [${leftIndex}] ${leftArr[leftIndex]} and right [${rightIndex}] ${rightArr[rightIndex]}`);
        result.push(isLeftLessThanRight ? leftArr[leftIndex] : rightArr[rightIndex]);
        isLeftLessThanRight ? leftIndex++ : rightIndex++;
        console.log(`LeftIndex: ${leftIndex}, RightIndex: ${rightIndex}, Merged: ${result}`);
    }
    // Add remaining elements (if any)
    return result.concat(leftArr.slice(leftIndex)).concat(rightArr.slice(rightIndex));
}

// Idea (Divide and Conquer): Recursively divide the array into two halves
// until each subarray contains only one element. Then merge these ordered subarrays
// in pairs to form larger ordered subarrays until the entire array is ordered.

export default mergeSort;

/*
* Complexity:
* Time Complexity:
* Best, Worst, Average Case: O(N log N)
* Space Complexity: O(N) (requires additional space for merging sub-arrays)
* Stability: Stable
* Use Cases: Situations where stability is required. Large datasets (e.g., external sorting). Efficient for linked lists.
*/