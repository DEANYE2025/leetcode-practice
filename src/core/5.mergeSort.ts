/**
 * Merge Sort Algorithm
 * @param {number[]} arr - The array to be sorted
 * @returns {number[]} - The sorted array
 */
function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    // Recursively sort the two halves
    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);

    // Merge the sorted halves
    return merge(sortedLeft, sortedRight);
}
// Helper function: Merges two sorted arrays
function merge(leftArr: number[], rightArr: number[]) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
        if (leftArr[leftIndex] < rightArr[rightIndex]) {
            result.push(leftArr[leftIndex]);
            leftIndex++;
        } else {
            result.push(rightArr[rightIndex]);
            rightIndex++;
        }
    }
    // Add remaining elements (if any)
    return result.concat(leftArr.slice(leftIndex)).concat(rightArr.slice(rightIndex));
}

// Idea (Divide and Conquer): Divides the unsorted list into n sublists,
//                            each containing one element.
// Repeatedly merges sublists to produce new sorted sublists until there
//                            is only one sublist remaining.

export default mergeSort;

/*
* Complexity:
* Time Complexity:
* Best, Worst, Average Case: O(N log N)
* Space Complexity: O(N) (requires additional space for merging sub-arrays)
* Stability: Stable
* Use Cases: Situations where stability is required. Large datasets (e.g., external sorting). Efficient for linked lists.
*/