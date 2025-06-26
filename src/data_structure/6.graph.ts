/**
 * Graph Class (Adjacency List Implementation)
 * Represents an undirected graph using an adjacency list.
 * Each vertex is a key in a Map, and its value is a Set of its neighboring vertices.
 */
export class Graph<T> {
    // Adjacency list: Map<Vertex, Set<Neighbor>>
    private adjacencyList: Map<T, Set<T>>;
    private _numVertices: number;
    private _numEdges: number;
    constructor() {
        this.adjacencyList = new Map<T, Set<T>>();
        this._numVertices = 0;
        this._numEdges = 0;
    }
    /**
     * Returns the total number of vertices in the graph.
     * Time Complexity: O(1)
     * @returns The number of vertices.
     */
    public getNumVertices(): number {
        return this._numVertices;
    }
    /**
     * Returns the total number of edges in the graph.
     * Time Complexity: O(1)
     * @returns The number of edges.
     */
    public getNumEdges(): number {
        return this._numEdges;
    }
    /**
     * Adds a vertex to the graph.
     * If the vertex already exists, it does nothing.
     * Time Complexity: O(1)
     * @param vertex The vertex to add.
     * @returns True if the vertex was added, false if it already existed.
     */
    public addVertex(vertex: T): boolean {
        if (!this.adjacencyList.has(vertex)) {
        this.adjacencyList.set(vertex, new Set<T>());
        this._numVertices++;
        return true;
        }
        return false;
    }
    /**
     * Checks if a vertex exists in the graph.
     * Time Complexity: O(1)
     * @param vertex The vertex to check.
     * @returns True if the vertex exists, false otherwise.
     */
    public hasVertex(vertex: T): boolean {
        return this.adjacencyList.has(vertex);
    }
    /**
     * Adds an undirected edge between two vertices.
     * If either vertex does not exist, it will be added.
     * If the edge already exists, it does nothing.
     * Time Complexity: O(1) on average (due to Map/Set operations).
     * @param vertex1 The first vertex.
     * @param vertex2 The second vertex.
     * @returns True if the edge was added, false if it already existed.
     */
    public addEdge(vertex1: T, vertex2: T): boolean {
        // Ensure both vertices exist
        this.addVertex(vertex1);
        this.addVertex(vertex2);
        // Add edge in both directions for an undirected graph
        const neighbors1 = this.adjacencyList.get(vertex1)!;
        const neighbors2 = this.adjacencyList.get(vertex2)!;
        if (!neighbors1.has(vertex2)) { // Check only one direction as it's undirected
            neighbors1.add(vertex2);
            neighbors2.add(vertex1);
            this._numEdges++;
            return true;
        }
        return false;
    }
    /**
     * Checks if an edge exists between two vertices.
     * Time Complexity: O(1) on average.
     * @param vertex1 The first vertex.
     * @param vertex2 The second vertex.
     * @returns True if an edge exists, false otherwise.
     */
    public hasEdge(vertex1: T, vertex2: T): boolean {
        if (!this.hasVertex(vertex1) || !this.hasVertex(vertex2)) {
            return false;
        }
        // For undirected graph, checking one direction is sufficient
        return this.adjacencyList.get(vertex1)!.has(vertex2);
    }
    /**
     * Removes a vertex from the graph and all its incident edges.
     * Time Complexity: O(V + E) in worst case (iterating through all neighbors of removed vertex).
     * @param vertex The vertex to remove.
     * @returns True if the vertex was removed, false if it did not exist.
     */
    public removeVertex(vertex: T): boolean {
        if (!this.adjacencyList.has(vertex)) {
            return false;
        }
        // Remove all edges connected to this vertex
        const neighbors = this.adjacencyList.get(vertex)!;
        for (const neighbor of neighbors) {
            this.adjacencyList.get(neighbor)!.delete(vertex); // Remove edge from neighbor's list
            this._numEdges--; // Decrement edge count for each removed edge
        }
        // Finally, delete the vertex itself
        this.adjacencyList.delete(vertex);
        this._numVertices--;
        return true;
    }
    /**
     * Removes an edge between two vertices.
     * Time Complexity: O(1) on average.
     * @param vertex1 The first vertex.
     * @param vertex2 The second vertex.
     * @returns True if the edge was removed, false if it did not exist.
     */
    public removeEdge(vertex1: T, vertex2: T): boolean {
        if (!this.hasEdge(vertex1, vertex2)) {
            return false;
        }
        this.adjacencyList.get(vertex1)!.delete(vertex2);
        this.adjacencyList.get(vertex2)!.delete(vertex1); // For undirected graph
        this._numEdges--;
        return true;
    }
    /**
     * Returns a Set of all neighbors of a given vertex.
     * Time Complexity: O(1) on average.
     * @param vertex The vertex to get neighbors for.
     * @returns A Set of neighboring vertices, or undefined if the vertex does not exist.
     */
    public getNeighbors(vertex: T): Set<T> | undefined {
        return this.adjacencyList.get(vertex);
    }
    /**
     * Performs a Breadth-First Search (BFS) starting from a given vertex.
     * @param startVertex The vertex to start the BFS from.
     * @returns An array of vertices in BFS order.
     * @throws Error if the start vertex does not exist.
     */
    public bfs(startVertex: T): T[] {
        if (!this.hasVertex(startVertex)) {
            throw new Error(`Start vertex ${startVertex} not found in graph.`);
        }
        const visited = new Set<T>();
        const queue: T[] = [];
        const result: T[] = [];
        visited.add(startVertex);
        queue.push(startVertex);
        while (queue.length > 0) {
            const currentVertex = queue.shift()!;
            result.push(currentVertex);
            const neighbors = this.adjacencyList.get(currentVertex)!;
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
        return result;
    }
    /**
     * Performs a Depth-First Search (DFS) starting from a given vertex.
     * @param startVertex The vertex to start the DFS from.
     * @returns An array of vertices in DFS order.
     * @throws Error if the start vertex does not exist.
     */
    public dfs(startVertex: T): T[] {
        if (!this.hasVertex(startVertex)) {
            throw new Error(`Start vertex ${startVertex} not found in graph.`);
        }
        const visited = new Set<T>();
        const result: T[] = [];
        const dfsRecursive = (vertex: T) => {
            visited.add(vertex);
            result.push(vertex);
            const neighbors = this.adjacencyList.get(vertex)!;
            // Sort neighbors to ensure consistent DFS order for testing, though not strictly necessary for DFS correctness
            const sortedNeighbors = Array.from(neighbors).sort(); 
            for (const neighbor of sortedNeighbors) {
                if (!visited.has(neighbor)) {
                    dfsRecursive(neighbor);
                }
            }
        };
        dfsRecursive(startVertex);
        return result;
    }
    /**
     * Returns an array of all vertices in the graph.
     * @returns An array of all vertices.
     */
    public getVertices(): T[] {
        return Array.from(this.adjacencyList.keys());
    }
    /**
     * Clears the graph, removing all vertices and edges.
     * Time Complexity: O(1)
     */
    public clear(): void {
        this.adjacencyList.clear();
        this._numVertices = 0;
        this._numEdges = 0;
    }
}