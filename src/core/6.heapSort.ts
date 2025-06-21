/**
 * Heap Sort Algorithm
 * @param {number[]} arr - The array to be sorted
 * @returns {number[]} - The sorted array
 */
function heapSort(arr: number[]) {
    let n = arr.length;

    // 1. Build a max-heap (rearrange array)
    // Start from the first non-leaf node and heapify upwards
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // 2. One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        [arr[0], arr[i]] = [arr[i], arr[0]];

        // Call max heapify on the reduced heap
        heapify(arr, i, 0);
    }
    return arr;
}
// Helper function: Heapify (Max-Heapify) a subtree rooted with node i. n is size of heap.
function heapify(arr: number[], n: number, i: number) {
    let largest = i;     // Initialize largest as root
    let left = 2 * i + 1; // Left child
    let right = 2 * i + 2; // Right child

    // If left child is larger than root
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    // If right child is larger than current largest
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    // If largest is not root
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];

        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest);
    }
}

// Idea: Uses a binary heap data structure. It builds a max-heap
//       (or min-heap) from the input data, and then repeatedly
//       extracts the maximum (or minimum) element from the heap
//       and places it at the end of the array.

export default heapSort;

/*
* Complexity:
* Time Complexity:
* Best, Worst, Average Case: O(N log N)
* Space Complexity: O(1) (in-place sort)
* Stability: Unstable
* Use Cases: When O(N log N) time complexity with O(1) space complexity is required. Commonly used to implement priority queues and solve Top K problems (finding the K largest/smallest elements).
*/