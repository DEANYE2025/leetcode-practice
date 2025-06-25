import { Graph } from './graph'
/**
 * Breadth-First Search (BFS)
 * @param graph The graph represented as an adjacency list
 * @param startNode The starting node for the traversal
 * @returns The order of visited nodes
 */
function bfs(graph: Graph, startNode: string): string[] {
    // Check if the start node exists in the graph
    if (!graph[startNode]) {
        throw new Error(`Start node '${startNode}' not found in the graph.`);
    }
    const queue: string[] = []; // Queue to store nodes to be visited
    const visited = new Set<string>(); // Set to store already visited nodes
    const traversalPath: string[] = []; // Array to store the order of visited nodes
    // 1. Initialization: Enqueue the start node and mark it as visited
    queue.push(startNode);
    visited.add(startNode);
    traversalPath.push(startNode); // Record the start node immediately
    // 2. Loop traversal: While the queue is not empty
    while (queue.length > 0) {
        const currentNode = queue.shift()!; // Dequeue a node from the front of the queue (TypeScript non-null assertion)
        // Iterate through all neighbors of the current node
        for (const neighbor of graph[currentNode]) {
            // If the neighbor has not been visited yet
            if (!visited.has(neighbor)) {
                visited.add(neighbor); // Mark as visited
                queue.push(neighbor); // Enqueue it
                traversalPath.push(neighbor); // Record the traversal order
            }
        }
    }
    return traversalPath;
}

export default bfs;