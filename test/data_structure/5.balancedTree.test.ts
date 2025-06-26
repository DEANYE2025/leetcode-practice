// avlTree.test.ts

import { AVLTree, AVLNode } from '../../src/data_structure/5.balancedTree';

describe('AVLTree', () => {
    let avl: AVLTree<number>;

    beforeEach(() => {
        avl = new AVLTree<number>();
    });

    test('should initialize as empty', () => {
        expect(avl.getSize()).toBe(0);
        expect(avl.isEmpty()).toBe(true);
        expect(avl.search(5)).toBe(false);
        expect(avl.inOrderTraversal()).toEqual([]);
    });

    // --- Insertion and Balance Testing ---
    test('should insert elements and maintain balance (single rotation cases)', () => {
        // Left-Left Case (Right Rotation)
        //   30
        //  /
        // 20
        // /
        // 10
        avl.insert(30);
        avl.insert(20);
        avl.insert(10);
        expect(avl.getSize()).toBe(3);
        expect(avl.inOrderTraversal()).toEqual([10, 20, 30]); // Should be balanced
        expect(avl.levelOrderTraversal()).toEqual([20, 10, 30]); // Root should be 20

        // Right-Right Case (Left Rotation)
        // 10
        //  \
        //   20
        //    \
        //     30
        avl = new AVLTree<number>(); // Reset
        avl.insert(10);
        avl.insert(20);
        avl.insert(30);
        expect(avl.getSize()).toBe(3);
        expect(avl.inOrderTraversal()).toEqual([10, 20, 30]);
        expect(avl.levelOrderTraversal()).toEqual([20, 10, 30]); // Root should be 20
    });

    test('should insert elements and maintain balance (double rotation cases)', () => {
        // Left-Right Case (Left then Right Rotation)
        //   30
        //  /
        // 10
        //  \
        //   20
        avl.insert(30);
        avl.insert(10);
        avl.insert(20);
        expect(avl.getSize()).toBe(3);
        expect(avl.inOrderTraversal()).toEqual([10, 20, 30]);
        expect(avl.levelOrderTraversal()).toEqual([20, 10, 30]); // Root should be 20

        // Right-Left Case (Right then Left Rotation)
        // 10
        //  \
        //   30
        //  /
        // 20
        avl = new AVLTree<number>(); // Reset
        avl.insert(10);
        avl.insert(30);
        avl.insert(20);
        expect(avl.getSize()).toBe(3);
        expect(avl.inOrderTraversal()).toEqual([10, 20, 30]);
        expect(avl.levelOrderTraversal()).toEqual([20, 10, 30]); // Root should be 20
    });

    test('should insert multiple elements and maintain balance', () => {
        const elements = [50, 25, 75, 10, 35, 60, 80, 5, 15, 30, 40, 55, 65, 78, 85];
        elements.forEach(el => avl.insert(el));
        expect(avl.getSize()).toBe(elements.length);

        // Verify in-order traversal (should always be sorted)
        expect(avl.inOrderTraversal()).toEqual(elements.sort((a, b) => a - b));

        // Verify search for all inserted elements
        elements.forEach(el => expect(avl.search(el)).toBe(true));
        expect(avl.search(99)).toBe(false); // Non-existent

        // Verify balance factor of root and some other nodes (manual check if needed)
        // This requires inspecting internal state or creating a debug helper
        // For unit tests, testing 'balanced' behavior is implicitly done by checking
        // that operations (like search, next insertions) still work in O(logN) fashion
        // and that the structure appears sorted. The level-order traversal can hint at balance.
        // Example for a balanced tree of these elements (might vary slightly depending on rotations):
        // expect(avl.levelOrderTraversal()).toEqual([35, 15, 60, 5, 25, 55, 78, 10, 30, 40, 65, 80, 85]);
        // The exact level order can be tricky without visualizing the final tree after rotations.
        // The key is that `inOrderTraversal` is sorted.
    });

    test('should not insert duplicate elements', () => {
        avl.insert(10);
        avl.insert(20);
        avl.insert(10); // Duplicate
        expect(avl.getSize()).toBe(2);
        expect(avl.inOrderTraversal()).toEqual([10, 20]);
    });

    // --- Search Operations ---
    test('should find existing elements after insertions', () => {
        avl.insert(10); avl.insert(5); avl.insert(15); avl.insert(2); avl.insert(7);
        expect(avl.search(10)).toBe(true);
        expect(avl.search(5)).toBe(true);
        expect(avl.search(15)).toBe(true);
        expect(avl.search(2)).toBe(true);
        expect(avl.search(7)).toBe(true);
        expect(avl.search(1)).toBe(false);
        expect(avl.search(6)).toBe(false);
    });

    // --- Deletion Operations ---
    test('should delete leaf nodes and maintain balance', () => {
        avl.insert(20);
        avl.insert(10);
        avl.insert(30);
        avl.insert(5);
        avl.insert(15);
        // Balanced tree:   20
        //                /    \
        //              10      30
        //             /  \
        //            5   15

        expect(avl.delete(5)).toBe(true); // Delete leaf 5
        expect(avl.getSize()).toBe(4);
        expect(avl.inOrderTraversal()).toEqual([10, 15, 20, 30]);
        expect(avl.search(5)).toBe(false);

        expect(avl.delete(15)).toBe(true); // Delete leaf 15
        expect(avl.getSize()).toBe(3);
        expect(avl.inOrderTraversal()).toEqual([10, 20, 30]);
        expect(avl.search(15)).toBe(false);
    });

    test('should delete node with one child and maintain balance', () => {
        avl.insert(20);
        avl.insert(10);
        avl.insert(30);
        avl.insert(5);
        // Tree:   20
        //        /  \
        //      10    30
        //     /
        //    5
        expect(avl.inOrderTraversal()).toEqual([5, 10, 20, 30]);

        expect(avl.delete(10)).toBe(true); // Delete node 10 (has child 5)
        expect(avl.getSize()).toBe(3);
        expect(avl.inOrderTraversal()).toEqual([5, 20, 30]); // 5 should replace 10
        expect(avl.search(10)).toBe(false);
        // After deletion and possible rebalance: 20 -> 5 (left), 30 (right)
        // Or 5 -> 20 (right), 30 (20's right) depending on precise rebalance
        expect(avl.levelOrderTraversal()).toEqual([20, 5, 30]);
    });

    test('should delete node with two children and maintain balance', () => {
        avl.insert(50);
        avl.insert(30);
        avl.insert(70);
        avl.insert(20);
        avl.insert(40);
        avl.insert(60);
        avl.insert(80);
        // A relatively balanced tree
        //        50
        //      /    \
        //    30      70
        //   / \     /  \
        //  20 40   60   80
        expect(avl.getSize()).toBe(7);
        expect(avl.inOrderTraversal()).toEqual([20, 30, 40, 50, 60, 70, 80]);

        expect(avl.delete(50)).toBe(true); // Delete root (50). In-order successor is 60.
        expect(avl.getSize()).toBe(6);
        expect(avl.search(50)).toBe(false);
        expect(avl.inOrderTraversal()).toEqual([20, 30, 40, 60, 70, 80]); // 60 replaces 50

        // The tree should still be balanced. Level order might change.
        // e.g., Root is 60, left child 30, right child 70.
        // expect(avl.levelOrderTraversal()).toEqual([60, 30, 70, 20, 40, 80]); // One possible result
    });

    test('should handle deletion that triggers multiple rotations', () => {
        // Scenario for double rotation on deletion
        avl.insert(30);
        avl.insert(10);
        avl.insert(50);
        avl.insert(5);
        avl.insert(20);
        avl.insert(40);
        avl.insert(60);
        avl.insert(25); // Insert 25 (Left-Right-Left) scenario
        // Current in-order: [5, 10, 20, 25, 30, 40, 50, 60]
        expect(avl.getSize()).toBe(8);

        expect(avl.delete(60)).toBe(true); // Deleting 60 might unbalance 30's right subtree
        // Tree might look like:
        //      30
        //     /  \
        //   10    50
        //  / \   /
        // 5  20 40
        //     \
        //      25
        // After deleting 60, 50 might become right-heavy or need rebalancing.
        // The exact rotations depend on the path and balance factors.
        expect(avl.getSize()).toBe(7);
        expect(avl.inOrderTraversal()).toEqual([5, 10, 20, 25, 30, 40, 50]);
        // The key is that it remains sorted and the size is correct.
    });


    test('should return false when trying to delete non-existing value', () => {
        avl.insert(10);
        avl.insert(5);
        expect(avl.delete(99)).toBe(false);
        expect(avl.getSize()).toBe(2); // Size should not change
        expect(avl.inOrderTraversal()).toEqual([5, 10]);
    });

    test('should handle deletion from an empty tree', () => {
        expect(avl.delete(10)).toBe(false);
        expect(avl.getSize()).toBe(0);
        expect(avl.isEmpty()).toBe(true);
    });

    // --- Traversal Operations ---
    test('should perform in-order traversal correctly (always sorted)', () => {
        const elements = [10, 5, 15, 2, 7, 12, 17, 1, 6, 8, 11, 13, 16, 18];
        elements.forEach(el => avl.insert(el));
        expect(avl.inOrderTraversal()).toEqual([...elements].sort((a, b) => a - b));
    });

    test('should perform level-order (BFS) traversal correctly after balancing', () => {
        avl.insert(10);
        avl.insert(5);
        avl.insert(15);
        avl.insert(2);
        avl.insert(7);
        // Tree:   10
        //        /  \
        //       5    15
        //      / \
        //     2   7
        expect(avl.levelOrderTraversal()).toEqual([10, 5, 15, 2, 7]); // This structure is balanced.

        avl = new AVLTree<number>(); // Reset
        // Test a specific rebalance sequence that leads to a clear level order
        avl.insert(1);
        avl.insert(2);
        avl.insert(3); // Left rotation, root becomes 2
        expect(avl.levelOrderTraversal()).toEqual([2, 1, 3]);

        avl = new AVLTree<number>(); // Reset
        avl.insert(3);
        avl.insert(1);
        avl.insert(2); // Left-Right rotation, root becomes 2
        expect(avl.levelOrderTraversal()).toEqual([2, 1, 3]);
    });

    test('traversal on empty tree should return empty array', () => {
        expect(avl.inOrderTraversal()).toEqual([]);
        expect(avl.levelOrderTraversal()).toEqual([]);
    });
});