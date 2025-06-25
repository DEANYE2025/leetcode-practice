/**
 * Insertion Sort Algorithm
 * @param {number[]} arr - The array to be sorted
 * @returns {number[]} - The sorted array
 */
function insertionSort(arr: number[]) {
    console.log(`Initial array: ${arr}`);
    let n = arr.length;
    for (let i = 1; i < n; i++) {
        let current = arr[i]; // Element to be inserted
        console.log(`Inserting element at index ${i} with value ${current}`);
        let j = i - 1; // Index of the last element in the sorted portion
        // Move elements arr[0..i-1] greater than current,
        // to one position ahead of their current position
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j]; // Shift element to the right
            console.log(`Moved element at index ${j} to index ${j + 1}: ${arr}`);
            j--;
        }
        // Place current element at its correct position
        arr[j + 1] = current;
        console.log(`Placed element ${current} at index ${j + 1}: ${arr}`);
    }
    console.log(`Sorted array: ${arr}`);
    return arr;
}

// Idea: Insert the unsorted elements one by one into the correct positions of
// the sorted parts, just like dealing cards in playing poker.

export default insertionSort;

/*
* Complexity:
* Time Complexity:
* Best Case (already sorted): O(N)
* Worst Case (reverse sorted): O(N^2)
* Average Case: O(N^2)
* Space Complexity: O(1) (in-place sort)
* Stability: Stable
* Use Cases: Small datasets, or datasets that are mostly sorted. Efficient for
*            online sorting (inserting new elements into an already sorted list).
*/