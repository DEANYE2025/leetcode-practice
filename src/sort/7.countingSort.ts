/**
 * Counting Sort Algorithm
 * @param {number[]} arr - The array to be sorted
 * @returns {number[]} - The sorted array
 */
function countingSort(arr: number[]) {
    if (arr.length === 0) return [];
    console.log(`Initial array: ${arr}`);
    let maxVal = Math.max(...arr);
    let minVal = Math.min(...arr);
    console.log(`Counting Sort: minVal = ${minVal}, maxVal = ${maxVal}`);
    const range = maxVal - minVal + 1;
    const count = new Array(range).fill(0);
    const output = new Array(arr.length);
    // Store count of each element
    for (let num of arr) {
        count[num - minVal]++;
    }
    console.log(`Counting Sort: count array = ${count}`);
    // Modify count array to store actual position of elements in output array
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    console.log(`Counting Sort: modified count array = ${count}`);
    // Build the output array (iterate backwards to ensure stability)
    for (let i = arr.length - 1; i >= 0; i--) {
        const num = arr[i];
        console.log(`Counting Sort: placing ${num} at position ${count[num - minVal] - 1}`);
        output[count[num - minVal] - 1] = num;
        console.log(`Counting Sort: output array = ${output}`);
        count[num - minVal]--;
        console.log(`Counting Sort: updated count array = ${count}`);
    }
    console.log(`Sorted array: ${output}`);
    return output;
}

// Idea: Suitable for integers when the range of numbers (K)
// is not excessively large. It counts the frequency of each element
// and then uses these counts to place elements into their sorted positions.

export default countingSort;

/*
* Complexity:
* Time Complexity: O(N + K), where N is the number of elements, K is the range of input values (maxVal - minVal + 1).
* Space Complexity: O(K)
* Stability: Stable (if implemented correctly, typically by iterating backwards for output generation)
* Use Cases: Sorting integers when the range K is relatively small. Very efficient in such cases.
*/