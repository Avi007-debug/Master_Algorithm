import React, { useState } from 'react';
import { Button } from './ui/common';
import { BookOpen, CheckCircle, Circle, ArrowRight, ArrowLeft, X, Maximize2, Minimize2, Trophy, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Tutorial data ─────────────────────────────────────────────────────────
// Each step has: title, content, highlight, action?, checkpoint (question text),
// options (4 MCQ choices), correctIndex (0-3), explanation (shown after answer)
export const TUTORIALS = {
    // ── UNIT I : Brute Force ──────────────────────────────────────────────
    bubble_sort: {
        title: "Bubble Sort Tutorial",
        steps: [
            {
                title: "Welcome to Bubble Sort!",
                content: "Bubble Sort is one of the simplest sorting algorithms. It works by repeatedly comparing adjacent elements and swapping them if they're in the wrong order. Larger elements 'bubble up' to the end after each pass.",
                highlight: "description",
                checkpoint: "What does Bubble Sort do in each pass through the array?",
                options: ["Places the smallest element at position 0", "Moves the largest unsorted element to its correct position at the end", "Reverses the array", "Divides the array into two halves"],
                correctIndex: 1,
                explanation: "Each pass bubbles the largest unsorted element to the right end — after k passes, the k largest elements are in their final positions."
            },
            {
                title: "How It Works",
                content: "Compare arr[j] and arr[j+1]. If arr[j] > arr[j+1], swap them. After each full pass the next largest element settles into place. An optimization: if no swap occurs in a pass, the array is already sorted — stop early!",
                highlight: "visualization",
                checkpoint: "What is the best-case time complexity of optimized Bubble Sort?",
                options: ["O(n²)", "O(n log n)", "O(n)", "O(1)"],
                correctIndex: 2,
                explanation: "With the 'no-swap' flag, if the array is already sorted, only one pass (n−1 comparisons) is needed → O(n) best case."
            },
            {
                title: "Watch the First Pass",
                content: "Click 'Visualize' and watch the first pass. Notice how the algorithm compares each pair of adjacent elements from left to right, swapping whenever the left element is larger.",
                highlight: "controls",
                action: "run",
                checkpoint: "After the first complete pass, which element is guaranteed to be in its final sorted position?",
                options: ["The smallest element", "The middle element", "The largest element", "No element is guaranteed"],
                correctIndex: 2,
                explanation: "After the first pass, the largest element has bubbled all the way to the last index — it's in its final position."
            },
            {
                title: "Time Complexity",
                content: "Bubble Sort has O(n²) average and worst-case time complexity because it uses nested loops. For n=1000, that's up to 500,000 comparisons! It's excellent for learning but rarely used in production for large data.",
                highlight: "complexity",
                checkpoint: "What is the space complexity of Bubble Sort?",
                options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
                correctIndex: 3,
                explanation: "Bubble Sort is in-place — it only uses a single temporary variable for swaps, so space complexity is O(1)."
            }
        ]
    },
    selection_sort: {
        title: "Selection Sort Tutorial",
        steps: [
            {
                title: "The Selection Strategy",
                content: "Selection Sort divides the array into a sorted and unsorted region. In each pass, it finds the minimum element from the unsorted region and places it at the beginning of that region. Simple and predictable!",
                highlight: "description",
                checkpoint: "What does Selection Sort do in each iteration?",
                options: ["Swaps adjacent elements", "Finds the maximum and places it at the end", "Finds the minimum and places it at the start of the unsorted region", "Splits the array in half"],
                correctIndex: 2,
                explanation: "Selection Sort selects the minimum from the unsorted portion and swaps it to the boundary position — hence 'selection'."
            },
            {
                title: "The Two Regions",
                content: "There's always a 'sorted' prefix and 'unsorted' suffix. After i iterations, the first i elements are sorted and in their final positions. The boundary advances one step right after each pass.",
                highlight: "visualization",
                checkpoint: "How many swaps does Selection Sort perform in total (worst case)?",
                options: ["O(n²) swaps", "O(n) swaps", "O(n log n) swaps", "O(1) swaps"],
                correctIndex: 1,
                explanation: "Selection Sort makes exactly n−1 swaps (one per pass) — which is O(n). This can be an advantage over Bubble Sort in write-heavy memory."
            },
            {
                title: "Watch Selection Sort",
                content: "Click 'Visualize'. Watch how the algorithm scans the entire unsorted region to find the minimum, then swaps. The sorted portion grows from left to right, one element per pass.",
                highlight: "controls",
                action: "run",
                checkpoint: "Is Selection Sort a stable sorting algorithm?",
                options: ["Yes, equal elements always maintain their relative order", "No, swapping can change the relative order of equal elements", "Yes, because it always finds the minimum", "It depends on the input"],
                correctIndex: 1,
                explanation: "Selection Sort is NOT stable. Swapping a minimum element with the first unsorted element can change the relative order of equal elements."
            },
            {
                title: "Complexity Summary",
                content: "O(n²) time in all cases (always scans full unsorted region). O(1) space (in-place). O(n) swaps. Unlike Bubble Sort, the number of comparisons is always the same regardless of input order.",
                highlight: "complexity",
                checkpoint: "When is Selection Sort preferred over Bubble Sort?",
                options: ["When memory writes are expensive (fewer swaps)", "When the array is already sorted", "When we need a stable sort", "When the array is very large"],
                correctIndex: 0,
                explanation: "Selection Sort always does O(n) swaps vs Bubble Sort's potential O(n²) swaps — useful when memory write operations are costly."
            }
        ]
    },
    // ── UNIT II : Divide & Conquer ────────────────────────────────────────
    merge_sort: {
        title: "Merge Sort Tutorial",
        steps: [
            {
                title: "Welcome to Merge Sort!",
                content: "Merge Sort is a divide-and-conquer algorithm. It recursively splits the array into halves until each piece has one element, then merges sorted pieces back together. Single elements are trivially sorted!",
                highlight: "description",
                checkpoint: "What is the base case in Merge Sort's recursion?",
                options: ["Array with 0 elements", "Array with 1 element (already sorted)", "Array with 2 elements", "Array with n/2 elements"],
                correctIndex: 1,
                explanation: "A single element is always sorted by definition — that's Merge Sort's base case. The recursion bottoms out when subarrays reach size 1."
            },
            {
                title: "The Divide Phase",
                content: "The array is split at the midpoint: mid = (low + high) / 2. Left half: arr[low..mid], right half: arr[mid+1..high]. Each half is recursively sorted. This creates a tree of recursive calls with depth log₂(n).",
                highlight: "visualization",
                checkpoint: "For an array of 8 elements, how deep is the recursion tree?",
                options: ["8 levels", "4 levels", "3 levels (log₂8 = 3)", "2 levels"],
                correctIndex: 2,
                explanation: "log₂(8) = 3, so the recursion tree has 3 levels of splitting. Each level halves the problem size until we reach single elements."
            },
            {
                title: "Watch the Visualization",
                content: "Click 'Visualize' and observe how the array splits. Use the step controls to move forward and backward through the process. Notice the recursive structure!",
                highlight: "controls",
                action: "run",
                checkpoint: "During the merge step, how are two sorted arrays merged into one?",
                options: ["By sorting the combined array from scratch", "By comparing front elements of each half and placing the smaller one first", "By appending one array to the other", "By swapping elements between the halves"],
                correctIndex: 1,
                explanation: "Merge compares the front elements of both sorted halves, always picking the smaller — this maintains sorted order in the output."
            },
            {
                title: "Merge Phase & Complexity",
                content: "Merge Sort always runs in O(n log n) — log n levels of recursion × O(n) merge work per level. The trade-off: it needs O(n) extra space for the temporary array during merging.",
                highlight: "complexity",
                checkpoint: "What is the space complexity of Merge Sort?",
                options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
                correctIndex: 2,
                explanation: "Merge Sort needs an auxiliary array of size n to hold merged results — so space complexity is O(n)."
            }
        ]
    },
    quick_sort: {
        title: "Quick Sort Tutorial",
        steps: [
            {
                title: "Welcome to Quick Sort!",
                content: "Quick Sort picks a 'pivot' element and partitions the array so all elements smaller than the pivot go left, all larger go right. The pivot is now in its final sorted position! Recursively apply to both halves.",
                highlight: "description",
                checkpoint: "After partitioning around the pivot, what is guaranteed?",
                options: ["The entire array is sorted", "The pivot is in its final sorted position", "The left half is fully sorted", "Both halves have equal size"],
                correctIndex: 1,
                explanation: "After partition, the pivot sits exactly where it belongs in the sorted array. Elements left are all smaller, elements right are all larger."
            },
            {
                title: "The Partition Step",
                content: "Lomuto partition: choose last element as pivot. Maintain index i for the 'smaller' region. Scan left-to-right; if arr[j] ≤ pivot, swap arr[i+1] and arr[j], increment i. Finally swap pivot (arr[high]) with arr[i+1].",
                highlight: "visualization",
                checkpoint: "What is the worst-case time complexity of Quick Sort?",
                options: ["O(n log n)", "O(n²) — when the pivot is always the min or max", "O(n)", "O(log n)"],
                correctIndex: 1,
                explanation: "If the pivot is always the smallest or largest element (e.g., sorted input with last-element pivot), partitions are unbalanced: O(n²) time."
            },
            {
                title: "Watch the Partition",
                content: "Click 'Visualize'. See how the pivot settles and Quick Sort recursively sorts both sides. The 'in-place' nature means no extra array is needed!",
                highlight: "controls",
                action: "run",
                checkpoint: "Why is randomized pivot selection important?",
                options: ["It makes Quick Sort stable", "It avoids worst-case O(n²) on sorted/reverse-sorted inputs", "It reduces space complexity to O(1)", "It guarantees equal-sized partitions"],
                correctIndex: 1,
                explanation: "Random pivot selection breaks adversarial patterns (like sorted input), making O(n²) worst-case extremely unlikely in practice."
            },
            {
                title: "Average Case Excellence",
                content: "On average, Quick Sort runs in O(n log n) with very small constants — faster in practice than Merge Sort despite same asymptotic complexity. It's cache-friendly (in-place) and widely used in standard libraries.",
                highlight: "complexity",
                checkpoint: "What is Quick Sort's average-case space complexity (recursion stack)?",
                options: ["O(n²)", "O(n)", "O(log n)", "O(1)"],
                correctIndex: 2,
                explanation: "Average recursion depth is O(log n) for balanced partitions — so stack space is O(log n). Worst case stack space is O(n)."
            }
        ]
    },
    long_integer_multiplication: {
        title: "Long Integer Multiplication (Divide & Conquer)",
        steps: [
            {
                title: "The Problem with Big Numbers",
                content: "Standard grade-school multiplication of two n-digit numbers takes O(n²) operations. Divide-and-conquer can do better! Split each number at the midpoint: X = X_H · 10^(n/2) + X_L.",
                highlight: "description",
                checkpoint: "How many parts do we split each n-digit number into?",
                options: ["4 parts", "3 parts", "2 parts (high and low halves)", "n parts"],
                correctIndex: 2,
                explanation: "Each number is split into two halves: the high-order digits (X_H) and low-order digits (X_L), each of size n/2."
            },
            {
                title: "Karatsuba's Insight",
                content: "Naive D&C: X·Y = X_H·Y_H · 10^n + (X_H·Y_L + X_L·Y_H) · 10^(n/2) + X_L·Y_L. This still takes 4 multiplications. Karatsuba reduces it to 3: compute X_H·Y_H, X_L·Y_L, and (X_H+X_L)(Y_H+Y_L), then derive the cross-term!",
                highlight: "visualization",
                checkpoint: "How many sub-multiplications does Karatsuba's algorithm use?",
                options: ["4 sub-multiplications (same as naive)", "2 sub-multiplications", "3 sub-multiplications", "1 sub-multiplication"],
                correctIndex: 2,
                explanation: "Karatsuba cleverly computes 3 products instead of 4: m1=X_H·Y_H, m2=X_L·Y_L, m3=(X_H+X_L)(Y_H+Y_L). The cross-term = m3−m1−m2."
            },
            {
                title: "The Recurrence",
                content: "With 3 recursive multiplications of size n/2 each, the recurrence is T(n) = 3T(n/2) + O(n). By the Master Theorem, this gives T(n) = O(n^log₂3) ≈ O(n^1.585).",
                highlight: "complexity",
                checkpoint: "Karatsuba achieves approximately what time complexity?",
                options: ["O(n²) — same as school method", "O(n log n)", "O(n^1.585)", "O(n)"],
                correctIndex: 2,
                explanation: "O(n^log₂3) ≈ O(n^1.585) — significantly faster than O(n²) for large numbers. This is why Karatsuba is used in big-number arithmetic libraries."
            },
            {
                title: "Real-World Impact",
                content: "RSA encryption uses very large numbers (1024–4096 bits). Karatsuba and its successors (Toom-Cook, Schönhage-Strassen) make these computations practical. Python's `int` uses Karatsuba internally for large integers!",
                highlight: "complexity",
                checkpoint: "Which domain most benefits from fast large-integer multiplication?",
                options: ["Sorting algorithms", "Cryptography (RSA, ECC)", "Graph search", "String matching"],
                correctIndex: 1,
                explanation: "Cryptographic algorithms like RSA require arithmetic on numbers with hundreds or thousands of digits — fast multiplication is critical."
            }
        ]
    },
    strassen_matrix_multiplication: {
        title: "Strassen's Matrix Multiplication",
        steps: [
            {
                title: "The Standard Approach",
                content: "Standard matrix multiplication of two n×n matrices takes O(n³) — for each of n² output cells, we do n multiplications. For 1000×1000 matrices, that's 10⁹ operations! Can D&C help?",
                highlight: "description",
                checkpoint: "What is the time complexity of naive matrix multiplication for n×n matrices?",
                options: ["O(n²)", "O(n log n)", "O(n³)", "O(n²·log n)"],
                correctIndex: 2,
                explanation: "Naive multiplication: for each of n² output elements, perform n multiply-adds → O(n³) total."
            },
            {
                title: "Divide and Conquer Approach",
                content: "Split each n×n matrix into four n/2 × n/2 submatrices. Naive D&C still needs 8 submatrix multiplications → T(n) = 8T(n/2) + O(n²) → O(n³). No improvement! Strassen's breakthrough: only 7 multiplications!",
                highlight: "visualization",
                checkpoint: "How many submatrix multiplications does Strassen's algorithm use (instead of 8)?",
                options: ["6", "7", "5", "8"],
                correctIndex: 1,
                explanation: "Strassen defined 7 special products (M1–M7) using clever additions/subtractions that compute all 4 output submatrices — 1 fewer multiplication than naive."
            },
            {
                title: "The 7 Strassen Products",
                content: "M1=(A+D)(E+H), M2=(C+D)E, M3=A(F-H), M4=D(G-E), M5=(A+B)H, M6=(C-A)(E+F), M7=(B-D)(G+H). Then: C11=M1+M4-M5+M7, C12=M3+M5, C21=M2+M4, C22=M1-M2+M3+M6.",
                highlight: "visualization",
                checkpoint: "What is the time complexity of Strassen's algorithm?",
                options: ["O(n³)", "O(n²·⁸¹)", "O(n²·log n)", "O(n²)"],
                correctIndex: 1,
                explanation: "T(n) = 7T(n/2) + O(n²) → by Master Theorem: O(n^log₂7) ≈ O(n^2.807). Better than O(n³) for large n!"
            },
            {
                title: "Practical Considerations",
                content: "Strassen is only faster for large matrices (n > ~128). It has larger constant factors and numerical stability issues. Modern libraries use Strassen for large matrices but fall back to optimized O(n³) for small ones.",
                highlight: "complexity",
                checkpoint: "Why is Strassen not always used in practice for small matrices?",
                options: ["It has larger constant factors and overhead for small n", "It requires more memory always", "It is slower for all matrix sizes", "It only works on square matrices of power-of-2 size"],
                correctIndex: 0,
                explanation: "The overhead of 7 products plus many additions is only worth it for large n (typically n > 128). Optimized BLAS routines often beat Strassen in practice."
            }
        ]
    },
    // ── UNIT II : Decrease & Conquer ─────────────────────────────────────
    insertion_sort: {
        title: "Insertion Sort Tutorial",
        steps: [
            {
                title: "Like Sorting Playing Cards!",
                content: "Insertion Sort builds a sorted array one element at a time. Pick the next unsorted element and insert it into the correct position in the already-sorted prefix — just like inserting a new card into a sorted hand!",
                highlight: "description",
                checkpoint: "Insertion Sort is best classified as which type of algorithm?",
                options: ["Divide and Conquer", "Decrease and Conquer (decrements by 1)", "Greedy", "Dynamic Programming"],
                correctIndex: 1,
                explanation: "Insertion Sort is decrease-and-conquer: solve for n elements by first solving for n−1, then inserting the nth element — the problem decreases by 1 each step."
            },
            {
                title: "The Insertion Step",
                content: "For element at index i: save key = arr[i]. Shift all sorted elements larger than key one position right. Place key in the vacated spot. The sorted prefix grows from 1 element to 2, then 3, up to n.",
                highlight: "visualization",
                checkpoint: "What is the best-case time complexity of Insertion Sort?",
                options: ["O(n²)", "O(n log n)", "O(n) — when the array is already sorted", "O(1)"],
                correctIndex: 2,
                explanation: "If the array is already sorted, no element needs to be moved — only n−1 comparisons → O(n) best case. This makes Insertion Sort great for nearly-sorted data."
            },
            {
                title: "Watch It Work",
                content: "Click 'Visualize'. Each step picks the next element and shifts larger elements right to make room. The left portion grows sorted while the right portion shrinks.",
                highlight: "controls",
                action: "run",
                checkpoint: "Is Insertion Sort a stable sorting algorithm?",
                options: ["No, elements are shifted", "Yes, equal elements maintain their relative order", "It depends on the implementation", "No, because it uses comparisons"],
                correctIndex: 1,
                explanation: "Insertion Sort is stable: we only shift elements strictly greater than key, so equal elements are never swapped past each other."
            },
            {
                title: "When to Use Insertion Sort",
                content: "Excellent for: (1) small arrays (overhead beats asymptotic advantage of merge sort for n < 10–20), (2) nearly-sorted data — O(n) in best case! (3) online sorting (elements arrive one-by-one). Standard libraries use it as a base case.",
                highlight: "complexity",
                checkpoint: "For which input is Insertion Sort WORST performing?",
                options: ["Already sorted array", "Random array", "Reverse-sorted array", "Array with duplicates"],
                correctIndex: 2,
                explanation: "Reverse-sorted input forces every new element to be shifted all the way to position 0 — n(n−1)/2 shifts → O(n²) worst case."
            }
        ]
    },
    bfs_graph: {
        title: "Breadth-First Search (BFS) Tutorial",
        steps: [
            {
                title: "Exploring Level by Level!",
                content: "BFS explores a graph by visiting all neighbours at the current depth before going deeper. Think of it like a ripple spreading outward from a stone dropped in water — all nodes at distance 1 before distance 2, and so on.",
                highlight: "description",
                checkpoint: "What data structure does BFS use to track which node to visit next?",
                options: ["Stack (LIFO)", "Queue (FIFO)", "Priority Queue (min-heap)", "Array"],
                correctIndex: 1,
                explanation: "BFS uses a Queue (FIFO): enqueue start node, dequeue a node, enqueue its unvisited neighbours. FIFO ensures level-by-level exploration."
            },
            {
                title: "BFS Algorithm",
                content: "1) Enqueue source, mark visited. 2) Dequeue u. 3) For each neighbour v of u: if not visited, mark v visited and enqueue v. 4) Repeat until queue is empty. The order of dequeue is the BFS traversal order.",
                highlight: "visualization",
                checkpoint: "BFS guarantees finding the shortest path in terms of what?",
                options: ["Edge weights", "Number of edges (hops)", "Time complexity", "Number of vertices"],
                correctIndex: 1,
                explanation: "BFS finds shortest paths in terms of number of edges (hops) in an unweighted graph. For weighted shortest paths, use Dijkstra."
            },
            {
                title: "Watch BFS Traverse",
                content: "Click 'Visualize' and watch BFS explore the graph level by level. All nodes at distance 1 from source are visited before nodes at distance 2, maintaining the 'ripple' pattern.",
                highlight: "controls",
                action: "run",
                checkpoint: "What is the time complexity of BFS?",
                options: ["O(V²)", "O(V + E)", "O(E log V)", "O(V log V)"],
                correctIndex: 1,
                explanation: "BFS visits each vertex once (O(V)) and examines each edge twice in an undirected graph (O(E)) → O(V + E) total."
            },
            {
                title: "Applications of BFS",
                content: "BFS is used for: shortest path in unweighted graphs, web crawlers (crawl by levels), social network distance ('degrees of separation'), network broadcasting, bipartite graph checking, and level-order tree traversal!",
                highlight: "complexity",
                checkpoint: "Which algorithm uses BFS as its foundation for topological sorting?",
                options: ["DFS-based algorithm", "Kahn's algorithm (in-degree BFS approach)", "Dijkstra's algorithm", "Floyd-Warshall"],
                correctIndex: 1,
                explanation: "Kahn's algorithm for topological sort processes nodes with in-degree 0 using a queue — this is essentially BFS over the DAG."
            }
        ]
    },
    dfs_graph: {
        title: "Depth-First Search (DFS) Tutorial",
        steps: [
            {
                title: "Welcome to DFS!",
                content: "DFS explores a graph by going as deep as possible along each branch before backtracking. Like exploring a maze: always take the first unexplored path, mark dead ends, backtrack when stuck.",
                highlight: "description",
                checkpoint: "What data structure (or mechanism) makes DFS go deep first?",
                options: ["Queue (FIFO)", "Stack (LIFO) / Recursion call stack", "Priority Queue", "Linked list"],
                correctIndex: 1,
                explanation: "DFS uses a Stack (LIFO). In recursive DFS, the call stack provides this. LIFO means the most recently discovered node is explored first — depth first!"
            },
            {
                title: "DFS Algorithm",
                content: "Recursive DFS: mark u visited, recursively DFS each unvisited neighbour v of u. Alternatively: push source to stack, pop u, push unvisited neighbours. Both give the same result (though neighbour ordering may vary).",
                highlight: "visualization",
                checkpoint: "What key information does DFS discovery/finish time provide?",
                options: ["Shortest paths", "Topological ordering and cycle detection", "Minimum spanning tree", "Strongly connected components only"],
                correctIndex: 1,
                explanation: "DFS timestamps (discovery time d[u] and finish time f[u]) enable topological sorting (sort by decreasing f[u]) and cycle detection."
            },
            {
                title: "Watch DFS Traverse",
                content: "Click 'Visualize' and watch DFS explore. It commits to one path completely before backtracking. Notice how it may go very deep before visiting nodes near the source.",
                highlight: "controls",
                action: "run",
                checkpoint: "In DFS on a directed graph, a 'back edge' indicates what?",
                options: ["A tree edge in the DFS forest", "A cycle in the graph", "The end of a path", "A cross edge to another component"],
                correctIndex: 1,
                explanation: "A back edge (u → v where v is an ancestor of u in the DFS tree) means there's a cycle. DFS can detect cycles in O(V+E) using this property."
            },
            {
                title: "DFS Applications",
                content: "DFS is used for: topological sort, cycle detection, finding strongly connected components (Kosaraju/Tarjan), solving mazes, generating permutations, and path-finding where deep exploration is needed.",
                highlight: "complexity",
                checkpoint: "What is the time complexity of DFS?",
                options: ["O(V²)", "O(V + E)", "O(E log V)", "O(V·E)"],
                correctIndex: 1,
                explanation: "DFS visits each vertex once and examines each edge once (or twice for undirected) → O(V + E), same as BFS."
            }
        ]
    },
    topological_sort: {
        title: "Topological Sort Tutorial",
        steps: [
            {
                title: "Ordering Dependencies!",
                content: "Topological Sort produces a linear ordering of vertices in a DAG such that for every directed edge u→v, u appears before v. Think of it as finding a valid task-ordering where each task's prerequisites come first.",
                highlight: "description",
                checkpoint: "Topological sort only works on which type of graph?",
                options: ["Any directed graph", "Undirected graphs only", "Directed Acyclic Graphs (DAGs) only", "Weighted graphs only"],
                correctIndex: 2,
                explanation: "Topological sort is only possible on DAGs. A cycle would create a contradiction: if A→B→A, both A and B must come before each other — impossible."
            },
            {
                title: "Kahn's Algorithm (BFS-Based)",
                content: "1) Compute in-degree for all vertices. 2) Enqueue all vertices with in-degree 0 (no prerequisites). 3) Dequeue u, add to result. 4) Decrement in-degree of each neighbour v. If v's in-degree hits 0, enqueue v.",
                highlight: "visualization",
                checkpoint: "In Kahn's algorithm, what does it mean if the result doesn't contain all vertices?",
                options: ["The graph has isolated vertices", "The graph has a cycle (impossible to topologically sort)", "We need to restart from a different vertex", "The graph is disconnected"],
                correctIndex: 1,
                explanation: "If result.length < V, some vertices were never enqueued because their in-degree never reached 0 — this means the graph has a cycle."
            },
            {
                title: "Watch the Ordering",
                content: "Click 'Visualize'. Nodes with no prerequisites (in-degree 0) are processed first. Watch how processing a node reduces in-degrees of its dependents, gradually unlocking them.",
                highlight: "controls",
                action: "run",
                checkpoint: "Is the topological ordering unique for a given DAG?",
                options: ["Yes, always unique", "No, multiple valid orderings may exist", "Only unique if the graph is a tree", "Only unique for sorted inputs"],
                correctIndex: 1,
                explanation: "Multiple valid orderings typically exist. Example: for A→C and B→C, both [A,B,C] and [B,A,C] are valid. The number of valid orderings can be exponential."
            },
            {
                title: "Applications & Complexity",
                content: "Used in: build systems (make), course scheduling, package managers (npm/pip), spreadsheet evaluation, VLSI chip design. Time: O(V+E). Space: O(V) for in-degree array and queue.",
                highlight: "complexity",
                checkpoint: "Which real-world system heavily relies on topological sort?",
                options: ["GPS navigation", "Build systems like make/gradle that resolve dependency order", "Social media feeds", "Database indexing"],
                correctIndex: 1,
                explanation: "Build systems determine which files need recompilation by topologically sorting their dependency graph — files with no dependencies compile first."
            }
        ]
    },
    // ── UNIT III : Transform & Conquer + Space-Time Tradeoffs ─────────────
    presorting: {
        title: "Presorting (Transform & Conquer) Tutorial",
        steps: [
            {
                title: "Sort First, Then Solve!",
                content: "Presorting is a transform-and-conquer technique: sort the input first, then the original problem becomes much easier to solve. Many O(n²) problems drop to O(n log n) this way!",
                highlight: "description",
                checkpoint: "Presorting belongs to which algorithm design paradigm?",
                options: ["Divide and Conquer", "Dynamic Programming", "Transform and Conquer", "Greedy"],
                correctIndex: 2,
                explanation: "Transform and Conquer means transforming the problem into an easier form first (sorting), then solving the transformed version — presorting is the classic example."
            },
            {
                title: "Finding Duplicates Example",
                content: "Without sorting: check all pairs → O(n²). With presorting: sort in O(n log n), then one linear scan comparing arr[i] == arr[i+1] → O(n). Total still O(n log n), but much simpler!",
                highlight: "visualization",
                checkpoint: "After sorting, why are duplicates easy to find?",
                options: ["Duplicates are removed automatically", "Equal elements appear adjacent to each other", "The array becomes much smaller", "Duplicates are always at the boundaries"],
                correctIndex: 1,
                explanation: "Sorting groups equal elements together — duplicates become adjacent, so a single scan checking arr[i] == arr[i+1] finds all duplicates in O(n)."
            },
            {
                title: "Watch Presorting Work",
                content: "Click 'Visualize': first the array is sorted, then a linear scan finds duplicates. The two-phase approach: Transform (sort) → then Solve (linear scan).",
                highlight: "controls",
                action: "run",
                checkpoint: "What other problem does presorting simplify elegantly?",
                options: ["Finding the sum of all elements", "Finding the median (it's at the midpoint after sorting)", "Reversing the array", "Counting total elements"],
                correctIndex: 1,
                explanation: "After sorting, the median is simply arr[n/2] — finding it in O(1) after O(n log n) sort. Without sorting, finding median requires O(n) selection algorithms."
            },
            {
                title: "Trade-offs of Presorting",
                content: "Presorting costs O(n log n) upfront. Worth it when: (1) multiple queries on same data (amortize sort cost), (2) original O(n²) approach is too slow, (3) the sorted structure enables binary search for O(log n) subsequent queries.",
                highlight: "complexity",
                checkpoint: "When should you NOT use presorting?",
                options: ["When only one query is needed and n is small", "When the array has many duplicates", "When the array is in descending order", "When elements are strings"],
                correctIndex: 0,
                explanation: "If you only need one query and the brute-force is acceptable, the O(n log n) sort overhead isn't justified. Presorting amortizes best with repeated queries."
            }
        ]
    },
    heapify: {
        title: "Heapify Tutorial",
        steps: [
            {
                title: "Welcome to Heapify!",
                content: "Heapify (sift-down) restores the max-heap property at a node: given that both subtrees are valid max-heaps, if the root violates the property, swap it down until the heap property is restored.",
                highlight: "description",
                checkpoint: "What property must a max-heap satisfy?",
                options: ["Every node is smaller than its parent", "Every node is larger than or equal to its children", "Left child is always larger than right child", "The tree is always balanced (AVL-like)"],
                correctIndex: 1,
                explanation: "Max-heap property: arr[parent] ≥ arr[child] for all nodes. The root is always the maximum element. Every subtree is also a valid max-heap."
            },
            {
                title: "Heapify Algorithm",
                content: "heapify(arr, n, i): find largest among arr[i], left child arr[2i+1], right child arr[2i+2]. If largest ≠ i, swap arr[i] with largest, then recursively heapify the affected subtree.",
                highlight: "visualization",
                checkpoint: "For a node at index i (0-based), what are the indices of its children?",
                options: ["i+1 and i+2", "2i and 2i+1", "2i+1 and 2i+2", "i/2 and i/2+1"],
                correctIndex: 2,
                explanation: "In 0-based array heap representation: left child = 2i+1, right child = 2i+2, parent = (i-1)/2. This is the standard heap-array mapping."
            },
            {
                title: "Building a Heap",
                content: "To build a max-heap: call heapify bottom-up on all internal nodes from index n/2-1 down to 0. Leaf nodes (n/2 to n-1) are trivially heaps. Start from last internal node, work up to root.",
                highlight: "controls",
                action: "run",
                checkpoint: "What is the time complexity of BUILD-HEAP (calling heapify on all n/2 nodes)?",
                options: ["O(n log n)", "O(n) — despite appearing to be O(n log n)", "O(n²)", "O(log n)"],
                correctIndex: 1,
                explanation: "Build-Heap is O(n)! Lower nodes have less work (height 0,1,2...) and there are more of them. The amortized analysis shows total work is bounded by O(n)."
            },
            {
                title: "Heapify in Heap Sort",
                content: "Heap Sort: 1) Build max-heap in O(n). 2) Repeatedly extract max: swap root with last, reduce heap size, call heapify on root. n extractions × O(log n) per heapify = O(n log n) total.",
                highlight: "complexity",
                checkpoint: "What is Heap Sort's space complexity?",
                options: ["O(n) for auxiliary heap array", "O(log n) for recursion stack", "O(1) — it's in-place", "O(n log n)"],
                correctIndex: 2,
                explanation: "Heap Sort is in-place — it rearranges elements within the original array using O(1) extra space (just a temp variable for swaps)."
            }
        ]
    },
    problem_reduction: {
        title: "Problem Reduction Tutorial",
        steps: [
            {
                title: "Solving via Reduction",
                content: "Problem Reduction means transforming a new/unknown problem P1 into a known/solved problem P2, then using P2's solution to solve P1. This is the essence of reuse: why reinvent algorithms when existing ones can be adapted?",
                highlight: "description",
                checkpoint: "What is the main idea behind problem reduction?",
                options: ["Simplify an algorithm by removing edges", "Transform a hard problem into an easier solved problem", "Divide a problem into equal sub-problems", "Use brute force on smaller inputs"],
                correctIndex: 1,
                explanation: "Reduction transforms Problem A into Problem B (which we already know how to solve). If reduction is efficient, we get an efficient solution to A via B."
            },
            {
                title: "Classic Example: LCM via GCD",
                content: "Finding LCM(a,b) is not immediately obvious. But we can reduce it: LCM(a,b) = a·b / GCD(a,b). We know GCD via Euclid's algorithm (O(log n)). So LCM is also O(log n) via reduction!",
                highlight: "visualization",
                checkpoint: "What is the reduction relationship between LCM and GCD?",
                options: ["LCM(a,b) = a + b - GCD(a,b)", "LCM(a,b) = a·b / GCD(a,b)", "LCM(a,b) = GCD(a,b)·2", "LCM(a,b) = GCD(a²,b²)"],
                correctIndex: 1,
                explanation: "LCM(a,b) · GCD(a,b) = a · b, so LCM(a,b) = (a·b)/GCD(a,b). This reduces LCM computation to the well-known GCD algorithm."
            },
            {
                title: "Graph Problem Reductions",
                content: "Many graph problems reduce to one another: finding shortest path reduces to network flow, bipartite matching reduces to max-flow, linear programming reduces to simplex. These reductions build a web of solvable problems!",
                highlight: "visualization",
                checkpoint: "In the context of complexity theory, if Problem A reduces to Problem B in polynomial time, what does it imply?",
                options: ["A is harder than B", "Solving B efficiently means we can solve A efficiently", "A and B have the same algorithm", "B reduces to A as well"],
                correctIndex: 1,
                explanation: "If A reduces to B (A ≤p B), then B is 'at least as hard' as A. A polynomial-time algorithm for B gives a polynomial-time algorithm for A via the reduction."
            },
            {
                title: "Reduction in NP Theory",
                content: "Reductions are the backbone of NP-Completeness: a problem X is NP-Complete if (1) X ∈ NP and (2) every NP problem reduces to X. Proving NP-Completeness requires showing a reduction FROM a known NP-Complete problem.",
                highlight: "complexity",
                checkpoint: "Which famous reduction proved SAT is NP-Complete?",
                options: ["Cook-Levin theorem: all NP problems reduce to SAT", "SAT reduces to Vertex Cover", "Clique reduces to SAT", "3-SAT reduces to SAT"],
                correctIndex: 0,
                explanation: "Cook-Levin (1971): showed every problem in NP can be reduced to Boolean SAT in polynomial time — establishing SAT as the first NP-Complete problem."
            }
        ]
    },
    naive_string_matching: {
        title: "Naive String Matching Tutorial",
        steps: [
            {
                title: "The String Search Problem",
                content: "Given a text T of length n and a pattern P of length m, find all positions where P occurs in T. The simplest approach: try every possible starting position in T and check character-by-character.",
                highlight: "description",
                checkpoint: "What is the naive string matching time complexity?",
                options: ["O(n + m)", "O(n · m)", "O(n log m)", "O(m²)"],
                correctIndex: 1,
                explanation: "At each of the (n−m+1) starting positions, we potentially compare all m characters of the pattern → O(n·m) worst case."
            },
            {
                title: "How Naive Matching Works",
                content: "For each i from 0 to n−m: compare T[i..i+m-1] with P[0..m-1] character by character. If all m characters match, record position i. If any mismatch, shift pattern by 1 and try next position.",
                highlight: "visualization",
                checkpoint: "In the worst case, what input pattern causes O(n·m) behaviour?",
                options: ["Random text and pattern", "Text = 'aaaa...a', Pattern = 'aa...ab' (mismatches at last position)", "Text shorter than pattern", "Pattern of all unique characters"],
                correctIndex: 1,
                explanation: "T='aaa...a' (n a's), P='aaa...ab' (m-1 a's then b): each of n-m+1 attempts matches m-1 chars before failing → (n-m+1)·(m-1) ≈ O(n·m) comparisons."
            },
            {
                title: "Watch Naive Matching",
                content: "Click 'Visualize' to see the naive approach in action. Notice how every mismatch causes a shift of just 1 position — no 'smart' skipping. Good for small inputs but inefficient for large ones.",
                highlight: "controls",
                action: "run",
                checkpoint: "What is the key limitation of naive string matching?",
                options: ["It can only find the first occurrence", "It doesn't use information from previous comparisons (no smart shifts)", "It requires sorted input", "It only works on ASCII characters"],
                correctIndex: 1,
                explanation: "Naive matching discards all information from failed comparisons and always shifts by 1. Horspool and Boyer-Moore exploit mismatch info to skip multiple positions."
            },
            {
                title: "When Naive is Fine",
                content: "Naive matching is fine when: (1) pattern is short (m is small), (2) text is small, (3) implementation simplicity is priority. For large texts with many occurrences, use Horspool or Boyer-Moore!",
                highlight: "complexity",
                checkpoint: "What is naive string matching's BEST-case time complexity?",
                options: ["O(n·m) always", "O(n) — when first character of pattern rarely matches text", "O(m) — when pattern found immediately", "O(1)"],
                correctIndex: 1,
                explanation: "Best case: if the first character of P rarely matches T (e.g., P='zxyz' in text of all a's), almost no full comparisons needed → O(n)."
            }
        ]
    },
    horspool_algorithm: {
        title: "Horspool String Matching Tutorial",
        steps: [
            {
                title: "Smarter Than Naive!",
                content: "Horspool's algorithm uses a precomputed shift table to skip multiple characters after a mismatch — instead of always shifting by 1. It aligns the pattern's right end with the text and compares right-to-left.",
                highlight: "description",
                checkpoint: "What key preprocessing does Horspool's algorithm do before searching?",
                options: ["Sorts the pattern", "Builds a 'bad character' shift table from the pattern", "Reverses the text", "Computes a hash of the pattern"],
                correctIndex: 1,
                explanation: "Horspool precomputes a shift table: shift[c] = distance from character c's last occurrence in the pattern (excluding last char) to the pattern end. Default shift = pattern length."
            },
            {
                title: "Building the Shift Table",
                content: "For pattern P of length m: shift[c] = m for all c (default). For i = 0 to m−2: shift[P[i]] = m−1−i. This records: 'how far to shift if the text character at the pattern's last position is c?'",
                highlight: "visualization",
                checkpoint: "For pattern 'BARBER' (length 6), what is shift['B']?",
                options: ["6 (not in pattern excluding last)", "2 (B appears at position 3 from right, excluding last)", "1", "4"],
                correctIndex: 1,
                explanation: "B appears at positions 0 and 3 in 'BARBER'. Excluding the last position (5), the rightmost B is at position 3. shift['B'] = 6−1−3 = 2."
            },
            {
                title: "Watch Horspool in Action",
                content: "Click 'Visualize'. The pattern aligns right-end to text, compares right-to-left. On mismatch (or after full match), shift by shift[text_char_at_pattern_end]. Watch how it skips multiple positions!",
                highlight: "controls",
                action: "run",
                checkpoint: "In Horspool, what determines the shift amount after a mismatch?",
                options: ["The mismatched text character", "The character in the text aligned with the LAST position of the pattern", "Always shift by 1", "The first mismatching character"],
                correctIndex: 1,
                explanation: "Horspool always uses the shift table value for the text character aligned with the pattern's LAST position — not the actual mismatch position. This simplifies the algorithm vs Boyer-Moore."
            },
            {
                title: "Performance Analysis",
                content: "Best case: O(n/m) — skips through the text in chunks of size m. Average case: much better than O(n·m). Worst case: O(n·m) still possible, but rare. Excellent for long patterns in large texts.",
                highlight: "complexity",
                checkpoint: "Compared to naive string matching, Horspool is typically how much faster?",
                options: ["Same speed", "Proportional to pattern length m (roughly m times faster on average)", "100x always faster", "Only faster for short patterns"],
                correctIndex: 1,
                explanation: "On average, Horspool skips ~m characters per 'window', so it's approximately m times faster than naive (O(n/m) vs O(n) per character examined)."
            }
        ]
    },
    boyer_moore_algorithm: {
        title: "Boyer-Moore String Matching Tutorial",
        steps: [
            {
                title: "The Gold Standard!",
                content: "Boyer-Moore is among the most efficient string matching algorithms in practice. It combines TWO heuristics — Bad Character and Good Suffix — to skip as many positions as possible after each mismatch.",
                highlight: "description",
                checkpoint: "Boyer-Moore compares characters in which direction?",
                options: ["Left to right (like naive)", "Right to left within each alignment", "In sorted order", "Alternating directions"],
                correctIndex: 1,
                explanation: "Boyer-Moore compares RIGHT TO LEFT within each alignment. This enables large shifts: a bad character at the end of the pattern allows skipping the entire pattern length!"
            },
            {
                title: "Bad Character Rule",
                content: "On mismatch at position j in the pattern, align the rightmost occurrence of T[i] in P[0..j-1] with T[i]. If T[i] doesn't appear in P[0..j-1] at all, shift the entire pattern past T[i].",
                highlight: "visualization",
                checkpoint: "If the mismatching text character doesn't appear anywhere in the pattern, how far do we shift?",
                options: ["Shift by 1 (safe minimum)", "Shift by j+1 (past the entire mismatch position)", "Shift by pattern length m", "Shift by 2"],
                correctIndex: 2,
                explanation: "If T[i] doesn't appear in the pattern at all, the entire pattern can be slid past position i — a shift of m (pattern length). This enables the sub-linear behaviour!"
            },
            {
                title: "Watch Boyer-Moore Work",
                content: "Click 'Visualize'. Notice comparisons happen right-to-left within each window, and mismatches trigger potentially large jumps. Boyer-Moore often examines far fewer than n characters!",
                highlight: "controls",
                action: "run",
                checkpoint: "Boyer-Moore achieves O(n/m) in the best case. When does this happen?",
                options: ["When the pattern is sorted", "When the pattern's characters rarely appear in the text", "When text equals pattern", "When m = 1"],
                correctIndex: 1,
                explanation: "If pattern characters are rare in the text (e.g., searching for 'ZZYZX' in text of a's), nearly every window mismatches on the first comparison → skip m chars → O(n/m)."
            },
            {
                title: "Complexity & Real Usage",
                content: "Preprocessing: O(m + |Σ|). Search: O(n/m) best case (sub-linear!), O(n·m) worst case (rare). Average excellent for most inputs. Used in: Unix grep, text editors, bioinformatics sequence search.",
                highlight: "complexity",
                checkpoint: "Which improvement over Horspool does Boyer-Moore's Good Suffix rule provide?",
                options: ["Good Suffix handles the case where a suffix of the pattern matched, giving a larger shift", "Good Suffix makes preprocessing faster", "Good Suffix enables exact matching", "Good Suffix reduces space complexity"],
                correctIndex: 0,
                explanation: "Good Suffix: if a suffix of length k matched before the mismatch, shift so the next occurrence of that suffix aligns. This gives larger shifts than Bad Character alone, especially in repetitive text."
            }
        ]
    },
    // ── UNIT IV : Dynamic Programming ────────────────────────────────────
    binomial_coefficient: {
        title: "Binomial Coefficient (DP) Tutorial",
        steps: [
            {
                title: "Computing C(n, k)",
                content: "C(n, k) = n! / (k! · (n-k)!) counts the number of ways to choose k items from n. Computing via factorials overflows for large n. Dynamic Programming via Pascal's identity is much better!",
                highlight: "description",
                checkpoint: "Pascal's identity states C(n,k) = ?",
                options: ["C(n-1, k) · C(n-1, k-1)", "C(n-1, k) + C(n-1, k-1)", "C(n, k-1) + k", "n · C(n-1, k-1) / k"],
                correctIndex: 1,
                explanation: "Pascal's identity: C(n,k) = C(n-1,k) + C(n-1,k-1). Either the new element is NOT chosen (C(n-1,k)) or it IS chosen (C(n-1,k-1)). This is the recurrence for DP!"
            },
            {
                title: "DP Table (Pascal's Triangle)",
                content: "Build a 2D table dp[i][j] = C(i,j). Base cases: dp[i][0]=1 (choose none), dp[i][i]=1 (choose all). Fill: dp[i][j] = dp[i-1][j] + dp[i-1][j-1]. Each row of Pascal's triangle is C(n,0), C(n,1)..C(n,n)!",
                highlight: "visualization",
                checkpoint: "What are the base cases for computing C(n,k) via DP?",
                options: ["C(0,0)=0 and C(n,n)=n", "C(n,0)=1 and C(n,n)=1", "C(1,0)=1 and C(1,1)=0", "C(0,k)=k and C(n,0)=n"],
                correctIndex: 1,
                explanation: "Base cases: C(n,0)=1 (one way to choose nothing), C(n,n)=1 (one way to choose everything). Every other value is computed from these using Pascal's identity."
            },
            {
                title: "Watch the DP Build",
                content: "Click 'Visualize' and watch Pascal's triangle being built row by row. Each cell = cell above-left + cell above. The value at row n, column k gives C(n,k)!",
                highlight: "controls",
                action: "run",
                checkpoint: "What is the time and space complexity of computing C(n,k) via DP table?",
                options: ["O(n·k) time, O(n·k) space", "O(n²) time, O(1) space", "O(n!) time, O(n) space", "O(n·k) time, O(k) space (optimized)"],
                correctIndex: 0,
                explanation: "Standard DP table: O(n·k) time (fill k+1 values per row for n rows) and O(n·k) space. Optimize to O(k) space by using a 1D array updated in reverse."
            },
            {
                title: "Applications",
                content: "C(n,k) appears everywhere: probability (coin flips, combinations), polynomial expansion ((a+b)^n binomial theorem), graph counting, Pascal's triangle patterns. DP avoids redundant factorial computations.",
                highlight: "complexity",
                checkpoint: "What is C(10, 3)?",
                options: ["30", "120", "720", "210"],
                correctIndex: 1,
                explanation: "C(10,3) = 10!/(3!·7!) = (10·9·8)/(3·2·1) = 720/6 = 120. You can verify using Pascal's triangle: C(10,3) = C(9,2)+C(9,3) = 36+84 = 120."
            }
        ]
    },
    warshall_algorithm: {
        title: "Warshall's Algorithm Tutorial",
        steps: [
            {
                title: "All-Pairs Reachability",
                content: "Warshall's algorithm computes the transitive closure of a directed graph: for each pair (i,j), determine if there's ANY directed path from vertex i to vertex j (regardless of length).",
                highlight: "description",
                checkpoint: "What does the transitive closure matrix T[i][j] = 1 represent?",
                options: ["There is a direct edge from i to j", "There exists some directed path from i to j", "i and j are in the same strongly connected component", "The shortest path from i to j has weight 1"],
                correctIndex: 1,
                explanation: "T[i][j] = 1 means there is at least one directed path from vertex i to vertex j (of any length). It doesn't have to be a direct edge."
            },
            {
                title: "The DP Recurrence",
                content: "R^(k)[i][j] = 1 if there's a path from i to j using only vertices {1,2,...,k} as intermediates. R^(k)[i][j] = R^(k-1)[i][j] OR (R^(k-1)[i][k] AND R^(k-1)[k][j]). Start from adjacency matrix R^(0).",
                highlight: "visualization",
                checkpoint: "In the Warshall iteration for intermediate vertex k: when is R[i][j] set to 1?",
                options: ["When i=k or j=k", "When R[i][k]=1 AND R[k][j]=1 (path i→k and k→j both exist)", "When there's a direct edge i→j", "When i < k < j"],
                correctIndex: 1,
                explanation: "R[i][j] becomes 1 if vertex k is on a path from i to j: we need a path i→k (R[i][k]=1) AND a path k→j (R[k][j]=1). Combined with any existing direct path."
            },
            {
                title: "Watch Warshall Compute",
                content: "Click 'Visualize'. Watch n iterations (one per vertex as intermediate). After iteration k, R[i][j]=1 means there's a path using vertices 1..k as intermediates. After all n iterations, transitive closure is complete!",
                highlight: "controls",
                action: "run",
                checkpoint: "What is the time complexity of Warshall's algorithm?",
                options: ["O(n²)", "O(n³) — three nested loops (i, j, k all from 1 to n)", "O(n · E)", "O(n log n)"],
                correctIndex: 1,
                explanation: "Three nested loops (k, i, j each from 1 to n) → O(n³). Despite being O(n³), it uses only simple boolean operations making it fast in practice."
            },
            {
                title: "Warshall vs Floyd",
                content: "Warshall computes reachability (yes/no). Floyd-Warshall extends this to compute shortest DISTANCES for all pairs using addition instead of OR. Both use the same triple nested loop structure!",
                highlight: "complexity",
                checkpoint: "How does Floyd-Warshall differ from Warshall's algorithm?",
                options: ["Floyd-Warshall is faster (O(n²))", "Floyd-Warshall computes shortest distances, not just reachability", "Floyd-Warshall only works on DAGs", "Floyd-Warshall uses DFS instead of DP"],
                correctIndex: 1,
                explanation: "Floyd-Warshall replaces boolean OR with min(dist[i][j], dist[i][k]+dist[k][j]) — computing actual shortest distances between all pairs, not just reachability."
            }
        ]
    },
    floyd_algorithm: {
        title: "Floyd-Warshall Algorithm Tutorial",
        steps: [
            {
                title: "All-Pairs Shortest Paths!",
                content: "Floyd-Warshall finds the shortest path between EVERY pair of vertices in a weighted graph. Unlike Dijkstra (single source), this is an all-pairs algorithm. It handles negative weights too (but not negative cycles)!",
                highlight: "description",
                checkpoint: "What does Floyd-Warshall compute that Dijkstra does not?",
                options: ["Single-source shortest paths", "Shortest paths between ALL pairs of vertices in one run", "Minimum spanning tree", "Strongly connected components"],
                correctIndex: 1,
                explanation: "Dijkstra requires running n times (once per source) for all pairs → O(n·(V+E)logV). Floyd-Warshall computes all pairs in one O(n³) run — often simpler for dense graphs."
            },
            {
                title: "The Recurrence",
                content: "dist^(k)[i][j] = shortest path from i to j using vertices {1,...,k} as intermediates. dist^(k)[i][j] = min(dist^(k-1)[i][j], dist^(k-1)[i][k] + dist^(k-1)[k][j]). Initialize with adjacency matrix (∞ for no edge, 0 for diagonal).",
                highlight: "visualization",
                checkpoint: "What is the initialization for dist[i][j] before any intermediate vertices are considered?",
                options: ["All zeros", "∞ for all pairs", "Edge weight if edge exists, ∞ otherwise, 0 on diagonal", "Adjacency list count"],
                correctIndex: 2,
                explanation: "Initial dist[i][j] = weight(i,j) if edge exists, ∞ if no direct edge, 0 for i=j (distance from vertex to itself). This is the base case (0 intermediate vertices)."
            },
            {
                title: "Watch Floyd-Warshall",
                content: "Click 'Visualize'. After iteration k, dist[i][j] gives the shortest path using vertices 1..k as possible intermediates. After n iterations, all shortest paths are known. The matrix updates in-place!",
                highlight: "controls",
                action: "run",
                checkpoint: "How does Floyd-Warshall detect a negative cycle?",
                options: ["If dist[i][j] < 0 for any pair", "If dist[i][i] < 0 for any vertex i", "If the algorithm fails to converge", "If any edge weight is negative"],
                correctIndex: 1,
                explanation: "After Floyd-Warshall, if dist[i][i] < 0 for any vertex i, then vertex i is on a negative-weight cycle — paths through that cycle can be shortened indefinitely."
            },
            {
                title: "Applications",
                content: "Floyd-Warshall is used for: network routing (finding shortest inter-node paths), transitive closure (with boolean ops = Warshall), detecting negative cycles, and computing matrix inversion in some algebraic structures.",
                highlight: "complexity",
                checkpoint: "What is Floyd-Warshall's time and space complexity?",
                options: ["O(n² log n) time, O(n) space", "O(n³) time, O(n²) space", "O(n²) time, O(n²) space", "O(n⁴) time, O(n²) space"],
                correctIndex: 1,
                explanation: "Time: O(n³) — three nested loops over n vertices. Space: O(n²) — we maintain the n×n distance matrix (can update in-place without separate prev/curr matrices)."
            }
        ]
    },
    knapsack_01: {
        title: "0/1 Knapsack Problem Tutorial",
        steps: [
            {
                title: "The Classic DP Problem!",
                content: "Given n items each with weight wᵢ and value vᵢ, and a knapsack of capacity W: maximize total value while keeping total weight ≤ W. Each item is either taken (1) or left (0) — no fractions!",
                highlight: "description",
                checkpoint: "Why can't greedy (take highest value/weight ratio) solve 0/1 Knapsack optimally?",
                options: ["Greedy is too slow for knapsack", "Greedy works perfectly for 0/1 Knapsack", "Fractional items aren't allowed, so greedy can't 'take a bit' to fill remaining capacity", "Greedy requires sorting which is O(n log n)"],
                correctIndex: 2,
                explanation: "Greedy works for Fractional Knapsack (take fractions). For 0/1 Knapsack, taking the highest-ratio item might leave capacity that other items can't perfectly fill — suboptimal!"
            },
            {
                title: "The DP Recurrence",
                content: "dp[i][w] = max value using first i items with capacity w. If wᵢ > w: dp[i][w] = dp[i-1][w] (can't take item i). Else: dp[i][w] = max(dp[i-1][w], vᵢ + dp[i-1][w-wᵢ]).",
                highlight: "visualization",
                checkpoint: "If item i has weight 3 and value 10, and dp[i-1][5]=8, dp[i-1][2]=6: what is dp[i][5]?",
                options: ["8 (don't take item i)", "16 (take item i: 10 + dp[i-1][2] = 10+6)", "10", "6"],
                correctIndex: 1,
                explanation: "dp[i][5] = max(dp[i-1][5], v_i + dp[i-1][5-3]) = max(8, 10+6) = max(8, 16) = 16. Taking item i (weight 3, value 10) gives better value."
            },
            {
                title: "Watch Table Construction",
                content: "Click 'Visualize'. The DP table fills row by row. Each row represents one more item available, each column represents a capacity limit. The answer is at dp[n][W]!",
                highlight: "controls",
                action: "run",
                checkpoint: "To find WHICH items were selected (not just the max value), what do we do?",
                options: ["Look at the first row of the table", "Trace back: if dp[i][w] ≠ dp[i-1][w], item i was included", "Sum all row values", "Check dp[n][0]"],
                correctIndex: 1,
                explanation: "Backtrack from dp[n][W]: if dp[i][w] ≠ dp[i-1][w], item i was chosen. Move to dp[i-1][w-wᵢ]. Repeat until i=0 to reconstruct the full selection."
            },
            {
                title: "Complexity & Variations",
                content: "Time: O(n·W) — fills n×W table. Space: O(n·W) but optimizable to O(W) using single 1D array (update backwards!). Note: O(n·W) is pseudo-polynomial — W can be exponential in the input size.",
                highlight: "complexity",
                checkpoint: "What is the space-optimized version of 0/1 Knapsack's space complexity?",
                options: ["O(n²)", "O(n·W)", "O(W) — using a single 1D array", "O(n)"],
                correctIndex: 2,
                explanation: "Using a 1D array dp[0..W] updated in reverse order (from W down to wᵢ for each item): O(W) space. Reverse traversal prevents an item from being counted twice."
            }
        ]
    },
    memoization: {
        title: "Memoization Tutorial",
        steps: [
            {
                title: "Top-Down DP with Memoization",
                content: "Memoization stores the results of subproblems in a cache (usually a hash map or array). When a subproblem is encountered again, return the cached result instead of recomputing. 'Remember, don't recompute!'",
                highlight: "description",
                checkpoint: "What is the key difference between memoization and tabulation (bottom-up DP)?",
                options: ["Memoization uses recursion + cache (top-down), tabulation fills table iteratively (bottom-up)", "Memoization is always faster", "Tabulation uses recursion, memoization uses loops", "They are identical approaches"],
                correctIndex: 0,
                explanation: "Memoization is top-down: start with the original problem, recurse, cache results. Tabulation is bottom-up: start from base cases, fill table iteratively. Both achieve the same asymptotic complexity."
            },
            {
                title: "Fibonacci Example",
                content: "Naive recursive Fibonacci: T(n) = T(n-1) + T(n-2) → exponential O(2^n). With memoization: each unique subproblem (fib(0)...fib(n)) computed once → O(n) total with O(n) cache space.",
                highlight: "visualization",
                checkpoint: "Without memoization, how many times is fib(2) computed in computing fib(5)?",
                options: ["1 time", "2 times", "3 times", "5 times"],
                correctIndex: 2,
                explanation: "fib(5)→fib(4)+fib(3)→... The computation tree shows fib(2) is needed by fib(4), fib(3), and one more → 3 times without memoization. Memoization computes it once!"
            },
            {
                title: "Implementing Memoization",
                content: "Simple pattern: check if cache[n] is set → return it. Otherwise compute result, store in cache[n], return it. In C: use array initialized to -1 (sentinel). Works on any recursion with overlapping subproblems!",
                highlight: "controls",
                action: "run",
                checkpoint: "Memoization works best when a problem has which property?",
                options: ["Greedy choice property", "Overlapping subproblems (same subproblems called multiple times)", "No recursion needed", "Linear structure without branching"],
                correctIndex: 1,
                explanation: "Memoization only helps when subproblems OVERLAP — the same subproblem is encountered multiple times. If all subproblems are unique (like in merge sort), memoization adds overhead without benefit."
            },
            {
                title: "When to Use Memoization",
                content: "Use memoization when: (1) problem has overlapping subproblems, (2) you have a natural recursive formulation, (3) not all subproblems are needed (sparse computation). Use tabulation when: all subproblems needed, want to avoid recursion overhead.",
                highlight: "complexity",
                checkpoint: "What is the time complexity of memoized Fibonacci?",
                options: ["O(2^n) — same as naive recursion", "O(n) — each of n unique subproblems computed once", "O(n²)", "O(n log n)"],
                correctIndex: 1,
                explanation: "With memoization, each unique subproblem fib(0), fib(1),..., fib(n) is computed exactly once → n subproblems × O(1) each = O(n) total time."
            }
        ]
    },
    // ── UNIT IV : Greedy ─────────────────────────────────────────────────
    dijkstra_algorithm: {
        title: "Dijkstra's Shortest Path Tutorial",
        steps: [
            {
                title: "The GPS Algorithm!",
                content: "Dijkstra's algorithm finds the shortest path from one source vertex to ALL other vertices in a graph with non-negative edge weights. It uses a greedy strategy: always process the closest unvisited vertex.",
                highlight: "description",
                checkpoint: "What is the key requirement for Dijkstra's algorithm to work correctly?",
                options: ["The graph must be undirected", "All edge weights must be non-negative", "The graph must be a tree", "All vertices must be reachable from source"],
                correctIndex: 1,
                explanation: "Dijkstra's greedy assumption fails with negative weights: relaxing a node 'permanently' may be wrong if a negative-weight path later gives a shorter route. Use Bellman-Ford for negative weights."
            },
            {
                title: "The Algorithm",
                content: "Initialize: dist[source]=0, dist[all others]=∞. Use min-priority queue. Repeat: extract vertex u with min dist. For each neighbour v: if dist[u]+w(u,v) < dist[v], update dist[v] and predecessor. Mark u as done.",
                highlight: "visualization",
                checkpoint: "What data structure enables O((V+E) log V) Dijkstra?",
                options: ["Simple array for O(V²)", "Binary min-heap (priority queue) for O((V+E) log V)", "Hash map for O(E)", "Stack for O(V+E)"],
                correctIndex: 1,
                explanation: "Binary min-heap: extract-min in O(log V), decrease-key in O(log V). With E decreases and V extractions → O((V+E) log V). Array-based Dijkstra is O(V²) — better for dense graphs."
            },
            {
                title: "Watch Dijkstra Explore",
                content: "Click 'Visualize'. Watch dist[] values decrease as shorter paths are discovered. The algorithm expands outward like ripples — closest vertices are finalized first. Once a vertex is extracted from the queue, its distance is final!",
                highlight: "controls",
                action: "run",
                checkpoint: "When can we say a vertex's shortest distance is finalized in Dijkstra?",
                options: ["When it's first encountered", "When it's extracted from the priority queue (smallest dist)", "After all vertices are processed", "When its distance stops changing"],
                correctIndex: 1,
                explanation: "By the greedy property: when u is extracted with minimum distance, no shorter path to u can exist (since all remaining paths are longer). dist[u] is permanently finalized."
            },
            {
                title: "Complexity & Applications",
                content: "With binary heap: O((V+E) log V). With Fibonacci heap: O(V log V + E). Applications: GPS navigation, network routing (OSPF protocol), shortest delivery routes, social graph distance.",
                highlight: "complexity",
                checkpoint: "Why does Dijkstra fail on graphs with negative edge weights?",
                options: ["It's too slow for negative weights", "A 'finalized' vertex might later get a shorter path via a negative edge", "Negative weights cause integer overflow", "The priority queue can't handle negative values"],
                correctIndex: 1,
                explanation: "Once a vertex is extracted and 'finalized', Dijkstra doesn't revisit it. But a negative edge later might provide a shorter path — violating the greedy assumption. Bellman-Ford handles this correctly."
            }
        ]
    },
    prim_algorithm: {
        title: "Prim's MST Algorithm Tutorial",
        steps: [
            {
                title: "Minimum Spanning Tree!",
                content: "A Minimum Spanning Tree connects all V vertices using exactly V-1 edges with minimum total weight. Prim's algorithm greedily grows the MST one vertex at a time, always adding the cheapest edge crossing the current tree boundary.",
                highlight: "description",
                checkpoint: "How many edges does a Minimum Spanning Tree of V vertices have?",
                options: ["V edges", "V-1 edges", "V+1 edges", "E edges (all edges)"],
                correctIndex: 1,
                explanation: "A spanning tree of V vertices always has exactly V-1 edges — the minimum needed to connect all vertices without creating cycles."
            },
            {
                title: "Prim's Greedy Strategy",
                content: "Maintain a set S (vertices in MST). At each step: find the minimum weight edge (u,v) where u ∈ S and v ∉ S. Add v to S and the edge to MST. Repeat V-1 times. The cut property guarantees this greedy choice is always safe!",
                highlight: "visualization",
                checkpoint: "Which key insight (the 'cut property') makes Prim's greedy choice safe?",
                options: ["The minimum edge is always a tree edge", "The minimum weight edge crossing any cut is guaranteed to be in SOME MST", "Prim's always picks the globally minimum edge", "The MST is unique for all graphs"],
                correctIndex: 1,
                explanation: "Cut Property: For any cut (S, V-S) of the graph, the minimum-weight crossing edge is in every MST (or at least in some MST if ties exist). This guarantees Prim's greedy picks are optimal."
            },
            {
                title: "Watch Prim's Algorithm",
                content: "Click 'Visualize'. The MST grows from a start vertex, adding one new vertex per step by picking the cheapest 'bridge' edge. No cycles form because we only add vertices NOT yet in the tree.",
                highlight: "controls",
                action: "run",
                checkpoint: "What array does Prim's algorithm maintain to track minimum edge cost to each vertex?",
                options: ["dist[] array (like Dijkstra)", "key[] array (minimum edge weight to reach vertex from current MST)", "color[] array", "depth[] array"],
                correctIndex: 1,
                explanation: "Prim's maintains key[v] = minimum weight edge connecting v to current MST. When a vertex u is added to MST, update key[v] for all neighbours v if w(u,v) < key[v]."
            },
            {
                title: "Complexity & Comparison",
                content: "O(V²) with adjacency matrix, O(E log V) with binary heap. Applications: network cabling (minimum wire), cluster analysis, approximation for TSP, road network design.",
                highlight: "complexity",
                checkpoint: "What is the main structural difference between Prim's MST and Dijkstra's shortest path?",
                options: ["They use different graph types", "Prim's minimizes the maximum edge; Dijkstra minimizes path sum from source", "Prim's key[v] = min edge weight to MST; Dijkstra's dist[v] = total distance from source", "Prim's uses BFS; Dijkstra uses DFS"],
                correctIndex: 2,
                explanation: "Prim's key[v] tracks the cheapest single edge to connect v to MST (not a cumulative path). Dijkstra's dist[v] tracks the total shortest path distance from the source to v. Similar structure, different semantics!"
            }
        ]
    },
    huffman_coding: {
        title: "Huffman Coding Tutorial",
        steps: [
            {
                title: "Lossless Compression!",
                content: "Huffman coding assigns variable-length binary codes to characters: frequent characters get SHORTER codes, rare ones get LONGER codes. This minimizes the total bits needed to encode a message — optimal prefix-free compression!",
                highlight: "description",
                checkpoint: "In standard ASCII, each character uses 8 bits. Why can Huffman do better?",
                options: ["Huffman removes duplicate characters", "Fixed 8-bit codes waste space on rare characters; Huffman uses shorter codes for frequent ones", "Huffman compresses bytes into 4-bit pairs", "Huffman uses 7 bits instead of 8"],
                correctIndex: 1,
                explanation: "If 'e' appears 40% of the time, assigning it a 2-bit code (vs. 8-bit ASCII) saves massive space. Huffman exploits character frequency to minimize total encoded length."
            },
            {
                title: "Building the Huffman Tree",
                content: "1) Create a leaf node for each character with its frequency. 2) Insert all into a min-priority queue. 3) Extract two minimum-frequency nodes, create parent with frequency sum. 4) Reinsert parent. 5) Repeat until one node remains — that's the Huffman tree root!",
                highlight: "visualization",
                checkpoint: "How are codes assigned from the Huffman tree?",
                options: ["By character frequency directly", "Left branch = 0, Right branch = 1; code is the path from root to leaf", "Alphabetical ordering", "By subtree depth only"],
                correctIndex: 1,
                explanation: "Traverse the Huffman tree: going left appends '0', going right appends '1'. Each character's code is the sequence of 0s and 1s on the path from root to its leaf."
            },
            {
                title: "Watch Huffman Build",
                content: "Click 'Visualize'. Watch nodes merge pairwise, always combining the two lowest-frequency nodes. The final tree gives shorter paths (codes) to frequent characters and longer paths to rare ones.",
                highlight: "controls",
                action: "run",
                checkpoint: "What property of Huffman codes makes decoding unambiguous?",
                options: ["All codes have the same length", "Prefix-free: no code is a prefix of another code", "Codes are alphabetically sorted", "The tree is always balanced"],
                correctIndex: 1,
                explanation: "Prefix-free property: since each character is a leaf, no code is a prefix of another. You can decode bit-by-bit without ambiguity — just traverse the tree until you hit a leaf."
            },
            {
                title: "Optimality & Applications",
                content: "Huffman coding produces the OPTIMAL prefix-free code. Proved by Shannon's source coding theorem — average code length is within 1 bit of the entropy lower bound. Used in: DEFLATE (ZIP/gzip), JPEG, MP3, HTTP/2 headers.",
                highlight: "complexity",
                checkpoint: "What is the time complexity of building a Huffman tree for n distinct characters?",
                options: ["O(n)", "O(n log n) — due to priority queue operations", "O(n²)", "O(2^n)"],
                correctIndex: 1,
                explanation: "Building the Huffman tree: n−1 merge operations, each extracting 2 min-nodes and inserting 1 → O(log n) per operation with a min-heap → O(n log n) total."
            }
        ]
    },
    fractional_knapsack: {
        title: "Fractional Knapsack Tutorial",
        steps: [
            {
                title: "Take Fractions of Items!",
                content: "Like 0/1 Knapsack but items can be split. You're filling a bag (capacity W) with valuables: you can take a fraction of any item. Strategy: be greedy — take the item with highest value/weight ratio first!",
                highlight: "description",
                checkpoint: "What is the key difference between Fractional Knapsack and 0/1 Knapsack?",
                options: ["Fractional Knapsack has larger capacity", "Fractional Knapsack allows taking portions of items (not just whole items)", "Fractional Knapsack uses DP; 0/1 uses greedy", "Fractional Knapsack only works for integer weights"],
                correctIndex: 1,
                explanation: "In Fractional Knapsack, you can take any fraction xᵢ ∈ [0,1] of item i. This is why greedy works: you can always 'top off' the bag with a fraction of the best remaining item."
            },
            {
                title: "The Greedy Strategy",
                content: "Sort all items by value/weight ratio in descending order. Take items greedily: if item fits entirely, take it all. If not, take the fraction that fills remaining capacity. Stop when bag is full or all items considered.",
                highlight: "visualization",
                checkpoint: "Why does greedy (highest ratio first) work for Fractional Knapsack but NOT for 0/1 Knapsack?",
                options: ["Greedy works for both", "In fractional, any remaining capacity can be filled exactly with a fraction; in 0/1 it cannot", "0/1 Knapsack doesn't have value/weight ratios", "Greedy doesn't actually work for fractional either"],
                correctIndex: 1,
                explanation: "Fractional allows 'topping off': if high-ratio items don't perfectly fill W, take a fraction of the next best item to use remaining capacity exactly. In 0/1, you're stuck with lumpy choices that may leave capacity wasted."
            },
            {
                title: "Watch Fractional Knapsack",
                content: "Click 'Visualize'. Items are sorted by ratio. Watch items being taken greedily. When the last item doesn't fit entirely, only the needed fraction is taken — filling the bag to exactly capacity W.",
                highlight: "controls",
                action: "run",
                checkpoint: "What is the time complexity of Fractional Knapsack?",
                options: ["O(n·W) like 0/1 DP", "O(n log n) dominated by sorting step", "O(n²)", "O(n) with radix sort"],
                correctIndex: 1,
                explanation: "Sort by ratio: O(n log n). Then one greedy pass: O(n). Total: O(n log n). Much faster than 0/1 Knapsack's O(n·W) DP!"
            },
            {
                title: "Greedy Optimality",
                content: "Greedy gives the OPTIMAL solution for Fractional Knapsack. Proof by exchange argument: any solution that doesn't follow ratio order can be improved by swapping fractions. Optimal substructure and greedy choice property both hold.",
                highlight: "complexity",
                checkpoint: "Can you use the Fractional Knapsack greedy for 0/1 Knapsack and always get the optimal answer?",
                options: ["Yes, greedy always works", "No, taking the highest ratio item might prevent optimal combinations in 0/1", "Yes, if you round up fractions to whole items", "Yes, if items have integer weights"],
                correctIndex: 1,
                explanation: "Classic counterexample: items with (w=10,v=60), (w=20,v=100), (w=30,v=120), W=50. Greedy picks item 1 (ratio 6) and item 2 (ratio 5) = value 160. Optimal for 0/1: items 2+3 = value 220!"
            }
        ]
    },
    // ── UNIT V : Backtracking ─────────────────────────────────────────────
    n_queens: {
        title: "N-Queens Problem Tutorial",
        steps: [
            {
                title: "The N-Queens Challenge!",
                content: "Place N queens on an N×N chessboard such that no two queens threaten each other. Queens can attack in the same row, column, or diagonal. For N=8, there are 92 solutions. For N=1, trivially 1 solution.",
                highlight: "description",
                checkpoint: "Two queens threaten each other if they share which of these?",
                options: ["Same knight's move pattern", "Same row, column, OR diagonal", "Same color square only", "Adjacent squares only"],
                correctIndex: 1,
                explanation: "Queens attack along rows, columns, and both diagonals. Two queens are safe only if they differ in row, column, AND both diagonals (|row₁-row₂| ≠ |col₁-col₂|)."
            },
            {
                title: "Backtracking Approach",
                content: "Place queens one row at a time (row 0, 1, ..., N-1). For each row, try each column. If placement is safe (no conflicts), place queen and recurse to next row. If no safe column exists, backtrack (remove last queen, try next column).",
                highlight: "visualization",
                checkpoint: "What is the pruning condition in N-Queens backtracking?",
                options: ["Stop if queen is placed in last row", "Prune when a partial placement already has two queens threatening each other", "Stop when all rows have been tried", "Prune when fewer than N queens are placed"],
                correctIndex: 1,
                explanation: "Pruning: if placing a queen at (row, col) is unsafe (conflicts with any previously placed queen), don't recurse further — backtrack immediately. This avoids exploring entire subtrees of invalid states."
            },
            {
                title: "Watch N-Queens Solve",
                content: "Click 'Visualize'. See the algorithm try columns systematically, prune when threatened, and backtrack. The recursion tree explores only valid partial configurations — dramatically fewer than 8^8 = 16 million brute-force attempts!",
                highlight: "controls",
                action: "run",
                checkpoint: "For the 8-Queens problem, how many solutions exist?",
                options: ["1 solution", "12 solutions", "64 solutions", "92 solutions"],
                correctIndex: 3,
                explanation: "There are exactly 92 solutions to the 8-Queens problem (12 of which are fundamental — others are rotations/reflections). Backtracking finds all of them without checking all 4,426,165,368 possible placements."
            },
            {
                title: "Efficiency of Backtracking",
                content: "Brute force: C(N²,N) placements to check. Backtracking prunes at each conflict, reducing the search space dramatically. For N=8, backtracking explores ~2000 nodes vs. millions. Safety check is O(N) per placement.",
                highlight: "complexity",
                checkpoint: "What is the time complexity of N-Queens backtracking?",
                options: ["O(N!)", "O(N^N) — try N choices for each of N rows", "O(N²) — one queen per row", "O(2^N)"],
                correctIndex: 0,
                explanation: "Worst case O(N!) — first row has N choices, second has at most N-1, etc. But pruning makes actual performance much better. It's between O(N!) and much less, depending on N."
            }
        ]
    },
    sum_of_subsets: {
        title: "Sum of Subsets Tutorial",
        steps: [
            {
                title: "Find Subsets Summing to Target!",
                content: "Given a set of positive integers and a target sum M, find all subsets that sum exactly to M. Example: {3,5,6,7} with M=15 → {3,5,7} and {8,7} if 8 is in the set. Classic backtracking problem!",
                highlight: "description",
                checkpoint: "Sum of Subsets is related to which NP-Complete problem?",
                options: ["Travelling Salesman Problem", "Subset Sum (a variant of 0/1 Knapsack decision problem)", "Graph Coloring", "Vertex Cover"],
                correctIndex: 1,
                explanation: "Sum of Subsets is essentially the Subset Sum problem: does any subset sum to exactly M? This is NP-Complete (decision version). Finding ALL subsets is even harder. Backtracking gives an exact solution."
            },
            {
                title: "Backtracking Strategy",
                content: "Sort the set first (enables better pruning). At each step: include the next element and recurse, OR exclude it and recurse. Prune: (1) if current sum > M, stop. (2) If remaining elements can't reach M, stop.",
                highlight: "visualization",
                checkpoint: "Why is sorting the input helpful for Sum of Subsets backtracking?",
                options: ["Sorting finds the answer directly", "Sorted order enables effective pruning: if current sum + remaining sum < M, prune early", "Sorting removes duplicates", "Sorting reduces the subset count"],
                correctIndex: 1,
                explanation: "Sorting enables bounding: track remaining sum. If sum_so_far + remaining_sum < M, we can't possibly reach M even taking all remaining elements → prune that branch early!"
            },
            {
                title: "Watch Subset Search",
                content: "Click 'Visualize'. Watch the algorithm include/exclude elements systematically, building subsets. When sum equals M, record the solution. When sum exceeds M or can't reach M, backtrack immediately.",
                highlight: "controls",
                action: "run",
                checkpoint: "After sorting, when can we prune the 'include element' branch?",
                options: ["When the element is negative", "When sum_so_far + current_element > M (would exceed target)", "When element equals M", "When the subset is empty"],
                correctIndex: 1,
                explanation: "If adding the current element makes sum > M, prune: including this (or any larger) element would overshoot the target. This pruning is key to backtracking efficiency."
            },
            {
                title: "Complexity Analysis",
                content: "Worst case: O(2^n) — every subset is a potential solution. With pruning, far fewer nodes are explored in practice. The number of solutions can also be exponential (e.g., if M = total sum of all elements, the whole set is a solution).",
                highlight: "complexity",
                checkpoint: "What is the maximum number of subsets of a set with n elements?",
                options: ["n subsets", "n² subsets", "2^n subsets (power set)", "n! subsets"],
                correctIndex: 2,
                explanation: "A set of n elements has exactly 2^n subsets (power set): each element is either included or excluded → 2 choices per element × n elements = 2^n. For n=20, that's ~1 million subsets!"
            }
        ]
    },
    // ── UNIT V : Branch & Bound ───────────────────────────────────────────
    tsp: {
        title: "Travelling Salesman Problem (TSP) Tutorial",
        steps: [
            {
                title: "The Classic Optimization Problem!",
                content: "A salesman must visit n cities exactly once and return home, minimizing total travel distance. TSP is NP-Hard — no known polynomial-time exact algorithm. Branch-and-Bound finds the optimal tour faster than brute force!",
                highlight: "description",
                checkpoint: "What makes TSP NP-Hard?",
                options: ["It requires visiting cities in alphabetical order", "No polynomial-time algorithm is known for the exact optimal solution", "The number of cities is always too large", "Distance calculations are complex"],
                correctIndex: 1,
                explanation: "TSP is NP-Hard: the number of possible tours is (n-1)!/2, which grows faster than any polynomial. No one has found a polynomial-time exact algorithm, and most believe none exists (P≠NP)."
            },
            {
                title: "Branch and Bound",
                content: "Branch: try each possible next city (branch the search tree). Bound: compute a lower bound for the best possible tour from the current partial solution. If the bound exceeds the best known tour, prune that branch!",
                highlight: "visualization",
                checkpoint: "What does the 'bound' in Branch-and-Bound represent?",
                options: ["The exact tour length", "A lower bound on the best possible solution from the current partial state", "The maximum possible tour length", "The number of remaining cities"],
                correctIndex: 1,
                explanation: "The bound is an optimistic estimate (lower bound) of the best tour achievable from the current partial solution. If even the optimistic estimate exceeds the current best, that branch is guaranteed to be suboptimal — prune it!"
            },
            {
                title: "Computing the Lower Bound",
                content: "Common lower bound: for each city, take the sum of the two cheapest edges incident to it, divide total by 2. This gives a valid lower bound since every tour uses at least 2 edges per city. Better bounds = more pruning = faster search.",
                highlight: "visualization",
                checkpoint: "Why is pruning so important in Branch-and-Bound for TSP?",
                options: ["Pruning finds approximate solutions only", "Pruning eliminates subtrees that cannot contain the optimal solution, dramatically reducing search space", "Pruning makes the algorithm run in O(n²)", "Pruning works only on complete graphs"],
                correctIndex: 1,
                explanation: "Brute force TSP: O((n-1)!/2) tours. With good bounds, Branch-and-Bound explores only a tiny fraction of these — often exponentially faster in practice, though worst case remains exponential."
            },
            {
                title: "Approximation Alternatives",
                content: "For large n, exact TSP is impractical. Approximation algorithms: Nearest Neighbour heuristic (simple, ~25% above optimal), Christofides algorithm (3/2 approximation guarantee), Lin-Kernighan (best practical heuristic).",
                highlight: "complexity",
                checkpoint: "What is the best known approximation ratio for metric TSP?",
                options: ["2-approximation (double the optimal)", "3/2-approximation (Christofides algorithm)", "1.1-approximation", "No approximation is possible"],
                correctIndex: 1,
                explanation: "Christofides' algorithm (1976) achieves a 3/2-approximation for metric TSP. A recent breakthrough (2021) achieved (3/2 - ε), but Christofides remains the classic result."
            }
        ]
    },
    assignment_problem: {
        title: "Assignment Problem Tutorial",
        steps: [
            {
                title: "Optimal Assignment!",
                content: "Given n workers and n jobs with a cost matrix (cost[i][j] = cost of assigning worker i to job j), assign each worker to exactly one job to minimize total cost. Every worker gets exactly one job, every job gets exactly one worker.",
                highlight: "description",
                checkpoint: "How many possible assignments exist for n workers and n jobs?",
                options: ["n² assignments", "n assignments", "n! assignments (permutations)", "2^n assignments"],
                correctIndex: 2,
                explanation: "Each assignment is a permutation of jobs to workers: n! permutations for n workers. For n=10, that's 3.6 million! We need a smart algorithm to find the minimum cost assignment."
            },
            {
                title: "Hungarian Algorithm",
                content: "The optimal solution is found by the Hungarian Algorithm (Kuhn-Munkres) in O(n³). It uses row reduction (subtract row minimum) and column reduction to find a cost matrix with zeros, then augments assignments using zero cells.",
                highlight: "visualization",
                checkpoint: "What is the time complexity of the Hungarian Algorithm?",
                options: ["O(n!)", "O(n²)", "O(n³)", "O(n⁴)"],
                correctIndex: 2,
                explanation: "The Hungarian Algorithm runs in O(n³) — polynomial time vs. the O(n!) brute force. This makes it practical for n up to thousands, while brute force fails beyond n~12."
            },
            {
                title: "Branch & Bound for Assignment",
                content: "Alternatively: Branch-and-Bound assigns one worker at a time. At each node, compute lower bound (sum of minimum unassigned costs in remaining rows). Prune branches where lower bound ≥ best complete assignment found so far.",
                highlight: "controls",
                action: "run",
                checkpoint: "What lower bound is commonly used in Branch-and-Bound for Assignment Problem?",
                options: ["Sum of all costs in the matrix", "Minimum cost complete assignment found so far", "For each unassigned worker, take the minimum available job cost; sum these", "Average cost per assignment"],
                correctIndex: 2,
                explanation: "Lower bound: for each unassigned worker i, add the minimum cost among all still-available jobs. This underestimates the actual cost (optimistic) but is a valid lower bound — good for pruning."
            },
            {
                title: "Applications",
                content: "Assignment Problem appears in: worker scheduling, task allocation in distributed computing, minimum weight bipartite matching, transportation optimization, machine scheduling. The Hungarian Algorithm solves all these in polynomial time!",
                highlight: "complexity",
                checkpoint: "The Assignment Problem is a special case of which more general optimization problem?",
                options: ["Travelling Salesman Problem", "Linear Programming (specifically, integer linear programming)", "Minimum Spanning Tree", "Shortest Path Problem"],
                correctIndex: 1,
                explanation: "Assignment Problem is a special case of Linear Programming (specifically, Integer LP with doubly stochastic matrices). The LP relaxation gives the exact integer solution due to total unimodularity of the constraint matrix."
            }
        ]
    },
    // ── UNIT V : NP Theory ────────────────────────────────────────────────
    decision_trees_sorting: {
        title: "Decision Trees for Sorting Tutorial",
        steps: [
            {
                title: "The Information-Theoretic Lower Bound",
                content: "A decision tree models any comparison-based sorting algorithm. Each internal node is a comparison (a[i] ≤ a[j]?), each leaf is a permutation outcome. The minimum tree height gives a lower bound on comparisons needed.",
                highlight: "description",
                checkpoint: "For a decision tree sorting n elements, how many leaves must it have at minimum?",
                options: ["n leaves", "n² leaves", "n! leaves (one per permutation of n elements)", "2^n leaves"],
                correctIndex: 2,
                explanation: "Every permutation of n elements is a possible input ordering, and each must lead to a different sorted output → at least n! leaves. A decision tree must have ≥ n! leaves to distinguish all cases."
            },
            {
                title: "Height = Comparisons",
                content: "The height h of the decision tree = worst-case number of comparisons. A binary tree with ≥ n! leaves needs height ≥ log₂(n!). By Stirling's approximation: log₂(n!) ≈ n log₂ n − n log₂ e ≈ n log₂ n.",
                highlight: "visualization",
                checkpoint: "What does the decision tree height lower bound prove?",
                options: ["Every sorting algorithm is O(n log n)", "Every comparison-based sorting algorithm requires Ω(n log n) comparisons in the worst case", "Merge Sort is optimal", "Quick Sort is always fastest"],
                correctIndex: 1,
                explanation: "The lower bound Ω(n log n) applies to ALL comparison-based sorting algorithms — no comparison sort can beat this in the worst case. Merge Sort and Heap Sort match this bound → they are optimal!"
            },
            {
                title: "Non-Comparison Sorts",
                content: "Counting Sort, Radix Sort, and Bucket Sort bypass the Ω(n log n) lower bound by NOT using comparisons. They use direct element values as indices. Price: they require special conditions (bounded range, integer keys).",
                highlight: "visualization",
                checkpoint: "Why can Counting Sort achieve O(n) time, violating the Ω(n log n) lower bound?",
                options: ["It's incorrect — counting sort isn't really O(n)", "It's not comparison-based; it uses element values as array indices directly", "It only works for n < 100", "It uses more memory to compensate"],
                correctIndex: 1,
                explanation: "Counting Sort doesn't make a[i] ≤ a[j]? comparisons — it uses element values directly as bucket indices. The decision tree lower bound only applies to comparison-based algorithms!"
            },
            {
                title: "Optimality of Merge Sort",
                content: "Merge Sort makes at most n⌈log₂ n⌉ comparisons — matching the Ω(n log n) lower bound asymptotically. It's comparison-optimal! Real-world algorithms like Timsort adapt merge sort for practical inputs to reduce actual comparisons.",
                highlight: "complexity",
                checkpoint: "Which comparison-based algorithm is provably optimal for worst-case sorting?",
                options: ["Quick Sort (fastest in practice)", "Merge Sort and Heap Sort (both achieve Θ(n log n) worst case)", "Bubble Sort (most comparisons, best for learning)", "Insertion Sort (best for small arrays)"],
                correctIndex: 1,
                explanation: "Both Merge Sort and Heap Sort achieve Θ(n log n) in ALL cases (best, average, worst), matching the information-theoretic lower bound. Quick Sort averages Θ(n log n) but has O(n²) worst case."
            }
        ]
    },
    // ── Existing tutorials retained ───────────────────────────────────────
    binary_search: {
        title: "Binary Search Tutorial",
        steps: [
            {
                title: "Welcome to Binary Search!",
                content: "Binary Search finds an element in a SORTED array in O(log n) by repeatedly halving the search space. Examine the middle element; if too small search right half, if too large search left half.",
                highlight: "description",
                checkpoint: "What is the fundamental requirement for Binary Search to work?",
                options: ["Array must contain unique elements", "Array must be sorted", "Array size must be a power of 2", "Array must be stored in a hash table"],
                correctIndex: 1,
                explanation: "Binary Search requires a SORTED array. Without sorted order, we can't determine which half contains the target after each comparison."
            },
            {
                title: "The Middle Element",
                content: "At each step: mid = (low + high) / 2. Compare arr[mid] with target. If equal: found! If target < arr[mid]: search left (high = mid−1). If target > arr[mid]: search right (low = mid+1).",
                highlight: "visualization",
                checkpoint: "In an array of 1024 elements, what is the maximum number of comparisons Binary Search makes?",
                options: ["1024", "512", "10 (log₂1024 = 10)", "32"],
                correctIndex: 2,
                explanation: "log₂(1024) = 10. Each comparison halves the search space: 1024→512→256→...→1 in at most 10 steps. Compare: Linear Search needs up to 1024 comparisons!"
            },
            {
                title: "Watch It Work",
                content: "Set a target value and click 'Visualize'. Watch how the search space shrinks by half with each comparison. The algorithm is incredibly efficient even for very large sorted arrays!",
                highlight: "controls",
                action: "run",
                checkpoint: "What happens when low > high in Binary Search?",
                options: ["Swap low and high and continue", "Target is not in the array — return -1", "Search the entire array linearly", "Restart from the beginning"],
                correctIndex: 1,
                explanation: "When low > high, the search space is empty — the target doesn't exist in the array. Return -1 (or false for existence check)."
            },
            {
                title: "Logarithmic Power",
                content: "O(log n) is extremely fast: in an array of 1 billion elements, Binary Search finds any element in at most 30 comparisons (log₂(10⁹) ≈ 30)!",
                highlight: "complexity",
                checkpoint: "What is Binary Search's space complexity?",
                options: ["O(n)", "O(log n) for recursive version", "O(1) for iterative version", "Both B and C are correct"],
                correctIndex: 3,
                explanation: "Recursive Binary Search uses O(log n) stack space (depth of recursion). Iterative Binary Search uses O(1) space. Both are valid implementations."
            }
        ]
    },
    infix_to_postfix: {
        title: "Infix to Postfix Conversion Tutorial",
        steps: [
            {
                title: "Expression Notation",
                content: "Infix: A+B (operator between operands — how humans write). Postfix: AB+ (operator after operands — easier for computers). Converting uses a stack to handle operator precedence!",
                highlight: "description",
                checkpoint: "What is the postfix representation of A+B*C?",
                options: ["A+BC*", "ABC*+", "AB+C*", "ABC+*"],
                correctIndex: 1,
                explanation: "In A+B*C, multiplication has higher precedence. Postfix: first compute B*C (giving BC*), then add A → ABC*+. Postfix naturally encodes precedence without parentheses!"
            },
            {
                title: "Stack-Based Algorithm",
                content: "Scan left-to-right: operands → output immediately. Operators → pop stack operators with ≥ precedence first, then push current operator. '(' → push. ')' → pop and output until '('. End → pop all remaining operators.",
                highlight: "visualization",
                checkpoint: "What precedence order is correct for operators?",
                options: ["+ > * > ^", "^ > * = / > + = -", "All operators have equal precedence", "* > ^ > +"],
                correctIndex: 1,
                explanation: "Precedence: ^ (exponent, highest) > * / (multiply/divide) > + - (add/subtract, lowest). This means * is processed before + — matching standard mathematical convention."
            },
            {
                title: "Watch the Conversion",
                content: "Click 'Visualize'. See operands go directly to output and operators interact with the stack. Parentheses control when operators are flushed — '(' acts as a barrier, ')' triggers flushing.",
                highlight: "controls",
                action: "run",
                checkpoint: "What does a left parenthesis '(' do in infix-to-postfix conversion?",
                options: ["Gets added to output directly", "Gets pushed to stack and acts as a barrier — operators don't pop past it", "Clears the entire stack", "Signals end of expression"],
                correctIndex: 1,
                explanation: "( is pushed to the stack and acts as a barrier: operators above it get pushed normally, but don't pop past ( when processing other operators. When ) is encountered, everything down to ( is flushed."
            },
            {
                title: "Why Postfix?",
                content: "Postfix evaluation is trivial: scan left-to-right, push numbers, operators pop two numbers, compute, push result. No precedence checking needed! Compilers generate postfix for expression evaluation.",
                highlight: "complexity",
                checkpoint: "What is the time complexity of infix-to-postfix conversion?",
                options: ["O(n²) — compare all operators", "O(n) — each character processed once, each pushed/popped at most once", "O(n log n)", "O(n·m) where m is expression depth"],
                correctIndex: 1,
                explanation: "O(n): each character is processed exactly once. Each operator is pushed and popped at most once from the stack. Total operations linear in expression length."
            }
        ]
    },
    infix_to_prefix: { title: "Infix to Prefix Conversion Tutorial", steps: [{ title: "Prefix Notation", content: "Prefix (Polish Notation) writes operators BEFORE operands: +AB instead of A+B. Trick: reverse infix, convert to postfix (swapping brackets), reverse result!", highlight: "description", checkpoint: "What is the prefix form of A+B*C?", options: ["+A*BC", "*+ABC", "AB+C*", "ABC*+"], correctIndex: 0, explanation: "+A*BC: the + operates on A and the result of *BC. Prefix evaluates right-to-left from inside out." }, { title: "Conversion Algorithm", content: "1) Reverse the infix expression. 2) Swap ( and ). 3) Convert to postfix using standard algorithm. 4) Reverse the postfix result. The final string is the prefix expression!", highlight: "visualization", checkpoint: "Why swap brackets during prefix conversion?", options: ["To simplify the algorithm", "Reversing the expression swaps left/right, so brackets need swapping to maintain correct grouping", "Brackets aren't needed in prefix", "To handle right-associative operators"], correctIndex: 1, explanation: "When we reverse the string, left parentheses become right parentheses and vice versa in terms of their 'role'. Swapping ( and ) after reversal ensures the postfix conversion handles grouping correctly." }, { title: "Watch the Transform", content: "Click 'Visualize' and follow all four steps: reverse, swap brackets, postfix-convert, reverse again. Each step is simple — the combination gives prefix!", highlight: "controls", action: "run", checkpoint: "Prefix notation is used in which programming paradigm?", options: ["Object-oriented programming", "Functional/LISP programming (e.g., (+ A (* B C)))", "Procedural C programming", "Assembly language"], correctIndex: 1, explanation: "LISP and other functional languages use prefix (Polish) notation: (+ 3 (* 4 5)) means 3 + (4*5). The uniform syntax makes it easy to parse and evaluate without precedence rules." }, { title: "Complexity", content: "O(n) time — each step (reverse, convert, reverse) is linear. O(n) space for stack and output.", highlight: "complexity", checkpoint: "What is prefix notation also called?", options: ["Reverse Polish Notation", "Polish Notation (after logician Jan Łukasiewicz)", "Standard Notation", "Cambridge Notation"], correctIndex: 1, explanation: "Prefix notation is called 'Polish Notation' after Polish logician Jan Łukasiewicz who invented it in 1924. Postfix is 'Reverse Polish Notation' (RPN)." }] },
    postfix_evaluation: { title: "Postfix Expression Evaluation Tutorial", steps: [{ title: "What is Postfix?", content: "Postfix (RPN) writes operators after operands: AB+ means A+B. Evaluation is simple: scan left-to-right, push numbers, when you see an operator pop two numbers, apply it, push result!", highlight: "description", checkpoint: "Evaluate the postfix expression '5 3 + 2 *' step by step. What is the result?", options: ["11", "16", "10", "13"], correctIndex: 1, explanation: "5 3 + 2 *: push 5, push 3, see + → pop 3 and 5, push 5+3=8. Push 2, see * → pop 2 and 8, push 8*2=16. Final result: 16." }, { title: "Algorithm", content: "For each token: if number → push. If operator (+,-,*,/) → pop b (top), pop a, compute a OP b, push result. After all tokens, the stack has exactly one element: the answer!", highlight: "visualization", checkpoint: "Why is the second-popped value (a) the LEFT operand in 'a OP b'?", options: ["It doesn't matter for commutative operators", "The stack is LIFO: b was pushed after a, so b is the right operand, a is left", "It's just convention", "Depends on the operator"], correctIndex: 1, explanation: "LIFO: a was pushed first (left operand), b was pushed second (right operand). When we pop, b comes out first. So: pop b (right), pop a (left) → compute a OP b. Critical for - and / (non-commutative)!" }, { title: "Watch Step-by-Step", content: "Click 'Visualize' with an expression like '5 3 + 8 2 - *'. Watch numbers stack and operators consume two values, replacing them with the computed result.", highlight: "controls", action: "run", checkpoint: "For subtraction/division, order of popping matters. '5 3 -' should give 5-3=2 or 3-5=-2?", options: ["3-5 = -2 (first popped minus second)", "5-3 = 2 (second popped minus first)", "Order doesn't matter for -", "Always positive result"], correctIndex: 1, explanation: "For '5 3 -': push 5, push 3. See -: pop b=3 (right operand), pop a=5 (left operand), compute a-b = 5-3 = 2. Second popped (a) is the left operand." }, { title: "Applications", content: "Postfix is used internally in calculators (HP calculators use RPN!), compilers (intermediate code), stack machines, and expression evaluators. O(n) time, O(n) space for stack.", highlight: "complexity", checkpoint: "What is the maximum stack size needed for '3 4 + 5 6 + *'?", options: ["6 (one per token)", "2 (final result needs 2 values)", "3 (maximum concurrent stack elements)", "1 (final result)"], correctIndex: 2, explanation: "Trace: push 3(1), push 4(2), +(1), push 5(2), push 6(3)★MAX, +(2), *(1). Maximum stack size is 3." }] },
    stack_ll: { title: "Stack using Linked List Tutorial", steps: [{ title: "Welcome to Stack!", content: "A stack is LIFO (Last In, First Out). Like a stack of plates — only add/remove from the top. Using a linked list: each push inserts at head (O(1)), each pop removes the head (O(1)). Dynamic size, no overflow!", highlight: "description", checkpoint: "What makes a linked list better than an array for implementing a stack?", options: ["Linked list is always faster", "Linked list grows dynamically — no fixed size limit (no stack overflow)", "Arrays can't implement stacks", "Linked list uses less memory"], correctIndex: 1, explanation: "Array-based stack has fixed capacity — overflow if full. Linked list stack grows/shrinks dynamically. Trade-off: linked list needs extra pointer memory per node, but no overflow risk." }, { title: "Push Operation", content: "Push: create new node with value, set next = current top, update top = new node. O(1) time — just pointer updates. The new node becomes the new top of the stack.", highlight: "visualization", checkpoint: "What is the LIFO access pattern?", options: ["First inserted element is first retrieved", "Last inserted element is first retrieved", "Random access by index", "Elements sorted before retrieval"], correctIndex: 1, explanation: "LIFO: Last In, First Out — the most recently pushed element is the first to be popped. Think: browser back button stores pages in a stack; the last page visited is the first to 'go back' to." }, { title: "Watch Push Operations", content: "Click 'Visualize'. Watch elements being pushed — each becomes the new top. Pop operations remove from the top, moving the head pointer to the next node.", highlight: "controls", action: "run", checkpoint: "What is the time complexity of peek (view top without removing)?", options: ["O(n) — scan to find top", "O(1) — just read the top pointer", "O(log n)", "O(n/2)"], correctIndex: 1, explanation: "Peek is O(1): just read top.data without modifying the list. The top pointer always points to the most recently pushed element." }, { title: "Applications", content: "Stacks are used for: function call management (the call stack!), undo/redo, expression parsing, DFS graph traversal, backtracking, browser history, and balancing parentheses.", highlight: "complexity", checkpoint: "Which operation removes AND returns the top element of a stack?", options: ["Peek", "Push", "Pop", "Top"], correctIndex: 2, explanation: "Pop removes the top element and returns its value. Peek/top only reads the top value without removing. Push adds a new top element." }] },
    valid_parentheses: { title: "Valid Parentheses Tutorial", steps: [{ title: "The Matching Problem", content: "Given brackets like '({[]})', check if every opening bracket has a matching closing bracket in the correct order. Stacks are perfect: push opens, pop when you see a close and verify it matches!", highlight: "description", checkpoint: "Is the string '([)]' valid?", options: ["Yes, all brackets are present", "No, brackets are interleaved incorrectly: ( expects ) but gets ]", "Yes, it has equal opens and closes", "Depends on context"], correctIndex: 1, explanation: "'([)]': push (, push [, see ) — pop [ but ) ≠ ] → INVALID! Even though all brackets appear, they're not properly nested. Stack reveals this immediately." }, { title: "Stack Strategy", content: "Push (, [, { onto stack. When you see ), ], }: pop and check if it matches the corresponding open bracket. Mismatch or empty stack when popping → invalid. Non-empty stack at end → invalid (unclosed opens).", highlight: "visualization", checkpoint: "After processing all characters in a valid string, the stack should be:", options: ["Full — all brackets remain", "Empty — all opens matched with closes", "Containing only open brackets", "It doesn't matter"], correctIndex: 1, explanation: "Every valid close bracket pops exactly one open bracket. In a valid string, all opens are matched → stack is completely empty at the end." }, { title: "Watch the Algorithm", content: "Click 'Visualize'. See opening brackets stack up and closing brackets check for matching opens. Notice how nested structures work perfectly with LIFO — the most recent open is matched first.", highlight: "controls", action: "run", checkpoint: "What is the time complexity of the valid parentheses check?", options: ["O(n²) — check all pairs", "O(n) — one pass, each char processed once", "O(n log n)", "O(2^n)"], correctIndex: 1, explanation: "O(n): one pass through the string. Each character is pushed or popped exactly once. Stack operations are O(1). Total: O(n)." }, { title: "Applications", content: "Used in: compiler syntax checking, HTML/XML tag validation, mathematical expression parsing, JSON/YAML validation. O(n) time, O(n) space (stack can hold up to n/2 elements for '(((...)))').", highlight: "complexity", checkpoint: "How much space does the stack use in the worst case?", options: ["O(1)", "O(n) — e.g., '(((((' needs n/2 stack entries", "O(n²)", "O(log n)"], correctIndex: 1, explanation: "Worst case: '(((((...))))' — all opens before any closes. The stack grows to n/2 elements before any pops occur → O(n) space." }] },
    queue_ll: { title: "Queue using Linked List Tutorial", steps: [{ title: "Welcome to Queue!", content: "A queue is FIFO (First In, First Out). Like a line at a counter — first person in line is served first. With linked list: enqueue at tail (O(1)), dequeue from head (O(1)). Maintain head (front) and tail (rear) pointers.", highlight: "description", checkpoint: "What is the FIFO access pattern?", options: ["Last in, first out", "First inserted element is first retrieved", "Random access", "Sorted by priority"], correctIndex: 1, explanation: "FIFO: First In, First Out — the first element enqueued is the first to be dequeued. Think: printer jobs, OS task scheduling, BFS traversal." }, { title: "Enqueue Operation", content: "Enqueue: create new node, set current tail's next = new node, update tail = new node. If queue is empty, both head and tail point to the new node. O(1) time!", highlight: "visualization", checkpoint: "Why do we need BOTH a head and tail pointer for efficient queue implementation?", options: ["Head pointer alone is sufficient", "Tail pointer enables O(1) enqueue; without it, we'd traverse to the end every time (O(n))", "They're needed for doubly linked list only", "One pointer handles both operations"], correctIndex: 1, explanation: "Head enables O(1) dequeue (remove from front). Tail enables O(1) enqueue (append to rear). Without tail, enqueue requires traversing the entire list → O(n). Both pointers are essential!" }, { title: "Watch the Queue", content: "Click 'Visualize'. See elements join at the rear and leave from the front. The head and tail pointers maintain the queue boundaries. Notice FIFO ordering — first in, first out!", highlight: "controls", action: "run", checkpoint: "What happens to head and tail when the queue becomes empty after dequeue?", options: ["Head = null, tail unchanged", "Both head and tail are set to null", "Tail = head", "Head moves to tail position"], correctIndex: 1, explanation: "When the last element is dequeued, both head AND tail must be set to null. If only head is nullified but tail still points to the old (freed) node, the next enqueue would produce a corrupted queue." }, { title: "Applications", content: "Queues are used for: BFS graph traversal, OS CPU scheduling (round-robin), print spooling, inter-process communication, network packet buffering, and streaming data processing.", highlight: "complexity", checkpoint: "What is the time complexity of both enqueue and dequeue operations?", options: ["O(n) each", "O(log n) each", "O(1) each", "O(n) enqueue, O(1) dequeue"], correctIndex: 2, explanation: "Both enqueue (append to tail) and dequeue (remove from head) are O(1) with head and tail pointers — no traversal needed!" }] },
    deque_ll: { title: "Deque (Double-Ended Queue) Tutorial", steps: [{ title: "Welcome to Deque!", content: "Deque (double-ended queue) supports insertion and deletion from BOTH ends. Built with doubly linked list for O(1) operations at head and tail. It generalizes both stack and queue!", highlight: "description", checkpoint: "Which data structure does a Deque generalize?", options: ["Only Stack", "Only Queue", "Both Stack and Queue — can behave as either", "Priority Queue"], correctIndex: 2, explanation: "Deque can behave as a stack (add/remove from one end) or queue (add one end, remove other) — it's more general than either." }, { title: "Four Core Operations", content: "addFront(x): insert at head — O(1). addRear(x): insert at tail — O(1). deleteFront(): remove head — O(1). deleteRear(): remove tail — O(1). Doubly linked list enables O(1) deletion from BOTH ends!", highlight: "visualization", checkpoint: "Why is doubly linked list needed for O(1) deleteRear?", options: ["Singly linked list can do O(1) deleteRear too", "Doubly linked list's prev pointer lets us reach the new tail in O(1); singly linked list would need O(n) traversal", "Arrays are better for deque", "Doubly linked list is mandatory for all queues"], correctIndex: 1, explanation: "To delete the tail, we need to update tail to the previous node. Doubly linked list has prev pointers → immediate access. Singly linked list: no prev pointer → traverse from head to find new tail: O(n)." }, { title: "Watch Both Ends", content: "Click 'Visualize'. Try operations from both the front and rear. Notice how the doubly linked list flexibly handles all four operations while maintaining O(1) time.", highlight: "controls", action: "run", checkpoint: "What is a real-world use case for a deque?", options: ["GPS navigation", "Browser history (back=stack, forward=stack) or sliding window algorithms", "Binary search", "Hash table collision resolution"], correctIndex: 1, explanation: "Browser history: clicking back pops from front of deque (like stack). Deque is also perfect for sliding window algorithms where you add to rear and remove from front or rear based on conditions." }, { title: "Restricted Deques", content: "Input-restricted deque: insert only at one end, delete from both. Output-restricted deque: insert from both, delete only from one. These are useful for specific applications. Full deque: all four O(1) operations.", highlight: "complexity", checkpoint: "What is the space complexity of a deque with n elements?", options: ["O(1)", "O(n) — each element stored in a node", "O(n²)", "O(log n)"], correctIndex: 1, explanation: "O(n) space: n nodes, each storing data, prev pointer, and next pointer. The deque itself stores head and tail pointers: O(1) metadata overhead." }] },
    circular_queue: { title: "Circular Queue Tutorial", steps: [{ title: "Fixing the Linear Queue Problem!", content: "Linear array queue leaves empty gaps at the front after dequeues. Circular queue solves this by wrapping the rear pointer back to index 0 when it reaches the end — using modular arithmetic!", highlight: "description", checkpoint: "What problem does a circular queue solve compared to a linear array queue?", options: ["Circular queue is faster for all operations", "Linear queue wastes front space after dequeues; circular queue reuses it by wrapping around", "Circular queue stores more elements", "Circular queue eliminates the need for a front pointer"], correctIndex: 1, explanation: "Linear array queue: after many enqueue/dequeue pairs, the front advances, leaving empty slots. The rear can't wrap → 'false overflow'. Circular queue wraps the rear using % capacity → no wasted space." }, { title: "Modular Arithmetic", content: "Rear = (rear + 1) % capacity on enqueue. Front = (front + 1) % capacity on dequeue. Full condition: (rear + 1) % capacity == front. Empty condition: front == rear (or use count variable).", highlight: "visualization", checkpoint: "In a circular queue of capacity 5 with rear=4, what is the next rear after enqueue?", options: ["5 (out of bounds)", "0 (wraps around: (4+1)%5 = 0)", "-1", "4"], correctIndex: 1, explanation: "(4+1)%5 = 5%5 = 0. The rear wraps from index 4 back to index 0, making the queue truly circular!" }, { title: "Watch Enqueue & Dequeue", content: "Click 'Visualize'. Enqueue elements until full, then dequeue some and enqueue again. Watch the wraparound happen! The queue efficiently reuses front space that linear queues waste.", highlight: "controls", action: "run", checkpoint: "How do we distinguish 'full' from 'empty' in a circular queue?", options: ["Full: front=rear; Empty: rear=0", "Use a count variable OR reserve one slot (full when (rear+1)%cap = front)", "Full: rear=capacity; Empty: front=0", "Always use a boolean flag"], correctIndex: 1, explanation: "Two approaches: (1) reserve one slot — full when (rear+1)%cap=front, empty when front=rear. (2) maintain count: full when count=capacity, empty when count=0. Count is cleaner and uses all slots." }, { title: "Applications", content: "Circular queues are used in: OS keyboard buffers, CPU scheduling (round-robin), audio/video streaming buffers, circular buffer for producer-consumer, and network packet queues.", highlight: "complexity", checkpoint: "What are the time complexities of enqueue and dequeue in circular queue?", options: ["O(n) both", "O(1) both — just pointer arithmetic", "O(log n) both", "O(1) enqueue, O(n) dequeue"], correctIndex: 1, explanation: "Both operations are O(1): update an index with modular arithmetic and set/get one array element. No traversal, no shifting!" }] },
    message_queue: { title: "Message Queue Application Tutorial", steps: [{ title: "Real-World Queue Usage", content: "Message queues enable asynchronous communication between producers and consumers. Messages are sent to a queue and consumers process them at their own pace — decoupling sender from receiver!", highlight: "description", checkpoint: "What is the main advantage of message queues in distributed systems?", options: ["They're the fastest data structure", "They decouple producers and consumers — sender doesn't wait for receiver to process", "They prevent all data loss", "They require no memory"], correctIndex: 1, explanation: "Decoupling: a producer enqueues a message and immediately continues. The consumer processes at its own pace. This enables asynchronous, fault-tolerant distributed architectures (think WhatsApp messages)." }, { title: "Circular Queue Implementation", content: "Message queues often use circular buffers internally: fixed-size ring buffer with head (dequeue) and tail (enqueue) pointers. When buffer is full, either block producer or drop oldest message (depending on policy).", highlight: "visualization", checkpoint: "What happens in a message queue when the buffer is full?", options: ["New messages are silently discarded always", "Options: block producer (backpressure), discard oldest, or return error — depends on policy", "Queue automatically doubles in size", "Queue pauses all producers permanently"], correctIndex: 1, explanation: "Full buffer policies: (1) Block producer (backpressure — slow producer to match consumer rate). (2) Drop oldest (circular overwrite for sensors/logs). (3) Return error (let app handle). Policy depends on use case!" }, { title: "Watch Message Flow", content: "Click 'Visualize'. Watch messages being enqueued by a producer and dequeued by a consumer. See how the circular buffer handles steady flow and the wraparound when the buffer end is reached.", highlight: "controls", action: "run", checkpoint: "Which popular message queue systems are used in production?", options: ["Excel and Word", "RabbitMQ, Apache Kafka, Amazon SQS", "Linked List libraries", "Python queues only"], correctIndex: 1, explanation: "Production message queues: RabbitMQ (AMQP), Apache Kafka (distributed streaming), Amazon SQS (managed cloud), Redis Streams. These handle millions of messages/second in real systems!" }, { title: "Message Ordering", content: "FIFO queues guarantee message ordering — critical for consistency. Some systems (Kafka) partition messages, maintaining order within partitions. Priority queues (not FIFO) are also common for critical vs. normal messages.", highlight: "complexity", checkpoint: "Why is FIFO ordering important in message queues?", options: ["For alphabetical sorting", "Ensures messages are processed in the order they were sent — critical for consistency", "FIFO is the only ordering possible", "To enable parallel processing"], correctIndex: 1, explanation: "FIFO ensures causality: if event A happened before event B, A is processed first. Critical for financial transactions, ordering systems, state machine transitions where order matters for correctness." }] },
    two_sum: { title: "Two Sum Problem Tutorial", steps: [{ title: "The Classic Interview Problem!", content: "Given an array and a target, find indices of two numbers that add to the target. Hash map approach: for each number, check if its complement (target - number) was seen before!", highlight: "description", checkpoint: "What is the complement we look for when processing element x with target t?", options: ["t + x", "t - x", "t * x", "x / t"], correctIndex: 1, explanation: "If we need a + b = target, and we're processing a, we need b = target - a. Check if (target - a) exists in our hash map of previously seen values." }, { title: "Hash Map Strategy", content: "For each number at index i: check if (target - nums[i]) is in our map. If yes: return [map[target-nums[i]], i]. If no: add nums[i] → i to map. One pass: O(n) time!", highlight: "visualization", checkpoint: "For array [2,7,11,15] and target=9, which pair is found?", options: ["7 and 15 (sum=22)", "2 and 7 (sum=9 ✓)", "11 and 15 (sum=26)", "2 and 11 (sum=13)"], correctIndex: 1, explanation: "Process 2: map is empty, add 2→0. Process 7: complement = 9-7 = 2, found in map at index 0! Return [0,1]." }, { title: "Watch the Algorithm", content: "Click 'Visualize'. See how the hash map builds up as we scan and how finding the complement gives us the answer in one pass — no nested loops needed!", highlight: "controls", action: "run", checkpoint: "What is the time complexity of the hash map Two Sum solution?", options: ["O(n²) — try all pairs", "O(n log n) — need to sort first", "O(n) — one pass with hash map lookups", "O(1) — constant time"], correctIndex: 2, explanation: "Hash map solution: O(n) time (one pass) and O(n) space (hash map stores up to n entries). Compare: brute force O(n²) time, O(1) space. Classic time-space trade-off!" }, { title: "Brute Force vs Hash Map", content: "Brute force: try all pairs O(n²). Sort + Two Pointers: O(n log n) but gives indices only after extra tracking. Hash map: O(n) time, O(n) space — best for this problem. The trade-off: time vs. space.", highlight: "complexity", checkpoint: "Can you find TWO DIFFERENT pairs summing to target with this approach?", options: ["Yes, just run it twice", "The hash map approach finds the first pair; for all pairs, continue scanning without stopping", "No, it can only find one pair", "Yes, by sorting first"], correctIndex: 1, explanation: "To find ALL pairs: don't return on first match — just record each match and continue scanning. The hash map still enables O(n) detection of each matching pair." }] },
    three_sum: { title: "Three Sum Problem Tutorial", steps: [{ title: "The 3-Number Challenge", content: "Find all unique triplets in an array that sum to zero. Sort + fix one element + two pointers for the remaining two. Sorting enables duplicate skipping!", highlight: "description", checkpoint: "Why do we sort the array first in the Three Sum approach?", options: ["Sorting is always necessary for correctness", "Sorting enables two-pointer technique and easy duplicate skipping", "Sorting reduces element count", "Sorting makes the problem O(n)"], correctIndex: 1, explanation: "Sorting enables: (1) Two-pointer to efficiently find pairs summing to target. (2) Skip duplicate values easily by checking if current element equals previous — avoids identical triplets." }, { title: "Fix One, Two Pointers", content: "Fix nums[i] as first element. Use left=i+1, right=n-1 as two pointers for the remaining pair. If sum < 0: move left right. If sum > 0: move right left. If sum=0: record triplet, advance both pointers, skip duplicates.", highlight: "visualization", checkpoint: "After sorting [-4,-1,-1,0,1,2] and fixing nums[0]=-4, what pair sums to 4?", options: ["-1 and 5 (not in array)", "1 and 3 (not available)", "1 and 3 not present; actually no pair sums to 4 here", "2 and 2 — but we need distinct indices"], correctIndex: 2, explanation: "For i=0 (nums[0]=-4), we need pair summing to 4: {1,2+?} — scanning the remaining sorted array: 1+2=3 ≠ 4. No valid pair exists for this anchor value." }, { title: "Watch the Algorithm", content: "Click 'Visualize'. See how fixing one element and moving two pointers towards each other efficiently finds all valid pairs. Notice duplicate skipping — when left or right equals its neighbor, skip!", highlight: "controls", action: "run", checkpoint: "What is the time complexity of the sort + two-pointer Three Sum?", options: ["O(n)", "O(n log n)", "O(n²) — outer loop O(n) × inner two-pointer O(n)", "O(n³) — three nested loops"], correctIndex: 2, explanation: "Sorting: O(n log n). Outer loop: O(n) iterations. Each iteration: two-pointer O(n). Total: O(n log n + n²) = O(n²). Better than brute force O(n³)!" }, { title: "Handling Duplicates", content: "After sorting, skip duplicates at the outer loop (if nums[i]=nums[i-1] and i>0, skip). After finding a triplet, skip duplicate left/right values. This ensures uniqueness without using a set.", highlight: "complexity", checkpoint: "Why is sorting essential for the duplicate-skipping optimization?", options: ["Sorting makes duplicates disappear", "Sorting groups equal elements together, so we can skip duplicates with simple adjacent comparisons", "Sorted arrays have no duplicates", "Sorting prevents the two-pointer from malfunctioning"], correctIndex: 1, explanation: "After sorting, all equal values are adjacent. Checking nums[i] == nums[i-1] tells us we're considering the same anchor value as before → skip to avoid duplicate triplets. Without sorting, this check wouldn't work." }] },
    longest_substring: { title: "Longest Substring Without Repeating Characters Tutorial", steps: [{ title: "The Sliding Window Problem", content: "Find the longest substring with no repeated characters. Sliding window [left, right]: expand right to grow window, shrink from left when a duplicate appears. Hash map tracks character positions.", highlight: "description", checkpoint: "What window invariant does the algorithm maintain?", options: ["All characters in window are in sorted order", "No character in the window [left, right] appears more than once", "Window size is always n/2", "Left always equals 0"], correctIndex: 1, explanation: "The sliding window always maintains: every character in [left, right] is unique. When we find a duplicate at right, we shrink from left until the duplicate is removed." }, { title: "Hash Map for Positions", content: "Store last seen index of each character. When we encounter character c at position right: if c was seen at index ≥ left, move left to lastSeen[c]+1 (jumping past the duplicate). Then update lastSeen[c]=right.", highlight: "visualization", checkpoint: "For string 'abcabc', when we encounter the second 'a' at index 3, what happens to left?", options: ["Left stays at 0", "Left jumps to 1 (lastSeen['a']+1 = 0+1)", "Left jumps to 4", "Window resets to right+1"], correctIndex: 1, explanation: "'a' was last seen at index 0. To remove the duplicate 'a', move left to 0+1=1. Now window is [1,3]='bca' — no duplicates, and 'a' is included only once (at index 3)." }, { title: "Watch the Sliding Window", content: "Click 'Visualize'. See the window expand right until a duplicate is found, then left jumps past the previous occurrence. Track the maximum window size throughout.", highlight: "controls", action: "run", checkpoint: "What is the time complexity of the sliding window longest substring?", options: ["O(n²) — two nested loops", "O(n) — right pointer moves from 0 to n-1, left never goes backward", "O(n log n)", "O(26n) for 26-character alphabet"], correctIndex: 1, explanation: "O(n): right scans left-to-right once (n steps). Left only moves forward (never backward). Total pointer moves ≤ 2n. Hash map operations O(1). Overall: O(n)." }, { title: "Space Complexity", content: "Space: O(min(n, m)) where m is the character set size (26 for lowercase letters, 128 for ASCII, 256 for extended ASCII). The hash map never stores more than m distinct characters.", highlight: "complexity", checkpoint: "For the string 'pwwkew', what is the length of the longest substring without repeating characters?", options: ["1", "2", "3 ('wke')", "4"], correctIndex: 2, explanation: "'pwwkew': 'pw' (length 2), second 'w' → slide left, 'w' (length 1), 'wk' (2), 'wke' (3★), 'wkew' → duplicate 'w' → 'kew' (3). Answer: 3 ('wke' or 'kew')." }] },
    bst_search: { title: "BST Search Tutorial", steps: [{ title: "Searching in BST", content: "BSTs maintain order: left subtree values < node value < right subtree values. To search: compare target with current node, go left if smaller, go right if larger. Eliminates half the tree per step!", highlight: "description", checkpoint: "In a BST with values [5,3,8,1,4,7,9], which path does searching for 4 follow?", options: ["root(5)→right(8)→left(7)→?", "root(5)→left(3)→right(4)✓", "root(5)→left(3)→left(1)→?", "root(5)→right(8)→right(9)→?"], correctIndex: 1, explanation: "Search for 4: start at root 5. 4<5 → go left to 3. 4>3 → go right to 4. Found! Path: 5→3→4. Each step eliminates one subtree." }, { title: "BST Property", content: "For EVERY node n: all values in left subtree < n.value < all values in right subtree. This strict ordering makes search efficient. An in-order traversal of BST always gives sorted output!", highlight: "visualization", checkpoint: "What is the time complexity of BST search in the WORST case?", options: ["O(1) — hash table-like", "O(log n) — always balanced", "O(n) — worst case for skewed BST", "O(n²)"], correctIndex: 2, explanation: "Worst case: skewed BST (inserting sorted data gives a linked list). Searching in this linked-list BST takes O(n). Average/balanced BST: O(log n). Self-balancing BSTs (AVL, Red-Black) guarantee O(log n)." }, { title: "Watch the Search", content: "Click 'Visualize'. Each comparison eliminates one subtree. A balanced BST is as efficient as binary search on a sorted array, with the added benefit of O(log n) insertion/deletion!", highlight: "controls", action: "run", checkpoint: "How does BST search compare to binary search on a sorted array?", options: ["BST search is always O(1)", "Both are O(log n) average, but BST also supports O(log n) insert/delete while array needs O(n) insertion", "Arrays are better in all cases", "BST is O(n²) compared to array's O(log n)"], correctIndex: 1, explanation: "Both achieve O(log n) search for balanced structures. BST's advantage: O(log n) insertion and deletion too. Array binary search needs O(n) shifting for insertions. BST is better for dynamic data!" }, { title: "Self-Balancing BSTs", content: "Standard BST degrades to O(n) for sorted input. AVL trees and Red-Black trees maintain O(log n) height through rotations after each insert/delete. This guarantees O(log n) for all operations.", highlight: "complexity", checkpoint: "What is an in-order traversal of a valid BST guaranteed to produce?", options: ["A reversed sorted sequence", "A sorted sequence (ascending order)", "A random permutation", "A balanced tree representation"], correctIndex: 1, explanation: "In-order traversal (Left → Root → Right) of a BST always produces nodes in ascending sorted order. This is the key property that makes BSTs equivalent to sorted arrays for search!" }] },
    avl_tree: { title: "AVL Tree (Self-Balancing) Tutorial", steps: [{ title: "Welcome to AVL Trees!", content: "AVL trees are BSTs that self-balance after every insertion/deletion. Balance Factor = height(left) - height(right). AVL maintains |Balance Factor| ≤ 1 everywhere, guaranteeing O(log n) height!", highlight: "description", checkpoint: "What is the balance factor of a leaf node?", options: ["1", "-1", "0 (both subtrees are empty, height=-1 each)", "Undefined"], correctIndex: 2, explanation: "Leaf node has no children: height(left) = -1, height(right) = -1. Balance Factor = -1-(-1) = 0. Leaves are always balanced!" }, { title: "The Four Rotation Cases", content: "When balance factor becomes ±2 after insert/delete, rotate to restore balance: LL (right rotation), RR (left rotation), LR (left then right rotation), RL (right then left rotation). Each rotation is O(1)!", highlight: "visualization", checkpoint: "When does an LL (Left-Left) imbalance occur and how is it fixed?", options: ["Node heavier on right, fixed with left rotation", "Node heavier on left because of left-left insertion/deletion, fixed with right rotation", "Node heavier on both sides, fixed with double rotation", "Always requires two rotations"], correctIndex: 1, explanation: "LL imbalance: balance factor +2 at node, balance factor ≥ 0 at left child (insertion was in left subtree of left child). Fix: single right rotation on the imbalanced node." }, { title: "Watch Self-Balancing", content: "Click 'Visualize' and insert values like 10, 20, 30. Watch the RR imbalance and automatic left rotation that restores balance. The tree restructures itself to maintain O(log n) height!", highlight: "controls", action: "run", checkpoint: "What is the time complexity of AVL tree insertion?", options: ["O(n) — must rebalance all nodes", "O(log n) — path to insert point is log n deep; rebalancing is O(1) per node", "O(n log n)", "O(1)"], correctIndex: 1, explanation: "Insertion: O(log n) to find position (height = log n for AVL). Then update heights and check balance factors along the path upward: O(log n) nodes × O(1) per node = O(log n) total." }, { title: "AVL vs Red-Black Trees", content: "AVL trees are more strictly balanced than Red-Black trees → faster lookups. Red-Black trees have fewer rotations on average → faster insertions/deletions. Java's TreeMap/TreeSet uses Red-Black trees; functional languages often prefer AVL.", highlight: "complexity", checkpoint: "Compared to a standard (unbalanced) BST, AVL trees guarantee:", options: ["O(1) all operations", "O(log n) for search, insert, delete in ALL cases (not just average)", "O(n) insert but O(log n) search", "No guarantee — same as BST"], correctIndex: 1, explanation: "Standard BST: O(n) worst case for sorted input. AVL tree: O(log n) GUARANTEED for all operations in all cases — the self-balancing ensures height ≤ 1.44 log₂(n+2) always." }] },
    heap_sort: { title: "Heap Sort Tutorial", steps: [{ title: "Welcome to Heap Sort!", content: "Heap Sort uses a binary max-heap to sort in-place. Phase 1: Build max-heap in O(n). Phase 2: Repeatedly extract max (swap root with last, reduce heap size, heapify root) n times. Total: O(n log n)!", highlight: "description", checkpoint: "What type of heap does Heap Sort use for ascending sort?", options: ["Min-heap", "Max-heap (largest element at root, extracted to end repeatedly)", "AVL heap", "B-heap"], correctIndex: 1, explanation: "Max-heap for ascending sort: extract maximum → place at end → sorted largest-to-smallest from right. Alternatively, min-heap gives ascending order without reversal." }, { title: "Build Max-Heap Phase", content: "Build max-heap by calling heapify on all internal nodes from n/2-1 down to 0. This takes O(n) — not O(n log n) as it might seem! The amortized analysis shows lower nodes do less work.", highlight: "visualization", checkpoint: "Why does Build-Heap run in O(n) and not O(n log n)?", options: ["Heapify is O(1) for all nodes", "Most nodes are near the bottom with low height — less work per node; amortizes to O(n)", "We only call heapify on n/2 nodes", "Build-Heap actually is O(n log n)"], correctIndex: 1, explanation: "Half the nodes are leaves (height 0, 0 work). Quarter have height 1 (1 swap max). Etc. Summing over all heights: Σ(n/2^(h+1)) × h = O(n). Most work is at the top (few nodes), least work at bottom (many nodes)." }, { title: "Watch Heap Sort", content: "Click 'Visualize'. First, watch Build-Heap transform the array. Then watch the extraction phase: max (root) is swapped to the sorted region, heap size decrements, and heapify restores the heap property.", highlight: "controls", action: "run", checkpoint: "What is Heap Sort's worst-case time complexity?", options: ["O(n²) — like Bubble Sort", "O(n log n) — always, unlike Quick Sort", "O(n) in best case", "O(n log n) average, O(n²) worst"], correctIndex: 1, explanation: "Heap Sort is O(n log n) in ALL cases — best, average, and worst. Unlike Quick Sort (O(n²) worst case), Heap Sort has no adversarial inputs. This makes it attractive for real-time systems." }, { title: "Heap Sort Properties", content: "O(n log n) time always. O(1) space (in-place). NOT stable (swapping can change relative order of equal elements). Excellent worst-case guarantee but poor cache performance (accesses memory non-sequentially).", highlight: "complexity", checkpoint: "Why is Heap Sort NOT stable?", options: ["It sorts in descending order", "The heap extraction swaps the root with the last element, potentially changing relative order of equal keys", "Heap Sort only works on distinct elements", "Heapify reorders equal elements randomly"], correctIndex: 1, explanation: "Stability requires equal elements to maintain their original relative order. Heap Sort's extraction step (swap root with last element) can move an equal element past others — unstable by nature." }] },
    bst_insert: { title: "BST Insert Tutorial", steps: [{ title: "Inserting into BST", content: "BST insertion finds the correct position by following the BST property: go left if new value < current, go right if larger. Insert as a new leaf when we find a null pointer.", highlight: "description", checkpoint: "Where does a new element always get inserted in a BST?", options: ["At the root", "In the middle of the tree", "As a leaf node (at a null position)", "After the maximum element"], correctIndex: 2, explanation: "New nodes are always inserted as leaves — we traverse down until we find a null left or right pointer that becomes the new node's position." }, { title: "Recursive vs Iterative", content: "Recursive: if null, create node; if value < current, recurse left; if value > current, recurse right. Iterative: traverse with a pointer, track parent, attach new node to parent's null child.", highlight: "visualization", checkpoint: "Insert values 5,3,7,1,4 into an empty BST. What is the in-order traversal?", options: ["5,3,7,1,4 (insertion order)", "1,3,4,5,7 (sorted ascending)", "7,5,4,3,1 (descending)", "3,1,5,4,7"], correctIndex: 1, explanation: "Any valid BST's in-order traversal gives sorted order: 1,3,4,5,7. The tree structure: 5 is root, 3 is left child, 7 is right child, 1 and 4 are children of 3." }, { title: "Watch Insertion", content: "Click 'Visualize' and insert several values. See how each value navigates down the tree, making left/right decisions at each node, until it finds its place as a leaf.", highlight: "controls", action: "run", checkpoint: "Inserting elements 1,2,3,4,5 in sorted order into a BST creates what shape?", options: ["A balanced tree", "A right-skewed linear chain (degenerate tree)", "A complete binary tree", "A random tree"], correctIndex: 1, explanation: "Inserting sorted values creates a right-skewed 'linked list' BST: each new element is always larger than all existing ones, going right repeatedly. This degenerates to O(n) operations — why AVL/RB trees exist!" }, { title: "Balancing Considerations", content: "For arbitrary insertion order, average BST height is O(log n). For sorted/adversarial order, height degrades to O(n). Self-balancing BSTs (AVL, Red-Black, Splay) prevent this by rotating on insertion.", highlight: "complexity", checkpoint: "What is the average-case time complexity for BST insertion with random data?", options: ["O(1)", "O(log n) — expected height for random insertion order", "O(n) — always linear", "O(n log n)"], correctIndex: 1, explanation: "For random insertion order, expected BST height is O(log n) — same as Quick Sort's expected recursion depth. Worst case (sorted input) is O(n). Randomized BSTs guarantee O(log n) expected." }] },
    bst_delete: { title: "BST Delete Tutorial", steps: [{ title: "Three Deletion Cases", content: "Deleting from BST must maintain the BST property. Three cases: (1) Leaf: just remove. (2) One child: bypass the node (connect parent to child). (3) Two children: find inorder successor, copy its value, delete the successor.", highlight: "description", checkpoint: "Which case is the most complex in BST deletion?", options: ["Deleting a leaf node", "Deleting a node with one child", "Deleting a node with two children (needs inorder successor)", "Deleting the root"], correctIndex: 2, explanation: "Two-child deletion: can't simply remove the node (would disconnect the subtrees). Solution: replace with inorder successor (smallest in right subtree), then delete the successor (which has ≤1 child)." }, { title: "Inorder Successor", content: "Inorder successor of node n = the smallest node in n's right subtree = leftmost node in right subtree. Alternatively, inorder predecessor = largest in left subtree. Both work as replacements!", highlight: "visualization", checkpoint: "In BST [8,3,10,1,6,14,4,7,13], what is the inorder successor of 3?", options: ["1 (left child)", "6 (right child)", "4 (leftmost in right subtree)", "8 (parent)"], correctIndex: 2, explanation: "Inorder successor of 3: go right to 6, then go left as far as possible: 4. Node 4 is the leftmost (smallest) node in 3's right subtree — it's the inorder successor." }, { title: "Watch Deletion Cases", content: "Click 'Visualize' and delete nodes with 0, 1, and 2 children. See how each case handles the tree restructuring differently. The BST property must hold after every deletion!", highlight: "controls", action: "run", checkpoint: "After replacing a node with its inorder successor value, what do we do with the successor node?", options: ["Leave it as a duplicate", "Delete the successor node (which has at most 1 child — no left subtree)", "Move it to a different position", "Set its value to null"], correctIndex: 1, explanation: "After copying successor's value to the node being 'deleted', we must delete the actual successor node. The successor is the leftmost node in the right subtree, so it has NO left child → easy single-child or leaf deletion." }, { title: "Time Complexity", content: "All three deletion cases: O(h) where h = tree height. Finding the node: O(h). Finding inorder successor (rightmost left traversal): O(h). Reconnecting pointers: O(1). For balanced BST: O(log n).", highlight: "complexity", checkpoint: "What is BST deletion's time complexity for a balanced BST?", options: ["O(1)", "O(log n) — height of balanced BST is log n", "O(n) — always linear", "O(n log n)"], correctIndex: 1, explanation: "Balanced BST height = O(log n). All deletion operations traverse at most one root-to-leaf path → O(log n). AVL/Red-Black BSTs maintain balance after deletion with rotations: still O(log n)." }] },
    towers_of_hanoi: { title: "Towers of Hanoi Tutorial", steps: [{ title: "Welcome to Towers of Hanoi!", content: "Move n disks from peg A to peg C, using peg B as auxiliary. Rule: never place a larger disk on a smaller one. Recursive insight: move n-1 disks to B, move disk n to C, move n-1 disks from B to C.", highlight: "description", checkpoint: "What is the base case for the Towers of Hanoi recursion?", options: ["n=0: do nothing", "n=1: move the single disk directly from source to destination", "n=2: always two moves", "n=n: infinite recursion"], correctIndex: 1, explanation: "Base case n=1: move one disk from source directly to destination in 1 move. All other cases reduce to moving n-1 disks twice + 1 move for the bottom disk." }, { title: "The Recursive Solution", content: "hanoi(n, from, to, via): if n=1, move disk from→to. Else: hanoi(n-1, from, via, to) — move stack to auxiliary. Move disk n: from→to. hanoi(n-1, via, to, from) — move stack from auxiliary to destination.", highlight: "visualization", checkpoint: "For n=3 disks, how many moves are required?", options: ["3 moves", "6 moves", "7 moves (2³ - 1)", "8 moves"], correctIndex: 2, explanation: "2³ - 1 = 7 moves for 3 disks. Formula: T(n) = 2T(n-1) + 1 → T(n) = 2^n - 1. For n=3: 2^3-1=7. For 64 disks (legend!): 2^64-1 ≈ 18 quintillion moves!" }, { title: "Watch the Magic", content: "Click 'Visualize' with 3 disks. Count the moves — it should be exactly 7. Try to predict each move before it happens. The recursive pattern becomes clear after a few runs!", highlight: "controls", action: "run", checkpoint: "Why is it impossible to solve Towers of Hanoi with fewer than 2^n - 1 moves?", options: ["The puzzle has arbitrary rules", "Moving the largest disk requires all n-1 others to be on one peg — that alone takes T(n-1) moves, and we need to do it twice", "Programming limitations", "The formula is just an approximation"], correctIndex: 1, explanation: "To move disk n, all n-1 smaller disks must be stacked elsewhere (T(n-1) moves). Then move disk n (1 move). Then move n-1 disks back on top (T(n-1) moves). Total: 2T(n-1)+1 — can't do better!" }, { title: "Exponential Complexity", content: "T(n) = 2^n - 1. Each additional disk DOUBLES the number of moves. This demonstrates exponential growth. For n=64: 18.4 quintillion moves at 1 move/second = 585 billion years!", highlight: "complexity", checkpoint: "What is the time complexity of Towers of Hanoi?", options: ["O(n)", "O(n log n)", "O(2^n) — exponential", "O(n!)"], correctIndex: 2, explanation: "T(n) = 2^n - 1 = O(2^n). Exponential growth: every disk added doubles the work. This is an inherently exponential problem — no polynomial algorithm exists because 2^n-1 moves are genuinely required." }] },
    open_hashing: { title: "Open Hashing (Chaining) Tutorial", steps: [{ title: "Welcome to Hash Tables!", content: "Hash tables provide O(1) average-case lookup by mapping keys to array indices using a hash function. Open hashing (chaining) handles collisions with linked lists at each bucket.", highlight: "description", checkpoint: "What is the purpose of a hash function?", options: ["Sort the elements", "Map keys to array indices (buckets) in the range [0, table_size-1]", "Remove duplicates", "Encrypt data"], correctIndex: 1, explanation: "Hash function maps arbitrary keys (strings, numbers, etc.) to integers in range [0, m-1] for a table of size m. Same key always maps to same index. Different keys should ideally map to different indices." }, { title: "Collision Resolution by Chaining", content: "Multiple keys can hash to the same index — a collision! Open hashing chains them: each bucket holds a linked list. On insert: append to the list at hash(key). On search: hash to bucket, then linearly scan the list.", highlight: "visualization", checkpoint: "What is the time complexity of search in open hashing with load factor α = n/m?", options: ["O(1) always", "O(α) average — proportional to chain length", "O(n) always", "O(m) — scan entire table"], correctIndex: 1, explanation: "With n elements in m buckets, average chain length = α = n/m (load factor). Average search time = O(1 + α). If α < 1 (more buckets than elements), O(1) average. If α >> 1, chains grow → slower." }, { title: "Watch Insertions", content: "Click 'Visualize' and insert values. See some go to empty buckets (length 1 chains) while others collide and extend existing chains. Watch how different values map to the same bucket.", highlight: "controls", action: "run", checkpoint: "What is the ideal load factor α to maintain O(1) average operations?", options: ["α > 10", "α ≤ 1 (resize when n > m)", "α = 0 always", "α = n (n chains total)"], correctIndex: 1, explanation: "Typically resize (rehash) when α > 0.7-0.75. Java's HashMap resizes at α=0.75. With α ≤ 1, chains are short → O(1) average. Rehashing takes O(n) but is amortized O(1) per insertion." }, { title: "Hash Functions", content: "Good hash function: uniform distribution (minimizes collisions), fast to compute, deterministic. Common: h(k) = k % m (division method), h(k) = ⌊m · (k·A mod 1)⌋ (multiplication method), SHA-based for strings.", highlight: "complexity", checkpoint: "What is the worst-case time complexity for search in a hash table with chaining?", options: ["O(1)", "O(log n)", "O(n) — all elements hash to same bucket", "O(n²)"], correctIndex: 2, explanation: "Worst case: every element hashes to the same bucket → one chain of length n → O(n) search. Happens with bad hash function or adversarial inputs. Good hash functions make this extremely rare." }] }
};

// ─── Completion Screen ───────────────────────────────────────────────────────
function CompletionScreen({ tutorial, completedSteps, onClose, isDark }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-8 text-center"
        >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-4 shadow-lg shadow-green-500/30">
                <Trophy size={36} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Tutorial Complete!</h3>
            <p className="text-[var(--color-text-secondary)] mb-6 max-w-sm leading-relaxed">
                Excellent work! You've completed all {tutorial.steps.length} steps of <span className="font-semibold text-[var(--color-accent-primary)]">{tutorial.title}</span>.
            </p>
            <div className="flex gap-2 flex-wrap justify-center mb-6">
                {tutorial.steps.map((step, i) => (
                    <div key={i} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-xs text-green-400 font-medium">
                        <CheckCircle size={12} />
                        {step.title.length > 22 ? step.title.slice(0, 22) + '…' : step.title}
                    </div>
                ))}
            </div>
            <Button variant="primary" onClick={onClose} className="gap-2">
                Back to Algorithm <ArrowRight size={16} />
            </Button>
        </motion.div>
    );
}

// ─── MCQ Checkpoint ─────────────────────────────────────────────────────────
function MCQCheckpoint({ question, options, correctIndex, explanation, onCorrect, onWrong, isDark }) {
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);

    const handleSelect = (idx) => {
        if (answered) return;
        setSelected(idx);
        setAnswered(true);
        if (idx === correctIndex) {
            setTimeout(() => onCorrect(), 1200);
        } else {
            onWrong();
        }
    };

    const optionLetters = ['A', 'B', 'C', 'D'];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl border-2 overflow-hidden ${isDark ? 'border-violet-500/30 bg-violet-950/20' : 'border-violet-400/40 bg-violet-50'}`}
        >
            {/* Question Header */}
            <div className={`px-4 py-3 border-b ${isDark ? 'border-violet-500/20 bg-violet-900/20' : 'border-violet-300/40 bg-violet-100/60'}`}>
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[10px] font-bold">?</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-violet-400">Knowledge Check</span>
                </div>
                <p className="text-sm font-semibold text-[var(--color-text-primary)] leading-snug">{question}</p>
            </div>

            {/* Options */}
            <div className="p-3 space-y-2">
                {options.map((opt, idx) => {
                    let style = isDark
                        ? 'border-white/10 bg-white/5 text-[var(--color-text-secondary)] hover:border-violet-400/50 hover:bg-violet-900/20'
                        : 'border-black/10 bg-white text-[var(--color-text-secondary)] hover:border-violet-400 hover:bg-violet-50';

                    if (answered) {
                        if (idx === correctIndex) {
                            style = 'border-green-500/60 bg-green-500/15 text-green-400';
                        } else if (idx === selected && selected !== correctIndex) {
                            style = 'border-red-500/60 bg-red-500/15 text-red-400';
                        } else {
                            style = isDark ? 'border-white/5 bg-white/3 text-[var(--color-text-tertiary)] opacity-50' : 'border-black/5 bg-white opacity-50';
                        }
                    }

                    return (
                        <button
                            key={idx}
                            onClick={() => handleSelect(idx)}
                            disabled={answered}
                            className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-lg border text-left text-sm font-medium transition-all duration-200 ${style} ${!answered ? 'cursor-pointer' : 'cursor-default'}`}
                        >
                            <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 ${
                                answered && idx === correctIndex ? 'bg-green-500 text-white' :
                                answered && idx === selected && selected !== correctIndex ? 'bg-red-500 text-white' :
                                isDark ? 'bg-white/10 text-[var(--color-text-tertiary)]' : 'bg-black/10'
                            }`}>
                                {optionLetters[idx]}
                            </span>
                            <span className="leading-snug">{opt}</span>
                            {answered && idx === correctIndex && <CheckCircle size={14} className="text-green-400 flex-shrink-0 mt-0.5 ml-auto" />}
                        </button>
                    );
                })}
            </div>

            {/* Explanation */}
            {answered && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className={`px-4 pb-3 pt-1`}
                >
                    <div className={`p-3 rounded-lg text-xs leading-relaxed ${
                        selected === correctIndex
                            ? isDark ? 'bg-green-950/50 border border-green-500/20 text-green-300' : 'bg-green-50 border border-green-300 text-green-800'
                            : isDark ? 'bg-amber-950/50 border border-amber-500/20 text-amber-300' : 'bg-amber-50 border border-amber-300 text-amber-800'
                    }`}>
                        <span className="font-bold mr-1">{selected === correctIndex ? '✓ Correct!' : '✗ Not quite.'}</span>
                        {explanation}
                    </div>
                    {selected === correctIndex && (
                        <p className="text-center text-[10px] text-[var(--color-text-tertiary)] mt-2 animate-pulse">Advancing to next step…</p>
                    )}
                </motion.div>
            )}

            {/* Wrong answer retry */}
            {answered && selected !== correctIndex && (
                <div className="px-4 pb-3">
                    <button
                        onClick={() => { setSelected(null); setAnswered(false); }}
                        className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/30 rounded-lg hover:bg-[var(--color-accent-primary)]/10 transition-all"
                    >
                        <RotateCcw size={12} /> Try Again
                    </button>
                </div>
            )}
        </motion.div>
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export function GuidedTutorial({ algorithm, onClose, onAction }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState(new Set());
    const [showCheckpoint, setShowCheckpoint] = useState(false);
    const [checkpointWrong, setCheckpointWrong] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [theme, setTheme] = useState(() =>
        typeof window !== 'undefined'
            ? document.documentElement.getAttribute('data-theme') || 'dark'
            : 'dark'
    );

    React.useEffect(() => {
        const observer = new MutationObserver(() =>
            setTheme(document.documentElement.getAttribute('data-theme') || 'dark')
        );
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    const isDark = theme === 'dark';
    const tutorial = TUTORIALS[algorithm?.id];
    if (!tutorial) return null;

    const currentStepData = tutorial.steps[currentStep];
    const progress = completedSteps.size / tutorial.steps.length * 100;

    const advanceStep = () => {
        const newCompleted = new Set([...completedSteps, currentStep]);
        setCompletedSteps(newCompleted);
        setShowCheckpoint(false);
        setCheckpointWrong(false);

        if (currentStep < tutorial.steps.length - 1) {
            setCurrentStep(s => s + 1);
        } else {
            setIsComplete(true);
        }
    };

    const handleNext = () => {
        if (currentStepData.action && onAction) onAction(currentStepData.action);
        if (currentStepData.checkpoint && !showCheckpoint) {
            setShowCheckpoint(true);
            setCheckpointWrong(false);
        } else if (!currentStepData.checkpoint) {
            advanceStep();
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(s => s - 1);
            setShowCheckpoint(false);
            setCheckpointWrong(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                role="dialog"
                aria-labelledby="tutorial-title"
                aria-modal="true"
            >
                <motion.div
                    initial={{ scale: 0.92, y: 24 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.92, y: 24 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className={`w-full flex flex-col rounded-2xl shadow-2xl border overflow-hidden transition-all ${
                        isMaximized ? 'max-w-4xl h-[90vh]' : 'max-w-2xl max-h-[88vh]'
                    } ${isDark ? 'bg-[var(--color-bg-secondary)] border-white/10' : 'bg-white border-black/10'}`}
                >
                    {/* ── Header ── */}
                    <div className={`flex-shrink-0 px-5 py-4 border-b ${isDark ? 'border-white/10' : 'border-black/10'} flex items-center justify-between`}>
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                                <BookOpen size={16} className="text-white" />
                            </div>
                            <div className="min-w-0">
                                <h2 id="tutorial-title" className="text-base font-bold text-[var(--color-text-primary)] leading-tight truncate">
                                    {tutorial.title}
                                </h2>
                                {!isComplete && (
                                    <p className="text-[11px] text-[var(--color-text-tertiary)]">
                                        Step {currentStep + 1} of {tutorial.steps.length}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                            <button
                                onClick={() => setIsMaximized(m => !m)}
                                className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10 text-[var(--color-text-tertiary)]' : 'hover:bg-black/10 text-[var(--color-text-tertiary)]'}`}
                                title={isMaximized ? "Restore" : "Maximize"}
                            >
                                {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                            </button>
                            <button
                                onClick={onClose}
                                className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10 text-[var(--color-text-tertiary)]' : 'hover:bg-black/10 text-[var(--color-text-tertiary)]'}`}
                                aria-label="Close tutorial"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>

                    {/* ── Progress Bar ── */}
                    {!isComplete && (
                        <div className="flex-shrink-0 px-5 pt-3 pb-1">
                            <div className="flex items-center gap-3">
                                {/* Step dots */}
                                <div className="flex gap-1.5 flex-1">
                                    {tutorial.steps.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${
                                                completedSteps.has(idx)
                                                    ? 'bg-green-500'
                                                    : idx === currentStep
                                                    ? 'bg-violet-500'
                                                    : isDark ? 'bg-white/10' : 'bg-black/10'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-[10px] font-mono text-[var(--color-text-tertiary)] flex-shrink-0">
                                    {completedSteps.size}/{tutorial.steps.length}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* ── Content ── */}
                    <div className="flex-1 overflow-y-auto px-5 py-4">
                        {isComplete ? (
                            <CompletionScreen
                                tutorial={tutorial}
                                completedSteps={completedSteps}
                                onClose={onClose}
                                isDark={isDark}
                            />
                        ) : (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, x: 16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -16 }}
                                    transition={{ duration: 0.25 }}
                                    className="space-y-4"
                                >
                                    {/* Step Title */}
                                    <div className="flex items-start gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-violet-400 font-bold text-xs">{currentStep + 1}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-[var(--color-text-primary)] leading-tight">
                                            {currentStepData.title}
                                        </h3>
                                    </div>

                                    {/* Explanation content */}
                                    <div className={`p-4 rounded-xl text-sm text-[var(--color-text-secondary)] leading-relaxed ${isDark ? 'bg-white/3 border border-white/8' : 'bg-black/3 border border-black/8'}`}>
                                        {currentStepData.content}
                                    </div>

                                    {/* Highlight badge */}
                                    {currentStepData.highlight && (
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                                                currentStepData.highlight === 'complexity' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                                                currentStepData.highlight === 'visualization' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                currentStepData.highlight === 'controls' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                                            }`}>
                                                {currentStepData.highlight === 'complexity' ? '⚡ Focus: Complexity' :
                                                 currentStepData.highlight === 'visualization' ? '👁 Focus: Visualization' :
                                                 currentStepData.highlight === 'controls' ? '▶ Try It: Click Visualize' :
                                                 '📖 Focus: Concept'}
                                            </span>
                                        </div>
                                    )}

                                    {/* MCQ Checkpoint */}
                                    {showCheckpoint && currentStepData.checkpoint && (
                                        <MCQCheckpoint
                                            question={currentStepData.checkpoint}
                                            options={currentStepData.options}
                                            correctIndex={currentStepData.correctIndex}
                                            explanation={currentStepData.explanation}
                                            onCorrect={advanceStep}
                                            onWrong={() => setCheckpointWrong(true)}
                                            isDark={isDark}
                                        />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </div>

                    {/* ── Footer ── */}
                    {!isComplete && (
                        <div className={`flex-shrink-0 px-5 py-4 border-t ${isDark ? 'border-white/10' : 'border-black/10'} flex justify-between items-center`}>
                            <Button
                                variant="ghost"
                                onClick={handlePrev}
                                disabled={currentStep === 0}
                                className="gap-2 text-sm"
                            >
                                <ArrowLeft size={15} /> Previous
                            </Button>

                            <div className="flex items-center gap-2">
                                {showCheckpoint && (
                                    <span className="text-xs text-[var(--color-text-tertiary)]">
                                        Answer to continue
                                    </span>
                                )}
                                {!showCheckpoint && (
                                    <Button
                                        variant="primary"
                                        onClick={handleNext}
                                        className="gap-2 text-sm bg-violet-600 hover:bg-violet-700 border-violet-600"
                                    >
                                        {currentStepData.checkpoint ? (
                                            <><BookOpen size={14} /> Check Understanding</>
                                        ) : currentStep === tutorial.steps.length - 1 ? (
                                            <>Complete <CheckCircle size={14} /></>
                                        ) : (
                                            <>Next <ArrowRight size={14} /></>
                                        )}
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
