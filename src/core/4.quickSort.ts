/**
 * Insertion Sort Algorithm
 * @param {number[]} arr - The array to be sorted
 * @returns {number[]} - The sorted array
 */
function quickSort(arr: number[], left = 0, right = arr.length - 1) {
    if (left < right) {
        console.log(`Initial array: ${arr}`);
        let pivotIndex = partition(arr, left, right);
        quickSort(arr, left, pivotIndex); // For Hoare's partition, pivotIndex is returned.
        quickSort(arr, pivotIndex + 1, right); // For Lomuto's partition, pivotIndex + 1 is used.
        console.log(`Sorted array: ${arr}`);
    }
    return arr;
}
// Helper function: Partition operation (Hoare's partition scheme)
function partition(arr: number[], left: number, right: number) {
    let pivot = arr[left]; // Choose the leftmost element as pivot
    let i = left - 1;
    let j = right + 1;
    console.log(`Partitioning with pivot ${pivot} from index ${left} to ${right}`);
    while (true) {
        do {
            i++;
        } while (arr[i] < pivot); // Increment i until finding an element >= pivot
        do {
            j--;
        } while (arr[j] > pivot); // Decrement j until finding an element <= pivot
        console.log(`i: ${i}, j: ${j}`);
        if (i >= j) { // If indices cross, partitioning is done
            return j; // Return partition point
        }
        console.log(`arr[${i}]: ${arr[i]}, arr[${j}]: ${arr[j]}`);
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap arr[i] and arr[j]
        console.log(`Swapped arr[${i}] and arr[${j}]: ${arr}`);
    }
}

// Idea (Divide and Conquer): Select a pivot element, divide the array into two parts:
// place the parts < the pivot on [one side] and the parts > the pivot on [the other side],
// and then sort these two parts recursively.

export default quickSort;

/*
* Complexity:
* Time Complexity:
* Best Case: O(N log N)
* Worst Case (already sorted or reverse sorted with naive pivot choice): O(N^2)
* Average Case: O(N log N)
* Space Complexity: O(log N) (for recursive stack, best/average case) to O(N) (worst case)
* Stability: Unstable
* Use Cases: High time efficiency requirements, especially for large datasets. Often faster than Merge Sort due to smaller constant factors. Base for many built-in sorting functions.
*/