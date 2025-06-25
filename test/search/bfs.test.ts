import bfs from '../../src/search/bfs';

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

    describe('BFS (Breadth-First Search)', () => {
        test('should traverse a simple graph correctly starting from A', () => {
            const path = bfs(graph, 'A');
            // BFS order is level-by-level, specific order may depend on adjacency list's internal order.
            // Starting from A, B and C are visited first (same level), then D.
            // Assertions here might need to account for the order of neighbor traversal.
            expect(path).toEqual(expect.arrayContaining(['A', 'B', 'C', 'D']));
            expect(path.length).toBe(4); // Ensure all nodes are visited
            // More precise BFS order assertion depends on deterministic sorting of neighbors in adjacency list.
            // For this specific graph, valid BFS paths could be ['A', 'B', 'C', 'D'] or ['A', 'C', 'B', 'D'].
            // Let's check for a valid order.
            const validOrders = [
                ['A', 'B', 'C', 'D'],
                ['A', 'C', 'B', 'D']
            ];
            const isValid = validOrders.some(order => JSON.stringify(order) === JSON.stringify(path));
            expect(isValid).toBe(true);
        });

        test('should throw an error for a non-existent start node', () => {
            expect(() => bfs(graph, 'Z')).toThrow("Start node 'Z' not found in the graph.");
        });

        test('should handle graphs with a single node', () => {
            const singleNodeGraph = { 'E': [] };
            expect(bfs(singleNodeGraph, 'E')).toEqual(['E']);
        });

        test('should handle disconnected graphs (only visits its component)', () => {
            const path = bfs(disconnectedGraph, 'A');
            expect(path).toEqual(expect.arrayContaining(['A', 'B', 'C']));
            expect(path.length).toBe(3);
            expect(path).not.toContain('1'); // Should not visit other components
            expect(path).not.toContain('X');
        });

        test('should work for an empty graph (empty array)', () => {
            const emptyGraph = {};
            expect(() => bfs(emptyGraph, 'A')).toThrow("Start node 'A' not found in the graph.");
        });
    });
});