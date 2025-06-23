/**
 * Heap Sort Algorithm
 * @param {number[]} arr - The array to be sorted
 * @returns {number[]} - The sorted array
 */
function heapSort(arr: number[]) {
    let n = arr.length;
    console.log(`Initial array: ${arr}`);
    // 1. Build a max-heap (rearrange array)
    // Start from the first non-leaf node and heapify upwards
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    // 2. One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        [arr[0], arr[i]] = [arr[i], arr[0]];
        console.log(`Swapped root with last element: ${arr}`);
        // Call max heapify on the reduced heap
        heapify(arr, i, 0);
    }
    console.log(`Sorted array: ${arr}`);
    return arr;
}
// Helper function: Heapify (Max-Heapify) a subtree rooted with node i. n is size of heap.
function heapify(arr: number[], n: number, i: number) {
    let largest = i; // Initialize largest as root
    let left = 2 * i + 1; // Left child
    let right = 2 * i + 2; // Right child
    if (left < n || right < n) {
        console.log(`Heapifying at index ${i}, left: ${left}, right: ${right}, n: ${n}`);
    } else {
        console.log(`Heapifying at index ${i}, no children to compare, n: ${n}`);
    }
    // If left child is larger than root
    if (left < n && arr[left] > arr[largest]) {
        console.log(`Left child [${left}] ${arr[left]} is larger than root [${largest}] ${arr[largest]}`);
        largest = left;
    }
    // If right child is larger than current largest
    if (right < n && arr[right] > arr[largest]) {
        console.log(`Right child [${right}] ${arr[right]} is larger than current largest [${largest}] ${arr[largest]}`);
        largest = right;
    }
    // If largest is not root
    if (largest !== i) {
        console.log(`Swapped [${i}] ${arr[i]} with [${largest}] ${arr[largest]}`);
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        console.log(`Array after swap: ${arr}`);
        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest);
    }
}

// Idea: Build the sequence to be sorted into a max-heap (or min-heap),
// then swap the top element (maximum or minimum) of the heap with the last element,
// and then readjust the heap for the remaining elements.
// Repeat this process until the sorting is completed.

export default heapSort;

/*
* Complexity:
* Time Complexity:
* Best, Worst, Average Case: O(N log N)
* Space Complexity: O(1) (in-place sort)
* Stability: Unstable
* Use Cases: When O(N log N) time complexity with O(1) space complexity is required.
*            Commonly used to implement priority queues and solve Top K problems
*            (finding the K largest/smallest elements).
*/