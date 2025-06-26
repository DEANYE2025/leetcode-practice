// binaryTree.test.ts

import { BinaryTree, BinaryTreeNode } from '../../src/data_structure/5.binaryTree';

describe('BinaryTree', () => {
    let tree: BinaryTree<number>;

    beforeEach(() => {
        tree = new BinaryTree<number>();
    });

    test('should initialize as empty', () => {
        expect(tree.getSize()).toBe(0);
        expect(tree.isEmpty()).toBe(true);
        expect(tree.root).toBeNull();
        expect(tree.inOrderTraversal()).toEqual([]);
        expect(tree.preOrderTraversal()).toEqual([]);
        expect(tree.postOrderTraversal()).toEqual([]);
        expect(tree.levelOrderTraversal()).toEqual([]);
    });

    test('should create a tree with an initial root', () => {
        tree = new BinaryTree<number>(10);
        expect(tree.getSize()).toBe(1);
        expect(tree.isEmpty()).toBe(false);
        expect(tree.root?.value).toBe(10);
        expect(tree.inOrderTraversal()).toEqual([10]);
    });

    test('should correctly set a complex tree structure', () => {
        // Manually build a tree for testing purposes
        const node10 = new BinaryTreeNode(10);
        const node5 = new BinaryTreeNode(5);
        const node15 = new BinaryTreeNode(15);
        const node2 = new BinaryTreeNode(2);
        const node7 = new BinaryTreeNode(7);
        const node12 = new BinaryTreeNode(12);
        const node17 = new BinaryTreeNode(17);

        node10.left = node5;
        node10.right = node15;
        node5.left = node2;
        node5.right = node7;
        node15.left = node12;
        node15.right = node17;

        tree.setRoot(node10); // Set the root of the BinaryTree instance

        expect(tree.getSize()).toBe(7);
        expect(tree.root?.value).toBe(10);

        // Test traversals
        expect(tree.inOrderTraversal()).toEqual([2, 5, 7, 10, 12, 15, 17]);
        expect(tree.preOrderTraversal()).toEqual([10, 5, 2, 7, 15, 12, 17]);
        expect(tree.postOrderTraversal()).toEqual([2, 7, 5, 12, 17, 15, 10]);
        expect(tree.levelOrderTraversal()).toEqual([10, 5, 15, 2, 7, 12, 17]);
    });

    test('should handle edge cases for traversals (single node tree)', () => {
        tree.setRoot(new BinaryTreeNode(1));
        expect(tree.inOrderTraversal()).toEqual([1]);
        expect(tree.preOrderTraversal()).toEqual([1]);
        expect(tree.postOrderTraversal()).toEqual([1]);
        expect(tree.levelOrderTraversal()).toEqual([1]);
    });

    test('should handle edge cases for traversals (skewed tree - left)', () => {
        const node3 = new BinaryTreeNode(3);
        const node2 = new BinaryTreeNode(2, node3);
        const node1 = new BinaryTreeNode(1, node2);
        tree.setRoot(node1); // 1 -> 2 -> 3 (all left children)

        expect(tree.getSize()).toBe(3);
        expect(tree.inOrderTraversal()).toEqual([3, 2, 1]);
        expect(tree.preOrderTraversal()).toEqual([1, 2, 3]);
        expect(tree.postOrderTraversal()).toEqual([3, 2, 1]);
        expect(tree.levelOrderTraversal()).toEqual([1, 2, 3]);
    });

    test('should handle edge cases for traversals (skewed tree - right)', () => {
        const node1 = new BinaryTreeNode(1);
        const node2 = new BinaryTreeNode(2);
        const node3 = new BinaryTreeNode(3);
        node1.right = node2;
        node2.right = node3;
        tree.setRoot(node1); // 1 -> 2 -> 3 (all right children)

        expect(tree.getSize()).toBe(3);
        expect(tree.inOrderTraversal()).toEqual([1, 2, 3]);
        expect(tree.preOrderTraversal()).toEqual([1, 2, 3]);
        expect(tree.postOrderTraversal()).toEqual([3, 2, 1]);
        expect(tree.levelOrderTraversal()).toEqual([1, 2, 3]);
    });
});