/**
 * Bubble Sort Algorithm
 * @param {number[]} arr - The array to be sorted
 * @returns {number[]} - The sorted array
 */
function bubbleSort(arr: number[]) {
    console.log(`Initial array: ${arr}`);
    let n = arr.length;
    let swapped;
    for (let i = 0; i < n - 1; i++) {
        swapped = false; // * Optimization: If no exchange in one trip, it is already ordered
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
                console.log(`Swapped ${arr[j + 1]} and ${arr[j]}: ${arr}`);
            }
        }
        if (!swapped) { // If no swap occurs in the inner loop, the array has been sorted
            break;
        }
    }
    console.log(`Sorted array: ${arr}`);
    return arr;
}

// Idea: Repeatedly steps through the list, compares adjacent elements
//       and swaps them if they are in the wrong order.
// The pass through the list is repeated until no swaps are needed,
//       which indicates that the list is sorted.

export default bubbleSort;

/*
* Complexity:
* Time Complexity:
* Best Case (already sorted): O(N)
* Worst Case (reverse sorted): O(N^2)
* Average Case: O(N^2)
* Space Complexity: O(1) (in-place sort)
* Stability: Stable (maintains the relative order of equal elements)
* Use Cases: Very small datasets, or for educational purposes. Rarely used in production due to inefficiency.
*/