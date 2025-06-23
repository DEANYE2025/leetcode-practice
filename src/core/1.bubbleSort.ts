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
        swapped = false;
        // * Optimization: If no exchange in one trip, it is already ordered
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) { // Swap if they are in the wrong order
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true; // Set swapped to true if a swap occurs
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

// Idea: Repeatedly traverse the list, compare two adjacent elements
// and swap them in the correct order until no elements need to be swapped

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