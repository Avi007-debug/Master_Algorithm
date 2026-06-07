const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'backend', 'src');

const annotations = [
    {
        file: 'bubble_sort.c',
        target: 'if (nums[j] > nums[j+1]) {',
        comment: `            /* DAA Analysis: Basic Operation (Comparison)
             * The comparison "nums[j] > nums[j+1]" is the basic operation of Bubble Sort.
             * It is executed (n - 1) + (n - 2) + ... + 1 = n * (n - 1) / 2 times in the worst and average cases.
             * This yields a quadratic frequency count of O(n²), making the algorithm inefficient for large inputs.
             */
            `
    },
    {
        file: 'selection_sort.c',
        target: 'if (arr[j] < arr[min_idx]) {',
        comment: `            /* DAA Analysis: Basic Operation (Comparison)
             * The comparison "arr[j] < arr[min_idx]" is the basic operation of Selection Sort.
             * The inner loop runs n - i - 1 times for each outer step. The total operations count is:
             * C(n) = ∑(i=0 to n-2) (n - i - 1) = n * (n - 1) / 2 comparisons.
             * This count is invariant of the input structure (always O(n²) in all cases: best, worst, average).
             */
            `
    },
    {
        file: 'insertion_sort.c',
        target: 'while (j >= 0 && arr[j] > key) {',
        comment: `        /* DAA Analysis: Basic Operation (Comparison)
         * The comparison "arr[j] > key" is the basic operation of Insertion Sort.
         * Worst case: reverse-sorted input, where comparisons run from 1 to i for each i:
         * C_worst(n) = ∑(i=1 to n-1) i = n * (n - 1) / 2 = O(n²) comparisons.
         * Best case: already sorted input, where outer key is compared only once per element:
         * C_best(n) = n - 1 comparisons = O(n) linear complexity.
         */
        `
    },
    {
        file: 'merge_sort.c',
        target: 'if (L[i] <= R[j]) {',
        comment: `        /* DAA Analysis: Basic Operation (Comparison)
         * The comparison "L[i] <= R[j]" is the basic operation of Merge Sort.
         * The recursion follows the relation T(n) = 2T(n/2) + f(n), where f(n) = O(n) is the merge step.
         * By Master Theorem, the time complexity is Θ(n log n) in all cases (best, average, worst).
         * Space complexity is O(n) due to auxiliary temporary arrays L and R.
         */
        `
    },
    {
        file: 'quick_sort.c',
        target: 'if (arr[j] < pivot) {',
        comment: `        /* DAA Analysis: Basic Operation (Comparison)
         * The comparison "arr[j] < pivot" is the basic operation of Quick Sort.
         * Best Case (Balanced Partitions): T(n) = 2T(n/2) + cn, yielding O(n log n).
         * Worst Case (Skewed Partitions): T(n) = T(n-1) + cn, yielding O(n²) when array is already sorted.
         * Average Case complexity is Θ(n log n) with a small hidden constant.
         */
        `
    },
    {
        file: 'dijkstra_algorithm.c',
        target: 'visited[0] = 1;',
        comment: `    /* DAA Analysis: Basic Operation (Vertex selection and Distance Relaxation)
     * For Dijkstra's algorithm with V vertices and E edges:
     * - Minimum distance vertex selection runs V times. Naive lookup takes O(V), Min-Heap takes O(log V).
     * - Distance relaxation checks run E times. Naive takes O(1), Min-Heap key-decrease takes O(log V).
     * Total worst-case time complexity is O(V² + E) = O(V²) for naive matrix, or O(E log V) for Heap.
     */
    `
    },
    {
        file: 'prim_algorithm.c',
        target: 'mstSet[0] = 1;',
        comment: `    /* DAA Analysis: Basic Operation (Vertex selection and Key Relaxation)
     * For Prim's algorithm with V vertices and E edges:
     * - Min key vertex selection runs V times. Naive lookup takes O(V), Min-Heap takes O(log V).
     * - Adjacent key updates (relaxation checks) run E times.
     * Total worst-case time complexity is O(V²) for adjacency matrix, or O(E log V) for Min-Heap.
     */
    `
    },
    {
        file: 'bfs_graph.c',
        target: 'if(graph[curr][i] == 1 && !visited[i]) {',
        comment: `            /* DAA Analysis: Basic Operation (Vertex check and Edge exploration)
             * The check "graph[curr][i] == 1 && !visited[i]" is the basic operation.
             * For a graph with V vertices and E edges:
             * - Each vertex is enqueued/dequeued exactly once.
             * - Each entry in the adjacency matrix is scanned once per vertex.
             * Total time complexity is Θ(V²) when using an adjacency matrix, or Θ(V + E) when using an adjacency list.
             */
            `
    },
    {
        file: 'dfs_graph.c',
        target: 'if (graph[vertex][i] == 1 && !visited[i]) {',
        comment: `        /* DAA Analysis: Basic Operation (Vertex check and Edge exploration)
         * The check "graph[vertex][i] == 1 && !visited[i]" is the basic operation.
         * For a graph with V vertices and E edges:
         * - DFS function is called recursively exactly once for each reachable vertex.
         * - For each vertex, we iterate V times to check neighbors.
         * Total time complexity is Θ(V²) when using an adjacency matrix, or Θ(V + E) when using an adjacency list.
         * Space complexity is O(V) due to the recursion stack depth.
         */
        `
    },
    {
        file: 'n_queens.c',
        target: 'if (isSafe(row, col)) {',
        comment: `        /* DAA Analysis: Basic Operation (Safety Checks and Placements)
         * The safety check "isSafe(row, col)" is the basic operation.
         * N-Queens is solved using Backtracking. The state space tree has size O(N!).
         * In the worst case, we search a substantial portion of all permutations.
         * The recursion stack depth is O(N) (one frame per row).
         */
        `
    }
];

annotations.forEach(item => {
    const filePath = path.join(srcDir, item.file);
    if (!fs.existsSync(filePath)) {
        console.warn(`File not found: \${filePath}`);
        return;
    }
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('DAA Analysis')) {
        console.log(`File already annotated: \${item.file}`);
        return;
    }
    const targetIdx = content.indexOf(item.target);
    if (targetIdx === -1) {
        console.error(`Target not found in \${item.file}: "\${item.target}"`);
        return;
    }
    const updatedContent = content.slice(0, targetIdx) + item.comment + content.slice(targetIdx);
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Successfully annotated: \${item.file}`);
});
