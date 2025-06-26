/**
 * AVL Tree Node Class
 * Extends the basic tree node to include height for balance factor calculation.
 */
export class AVLNode<T> {
    value: T;
    left: AVLNode<T> | null;
    right: AVLNode<T> | null;
    height: number; // Height of the node (maximum depth of its subtree)
    constructor(value: T) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1; // A new node is a leaf, so its height is 1
    }
}

/**
 * AVL Tree Class
 * A self-balancing binary search tree.
 * Ensures O(logN) time complexity for search, insert, and delete operations.
 */
export class AVLTree<T> {
    private root: AVLNode<T> | null;
    private _size: number;
    constructor() {
        this.root = null;
        this._size = 0;
    }
    /**
     * Get the current number of nodes in the AVL tree.
     * @returns The number of nodes
     */
    public getSize(): number {
        return this._size;
    }
    /**
     * Check if the AVL tree is empty.
     * @returns True if empty, false otherwise
     */
    public isEmpty(): boolean {
        return this.root === null;
    }
    /**
     * Helper to get the height of a node.
     * Returns 0 for a null node.
     * @param node The node to get height from.
     * @returns The height of the node.
     */
    private getHeight(node: AVLNode<T> | null): number {
        return node ? node.height : 0;
    }
    /**
     * Helper to update the height of a node based on its children.
     * @param node The node whose height needs to be updated.
     */
    private updateHeight(node: AVLNode<T>): void {
        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    }
    /**
     * Helper to get the balance factor of a node.
     * Balance Factor = Height of Left Subtree - Height of Right Subtree.
     * @param node The node to get balance factor from.
     * @returns The balance factor.
     */
    private getBalance(node: AVLNode<T> | null): number {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }
    /**
     * Perform a right rotation.
     * Used when a node is left-heavy (balance factor > 1) and its left child is left-heavy (balance factor >= 0).
     * @param y The node to rotate around (root of the unbalanced subtree).
     * @returns The new root of the rotated subtree.
     */
    private rotateRight(y: AVLNode<T>): AVLNode<T> {
        const x = y.left!; // x is guaranteed to exist
        const T2 = x.right;
        // Perform rotation
        x.right = y;
        y.left = T2;
        // Update heights
        this.updateHeight(y);
        this.updateHeight(x);
        return x; // New root
    }
    /**
     * Perform a left rotation.
     * Used when a node is right-heavy (balance factor < -1) and its right child is right-heavy (balance factor <= 0).
     * @param x The node to rotate around (root of the unbalanced subtree).
     * @returns The new root of the rotated subtree.
     */
    private rotateLeft(x: AVLNode<T>): AVLNode<T> {
        const y = x.right!; // y is guaranteed to exist
        const T2 = y.left;
        // Perform rotation
        y.left = x;
        x.right = T2;
        // Update heights
        this.updateHeight(x);
        this.updateHeight(y);
        return y; // New root
    }
    /**
     * Balance the node after an insertion or deletion.
     * @param node The current node to balance.
     * @returns The balanced node (could be the same node or a new root after rotation).
     */
    private balanceNode(node: AVLNode<T>): AVLNode<T> {
        this.updateHeight(node);
        const balance = this.getBalance(node);
        // Left-Left Case (Right Rotation)
        if (balance > 1 && this.getBalance(node.left) >= 0) {
            return this.rotateRight(node);
        }
        // Right-Right Case (Left Rotation)
        if (balance < -1 && this.getBalance(node.right) <= 0) {
            return this.rotateLeft(node);
        }
        // Left-Right Case (Left then Right Rotation)
        if (balance > 1 && this.getBalance(node.left) < 0) {
            node.left = this.rotateLeft(node.left!);
            return this.rotateRight(node);
        }
        // Right-Left Case (Right then Left Rotation)
        if (balance < -1 && this.getBalance(node.right) > 0) {
            node.right = this.rotateRight(node.right!);
            return this.rotateLeft(node);
        }
        return node; // No rotation needed
    }
    /**
     * Inserts a value into the AVL tree.
     * Time Complexity: O(logN)
     * @param value The value to insert.
     */
    public insert(value: T): void {
        const insertRecursive = (node: AVLNode<T> | null, val: T): AVLNode<T> => {
        // 1. Perform standard BST insertion
        if (node === null) {
            this._size++;
            return new AVLNode(val);
        }
        if (val < node.value) {
            node.left = insertRecursive(node.left, val);
        } else if (val > node.value) {
            node.right = insertRecursive(node.right, val);
        } else {
            // Value already exists, do nothing (or handle as per requirements)
            return node;
        }
        // 2. Update height and balance the ancestor node
        return this.balanceNode(node);
        };
        this.root = insertRecursive(this.root, value);
    }
    /**
     * Searches for a value in the AVL tree.
     * Time Complexity: O(logN)
     * @param value The value to search for.
     * @returns True if the value is found, false otherwise.
     */
    public search(value: T): boolean {
        let current = this.root;
        while (current !== null) {
        if (value === current.value) {
            return true;
        }
        if (value < current.value) {
            current = current.left;
        } else {
            current = current.right;
        }
        }
        return false;
    }
    /**
     * Finds the node with the minimum value in a given subtree.
     * @param node The root of the subtree to search.
     * @returns The node with the minimum value.
     */
    private findMinNode(node: AVLNode<T>): AVLNode<T> {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }
    /**
     * Deletes a value from the AVL tree.
     * Time Complexity: O(logN)
     * @param value The value to delete.
     * @returns True if the value was deleted, false otherwise.
     */
    public delete(value: T): boolean {
        const initialSize = this._size;
        const deleteRecursive = (node: AVLNode<T> | null, val: T): AVLNode<T> | null => {
        // 1. Perform standard BST deletion
        if (node === null) {
            return null;
        }
        if (val < node.value) {
            node.left = deleteRecursive(node.left, val);
        } else if (val > node.value) {
            node.right = deleteRecursive(node.right, val);
        } else { // Found the node to delete
            this._size--; // Decrement size only when a node is actually found and deleted
            // Case 1: Node with no child or one child
            if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            }
            // Case 2: Node with two children
            const temp = this.findMinNode(node.right); // Find in-order successor
            node.value = temp.value; // Copy successor's value to current node
            // Delete the in-order successor from the right subtree
            // Note: _size is already decremented for 'node', so don't decrement again in this recursive call for 'temp'
            // This is tricky. A common approach is to pass a flag or adjust size externally.
            // For simplicity and correctness with the _size counter, we'll revert the _size decrement for the parent call
            // and let the recursive call for the successor handle its own size decrement.
            this._size++; // Temporarily re-increment to prevent double decrement when deleting successor
            node.right = deleteRecursive(node.right, temp.value);
        }
        // If the tree had only one node and it was deleted, node becomes null
        if (node === null) {
            return null;
        }
        // 2. Update height and balance the ancestor node
        return this.balanceNode(node);
        };
        this.root = deleteRecursive(this.root, value);
        // If the size is different after the recursive call, it means a deletion occurred
        return this._size < initialSize;
    }
    /**
     * Performs an in-order traversal of the AVL tree.
     * @returns An array containing elements in in-order.
     */
    public inOrderTraversal(): T[] {
        const result: T[] = [];
        const traverse = (node: AVLNode<T> | null) => {
        if (node !== null) {
            traverse(node.left);
            result.push(node.value);
            traverse(node.right);
        }
        };
        traverse(this.root);
        return result;
    }
    /**
     * Performs a level-order (BFS) traversal of the AVL tree.
     * @returns An array containing elements in level-order.
     */
    public levelOrderTraversal(): T[] {
        const result: T[] = [];
        if (this.root === null) {
            return result;
        }
        const queue: AVLNode<T>[] = [this.root];
        while (queue.length > 0) {
            const node = queue.shift()!;
            result.push(node.value);
            if (node.left !== null) {
                queue.push(node.left);
            }
            if (node.right !== null) {
                queue.push(node.right);
            }
        }
        return result;
    }
}