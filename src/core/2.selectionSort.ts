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
        // Assume the first element of the unsorted portion is the minimum
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                // Find the index of the minimum element in the unsorted portion
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

// Idea: Each time, select the smallest (or largest) element from the data elements
// to be sorted and store it at the beginning until all the elements are sorted out.

export default selectionSort;

/*
* Complexity:
* Time Complexity:
* Best, Worst, Average Case: O(N^2)
* Space Complexity: O(1) (in-place sort)
* Stability: Unstable (e.g., [5, 8, 5, 2], the first 5 might move past the second 5)
* Use Cases: Very small datasets, or when memory writes are costly as it minimizes swaps.
*/