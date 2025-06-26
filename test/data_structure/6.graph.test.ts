import { Graph } from '../../src/data_structure/6.graph';

describe('Graph (Adjacency List)', () => {
    let graph: Graph<string>;

    beforeEach(() => {
        graph = new Graph<string>();
    });

    test('should initialize as empty', () => {
        expect(graph.getNumVertices()).toBe(0);
        expect(graph.getNumEdges()).toBe(0);
        expect(graph.hasVertex('A')).toBe(false);
        expect(graph.hasEdge('A', 'B')).toBe(false);
        expect(graph.getNeighbors('A')).toBeUndefined();
        expect(graph.getVertices()).toEqual([]);
    });

    // --- Vertex Operations ---
    test('should add vertices correctly', () => {
        expect(graph.addVertex('A')).toBe(true);
        expect(graph.getNumVertices()).toBe(1);
        expect(graph.hasVertex('A')).toBe(true);

        expect(graph.addVertex('B')).toBe(true);
        expect(graph.getNumVertices()).toBe(2);
        expect(graph.hasVertex('B')).toBe(true);

        // Adding existing vertex should return false and not change count
        expect(graph.addVertex('A')).toBe(false);
        expect(graph.getNumVertices()).toBe(2);
    });

    test('should remove vertices and their incident edges', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');
        graph.addEdge('A', 'B');
        graph.addEdge('B', 'C');
        expect(graph.getNumVertices()).toBe(3);
        expect(graph.getNumEdges()).toBe(2);
        expect(graph.hasEdge('A', 'B')).toBe(true);
        expect(graph.hasEdge('B', 'C')).toBe(true);

        expect(graph.removeVertex('B')).toBe(true);
        expect(graph.getNumVertices()).toBe(2);
        expect(graph.getNumEdges()).toBe(0); // Edges (A,B) and (B,C) should be removed
        expect(graph.hasVertex('B')).toBe(false);
        expect(graph.hasEdge('A', 'B')).toBe(false);
        expect(graph.hasEdge('B', 'C')).toBe(false);
        expect(graph.getNeighbors('A')?.has('B')).toBe(false); // B should be removed from A's neighbors
        expect(graph.getNeighbors('C')?.has('B')).toBe(false); // B should be removed from C's neighbors

        // Removing non-existent vertex should return false
        expect(graph.removeVertex('D')).toBe(false);
        expect(graph.getNumVertices()).toBe(2);
    });

    // --- Edge Operations ---
    test('should add edges correctly (undirected)', () => {
        graph.addEdge('A', 'B'); // Adds A and B if not present
        expect(graph.getNumVertices()).toBe(2);
        expect(graph.getNumEdges()).toBe(1);
        expect(graph.hasEdge('A', 'B')).toBe(true);
        expect(graph.hasEdge('B', 'A')).toBe(true); // Undirected

        graph.addEdge('B', 'C');
        expect(graph.getNumVertices()).toBe(3);
        expect(graph.getNumEdges()).toBe(2);
        expect(graph.hasEdge('B', 'C')).toBe(true);
        expect(graph.hasEdge('C', 'B')).toBe(true);

        // Adding existing edge should return false and not change count
        expect(graph.addEdge('A', 'B')).toBe(false);
        expect(graph.getNumEdges()).toBe(2);
    });

    test('should remove edges correctly', () => {
        graph.addEdge('A', 'B');
        graph.addEdge('B', 'C');
        expect(graph.getNumEdges()).toBe(2);

        expect(graph.removeEdge('A', 'B')).toBe(true);
        expect(graph.getNumEdges()).toBe(1);
        expect(graph.hasEdge('A', 'B')).toBe(false);
        expect(graph.hasEdge('B', 'A')).toBe(false); // Undirected

        // Removing non-existent edge should return false
        expect(graph.removeEdge('A', 'C')).toBe(false);
        expect(graph.getNumEdges()).toBe(1); // Count should not change
    });

    test('getNeighbors should return correct neighbors', () => {
        graph.addEdge('A', 'B');
        graph.addEdge('A', 'C');
        graph.addEdge('B', 'D');
        expect(graph.getNeighbors('A')).toEqual(new Set(['B', 'C']));
        expect(graph.getNeighbors('B')).toEqual(new Set(['A', 'D']));
        expect(graph.getNeighbors('C')).toEqual(new Set(['A']));
        expect(graph.getNeighbors('D')).toEqual(new Set(['B']));
        expect(graph.getNeighbors('E')).toBeUndefined(); // Non-existent vertex
    });

    // --- Traversal Operations ---
    describe('Graph Traversal', () => {
        beforeEach(() => {
        // Create a sample graph for traversals
        // A --- B
        // |     |
        // C --- D --- E
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');
        graph.addVertex('D');
        graph.addVertex('E');
        graph.addEdge('A', 'B');
        graph.addEdge('A', 'C');
        graph.addEdge('B', 'D');
        graph.addEdge('C', 'D');
        graph.addEdge('D', 'E');
        });

        test('bfs should traverse the graph correctly', () => {
        // Starting from 'A'
        expect(graph.bfs('A')).toEqual(['A', 'B', 'C', 'D', 'E']);
        // Starting from 'C'
        expect(graph.bfs('C')).toEqual(['C', 'A', 'D', 'B', 'E']);
        // Starting from 'E'
        expect(graph.bfs('E')).toEqual(['E', 'D', 'B', 'C', 'A']);
        });

        test('bfs should throw error for non-existent start vertex', () => {
        expect(() => graph.bfs('Z')).toThrow('Start vertex Z not found in graph.');
        });

        test('dfs should traverse the graph correctly', () => {
        // Starting from 'A' (DFS order can vary based on neighbor iteration order)
        // For consistent testing, neighbors are sorted in DFS implementation
        expect(graph.dfs('A')).toEqual(['A', 'B', 'D', 'C', 'E']); // A -> B -> D -> C -> E (if B is visited before C, D before C)
        // If neighbors are sorted (A: B, C), (B: A, D), (C: A, D), (D: B, C, E)
        // A -> B -> D -> C -> E (A -> B -> D. D's unvisited neighbors: C, E. C is smaller. C's unvisited: none. Backtrack. D's unvisited: E. E's unvisited: none. Backtrack.)
        // The order [A, B, D, C, E] is consistent with sorted neighbors.
        expect(graph.dfs('C')).toEqual(['C', 'A', 'B', 'D', 'E']);
        expect(graph.dfs('E')).toEqual(['E', 'D', 'B', 'A', 'C']);
        });

        test('dfs should throw error for non-existent start vertex', () => {
        expect(() => graph.dfs('Z')).toThrow('Start vertex Z not found in graph.');
        });
    });

    // --- Utility Operations ---
    test('getVertices should return all vertices', () => {
        graph.addVertex('X');
        graph.addVertex('Y');
        graph.addVertex('Z');
        expect(graph.getVertices().sort()).toEqual(['X', 'Y', 'Z'].sort());
    });

    test('clear should remove all vertices and edges', () => {
        graph.addVertex('A');
        graph.addEdge('A', 'B');
        graph.addEdge('B', 'C');
        expect(graph.getNumVertices()).toBe(3);
        expect(graph.getNumEdges()).toBe(2);

        graph.clear();
        expect(graph.getNumVertices()).toBe(0);
        expect(graph.getNumEdges()).toBe(0);
        expect(graph.hasVertex('A')).toBe(false);
        expect(graph.hasEdge('A', 'B')).toBe(false);
    });
});