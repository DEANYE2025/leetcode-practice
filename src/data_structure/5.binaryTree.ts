// binaryTree.ts

/**
 * Binary Tree Node Class
 * Each node contains a value and pointers to its left and right children.
 * This is a generic binary tree node, without any specific ordering properties.
 */
export class BinaryTreeNode<T> {
    value: T;
    left: BinaryTreeNode<T> | null;  // Pointer to the left child
    right: BinaryTreeNode<T> | null; // Pointer to the right child
    constructor(value: T, left: BinaryTreeNode<T> | null = null, right: BinaryTreeNode<T> | null = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

/**
 * General Binary Tree Class
 * Represents a hierarchical structure with at most two children per node.
 * Provides various traversal methods.
 * Note: This class does not have automatic insertion/deletion methods that build a specific
 * tree structure (like BST). It's primarily for demonstrating tree structure and traversal.
 * Tree construction would typically involve manual linking or specialized algorithms.
 */
export class BinaryTree<T> {
	root: BinaryTreeNode<T> | null; // The root node of the binary tree
	private _size: number;          // Private property to track size
	constructor(rootValue?: T) {
		if (rootValue !== undefined) {
			this.root = new BinaryTreeNode(rootValue);
			this._size = 1;
		} else {
			this.root = null;
			this._size = 0;
		}
	}
	/**
	 * Get the current number of nodes in the binary tree.
	 * Note: This size is only accurate if nodes are added/removed through methods that update it.
	 * For general tree construction by direct node manipulation, this might not be precise.
	 * @returns The number of nodes
	 */
	public getSize(): number {
		// For a dynamically built tree without explicit add/remove methods,
		// actual size would need to be calculated by traversal:
		// return this.countNodes(this.root);
		return this._size;
	}
	/**
	 * Check if the binary tree is empty.
	 * @returns True if empty, false otherwise
	 */
	public isEmpty(): boolean {
		return this.root === null;
	}
	/**
	 * Helper method to count nodes (if _size tracking is not used or to verify).
	 * @param node The current node to start counting from.
	 * @returns The count of nodes in the subtree.
	 */
	private countNodes(node: BinaryTreeNode<T> | null): number {
		if (node === null) {
			return 0;
		}
		return 1 + this.countNodes(node.left) + this.countNodes(node.right);
	}
	/**
	 * Helper method to set root and update size.
	 * Useful if you want to build the tree manually and then assign root.
	 * @param node The node to set as root.
	 */
	public setRoot(node: BinaryTreeNode<T> | null): void {
		this.root = node;
		this._size = this.countNodes(this.root); // Recalculate size
	}
	/**
	 * Performs an in-order traversal of the binary tree.
	 * Order: Left -> Root -> Right
	 * @returns An array containing elements in in-order.
	 */
	public inOrderTraversal(): T[] {
		const result: T[] = [];
		const traverse = (node: BinaryTreeNode<T> | null) => {
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
	 * Performs a pre-order traversal of the binary tree.
	 * Order: Root -> Left -> Right
	 * @returns An array containing elements in pre-order.
	 */
	public preOrderTraversal(): T[] {
		const result: T[] = [];
		const traverse = (node: BinaryTreeNode<T> | null) => {
			if (node !== null) {
				result.push(node.value);
				traverse(node.left);
				traverse(node.right);
			}
		};
		traverse(this.root);
		return result;
	}
	/**
	 * Performs a post-order traversal of the binary tree.
	 * Order: Left -> Right -> Root
	 * @returns An array containing elements in post-order.
	 */
	public postOrderTraversal(): T[] {
		const result: T[] = [];
		const traverse = (node: BinaryTreeNode<T> | null) => {
			if (node !== null) {
				traverse(node.left);
				traverse(node.right);
				result.push(node.value);
			}
		};
		traverse(this.root);
		return result;
	}
	/**
	 * Performs a level-order (BFS) traversal of the binary tree.
	 * @returns An array containing elements in level-order.
	 */
	public levelOrderTraversal(): T[] {
		const result: T[] = [];
		if (this.root === null) {
			return result;
		}
		const queue: BinaryTreeNode<T>[] = [this.root];
		while (queue.length > 0) {
			const node = queue.shift()!; // Dequeue
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