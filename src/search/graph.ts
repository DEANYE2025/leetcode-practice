/**
 * Graph representation: Adjacency List
 * Key: Node name (string)
 * Value: Array of neighbor node names (string[])
 */
export type Graph = {
    [key: string]: string[];
};