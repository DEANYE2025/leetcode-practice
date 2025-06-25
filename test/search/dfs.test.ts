import { dfsRecursive, dfsIterative } from '../../src/search/dfs';

describe('Graph Traversal Algorithms', () => {
    // Define a graph for testing
    const graph = {
        'A': ['B', 'C'],
        'B': ['A', 'D'],
        'C': ['A', 'D'],
        'D': ['B', 'C'],
    };

    // Define a more complex graph with multiple disconnected components
    const disconnectedGraph = {
        '1': ['2'],
        '2': ['1'],
        'A': ['B', 'C'],
        'B': ['A'],
        'C': ['A'],
        'X': ['Y'],
        'Y': ['X'],
    };

    describe('DFS (Depth-First Search) - Recursive', () => {
        test('should traverse a simple graph correctly starting from A', () => {
            const path = dfsRecursive(graph, 'A');
            // DFS order will go deeper, specific order depends on adjacency list's internal order.
            // Starting from A, it might be A->B->D->C
            const validOrders = [
                ['A', 'B', 'D', 'C'], // If B is visited first, then from B, D is visited. From D, C is visited.
                ['A', 'C', 'D', 'B']  // If C is visited first, then from C, D is visited. From D, B is visited.
            ];
            const isValid = validOrders.some(order => JSON.stringify(order) === JSON.stringify(path));
            expect(isValid).toBe(true);
            expect(path.length).toBe(4);
        });

        test('should throw an error for a non-existent start node', () => {
            expect(() => dfsRecursive(graph, 'Z')).toThrow("Start node 'Z' not found in the graph.");
        });

        test('should handle graphs with a single node', () => {
        const singleNodeGraph = { 'E': [] };
            expect(dfsRecursive(singleNodeGraph, 'E')).toEqual(['E']);
        });

        test('should handle disconnected graphs (only visits its component)', () => {
            const path = dfsRecursive(disconnectedGraph, 'A');
            expect(path).toEqual(expect.arrayContaining(['A', 'B', 'C']));
            expect(path.length).toBe(3);
            expect(path).not.toContain('1');
            expect(path).not.toContain('X');
        });
    });

    describe('DFS (Depth-First Search) - Iterative (Stack)', () => {
        test('should traverse a simple graph correctly starting from A', () => {
        const path = dfsIterative(graph, 'A');
        // Stack-based DFS order might differ slightly from recursive, depending on neighbor push order.
        // For this test to pass, we use valid orders similar to the recursive version.
        const validOrders = [
            ['A', 'C', 'D', 'B'], // If 'C' is pushed last (and hence popped first from A's neighbors ['B','C'])
            ['A', 'B', 'D', 'C']
        ];
        const isValid = validOrders.some(order => JSON.stringify(order) === JSON.stringify(path));
            expect(isValid).toBe(true);
            expect(path.length).toBe(4);
        });

        test('should throw an error for a non-existent start node', () => {
            expect(() => dfsIterative(graph, 'Z')).toThrow("Start node 'Z' not found in the graph.");
        });

        test('should handle graphs with a single node', () => {
            const singleNodeGraph = { 'E': [] };
            expect(dfsIterative(singleNodeGraph, 'E')).toEqual(['E']);
        });

        test('should handle disconnected graphs (only visits its component)', () => {
            const path = dfsIterative(disconnectedGraph, 'A');
            expect(path).toEqual(expect.arrayContaining(['A', 'B', 'C']));
            expect(path.length).toBe(3);
            expect(path).not.toContain('1');
            expect(path).not.toContain('X');
        });
    });
});