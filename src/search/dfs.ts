import { Graph } from './graph'
/**
 * Depth-First Search (DFS) - Recursive Implementation
 * @param graph The graph represented as an adjacency list
 * @param startNode The starting node for the traversal
 * @returns The order of visited nodes
 */
export function dfsRecursive(graph: Graph, startNode: string): string[] {
    if (!graph[startNode]) {
        throw new Error(`Start node '${startNode}' not found in the graph.`);
    }
    const visited = new Set<string>(); // Set to store already visited nodes
    const traversalPath: string[] = []; // Array to store the order of visited nodes
    // Helper function: Performs the actual recursive DFS
    function _dfs(node: string) {
        visited.add(node); // Mark the current node as visited
        traversalPath.push(node); // Record the traversal order
        // Iterate through all neighbors of the current node
        for (const neighbor of graph[node]) {
            // If the neighbor has not been visited, recursively visit it
            if (!visited.has(neighbor)) {
                _dfs(neighbor);
            }
        }
    }
    _dfs(startNode); // Start the recursive function from the start node
    return traversalPath;
}


/**
 * Depth-First Search (DFS) - Stack Implementation (Iterative)
 * @param graph The graph represented as an adjacency list
 * @param startNode The starting node for the traversal
 * @returns The order of visited nodes
 */
export function dfsIterative(graph: Graph, startNode: string): string[] {
    if (!graph[startNode]) {
        throw new Error(`Start node '${startNode}' not found in the graph.`);
    }
    const stack: string[] = []; // Stack to store nodes to be visited
    const visited = new Set<string>(); // Set to store already visited nodes
    const traversalPath: string[] = []; // Array to store the order of visited nodes
    // 1. Initialization: Push the start node onto the stack and mark as visited
    stack.push(startNode);
    visited.add(startNode); // Note: In stack implementation, node is marked visited upon push, actual processing happens upon pop.
    // 2. Loop traversal: While the stack is not empty
    while (stack.length > 0) {
        const currentNode = stack.pop()!; // Pop a node from the top of the stack
        // If the node hasn't been processed yet (e.g., reached from a different path, but processed only on pop)
        // In this specific pattern, visited is added on push, and if already processed on pop, it's skipped.
        // A more common pattern is to add to visited and path *after* popping the node.
        if (!traversalPath.includes(currentNode)) { // Check if already processed to avoid duplicates in path (though visited set prevents duplicate visits)
            traversalPath.push(currentNode); // Record traversal order (actual visit point)
        }
        // Iterate through all neighbors of the current node (Note: often pushed in reverse order to mimic recursive DFS)
        // E.g., if neighbors are ['B', 'C'], push 'C' then 'B' to visit 'B' first.
        // Here, we just iterate, the order depends on the internal order of graph[currentNode]
        for (const neighbor of graph[currentNode]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor); // Mark as visited (to prevent duplicate pushes)
                stack.push(neighbor); // Push onto stack
            }
        }
    }
    return traversalPath;
}