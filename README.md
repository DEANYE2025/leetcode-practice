# 🚀 LeetCode Algorithms & Data Structures for Tech Interviews

This repository serves as a personal guide and collection of solutions for common algorithms and data structures frequently encountered in technical interviews. It aims to provide a structured approach to mastering these concepts.

---

## 🎯 Interview Preparation Focus Areas

Mastering technical interviews requires a solid understanding of both Data Structures and Algorithms. While LeetCode's "Top 100 Liked Questions" and "Grind 75" (often referred to as Classic 150) are excellent starting points, a broader range of topics is essential for comprehensive preparation.

### 1. Data Structures

Understanding the properties, operations, and appropriate use cases for each data structure is fundamental.

* **Arrays:**
    * Dynamic Arrays (e.g., JavaScript Array, Python List)
    * Fixed-size Arrays
* **Strings:**
    * Common string operations (substring, concatenation, search, replace, reverse).
    * String matching algorithms (KMP, Rabin-Karp - understanding principles is often enough).
* **Linked Lists:**
    * Singly, Doubly, Circular Linked Lists.
    * Common operations: Insertion, deletion, reversal, finding middle node, merging, cycle detection.
* **Stacks:**
    * Last-In, First-Out (LIFO).
    * Applications: Parentheses matching, expression evaluation, function call stack simulation.
* **Queues:**
    * First-In, First-Out (FIFO).
    * Applications: Breadth-First Search (BFS), task scheduling.
    * Deque (Double-Ended Queue).
    * Priority Queue (usually implemented with Heaps).
* **Hash Tables / Hash Maps:**
    * Core: Key-value storage with O(1) average time complexity for lookup/insertion/deletion.
    * Collision resolution techniques (Separate Chaining, Open Addressing).
    * Applications: Deduplication, counting frequencies, caching, quick lookups (e.g., Two Sum, Group Anagrams).
* **Trees:**
    * **Binary Trees:** Traversal (Pre-order, In-order, Post-order, Out-of-order, Level-order), search, insertion, deletion, height, balance.
    * **Binary Search Trees (BST):** Properties, search, insertion, deletion, construction, balancing (AVL, Red-Black Tree - conceptual understanding is often sufficient).
    * **Heaps:** Max-Heap, Min-Heap. Commonly used for Priority Queues. Applications: Top K problems, Heap Sort.
* **Graphs:**
    * Representation: Adjacency Matrix, Adjacency List.
    * Traversal algorithms: Depth-First Search (DFS), Breadth-First Search (BFS).
    * Common problems: Shortest Path (Dijkstra, Bellman-Ford - conceptual understanding), Minimum Spanning Tree (Prim, Kruskal - conceptual understanding), Topological Sort, Connected Components.
* **Trie (Prefix Tree):**
    * Used for efficient storage and retrieval of string sets.
    * Applications: Autocomplete, spell checker, censor filters.

### 2. Algorithms

Understanding the problem-solving paradigms and specific algorithms is crucial.

* **Sorting Algorithms:**
    * **Basic Sorts:** Bubble Sort, Selection Sort, Insertion Sort (understand principles and performance).
    * **Efficient Sorts:**
        * **Quick Sort:** Principles, partitioning, average O(N log N) performance, worst-case considerations.
        * **Merge Sort:** Principles, divide and conquer, O(N log N) stable sort.
        * Heap Sort: Leveraging heap properties.
    * **Non-Comparison Sorts:** Counting Sort, Radix Sort, Bucket Sort (applicable for specific data ranges).
* **Searching Algorithms:**
    * **Binary Search:** Most frequently used efficient search algorithm.
    * DFS, BFS (used for tree and graph traversals).
* **Recursion & Backtracking:**
    * Recursion as a tool for solving problems with repetitive subproblems.
    * Backtracking as a general paradigm for combinatorial problems (e.g., Permutations, Combinations, N-Queens, Sudoku Solver).
* **Dynamic Programming (DP):**
    * Identifying overlapping subproblems and optimal substructure.
    * State definition, recurrence relations.
    * Common types: Knapsack problems, Longest Common Subsequence/Substring, Fibonacci sequence, pathfinding problems, House Robber.
* **Greedy Algorithms:**
    * Making locally optimal choices in the hope of reaching a global optimum.
    * Understanding conditions for applicability.
* **Divide and Conquer:**
    * Breaking problems into independent subproblems.
    * Applications: Merge Sort, Quick Sort, large integer multiplication.
* **Bit Manipulation:**
    * Using bitwise operations (AND, OR, XOR, NOT, shifts) for efficient solutions.
    * Applications: Parity check, permission management, number representation.
* **Two Pointers:**
    * Fast/slow pointers, left/right pointers.
    * Applications: Array deduplication, searching, sliding window, linked list cycle detection.
* **Sliding Window:**
    * For problems involving contiguous subarrays/substrings.
    * Applications: Finding longest/shortest valid substring, substring containing specific characters.

### 3. System Design

Crucial for senior-level and sometimes even mid-level roles, assessing your ability to design large-scale, scalable, highly available systems.

* **Core Concepts:** Scalability, availability, consistency, fault tolerance, load balancing, caching, database choices (SQL vs NoSQL), message queues.
* **Common Design Problems:** Design a URL Shortener, Twitter/Facebook Feed, YouTube/Netflix streaming, Uber ride-hailing system, Google Search, Chat system.

### 4. Object-Oriented Design (OOD)

Sometimes tested on how you apply OOP principles (encapsulation, inheritance, polymorphism, abstraction) to design classes and their relationships.

* **Design Patterns:** While not always required to implement, understanding common patterns (e.g., Factory, Singleton, Observer, Strategy) helps in writing elegant and maintainable code.

### 5. Complexity Analysis (Time/Space Complexity)

A foundational skill for all algorithm problems. You must be able to analyze and optimize the asymptotic time and space complexity of your code.

---

## ✅ Preparation Strategy

1.  **Phase-based Learning:** Start with fundamental data structures and algorithms, then progressively move to more complex topics like Dynamic Programming and Graph algorithms.
2.  **Practice Extensively:** LeetCode is an excellent platform. When practicing, don't just aim for Accepted (AC) solutions; strive to understand multiple approaches and analyze their pros and cons. Focus on problems from **LeetCode's "Top 100 Liked Questions"** and **"Grind 75" (Classic 150)** as priority sets.
3.  **Hand-Coding Practice:** Get comfortable writing code on a whiteboard or paper to simulate interview conditions.
4.  **Communication Skills:** Clearly articulating your thought process, explaining your choices, and engaging with the interviewer are as vital as the code itself.
5.  **Targeted Preparation:** Research the specific tech stack and interview preferences of the companies you are applying to.

---

Feel free to explore the code solutions within this repository, categorized by problem or algorithm type, as you progress through your interview preparation journey.

Good luck! ✨