/**
 * Selection Sort Algorithm
 * @param {number[]} arr - The array to be sorted
 * @returns {number[]} - The sorted array
 */
function selectionSort(arr: number[]) {
    console.log(`Initial array: ${arr}`);
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
                console.log(`New minimum found at index ${minIndex} with value ${arr[minIndex]}`);
            }
        }
        // Swap the found minimum element with the element at the current position
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            console.log(`Swapped elements at indices ${i} and ${minIndex}: ${arr}`);
        }
    }
    console.log(`Sorted array: ${arr}`);
    return arr;
}

// Idea: Finds the minimum (or maximum) element in the unsorted portion
//       and puts it at the end of the sorted portion.
// Repeats until all elements are sorted.

export default selectionSort;

/*
* Complexity:
* Time Complexity:
* Best, Worst, Average Case: O(N^2)
* Space Complexity: O(1) (in-place sort)
* Stability: Unstable (e.g., [5, 8, 5, 2], the first 5 might move past the second 5)
* Use Cases: Very small datasets, or when memory writes are costly as it minimizes swaps.
*/