/**
 * Radix Sort Algorithm
 * @param {number[]} arr - The array to be sorted
 * @returns {number[]} - The sorted array
 */
function radixSort(arr: number[]) {
    if (arr.length <= 1) return arr;
    console.log(`Initial array: ${arr}`);
    // Find the maximum value to determine the number of digits
    let maxVal = Math.max(...arr);
    let maxDigits = 0;
    if (maxVal > 0) {
        maxDigits = Math.floor(Math.log10(maxVal)) + 1;
    } else if (maxVal === 0 && arr.length > 0) { // For array like [0, 0, 0]
        maxDigits = 1;
    }
    console.log(`Radix Sort: maxVal = ${maxVal}, maxDigits = ${maxDigits}`);
    let divisor = 1; // Current digit place (1, 10, 100...)
    for (let i = 0; i < maxDigits; i++) {
        // Use counting sort to sort based on the current digit
        arr = countingSortByDigit(arr, divisor);
        divisor *= 10;
    }
    console.log(`Sorted array: ${arr}`);
    return arr;
}

// Helper function: Counts and sorts based on a specific digit
function countingSortByDigit(arr: number[], divisor: number) {
    const count = new Array(10).fill(0); // For digits 0-9
    const output = new Array(arr.length);
    console.log(`Counting Sort by digit (divisor = ${divisor})`);
    // Store count of occurrences in the current digit place
    for (let num of arr) {
        const digit = Math.floor(num / divisor) % 10;
        count[digit]++;
    }
    console.log(`Counting Sort by digit: count = ${count}`);
    // Change count[i] so that count[i] now contains actual position of this digit in output array
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    console.log(`Counting Sort by digit: modified count = ${count}`);
    // Build the output array (iterate backwards to ensure stability)
    for (let i = arr.length - 1; i >= 0; i--) {
        const num = arr[i];
        const digit = Math.floor(num / divisor) % 10;
        output[count[digit] - 1] = num;
        console.log(`Counting Sort by digit: placing ${num} at position ${count[digit] - 1}`);
        count[digit]--;
        console.log(`Counting Sort: updated count array = ${count}`);
    }
    return output;
}

// Idea: Sorts integers by processing individual digits.
// It distributes elements into buckets based on their digits
// (from least significant to most significant or vice versa)
// and then collects them.
// Typically uses Counting Sort as the internal "bucket" sort.

export default radixSort;

/*
* Complexity:
* Time Complexity: O(d * (N + K)), where d is the number of digits, N is the number of elements, K is the base (usually 10).
* In the worst case, if K is a small constant, it approaches O(d * N).
* Space Complexity: O(N + K)
* Stability: Stable (if the internal bucket sort, like Counting Sort, is stable)
* Use Cases: Sorting integers or strings where the number of digits (d) and base (K)
*            are relatively small. Can achieve linear time complexity in such scenarios.
*/