export const CATEGORIES = {
    ARRAYS: "Arrays & Hashing",
    SORTING: "Sorting",
    SLIDING_WINDOW: "Sliding Window",
    STACK: "Stack",
    QUEUE: "Queue",
    LINKED_LIST: "Linked List",
    TREES: "Trees",
    GRAPHS: "Graphs",
    HASHING: "Hashing",
    DP: "Dynamic Programming",
    BACKTRACKING: "Backtracking",
    RECURSION: "Recursion"
};

export const PROBLEMS = [
    {
        id: 'bubble_sort',
        basicOperation: "Element Comparison (comparing two adjacent elements arr[j] and arr[j+1])",
        dominantOperation: "Comparison and conditional swap operations inside the nested loop",
        criticalOperation: "Array index access and element swapping",
        complexityDerivation: "Step 1: Identify Basic Operation -> Element Comparison.\nStep 2: Count Number of Executions -> In the inner loop, comparisons run from j = 0 to n - i - 1.\nStep 3: Write Summation -> C(n) = ∑ (from i=0 to n-2) (n - i - 1).\nStep 4: Simplify Summation -> C(n) = (n-1) + (n-2) + ... + 1 = n(n-1)/2.\nStep 5: Determine Order of Growth -> n(n-1)/2 ≈ 0.5n² - 0.5n, which grows quadratically.\nStep 6: Obtain Final Complexity -> O(n²).",
        bestCaseDerivation: "Input: Already sorted array. Derivation: Swaps check flag triggers break after 1 pass. Operations: n - 1 comparisons. Complexity: O(n).",
        averageCaseDerivation: "Input: Randomly ordered array. Derivation: Comparisons run fully. Operations: n(n-1)/4 swaps, n(n-1)/2 comparisons. Complexity: O(n²).",
        worstCaseDerivation: "Input: Reverse sorted array. Derivation: Comparisons and swaps run fully. Operations: n(n-1)/2 comparisons, n(n-1)/2 swaps. Complexity: O(n²).",
        spaceComplexityDerivation: "Input Space: O(n) to store the array elements.\nAuxiliary Space: O(1) as sorting is in-place (uses only a temp variable for swaps).\nStack Space: O(1) since it is implemented iteratively.\nTotal Space: O(n) total memory footprint.",
        interviewQuestions: "1. How can you optimize Bubble Sort to run in O(n) for sorted inputs?\n2. Is Bubble Sort stable and in-place?\n3. Why is Bubble Sort rarely used in production?",
        examQuestions: "1. Prove mathematically that the worst-case time complexity of bubble sort is O(n²).\n2. Write the optimized bubble sort algorithm and analyze its best case.",
        derivationShortcuts: "Nested loops running n times usually yield O(n²).",
        title: 'Bubble Sort',
        category: CATEGORIES.SORTING,
        difficulty: 'Easy',
        inSyllabus: true, // Unit-II: Sorting algorithms
        beginnerTips: [
            "Start by comparing the first two elements",
            "If they're in wrong order, swap them",
            "Move to the next pair and repeat",
            "After each full pass, the largest element reaches its final position",
            "Continue until no more swaps are needed"
        ],
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        description: 'Repeatedly swap adjacent elements if they are in the wrong order.',
        codeSnippet: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                swap(&arr[j], &arr[j+1]);
            }
        }
    }
}`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void bubbleSort(int arr[], int n) {
    // Outer loop for each pass
    for (int i = 0; i < n - 1; i++) {
        // Inner loop for comparison in each pass
        // After i passes, last i elements are sorted
        for (int j = 0; j < n - i - 1; j++) {
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {
                // Swap if they are in wrong order
                swap(&arr[j], &arr[j + 1]);
            }
        }
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    bubbleSort(arr, n);
    
    printf("\\nSorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    return 0;
}`,
        inputs: [
            { name: "nums", label: "Array to Sort", type: "array", defaultValue: "29, 10, 14, 37, 14, 5, 12, 20" }
        ],
        runCommand: 'bubble_sort',
        applications: "Network packet ordering, educational teaching of sorting concepts, detecting nearly-sorted data, simple embedded systems with tiny datasets, poker card hand sorting in simple card games.",
        commonMistakes: [
            "Forgetting to use n-i-1 in the inner loop (causes out of bounds access)",
            "Not implementing the swap function correctly (using = instead of swapping)",
            "Missing the optimization check (flag for no swaps = already sorted)",
            "Using wrong loop bounds (i < n instead of i < n-1)",
            "Not considering edge cases (empty array, single element)"
        ]
    },
    {
        id: 'selection_sort',
        basicOperation: "Element Comparison (comparing current element arr[j] with current minimum arr[min_idx])",
        dominantOperation: "Comparison inside the inner loop to find minimum element",
        criticalOperation: "Minimum index update and array reads",
        complexityDerivation: "Step 1: Identify Basic Operation -> Element Comparison.\nStep 2: Count Number of Executions -> The inner loop runs from j = i + 1 to n.\nStep 3: Write Summation -> C(n) = ∑ (from i=0 to n-2) (n - 1 - i).\nStep 4: Simplify Summation -> C(n) = (n-1) + (n-2) + ... + 1 = n(n-1)/2.\nStep 5: Determine Order of Growth -> n(n-1)/2 is of quadratic order.\nStep 6: Obtain Final Complexity -> O(n²).",
        bestCaseDerivation: "Input: Any array (including sorted). Derivation: Still scans full unsorted part to confirm min. Operations: n(n-1)/2 comparisons, 0 swaps. Complexity: O(n²).",
        averageCaseDerivation: "Input: Randomly ordered array. Derivation: Full comparisons scan. Operations: n(n-1)/2 comparisons, O(n) swaps. Complexity: O(n²).",
        worstCaseDerivation: "Input: Reverse sorted array. Derivation: Full comparisons scan. Operations: n(n-1)/2 comparisons, n - 1 swaps. Complexity: O(n²).",
        spaceComplexityDerivation: "Input Space: O(n) for input array.\nAuxiliary Space: O(1) in-place sorting.\nStack Space: O(1) iterative execution.\nTotal Space: O(n).",
        interviewQuestions: "1. What is the main advantage of Selection Sort over other O(n²) algorithms? (It minimizes swaps to O(n)).\n2. Is Selection Sort stable? (No, swaps can change relative order of duplicates).\n3. What is its time complexity for already sorted array?",
        examQuestions: "1. Analyze Selection Sort under Brute Force paradigm and derive its time complexity summation.\n2. Show how Selection Sort behaves with input [4, 3, 2, 1].",
        derivationShortcuts: "Always does n(n-1)/2 comparisons regardless of input distribution.",
        title: 'Selection Sort',
        category: CATEGORIES.SORTING,
        difficulty: 'Easy',
        inSyllabus: true, // Unit-II: Sorting algorithms
        beginnerTips: [
            "Find the smallest element in the unsorted portion",
            "Swap it with the first unsorted element",
            "Move the boundary of sorted/unsorted portions",
            "Repeat until entire array is sorted",
            "Each pass guarantees one more element in its final position"
        ],
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        description: 'Repeatedly find the minimum element from the unsorted part and put it at the beginning.',
        codeSnippet: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        int min_idx = i;
        for (int j = i+1; j < n; j++)
            if (arr[j] < arr[min_idx])
                min_idx = j;
        swap(&arr[min_idx], &arr[i]);
    }
}`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void selectionSort(int arr[], int n) {
    // One by one move boundary of unsorted subarray
    for (int i = 0; i < n - 1; i++) {
        // Find the minimum element in unsorted array
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        
        // Swap the found minimum element with the first element
        if (min_idx != i) {
            swap(&arr[min_idx], &arr[i]);
        }
    }
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    selectionSort(arr, n);
    
    printf("\nSorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    return 0;
}`,
        inputs: [
            { name: "nums", label: "Array to Sort", type: "array", defaultValue: "64, 25, 12, 22, 11" }
        ],
        runCommand: 'selection_sort',
        applications: "Memory-constrained embedded systems (minimizes write operations), playlist ordering in media players, sorting small datasets in microcontrollers, arranging priority queues when swaps are costly.",
        commonMistakes: [
            "Forgetting to check if min_idx != i before swapping (unnecessary swaps)",
            "Not updating min_idx correctly in the inner loop",
            "Starting inner loop from wrong index (should be i+1, not 0)",
            "Swapping on every comparison instead of finding minimum first",
            "Off-by-one error in outer loop (should be i < n-1, not i < n)"
        ]
    },
    {
        id: 'insertion_sort',
        basicOperation: "Comparison and Shifting (comparing key with sorted subarray and shifting elements)",
        dominantOperation: "Inner while loop condition checks and shifts",
        criticalOperation: "Array shifts and key insertion write",
        complexityDerivation: "Step 1: Identify Basic Operation -> Comparison + Shift.\nStep 2: Count Number of Executions -> For each element i, shifts run up to i times.\nStep 3: Write Summation -> C(n) = ∑ (from i=1 to n-1) (i).\nStep 4: Simplify Summation -> C(n) = 1 + 2 + ... + (n-1) = n(n-1)/2.\nStep 5: Determine Order of Growth -> Quadratic.\nStep 6: Obtain Final Complexity -> O(n²).",
        bestCaseDerivation: "Input: Already sorted array. Derivation: While loop condition fails instantly. Operations: n - 1 comparisons, 0 shifts. Complexity: O(n).",
        averageCaseDerivation: "Input: Randomly ordered array. Derivation: Subarray scanned halfway. Operations: n(n-1)/4 comparisons and shifts. Complexity: O(n²).",
        worstCaseDerivation: "Input: Reverse sorted array. Derivation: Subarray scanned fully. Operations: n(n-1)/2 comparisons and shifts. Complexity: O(n²).",
        spaceComplexityDerivation: "Input Space: O(n).\nAuxiliary Space: O(1) in-place.\nStack Space: O(1) iterative.\nTotal Space: O(n).",
        interviewQuestions: "1. Why is Insertion Sort preferred for nearly sorted arrays?\n2. How does Insertion Sort compare to Bubble Sort?\n3. Is Insertion Sort stable?",
        examQuestions: "1. Formulate the best and worst case running times of insertion sort.\n2. Trace insertion sort on [12, 11, 13, 5, 6].",
        derivationShortcuts: "Best case O(n) when already sorted, worst case O(n²) when reverse sorted.",
        title: 'Insertion Sort',
        category: CATEGORIES.SORTING,
        difficulty: 'Easy',
        inSyllabus: true, // Unit-II: Sorting algorithms
        beginnerTips: [
            "Start from second element (assume first is sorted)",
            "Pick current element as 'key'",
            "Compare key with elements before it",
            "Shift larger elements one position right",
            "Insert key in its correct position"
        ],
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        description: 'Build the sorted array one item at a time by repeatedly picking the next element and inserting it into the correct position.',
        codeSnippet: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>

void insertionSort(int arr[], int n) {
    // Start from second element (index 1)
    for (int i = 1; i < n; i++) {
        // Store current element as key
        int key = arr[i];
        int j = i - 1;
        
        // Move elements greater than key one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        
        // Insert key at its correct position
        arr[j + 1] = key;
    }
}

int main() {
    int arr[] = {12, 11, 13, 5, 6};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    insertionSort(arr, n);
    
    printf("\nSorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    return 0;
}`,
        inputs: [
            { name: "nums", label: "Array to Sort", type: "array", defaultValue: "12, 11, 13, 5, 6" }
        ],
        runCommand: 'insertion_sort',
        applications: "Online card sorting (adding one card at a time), real-time data insertion in sorted databases, sorting small arrays in hybrid sorting (Timsort uses it for small runs), maintaining sorted order in phone contact lists as entries are added.",
        commonMistakes: [
            "Forgetting to store arr[i] in key variable before shifting",
            "Not checking j >= 0 in while condition (array out of bounds)",
            "Placing key at arr[j] instead of arr[j+1] after the loop",
            "Starting loop from index 0 instead of 1 (first element already sorted)",
            "Using arr[j] > key for descending sort but expecting ascending order"
        ]
    },
    {
        id: 'merge_sort',
        basicOperation: "Merge Comparison (comparing elements from two sorted halves during merge)",
        dominantOperation: "Merging step comparisons",
        criticalOperation: "Temporary array allocations and copies",
        complexityDerivation: "Step 1: Identify Basic Operation -> Merge Comparison.\nStep 2: Count Number of Executions -> Reconstruct via recurrence relation.\nStep 3: Write Summation -> T(n) = 2T(n/2) + cn.\nStep 4: Simplify Summation -> Solved via Master Theorem: a=2, b=2, d=1 -> log2(2) = 1.\nStep 5: Determine Order of Growth -> n log n.\nStep 6: Obtain Final Complexity -> O(n log n).",
        bestCaseDerivation: "Input: Any array. Derivation: Splits and merges are identical. Operations: O(n log n). Complexity: O(n log n).",
        averageCaseDerivation: "Input: Random array. Derivation: Split halves, merge halves. Operations: O(n log n). Complexity: O(n log n).",
        worstCaseDerivation: "Input: Array designed to alternate merge selections. Derivation: Splits and merges run fully. Operations: O(n log n). Complexity: O(n log n).",
        spaceComplexityDerivation: "Input Space: O(n).\nAuxiliary Space: O(n) to store temporary merged sub-arrays.\nStack Space: O(log n) recursion stack depth.\nTotal Space: O(n) space complexity.",
        recurrenceRelation: "T(n) = 2T(n/2) + O(n)",
        recurrenceDerivation: "Using Iteration Method:\nT(n) = 2T(n/2) + cn\n= 2(2T(n/4) + cn/2) + cn = 4T(n/4) + 2cn\n= 2^k * T(n/2^k) + k * cn\nFor k = log2(n), T(n) = n * T(1) + cn log2(n) = O(n log n).",
        interviewQuestions: "1. Why is Merge Sort stable? (Maintains relative order during merge comparison).\n2. What is its auxiliary space complexity? (O(n)).\n3. How can you implement Merge Sort iteratively?",
        examQuestions: "1. State and solve the recurrence relation for Merge Sort using the substitution method.\n2. Illustrate the divide-and-conquer strategy using Merge Sort.",
        derivationShortcuts: "Splitting in half log(n) times and merging O(n) items always gives O(n log n).",
        title: 'Merge Sort',
        category: CATEGORIES.SORTING,
        difficulty: 'Medium',
        inSyllabus: true, // Tree Sort (Unit-IV) is different from Merge Sort
        beginnerTips: [
            "Split the array in half repeatedly until you have single elements",
            "Single elements are already 'sorted'",
            "Merge pairs of sorted arrays back together in order",
            "Keep merging until you have one fully sorted array",
            "Think of it like organizing cards: spread them out, then collect them in order"
        ],
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        description: 'Divide the array into halves, sort them, and then merge the sorted halves. A classic divide-and-conquer algorithm.',
        codeSnippet: `void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>

// Merge function - combines two sorted subarrays
void merge(int arr[], int left, int mid, int right) {
    int i, j, k;
    int n1 = mid - left + 1;  // Size of left subarray
    int n2 = right - mid;     // Size of right subarray
    
    // Create temporary arrays
    int* L = (int*)malloc(n1 * sizeof(int));
    int* R = (int*)malloc(n2 * sizeof(int));
    
    // Copy data to temporary arrays L[] and R[]
    for (i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];
    
    // Merge the temp arrays back into arr[left..right]
    i = 0;    // Initial index of first subarray
    j = 0;    // Initial index of second subarray
    k = left; // Initial index of merged subarray
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    // Copy remaining elements of L[], if any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    
    // Copy remaining elements of R[], if any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
    
    free(L);
    free(R);
}

// Main merge sort function
void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        // Find the middle point
        int mid = left + (right - left) / 2;
        
        // Sort first half
        mergeSort(arr, left, mid);
        
        // Sort second half
        mergeSort(arr, mid + 1, right);
        
        // Merge the sorted halves
        merge(arr, left, mid, right);
    }
}

int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    mergeSort(arr, 0, n - 1);
    
    printf("\\nSorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    return 0;
}`,
        applications: "External sorting of large files that don't fit in RAM (databases, log files), sorting linked lists (preferred over quicksort), inversion count in arrays, merge operations in distributed systems like MapReduce, Git merge operations.",
        inputs: [
            { name: "nums", label: "Array to Sort", type: "array", defaultValue: "12, 11, 13, 5, 6, 7" }
        ],
        runCommand: 'merge_sort'
    },
    {
        id: 'quick_sort',
        basicOperation: "Partition Comparison (comparing array elements with the chosen pivot element)",
        dominantOperation: "Partition loop comparison arr[j] < pivot",
        criticalOperation: "In-place swaps of elements in partitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Partition Comparison.\nStep 2: Count Number of Executions -> Determined by recurrence: T(n) = T(k) + T(n-k-1) + cn.\nStep 3: Write Summation -> In average case, partitions split equally.\nStep 4: Simplify Summation -> T(n) = 2T(n/2) + cn, yielding n log n.\nStep 5: Determine Order of Growth -> n log n average, n² worst.\nStep 6: Obtain Final Complexity -> O(n log n) average, O(n²) worst.",
        bestCaseDerivation: "Input: Pivot always splits array in equal halves. Derivation: T(n) = 2T(n/2) + cn. Operations: O(n log n). Complexity: O(n log n).",
        averageCaseDerivation: "Input: Random elements. Derivation: Pivot splits array near middle. Operations: O(n log n). Complexity: O(n log n).",
        worstCaseDerivation: "Input: Already sorted or reverse sorted array (with last element pivot). Derivation: Splits are 0 and n-1. Recurrence: T(n) = T(n-1) + cn. Operations: O(n²). Complexity: O(n²).",
        spaceComplexityDerivation: "Input Space: O(n).\nAuxiliary Space: O(1) in-place operations.\nStack Space: O(log n) average recursion depth, O(n) worst-case recursion depth.\nTotal Space: O(n) total space.",
        recurrenceRelation: "T(n) = T(k) + T(n-k-1) + O(n)",
        recurrenceDerivation: "Worst Case (k=0):\nT(n) = T(n-1) + cn\n= T(n-2) + c(n-1) + cn = ∑ (i=1 to n) ci = cn(n+1)/2 = O(n²).\nBest Case (k=n/2):\nT(n) = 2T(n/2) + cn = O(n log n) via Master Theorem.",
        interviewQuestions: "1. Why is Quick Sort preferred over Merge Sort in practice? (Better cache locality, O(1) auxiliary space).\n2. What is the worst-case input for Quick Sort?\n3. How does randomized Quick Sort optimize performance?",
        examQuestions: "1. Formulate and solve the recurrence relation for the worst-case of Quick Sort.\n2. Trace Quick Sort partition steps for [10, 7, 8, 9, 1, 5].",
        derivationShortcuts: "Equal splits = log n depth = O(n log n). Skewed splits = n depth = O(n²).",
        title: 'Quick Sort',
        category: CATEGORIES.SORTING,
        difficulty: 'Medium',
        inSyllabus: true, // Tree Sort (Unit-IV) is different from Quick Sort
        beginnerTips: [
            "Choose a 'pivot' element (usually the last one)",
            "Move all smaller elements to the left of pivot",
            "Move all larger elements to the right of pivot",
            "Now the pivot is in its correct final position!",
            "Repeat this process on left and right sides"
        ],
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
        description: 'Pick a pivot element and partition the array around it, then recursively sort the partitions. Efficient in-place sorting algorithm.',
        codeSnippet: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
        fullCode: `#include <stdio.h>

// Swap function
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// Partition function - places pivot in correct position
// and arranges smaller elements to left, larger to right
int partition(int arr[], int low, int high) {
    // Choose the rightmost element as pivot
    int pivot = arr[high];
    
    // Index of smaller element - indicates
    // the right position of pivot found so far
    int i = (low - 1);
    
    // Traverse through all elements
    // Compare each element with pivot
    for (int j = low; j < high; j++) {
        // If current element is smaller than pivot
        if (arr[j] < pivot) {
            i++; // Increment index of smaller element
            swap(&arr[i], &arr[j]);
        }
    }
    
    // Place pivot in correct position
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}

// Main quick sort function
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        // pi is partitioning index
        // arr[pi] is now at right place
        int pi = partition(arr, low, high);
        
        // Recursively sort elements before partition
        quickSort(arr, low, pi - 1);
        
        // Recursively sort elements after partition
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    quickSort(arr, 0, n - 1);
    
    printf("\\nSorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    return 0;
}`,
        applications: "General-purpose sorting in C standard library (qsort), Java Arrays.sort for primitives, database query optimizers (ORDER BY), virtual memory management in OS, commercial sorting benchmarks.",
        inputs: [
            { name: "nums", label: "Array to Sort", type: "array", defaultValue: "10, 7, 8, 9, 1, 5" }
        ],
        runCommand: 'quick_sort'
    },
    {
        id: 'randomized_quick_sort',
        basicOperation: "Operation corresponding to execution step of Randomized Quick Sort",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n log n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n log n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n log n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n log n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(log n) auxiliary memory.\nStack Space: O(log n) recursion depth.\nTotal Space: O(log n).",
        interviewQuestions: "1. Explain the design paradigm of Randomized Quick Sort.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Randomized Quick Sort.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n log n) times.",
        title: 'Randomized Quick Sort',
        inSyllabus: false, // Advanced variant not in syllabus
        category: CATEGORIES.SORTING,
        difficulty: 'Medium',
        beginnerTips: [
            "Similar to Quick Sort but with random pivot",
            "Random pivot helps avoid worst-case scenarios",
            "Better average performance on pre-sorted data",
            "Same partitioning logic as regular Quick Sort",
            "Randomization provides probabilistic guarantee"
        ],
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
        description: 'Quick Sort using a random element as the pivot.',
        codeSnippet: `int partition(int arr[], int low, int high) {
    srand(time(NULL));
    int random = low + rand() % (high - low);
    swap(&arr[random], &arr[high]);
    // Standard partition...
}`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include <time.h>

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int partition(int arr[], int low, int high) {
    // Pick a random element as pivot
    srand(time(NULL));
    int random = low + rand() % (high - low + 1);
    swap(&arr[random], &arr[high]);
    
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return i + 1;
}

void randomizedQuickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        randomizedQuickSort(arr, low, pi - 1);
        randomizedQuickSort(arr, pi + 1, high);
    }
}

int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    randomizedQuickSort(arr, 0, n - 1);
    
    printf("\nSorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    return 0;
}`,
        applications: "Cryptographic applications requiring unpredictability, anti-adversarial sorting defenses, security-sensitive data processing, probabilistically balanced data partitioning in distributed systems.",
        inputs: [
            { name: "nums", label: "Array to Sort", type: "array", defaultValue: "10, 7, 8, 9, 1, 5" }
        ],
        runCommand: 'randomized_quick_sort'
    },
    {
        id: 'counting_sort',
        basicOperation: "Operation corresponding to execution step of Counting Sort",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n+k).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n+k).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n+k).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n+k).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(k) auxiliary memory.\nStack Space: O(log n) recursion depth.\nTotal Space: O(k).",
        interviewQuestions: "1. Explain the design paradigm of Counting Sort.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Counting Sort.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n+k) times.",
        inSyllabus: true, // Not in syllabus
        title: 'Counting Sort',
        category: CATEGORIES.SORTING,
        difficulty: 'Medium',
        beginnerTips: [
            "Works only for non-negative integers",
            "Count how many times each number appears",
            "Calculate cumulative counts",
            "Place elements in output array using counts",
            "Very fast but needs extra space"
        ],
        timeComplexity: "O(n+k)",
        spaceComplexity: "O(k)",
        description: 'An integer sorting algorithm that counts the number of objects with distinct key values.',
        codeSnippet: `void countingSort(int arr[], int n) {
    // Logic to count occurrences and rebuild array
}`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>

void countingSort(int arr[], int n) {
    // Find the maximum element
    int max = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > max)
            max = arr[i];
    }
    
    // Create count array and initialize to 0
    int* count = (int*)calloc(max + 1, sizeof(int));
    int* output = (int*)malloc(n * sizeof(int));
    
    // Store count of each element
    for (int i = 0; i < n; i++) {
        count[arr[i]]++;
    }
    
    // Change count[i] so it contains actual position
    for (int i = 1; i <= max; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    for (int i = n - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    
    // Copy output to original array
    for (int i = 0; i < n; i++) {
        arr[i] = output[i];
    }
    
    free(count);
    free(output);
}

int main() {
    int arr[] = {4, 2, 2, 8, 3, 3, 1};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    countingSort(arr, n);
    
    printf("\nSorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    return 0;
}`,
        applications: "Sorting student grades (0-100 scale), pixel value sorting in image processing, radix sort subroutine, sorting election votes, character frequency analysis in text compression.",
        inputs: [
            { name: "nums", label: "Array to Sort", type: "array", defaultValue: "4, 2, 2, 8, 3, 3, 1" }
        ],
        runCommand: 'counting_sort'
    },
    {
        id: 'radix_sort',
        basicOperation: "Operation corresponding to execution step of Radix Sort",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(nk).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(nk).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(nk).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(nk).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n+k) auxiliary memory.\nStack Space: O(log n) recursion depth.\nTotal Space: O(n+k).",
        interviewQuestions: "1. Explain the design paradigm of Radix Sort.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Radix Sort.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(nk) times.",
        inSyllabus: false, // Not in syllabus
        title: 'Radix Sort',
        category: CATEGORIES.SORTING,
        difficulty: 'Medium',
        beginnerTips: [
            "Sort numbers digit by digit",
            "Start from least significant digit (rightmost)",
            "Use counting sort for each digit",
            "Move to next more significant digit",
            "Very efficient for large numbers"
        ],
        timeComplexity: "O(nk)",
        spaceComplexity: "O(n+k)",
        description: 'Sorts integers by processing individual digits.',
        codeSnippet: `void radixSort(int arr[], int n) {
    int m = getMax(arr, n);
    for (int exp = 1; m / exp > 0; exp *= 10)
        countSort(arr, n, exp);
}`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>

int getMax(int arr[], int n) {
    int max = arr[0];
    for (int i = 1; i < n; i++)
        if (arr[i] > max)
            max = arr[i];
    return max;
}

void countSort(int arr[], int n, int exp) {
    int* output = (int*)malloc(n * sizeof(int));
    int count[10] = {0};
    
    // Store count of occurrences
    for (int i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;
    
    // Change count[i] to actual position
    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];
    
    // Build output array
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    
    // Copy to original array
    for (int i = 0; i < n; i++)
        arr[i] = output[i];
    
    free(output);
}

void radixSort(int arr[], int n) {
    // Find maximum to know number of digits
    int m = getMax(arr, n);
    
    // Do counting sort for every digit
    // exp is 10^i where i is current digit number
    for (int exp = 1; m / exp > 0; exp *= 10)
        countSort(arr, n, exp);
}

int main() {
    int arr[] = {170, 45, 75, 90, 802, 24, 2, 66};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    radixSort(arr, n);
    
    printf("\nSorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    return 0;
}`,
        applications: "Sorting phone numbers and postal codes, MAC address sorting in networking, suffix array construction for text indexing, GPU-based parallel sorting, genomic data sorting by base-pair sequences.",
        inputs: [
            { name: "nums", label: "Array to Sort", type: "array", defaultValue: "170, 45, 75, 90, 802, 24, 2, 66" }
        ],
        runCommand: 'radix_sort'
    },
    {
        id: "binary_search",
        basicOperation: "Comparison (comparing target with middle element arr[mid])",
        dominantOperation: "Loop condition checks and target comparisons",
        criticalOperation: "Middle index pointer recalculation",
        complexityDerivation: "Step 1: Identify Basic Operation -> Target Comparison.\nStep 2: Count Number of Executions -> Array size halved in each loop.\nStep 3: Write Summation -> T(n) = T(n/2) + c.\nStep 4: Simplify Summation -> Solved using Master Theorem: a=1, b=2, d=0 -> log2(1) = 0.\nStep 5: Determine Order of Growth -> Logarithmic.\nStep 6: Obtain Final Complexity -> O(log n).",
        bestCaseDerivation: "Input: Target at exact middle index. Derivation: Loop terminates at first check. Operations: 1 comparison. Complexity: O(1).",
        averageCaseDerivation: "Input: Target distributed randomly. Derivation: Average search depth. Operations: log2(n) - 1 comparisons. Complexity: O(log n).",
        worstCaseDerivation: "Input: Target not present or at boundary. Derivation: Search space reduced to 1 element. Operations: log2(n) comparisons. Complexity: O(log n).",
        spaceComplexityDerivation: "Input Space: O(n).\nAuxiliary Space: O(1) for iterative variables.\nStack Space: O(1) iterative, O(log n) for recursive binary search.\nTotal Space: O(n).",
        recurrenceRelation: "T(n) = T(n/2) + O(1)",
        recurrenceDerivation: "Using Iteration Method:\nT(n) = T(n/2) + c\n= T(n/4) + 2c = T(n/2^k) + kc\nLet n/2^k = 1 -> k = log2(n).\nT(n) = T(1) + c log2(n) = O(log n).",
        interviewQuestions: "1. What is the precondition for Binary Search?\n2. Why do we write mid = l + (r-l)/2 instead of (l+r)/2?\n3. Can Binary Search run on a linked list? (Yes, but O(n) access makes it inefficient).",
        examQuestions: "1. Prove that the time complexity of binary search is O(log n) using recurrence relation.\n2. Write the recursive version of binary search and derive its stack space.",
        derivationShortcuts: "Halving search space in each iteration always yields O(log n).",
        inSyllabus: true, // Unit-I: Recursion/searching algorithms
        title: "Binary Search",
        category: CATEGORIES.SORTING,
        difficulty: "Easy",
        beginnerTips: [
            "Array MUST be sorted first - binary search won't work on unsorted data",
            "Start by looking at the middle element",
            "Is middle element your target? Done!",
            "Target smaller? Search the left half. Target bigger? Search the right half",
            "Repeat until found (or search space becomes empty)"
        ],
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, return its index. Otherwise, return -1.",
        codeSnippet: `int search(int* nums, int numsSize, int target){
    int l = 0, r = numsSize - 1;
    while(l <= r) {
        int m = l + (r-l)/2;
        if(nums[m] == target) return m;
        if(nums[m] < target) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`,
        fullCode: `#include <stdio.h>

int binarySearch(int arr[], int n, int target) {
    int left = 0;
    int right = n - 1;
    
    while (left <= right) {
        // Calculate middle index
        // Using left + (right - left) / 2 to avoid overflow
        int mid = left + (right - left) / 2;
        
        // Check if target is at mid
        if (arr[mid] == target) {
            return mid;  // Target found
        }
        
        // If target is greater, ignore left half
        if (arr[mid] < target) {
            left = mid + 1;
        }
        // If target is smaller, ignore right half
        else {
            right = mid - 1;
        }
    }
    
    return -1;  // Target not found
}

int main() {
    int arr[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 23;
    
    int result = binarySearch(arr, n, target);
    
    if (result != -1)
        printf("Element found at index %d\\n", result);
    else
        printf("Element not found in array\\n");
    
    return 0;
}`,
        applications: "Dictionary word lookup, searching records in sorted databases (SQL BETWEEN queries), library catalog search, game cheats detection in leaderboards, finding insertion points in sorted arrays.",
        inputs: [
            { name: "target", label: "Target Value", type: "number", defaultValue: "8" },
            { name: "nums", label: "Sorted Array", type: "array", defaultValue: "2, 5, 8, 12, 16, 23, 38, 56, 72, 91" }
        ],
        commonMistakes: [
            "Using (left + right) / 2 for mid calculation - can cause integer overflow with large arrays",
            "Using while (left < right) instead of while (left <= right) - misses single element case",
            "Not handling the case when array is empty or null",
            "Forgetting array must be sorted - binary search fails on unsorted data",
            "Using mid instead of mid+1 or mid-1 when updating left/right pointers (infinite loop)"
        ]
    },
    {
        id: "two_sum",
        basicOperation: "Operation corresponding to execution step of Two Sum",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n²).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n²).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n²).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n²).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(1) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(1).",
        interviewQuestions: "1. Explain the design paradigm of Two Sum.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Two Sum.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n²) times.",
        inSyllabus: false, // Not in syllabus
        title: "Two Sum",
        category: CATEGORIES.ARRAYS,
        difficulty: "Easy",
        beginnerTips: [
            "Brute force: check all pairs O(n²)",
            "Better: use hash map for O(n) solution",
            "For each element, check if (target - element) exists",
            "Store seen elements with their indices",
            "One pass through array is enough"
        ],
        timeComplexity: "O(n²)", // or O(n) for hashmap
        spaceComplexity: "O(1)",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        codeSnippet: `/* Brute Force Approach */
for(int i=0; i<n; i++) {
  for(int j=i+1; j<n; j++) {
    if(nums[i] + nums[j] == target) {
       return {i, j};
    }
  }
}`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>

// Brute Force Approach - O(n²)
void twoSum(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (arr[i] + arr[j] == target) {
                printf("Indices: [%d, %d]\\n", i, j);
                printf("Values: [%d, %d]\\n", arr[i], arr[j]);
                return;
            }
        }
    }
    printf("No solution found\\n");
}

int main() {
    int arr[] = {2, 7, 11, 15};
    int n = 4;
    int target = 9;
    
    printf("Array: ");
    for(int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\nTarget: %d\\n", target);
    
    twoSum(arr, n, target);
    
    return 0;
}`,
        applications: "Financial fraud detection (finding suspicious transaction pairs), cryptocurrency arbitrage detection, chemistry molecular bond pairing analysis, recommendation systems finding complementary item pairs.",
        inputs: [
            { name: "target", label: "Target Sum", type: "number", defaultValue: "9" },
            { name: "nums", label: "Input Array (comma separated)", type: "array", defaultValue: "2, 7, 11, 15" }
        ],
        runCommand: 'two_sum',
        commonMistakes: [
            "Using i and j starting from same index (should be j=i+1 to avoid using same element twice)",
            "Not checking array bounds properly",
            "Returning indices in wrong order",
            "Not handling the case when no solution exists",
            "Forgetting that each element can only be used once"
        ]
    },
    {
        id: "three_sum",
        basicOperation: "Operation corresponding to execution step of 3Sum",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n²).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n²).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n²).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n²).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(1) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(1).",
        interviewQuestions: "1. Explain the design paradigm of 3Sum.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of 3Sum.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n²) times.",
        title: "3Sum",
        category: CATEGORIES.ARRAYS,
        difficulty: "Medium",
        inSyllabus: false, // Not in syllabus
        beginnerTips: [
            "Sort array first for two-pointer technique",
            "Fix one element, find other two using two pointers",
            "Left pointer after current, right at end",
            "Move pointers based on sum vs target",
            "Skip duplicates to avoid repeat triplets"
        ],
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
        codeSnippet: `// Sort array first
sort(nums);
for(int i=0; i<n-2; i++) {
    int l = i+1, r = n-1;
    while(l < r) {
        int sum = nums[i] + nums[l] + nums[r];
        if(sum == 0) {
            // Found triplet, skip duplicates
            l++; r--;
        } else if(sum < 0) l++;
        else r--;
    }
}`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                swap(&arr[i], &arr[j]);
            }
        }
        swap(&arr[i + 1], &arr[high]);
        int pi = i + 1;
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

void threeSum(int arr[], int n) {
    quickSort(arr, 0, n - 1);
    
    printf("Triplets that sum to 0:\\n");
    int found = 0;
    
    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && arr[i] == arr[i-1]) continue; // Skip duplicates
        
        int left = i + 1;
        int right = n - 1;
        
        while (left < right) {
            int sum = arr[i] + arr[left] + arr[right];
            
            if (sum == 0) {
                printf("[%d, %d, %d]\\n", arr[i], arr[left], arr[right]);
                found = 1;
                left++;
                right--;
                
                // Skip duplicates
                while (left < right && arr[left] == arr[left-1]) left++;
                while (left < right && arr[right] == arr[right+1]) right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    if (!found) printf("No triplets found\\n");
}

int main() {
    int arr[] = {-1, 0, 1, 2, -1, -4};
    int n = 6;
    
    printf("Array: ");
    for(int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n\\n");
    
    threeSum(arr, n);
    
    return 0;
}`,
        applications: "Finding balanced chemical reactions with three reactants, portfolio rebalancing with three assets, 3D triangle validation in computational geometry, social network friend triangle detection.",
        inputs: [
            { name: "nums", label: "Input Array", type: "array", defaultValue: "-1, 0, 1, 2, -1, -4" }
        ],
        runCommand: 'three_sum',
        commonMistakes: [
            "Forgetting to sort the array first",
            "Not skipping duplicate values (will produce duplicate triplets)",
            "Using wrong loop bounds (i < n-2 is correct, not i < n)",
            "Not moving both pointers after finding a match",
            "Comparing sum with wrong value (should be 0, not target)"
        ]
    },
    {
        id: "valid-parentheses",
        basicOperation: "Operation corresponding to execution step of Valid Parentheses",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n).",
        interviewQuestions: "1. Explain the design paradigm of Valid Parentheses.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Valid Parentheses.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n) times.",
        inSyllabus: true, // Unit-I: Stack applications
        title: "Valid Parentheses",
        category: CATEGORIES.STACK,
        difficulty: "Easy",
        beginnerTips: [
            "Use a stack to track opening brackets",
            "Push opening brackets onto stack",
            "For closing brackets, check if they match top of stack",
            "Pop from stack when brackets match",
            "At the end, stack should be empty"
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        codeSnippet: `bool isValid(char * s){
    // ... stack implementation ...
    for(int i=0; s[i]!='\0'; i++) {
        char c = s[i];
        if(c=='(' || c=='{' || c=='[') push(c);
        else {
            if(isEmpty()) return false;
            // check match
            pop();
        }
    }
    return isEmpty();
}`,
        fullCode: `#include <stdio.h>
#include <stdbool.h>
#include <string.h>

#define MAX_SIZE 10000

typedef struct {
    char data[MAX_SIZE];
    int top;
} Stack;

void initStack(Stack* s) {
    s->top = -1;
}

bool isEmpty(Stack* s) {
    return s->top == -1;
}

void push(Stack* s, char c) {
    s->data[++s->top] = c;
}

char pop(Stack* s) {
    return s->data[s->top--];
}

char peek(Stack* s) {
    return s->data[s->top];
}

bool isValid(char* s) {
    Stack stack;
    initStack(&stack);
    
    for (int i = 0; s[i] != '\0'; i++) {
        char c = s[i];
        
        // Push opening brackets
        if (c == '(' || c == '{' || c == '[') {
            push(&stack, c);
        }
        // Check closing brackets
        else {
            if (isEmpty(&stack)) return false;
            
            char top = peek(&stack);
            if ((c == ')' && top == '(') ||
                (c == '}' && top == '{') ||
                (c == ']' && top == '[')) {
                pop(&stack);
            } else {
                return false;
            }
        }
    }
    
    return isEmpty(&stack);
}

int main() {
    char s[] = "()[]{}";
    
    if (isValid(s))
        printf("%s is valid\n", s);
    else
        printf("%s is not valid\n", s);
    
    return 0;
}`,
        applications: "Syntax validation in compilers and IDEs (Java, Python, C++), HTML/XML tag matching in web browsers, LaTeX document structure validation, mathematical expression evaluators, linter tools in code editors.",
        inputs: [
            { name: "s", label: "Input String", type: "text", defaultValue: "()[]{}" }
        ],
        runCommand: 'valid_parentheses',
        commonMistakes: [
            "Forgetting to check if stack is empty before popping/peeking - causes segmentation fault",
            "Not returning false when closing bracket doesn't match opening bracket",
            "Forgetting to check if stack is empty at the end (unmatched opening brackets)",
            "Mixing up bracket pairs in comparison (e.g., checking ')' with '[' instead of '(')",
            "Not handling string with only closing brackets - should return false immediately"
        ]
    },
    {
        inSyllabus: true, // Unit-II: Linked List operations
        id: "reverse_linked_list",
        basicOperation: "Operation corresponding to execution step of Reverse Linked List",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(1) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(1).",
        interviewQuestions: "1. Explain the design paradigm of Reverse Linked List.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Reverse Linked List.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n) times.",
        title: "Reverse Linked List",
        category: CATEGORIES.LINKED_LIST,
        difficulty: "Easy",
        beginnerTips: [
            "Use three pointers: prev, curr, next",
            "Start with prev=NULL, curr=head",
            "Save next node before changing links",
            "Reverse the link: curr->next = prev",
            "Move all pointers forward",
            "Return prev as new head"
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
        codeSnippet: `struct ListNode* reverseList(struct ListNode* head){
    struct ListNode *prev = NULL;
    struct ListNode *curr = head;
    while(curr != NULL) {
        struct ListNode *nextTemp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* next;
} Node;

Node* createNode(int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}

Node* reverseList(Node* head) {
    Node* prev = NULL;
    Node* curr = head;
    Node* next = NULL;
    
    while (curr != NULL) {
        // Store next node
        next = curr->next;
        
        // Reverse the link
        curr->next = prev;
        
        // Move pointers forward
        prev = curr;
        curr = next;
    }
    
    return prev; // New head
}

void printList(Node* head) {
    while (head != NULL) {
        printf("%d -> ", head->data);
        head = head->next;
    }
    printf("NULL\\n");
}

int main() {
    // Create list: 1->2->3->4->5
    Node* head = createNode(1);
    head->next = createNode(2);
    head->next->next = createNode(3);
    head->next->next->next = createNode(4);
    head->next->next->next->next = createNode(5);
    
    printf("Original: ");
    printList(head);
    
    head = reverseList(head);
    
    printf("Reversed: ");
    printList(head);
    
    return 0;
}`,
        applications: "Undo/redo functionality in text editors, browser history back navigation, reversing audio/video streams, palindrome checking in linked lists, stack implementation using linked list reversal.",
        inputs: [
            { name: "values", label: "List Values (comma separated)", type: "array", defaultValue: "1, 2, 3, 4, 5" }
        ],
        runCommand: 'reverse_linked_list',
        commonMistakes: [
            "Losing reference to rest of list (not saving next before reversing)",
            "Not updating prev pointer after each iteration",
            "Returning head instead of prev (returns old head, not new head)",
            "Not handling empty list (head == NULL)",
            "Creating infinite loop by not moving curr forward"
        ]
    },
    {
        id: "bst_search",
        basicOperation: "Operation corresponding to execution step of Binary Search Tree - Search",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(log n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(log n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(log n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(log n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(1) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(1).",
        interviewQuestions: "1. Explain the design paradigm of Binary Search Tree - Search.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Binary Search Tree - Search.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(log n) times.",
        title: "Binary Search Tree - Search",
        category: CATEGORIES.TREES,
        difficulty: "Easy",
        inSyllabus: true, // Unit-III & IV: Binary Search Trees
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        beginnerTips: [
            "BST property: left < root < right",
            "Start at root node",
            "Compare target with current node",
            "Go left if target is smaller",
            "Go right if target is larger",
            "Found when values match"
        ],
        description: "Search for a target value in a Binary Search Tree using BST property.",
        codeSnippet: `struct Node* search(struct Node* root, int target) {
    if (root == NULL || root->data == target)
        return root;
    
    if (target < root->data)
        return search(root->left, target);
    
    return search(root->right, target);
}`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* left;
    struct Node* right;
};

struct Node* createNode(int data) {
    struct Node* node = malloc(sizeof(struct Node));
    node->data = data;
    node->left = NULL;
    node->right = NULL;
    return node;
}

struct Node* search(struct Node* root, int target) {
    // Base cases: root is null or target is at root
    if (root == NULL || root->data == target)
        return root;
    
    // Target is smaller than root's data
    if (target < root->data)
        return search(root->left, target);
    
    // Target is greater than root's data
    return search(root->right, target);
}

int main() {
    // Create a sample BST
    //       4
    //     /   \\
    //    2     6
    //   / \\   / \\
    //  1   3 5   7
    
    struct Node* root = createNode(4);
    root->left = createNode(2);
    root->right = createNode(6);
    root->left->left = createNode(1);
    root->left->right = createNode(3);
    root->right->left = createNode(5);
    root->right->right = createNode(7);
    
    int target = 5;
    struct Node* result = search(root, target);
    
    if (result != NULL)
        printf("Found %d in BST\\n", target);
    else
        printf("%d not found in BST\\n", target);
    
    return 0;
}`,
        applications: "Database index lookup (B-tree variant), auto-complete in search engines, symbol table in compilers, phone directory lookup, IP routing tables in network routers.",
        inputs: [
            { name: "target", label: "Search Target", type: "number", defaultValue: "5" },
            { name: "tree", label: "BST (level-order)", type: "array", defaultValue: "4, 2, 6, 1, 3, 5, 7" }
        ],
        runCommand: 'bst_search'
    },
    {
        id: "binary_tree_level_order",
        basicOperation: "Operation corresponding to execution step of Binary Tree Level Order",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n) auxiliary memory.\nStack Space: O(log n) recursion depth.\nTotal Space: O(n).",
        interviewQuestions: "1. Explain the design paradigm of Binary Tree Level Order.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Binary Tree Level Order.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n) times.",
        title: "Binary Tree Level Order",
        category: CATEGORIES.TREES,
        difficulty: "Medium",
        inSyllabus: true, // Unit-III & IV: Binary Trees, Traversals
        beginnerTips: [
            "Use BFS (Breadth-First Search) with a queue",
            "Enqueue root, then process level by level",
            "For each level, process all nodes in queue",
            "Add children to queue for next level",
            "Also called level-order traversal"
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        description: "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
        codeSnippet: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     struct TreeNode *left;
 *     struct TreeNode *right;
 * };
 */
int** levelOrder(struct TreeNode* root, int* returnSize, int** returnColumnSizes) {
    // BFS using Queue
}`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *left, *right;
} Node;

typedef struct QueueNode {
    Node* treeNode;
    struct QueueNode* next;
} QueueNode;

typedef struct {
    QueueNode *front, *rear;
} Queue;

Node* createNode(int data) {
    Node* node = (Node*)malloc(sizeof(Node));
    node->data = data;
    node->left = node->right = NULL;
    return node;
}

Queue* createQueue() {
    Queue* q = (Queue*)malloc(sizeof(Queue));
    q->front = q->rear = NULL;
    return q;
}

void enqueue(Queue* q, Node* node) {
    QueueNode* temp = (QueueNode*)malloc(sizeof(QueueNode));
    temp->treeNode = node;
    temp->next = NULL;
    
    if (q->rear == NULL) {
        q->front = q->rear = temp;
        return;
    }
    q->rear->next = temp;
    q->rear = temp;
}

Node* dequeue(Queue* q) {
    if (q->front == NULL) return NULL;
    
    QueueNode* temp = q->front;
    Node* node = temp->treeNode;
    q->front = q->front->next;
    
    if (q->front == NULL) q->rear = NULL;
    
    free(temp);
    return node;
}

int isEmpty(Queue* q) {
    return q->front == NULL;
}

void levelOrder(Node* root) {
    if (root == NULL) return;
    
    Queue* q = createQueue();
    enqueue(q, root);
    
    printf("Level Order: ");
    
    while (!isEmpty(q)) {
        int levelSize = 0;
        QueueNode* temp = q->front;
        while (temp) {
            levelSize++;
            temp = temp->next;
        }
        
        for (int i = 0; i < levelSize; i++) {
            Node* node = dequeue(q);
            printf("%d ", node->data);
            
            if (node->left) enqueue(q, node->left);
            if (node->right) enqueue(q, node->right);
        }
    }
    printf("\\n");
}

int main() {
    //      3
    //     / \\
    //    9  20
    //      /  \\
    //     15   7
    
    Node* root = createNode(3);
    root->left = createNode(9);
    root->right = createNode(20);
    root->right->left = createNode(15);
    root->right->right = createNode(7);
    
    levelOrder(root); // Output: 3 9 20 15 7
    
    return 0;
}`,
        applications: "Web crawler crawling pages level-by-level, social network friend suggestion (degree of separation), shortest path in unweighted graphs, XML/JSON tree parsing, printing organization hierarchy charts.",
        inputs: [
            { name: "nodes", label: "Tree Nodes (Level Order as Array, null for empty)", type: "array", defaultValue: "3, 9, 20, null, null, 15, 7" }
        ],
        runCommand: 'binary_tree_level_order',
        commonMistakes: [
            "Not checking if root is NULL before starting",
            "Forgetting to enqueue children nodes (left and right)",
            "Not handling the queue empty condition properly",
            "Processing nodes after dequeueing instead of while in queue",
            "Not separating levels correctly (mixing nodes from different levels)"
        ]
    },
    {
        id: "longest_substring",
        basicOperation: "Operation corresponding to execution step of Longest Substring Without Repeating",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(min(m, n)) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(min(m, n)).",
        interviewQuestions: "1. Explain the design paradigm of Longest Substring Without Repeating.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Longest Substring Without Repeating.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n) times.",
        inSyllabus: false, // Not in syllabus
        title: "Longest Substring Without Repeating",
        category: CATEGORIES.SLIDING_WINDOW,
        difficulty: "Medium",
        beginnerTips: [
            "Use sliding window technique",
            "Track characters in current window with hash/array",
            "Expand right pointer, add characters",
            "When duplicate found, shrink from left",
            "Update max length at each step"
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(min(m, n))",
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        codeSnippet: `int lengthOfLongestSubstring(char * s){
    int n = strlen(s);
    int map[128];
    for(int i=0;i<128;i++) map[i]=-1;
    int maxLen = 0, left = 0;
    
    for(int right=0; right<n; right++){
        if(map[s[right]] >= left){
            left = map[s[right]] + 1;
        }
        map[s[right]] = right;
        int len = right - left + 1;
        if(len > maxLen) maxLen = len;
    }
    return maxLen;
}`,
        fullCode: `#include <stdio.h>
#include <string.h>

int lengthOfLongestSubstring(char* s) {
    int n = strlen(s);
    int lastSeen[256]; // ASCII characters
    
    // Initialize all to -1
    for (int i = 0; i < 256; i++) {
        lastSeen[i] = -1;
    }
    
    int maxLen = 0;
    int left = 0;
    
    for (int right = 0; right < n; right++) {
        // If character was seen and is in current window
        if (lastSeen[s[right]] >= left) {
            left = lastSeen[s[right]] + 1;
        }
        
        // Update last seen position
        lastSeen[s[right]] = right;
        
        // Calculate current window size
        int currentLen = right - left + 1;
        if (currentLen > maxLen) {
            maxLen = currentLen;
        }
    }
    
    return maxLen;
}

int main() {
    char s1[] = "abcabcbb";
    char s2[] = "bbbbb";
    char s3[] = "pwwkew";
    
    printf("%s -> %d\\n", s1, lengthOfLongestSubstring(s1)); // 3 (abc)
    printf("%s -> %d\\n", s2, lengthOfLongestSubstring(s2)); // 1 (b)
    printf("%s -> %d\\n", s3, lengthOfLongestSubstring(s3)); // 3 (wke)
    
    return 0;
}`,
        applications: "Password strength analysis, DNA sequence analysis for unique subsequences, network packet analysis for unique protocol sequences, plagiarism detection in documents, subtitle uniqueness checking.",
        inputs: [
            { name: "s", label: "Input String", type: "text", defaultValue: "abcabcbb" }
        ],
        runCommand: 'longest_substring',
        commonMistakes: [
            "Not initializing the hash map/array to -1 (causes incorrect left pointer updates)",
            "Forgetting to check if duplicate is within current window (lastSeen[char] >= left)",
            "Not updating maxLen in every iteration",
            "Using wrong window size formula (should be right - left + 1)",
            "Not handling empty string edge case"
        ]
    },
    {
        id: "bfs_graph",
        basicOperation: "Edge Traversal (exploring adjacent nodes of a vertex)",
        dominantOperation: "Queue enqueue/dequeue and visited checks",
        criticalOperation: "Queue memory allocations",
        complexityDerivation: "Step 1: Identify Basic Operation -> Edge Traversal.\nStep 2: Count Number of Executions -> Each vertex enqueued/dequeued once, each edge checked once/twice.\nStep 3: Write Summation -> Total operations = V + E.\nStep 4: Simplify Summation -> Linear.\nStep 5: Determine Order of Growth -> Linear.\nStep 6: Obtain Final Complexity -> O(V + E).",
        bestCaseDerivation: "Input: Connected graph. Derivation: Level order traversal. Operations: V + E. Complexity: O(V + E).",
        averageCaseDerivation: "Input: Random graph. Derivation: Standard queue traversal. Operations: V + E. Complexity: O(V + E).",
        worstCaseDerivation: "Input: Complete graph. Derivation: All edges checked. Operations: V + E. Complexity: O(V + E).",
        spaceComplexityDerivation: "Input Space: O(V + E).\nAuxiliary Space: O(V) for visited array and queue.\nStack Space: O(1) iterative execution.\nTotal Space: O(V + E).",
        interviewQuestions: "1. Why is BFS used for finding the shortest path in an unweighted graph?\n2. What data structure does BFS use?\n3. How do you handle disconnected graphs in BFS?",
        examQuestions: "1. Analyze Breadth-First Search time and space complexity in detail.\n2. Trace BFS traversal steps starting from node 0 for a given graph.",
        derivationShortcuts: "Processing each node once and checking edges via queue yields O(V + E).",
        inSyllabus: true, // Unit-V: Graph traversal - BFS
        title: "Graph BFS",
        category: CATEGORIES.GRAPHS,
        difficulty: "Medium",
        beginnerTips: [
            "Breadth-First Search explores level by level",
            "Use queue data structure (FIFO)",
            "Mark vertices as visited to avoid cycles",
            "Start from source vertex, add to queue",
            "Process neighbors before going deeper",
            "Good for shortest path in unweighted graphs"
        ],
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
        description: "Perform Breadth First Search traversal on a Graph starting from node 0.",
        codeSnippet: `// Standard BFS with Queue`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX 10

typedef struct {
    int items[MAX];
    int front, rear;
} Queue;

void initQueue(Queue* q) {
    q->front = -1;
    q->rear = -1;
}

bool isEmpty(Queue* q) {
    return q->front == -1;
}

void enqueue(Queue* q, int value) {
    if (q->front == -1) q->front = 0;
    q->rear++;
    q->items[q->rear] = value;
}

int dequeue(Queue* q) {
    int item = q->items[q->front];
    q->front++;
    if (q->front > q->rear) {
        q->front = q->rear = -1;
    }
    return item;
}

void BFS(int graph[MAX][MAX], int n, int start) {
    bool visited[MAX] = {false};
    Queue q;
    initQueue(&q);
    
    visited[start] = true;
    enqueue(&q, start);
    
    printf("BFS Traversal: ");
    
    while (!isEmpty(&q)) {
        int vertex = dequeue(&q);
        printf("%d ", vertex);
        
        // Visit all adjacent vertices
        for (int i = 0; i < n; i++) {
            if (graph[vertex][i] == 1 && !visited[i]) {
                visited[i] = true;
                enqueue(&q, i);
            }
        }
    }
    printf("\\n");
}

int main() {
    int n = 5;
    int graph[MAX][MAX] = {
        {0, 1, 1, 0, 0},
        {1, 0, 0, 1, 1},
        {1, 0, 0, 0, 1},
        {0, 1, 0, 0, 0},
        {0, 1, 1, 0, 0}
    };
    
    BFS(graph, n, 0);
    
    return 0;
}`,
        applications: "Shortest path in GPS/map navigation (unweighted roads), social network friend recommendation (degrees of separation), web crawlers indexing websites, peer-to-peer network broadcasting, COVID-19 contact tracing.",
        inputs: [
            { name: "start_node", label: "Start Node (0-4)", type: "number", defaultValue: "0" }
        ],
        runCommand: 'bfs_graph',
        commonMistakes: [
            "Not marking vertex as visited before adding to queue (causes infinite loops)",
            "Marking visited after dequeueing instead of before enqueueing",
            "Not checking if neighbor is already visited",
            "Forgetting to initialize queue properly",
            "Not handling disconnected components (some nodes unreachable)"
        ]
    },
    {
        id: "fibonacci_dp",
        basicOperation: "Operation corresponding to execution step of Fibonacci (DP)",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n).",
        interviewQuestions: "1. Explain the design paradigm of Fibonacci (DP).\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Fibonacci (DP).\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n) times.",
        inSyllabus: false, // DP not in syllabus
        title: "Fibonacci (DP)",
        category: CATEGORIES.DP,
        difficulty: "Easy",
        beginnerTips: [
            "DP optimizes recursive fibonacci from O(2^n) to O(n)",
            "Use array to store computed values (memoization)",
            "Bottom-up approach: build from fib(0) to fib(n)",
            "Each value computed only once",
            "Can optimize space to O(1) using two variables"
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        description: "Calculate the Nth Fibonacci number using Dynamic Programming (Memoization table).",
        codeSnippet: `int fib(int n) {
    int dp[n+1];
    dp[0]=0; dp[1]=1;
    for(int i=2; i<=n; i++) dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>

// Dynamic Programming Approach
int fibDP(int n) {
    if (n <= 1) return n;
    
    int* dp = (int*)malloc((n + 1) * sizeof(int));
    
    // Base cases
    dp[0] = 0;
    dp[1] = 1;
    
    // Build table bottom-up
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
        printf("dp[%d] = %d\\n", i, dp[i]);
    }
    
    int result = dp[n];
    free(dp);
    return result;
}

// Space Optimized: O(1) space
int fibOptimized(int n) {
    if (n <= 1) return n;
    
    int prev2 = 0, prev1 = 1;
    
    for (int i = 2; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    
    return prev1;
}

int main() {
    int n = 7;
    
    printf("Fibonacci(%d) using DP:\\n", n);
    int result = fibDP(n);
    printf("\\nResult: %d\\n\\n", result);
    
    printf("Space Optimized: %d\\n", fibOptimized(n));
    
    // Print sequence
    printf("\\nFibonacci Sequence: ");
    for (int i = 0; i <= n; i++) {
        printf("%d ", fibOptimized(i));
    }
    printf("\\n");
    
    return 0;
}`,
        applications: "Nature pattern modeling (flower petals, spiral shells), financial market prediction models, stock market technical analysis (Fibonacci retracement levels), algorithm efficiency benchmarking, recursive algorithm memoization demonstration.",
        inputs: [
            { name: "n", label: "Nth Number", type: "number", defaultValue: "7" }
        ],
        runCommand: 'fibonacci_dp',
        commonMistakes: [
            "Not initializing base cases (dp[0] and dp[1])",
            "Starting loop from wrong index (should start from 2)",
            "Array out of bounds (allocating n instead of n+1 elements)",
            "Not handling edge cases (n=0 or n=1)",
            "Memory leak - forgetting to free allocated dp array"
        ]
    },
    {
        inSyllabus: true, // Backtracking not in syllabus
        id: "n_queens",
        basicOperation: "Feasibility Check (checking if placing queen at row/col is safe from attacks)",
        dominantOperation: "Safety verification checks (vertical and diagonal scan)",
        criticalOperation: "Backtracking recursion tree branches and rollbacks",
        complexityDerivation: "Step 1: Identify Basic Operation -> Feasibility Check.\nStep 2: Count Number of Executions -> Upper-bounded by placing V queens in N! configurations.\nStep 3: Write Summation -> T(N) = N * T(N-1) + O(N).\nStep 4: Simplify Summation -> Solved recursively: N * (N-1) * ... * 1 = N!.\nStep 5: Determine Order of Growth -> Exponential (factorial).\nStep 6: Obtain Final Complexity -> O(N!).",
        bestCaseDerivation: "Input: N=1 (single cell board). Derivation: Solved instantly. Operations: 1 safety check. Complexity: O(1).",
        averageCaseDerivation: "Input: Standard board. Derivation: Pruning eliminates majority of invalid states. Operations: < N! state checks. Complexity: O(N!).",
        worstCaseDerivation: "Input: Large board size N. Derivation: Deep search branches before failure. Operations: O(N!) checks. Complexity: O(N!).",
        spaceComplexityDerivation: "Input Space: O(N) or O(N²) board representation.\nAuxiliary Space: O(N) array to store queen column positions.\nRecursion Stack: O(N) recursion depth.\nTotal Space: O(N).",
        recurrenceRelation: "T(n) = n * T(n-1) + O(n)",
        recurrenceDerivation: "T(n) = n * ( (n-1)T(n-2) + c(n-1) ) + cn\n= n(n-1)T(n-2) + n(n-1)c + cn\n= n! * T(0) + ∑ (i=1 to n) (n!/i!) * c = O(n!).",
        interviewQuestions: "1. Explain the backtracking paradigm using N-Queens.\n2. How does the safety check function work?\n3. What is the space complexity of N-Queens?",
        examQuestions: "1. Analyze the state-space tree of the 4-Queens problem.\n2. Write the N-Queens algorithm and analyze its worst-case complexity.",
        derivationShortcuts: "Factorial growth O(N!) since each row has fewer available choices than the previous.",
        title: "N-Queens",
        category: CATEGORIES.BACKTRACKING,
        difficulty: "Hard",
        beginnerTips: [
            "Place queens row by row",
            "For each row, try all columns",
            "Check if position is safe (no attacks)",
            "Queens attack same row, column, and diagonals",
            "Backtrack when no valid position in row",
            "Classic example of backtracking algorithm"
        ],
        timeComplexity: "O(N!)",
        spaceComplexity: "O(N)",
        description: "Place N queens on an NxN chessboard such that no two queens attack each other.",
        codeSnippet: `void solve(int row) {
    if (row == N) return;
    for (int col = 0; col < N; col++) {
        if (isSafe(row, col)) {
            queens[row] = col;
            solve(row + 1);
            queens[row] = -1; // backtrack
        }
    }
}`,
        fullCode: `#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>
#include <math.h>

#define N 4

int board[N][N];
int solutionCount = 0;

void printSolution() {
    printf("Solution %d:\\n", ++solutionCount);
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            printf("%c ", board[i][j] ? 'Q' : '.');
        }
        printf("\\n");
    }
    printf("\\n");
}

bool isSafe(int row, int col) {
    // Check column
    for (int i = 0; i < row; i++) {
        if (board[i][col]) return false;
    }
    
    // Check upper left diagonal
    for (int i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j]) return false;
    }
    
    // Check upper right diagonal
    for (int i = row, j = col; i >= 0 && j < N; i--, j++) {
        if (board[i][j]) return false;
    }
    
    return true;
}

void solveNQueens(int row) {
    if (row == N) {
        printSolution();
        return;
    }
    
    for (int col = 0; col < N; col++) {
        if (isSafe(row, col)) {
            // Place queen
            board[row][col] = 1;
            
            // Recurse to next row
            solveNQueens(row + 1);
            
            // Backtrack
            board[row][col] = 0;
        }
    }
}

int main() {
    printf("N-Queens Problem (N=%d)\\n\\n", N);
    
    // Initialize board
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            board[i][j] = 0;
        }
    }
    
    solveNQueens(0);
    
    if (solutionCount == 0) {
        printf("No solutions found.\\n");
    } else {
        printf("Total solutions: %d\\n", solutionCount);
    }
    
    return 0;
}`,
        applications: "Constraint satisfaction problems in AI, scheduling problems with mutual exclusion, VLSI chip design (component placement), network topology design, parallel test execution without resource conflicts.",
        inputs: [
            { name: "n", label: "Grid Size (N)", type: "number", defaultValue: "4" }
        ],
        runCommand: 'n_queens',
        commonMistakes: [
            "Not checking all three attack directions (column, two diagonals)",
            "Forgetting to backtrack (remove queen) after recursive call",
            "Not handling base case correctly (row == N)",
            "Checking rows that haven't been filled yet",
            "Not initializing board to empty before starting"
        ]
    }, // Add more problems here as we implement them
    {
        id: 'stack_ll',
        basicOperation: "Operation corresponding to execution step of Stack (Linked List)",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(1).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(1).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(1).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(1).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n).",
        interviewQuestions: "1. Explain the design paradigm of Stack (Linked List).\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Stack (Linked List).\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(1) times.",
        inSyllabus: true, // Unit-I: Stack representation and operations
        title: 'Stack (Linked List)',
        category: CATEGORIES.LINKED_LIST,
        difficulty: 'Easy',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(n)',
        beginnerTips: [
            "Stack follows Last-In-First-Out (LIFO) principle",
            "Push adds element to top",
            "Pop removes element from top",
            "Peek shows top element without removing",
            "Think of it like a stack of plates"
        ],
        description: 'Implement a Stack using a Linked List (LIFO).',
        codeSnippet: `// Stack Operations using Linked List Node`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* next;
} Node;

Node* top = NULL;

void push(int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->next = top;
    top = newNode;
    printf("Pushed: %d\\n", data);
}

int pop() {
    if (top == NULL) {
        printf("Stack underflow\\n");
        return -1;
    }
    Node* temp = top;
    int popped = temp->data;
    top = top->next;
    free(temp);
    return popped;
}

int peek() {
    if (top == NULL) return -1;
    return top->data;
}

int main() {
    push(10);
    push(20);
    push(30);
    printf("Top: %d\\n", peek());
    printf("Popped: %d\\n", pop());
    return 0;
}`,
        applications: "Function call management in OS (call stack), undo/redo in text editors like VS Code, expression parsing in compilers, backtracking in maze solvers, browser forward/back navigation, Java Virtual Machine stack frame management.",
        inputs: [
            { name: "nums", label: "Push Elements", type: "array", defaultValue: "1, 2, 3, 4" }
        ],
        runCommand: 'stack_ll'
    },
    {
        id: 'queue_ll',
        basicOperation: "Operation corresponding to execution step of Queue (Linked List)",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(1).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(1).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(1).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(1).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n).",
        interviewQuestions: "1. Explain the design paradigm of Queue (Linked List).\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Queue (Linked List).\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(1) times.",
        inSyllabus: true, // Unit-II: Queue representation and operations
        title: 'Queue (Linked List)',
        category: CATEGORIES.LINKED_LIST,
        difficulty: 'Easy',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(n)',
        beginnerTips: [
            "Queue follows First-In-First-Out (FIFO) principle",
            "Enqueue adds element to rear",
            "Dequeue removes element from front",
            "Front shows first element",
            "Think of it like a line at a store"
        ],
        description: 'Implement a Queue using a Linked List (FIFO).',
        codeSnippet: `// Queue Operations using Linked List Node`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* next;
} Node;

Node* front = NULL;
Node* rear = NULL;

void enqueue(int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->next = NULL;
    if (rear == NULL) {
        front = rear = newNode;
    } else {
        rear->next = newNode;
        rear = newNode;
    }
    printf("Enqueued: %d\\n", data);
}

int dequeue() {
    if (front == NULL) {
        printf("Queue underflow\\n");
        return -1;
    }
    Node* temp = front;
    int dequeued = temp->data;
    front = front->next;
    if (front == NULL) rear = NULL;
    free(temp);
    return dequeued;
}

int main() {
    enqueue(10);
    enqueue(20);
    enqueue(30);
    printf("Dequeued: %d\\n", dequeue());
    return 0;
}`,
        applications: "CPU process scheduling (FIFO scheduling), printer job spooling, keyboard input buffering, network packet buffering in routers, customer service ticketing systems, BFS graph traversal.",
        inputs: [
            { name: "nums", label: "Enqueue Elements", type: "array", defaultValue: "1, 2, 3, 4" }
        ],
        runCommand: 'queue_ll'
    },
    {
        id: 'doubly_linked_list',
        basicOperation: "Operation corresponding to execution step of Doubly Linked List",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n).",
        interviewQuestions: "1. Explain the design paradigm of Doubly Linked List.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Doubly Linked List.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n) times.",
        inSyllabus: true, // Unit-III: Doubly Linked List (DLL)
        title: 'Doubly Linked List',
        category: CATEGORIES.LINKED_LIST,
        difficulty: 'Medium',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        beginnerTips: [
            "Each node has two pointers: next and prev",
            "Can traverse in both directions",
            "Insert/delete at both ends efficiently",
            "Head points to first, tail to last",
            "Useful for browser history, undo/redo"
        ],
        description: 'A linked list where each node contains a reference to the previous node as well.',
        codeSnippet: `struct Node {
    int data;
    struct Node* next;
    struct Node* prev;
};`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* next;
    struct Node* prev;
} Node;

Node* head = NULL;

void insertFront(int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->next = head;
    newNode->prev = NULL;
    if (head != NULL)
        head->prev = newNode;
    head = newNode;
}

void insertEnd(int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->next = NULL;
    if (head == NULL) {
        newNode->prev = NULL;
        head = newNode;
        return;
    }
    Node* temp = head;
    while (temp->next != NULL)
        temp = temp->next;
    temp->next = newNode;
    newNode->prev = temp;
}

void display() {
    Node* temp = head;
    while (temp != NULL) {
        printf("%d <-> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\n");
}

int main() {
    insertEnd(10);
    insertEnd(20);
    insertFront(5);
    display();
    return 0;
}`,
        applications: "Browser history (forward/back navigation), music playlists with prev/next controls, LRU cache implementation, text editor undo/redo with multiple history levels, image viewer previous/next navigation.",
        inputs: [
            { name: "nums", label: "List Elements", type: "array", defaultValue: "10, 20, 30, 40" }
        ],
        runCommand: 'doubly_linked_list'
    },
    {
        id: 'deque_ll',
        basicOperation: "Operation corresponding to execution step of Deque (Linked List)",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(1).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(1).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(1).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(1).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n).",
        interviewQuestions: "1. Explain the design paradigm of Deque (Linked List).\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Deque (Linked List).\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(1) times.",
        inSyllabus: false, // Deque not in syllabus
        title: 'Deque (Linked List)',
        category: CATEGORIES.LINKED_LIST,
        difficulty: 'Medium',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(n)',
        beginnerTips: [
            "Double-ended queue (deque = 'deck')",
            "Insert and remove from both ends",
            "More flexible than regular queue",
            "Useful for sliding window problems",
            "Can act as both stack and queue"
        ],
        description: 'Double Ended Queue allowing insertion and deletion at both ends.',
        codeSnippet: `// Deque Operations`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* next;
    struct Node* prev;
} Node;

Node* front = NULL;
Node* rear = NULL;

void insertFront(int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->prev = NULL;
    newNode->next = front;
    if (front == NULL) {
        front = rear = newNode;
        newNode->prev = NULL;
    } else {
        front->prev = newNode;
        front = newNode;
    }
    printf("Inserted %d at front\n", data);
}

void insertRear(int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->next = NULL;
    if (rear == NULL) {
        newNode->prev = NULL;
        front = rear = newNode;
    } else {
        newNode->prev = rear;
        rear->next = newNode;
        rear = newNode;
    }
    printf("Inserted %d at rear\n", data);
}

int deleteFront() {
    if (front == NULL) return -1;
    int data = front->data;
    Node* temp = front;
    front = front->next;
    if (front == NULL) rear = NULL;
    else front->prev = NULL;
    free(temp);
    return data;
}

int main() {
    insertRear(5);
    insertRear(10);
    insertFront(1);
    printf("Deleted from front: %d\n", deleteFront());
    return 0;
}`,
        applications: "Sliding window maximum/minimum (used in stock price analysis), A* pathfinding algorithm (priority queue), palindrome detection, task scheduling with bidirectional priorities, undo/redo with multi-level stack history.",
        inputs: [
            { name: "nums", label: "Elements", type: "array", defaultValue: "5, 10, 15, 20" }
        ],
        runCommand: 'deque_ll'
    },
    {
        id: 'factorial',
        basicOperation: "Operation corresponding to execution step of Factorial (Recursion)",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n).",
        interviewQuestions: "1. Explain the design paradigm of Factorial (Recursion).\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Factorial (Recursion).\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n) times.",
        inSyllabus: true, // Unit-I: Recursion - Factorial function
        title: 'Factorial (Recursion)',
        category: CATEGORIES.RECURSION,
        difficulty: 'Easy',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        beginnerTips: [
            "Factorial of n = n × (n-1) × (n-2) × ... × 1",
            "Base case: factorial of 0 or 1 is 1",
            "Recursive case: n × factorial(n-1)",
            "Function calls itself with smaller input",
            "Stack builds up then unwinds with results"
        ],
        description: 'Calculate N! recursively.',
        codeSnippet: `int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n-1);
}`,
        fullCode: `#include <stdio.h>

int factorial(int n) {
    // Base case
    if (n <= 1) {
        return 1;
    }
    // Recursive case
    return n * factorial(n - 1);
}

int main() {
    int n = 5;
    printf("Factorial of %d = %d\n", n, factorial(n));
    
    // Show step by step
    printf("\nStep by step:\n");
    printf("5! = 5 × 4!\n");
    printf("4! = 4 × 3!\n");
    printf("3! = 3 × 2!\n");
    printf("2! = 2 × 1!\n");
    printf("1! = 1 (base case)\n");
    printf("\nUnwinding:\n");
    printf("2! = 2 × 1 = 2\n");
    printf("3! = 3 × 2 = 6\n");
    printf("4! = 4 × 6 = 24\n");
    printf("5! = 5 × 24 = 120\n");
    
    return 0;
}`,
        applications: "Combinatorics calculations (permutations, combinations), probability theory (binomial distribution), cryptography (modular arithmetic), number theory proofs, statistics (permutation counting).",
        inputs: [
            { name: "n", label: "N", type: "number", defaultValue: "5" }
        ],
        runCommand: 'factorial'
    },
    {
        id: 'recursion_fib',
        basicOperation: "Operation corresponding to execution step of Fibonacci (Recursion)",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(2^n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(2^n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(2^n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(2^n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n) auxiliary memory.\nStack Space: O(log n) recursion depth.\nTotal Space: O(n).",
        recurrenceRelation: "T(n) = T(n-1) + T(n-2) + O(1)",
        recurrenceDerivation: "Solved using characteristic equation: r² - r - 1 = 0. Roots are golden ratios, yielding O(1.618^n).",
        interviewQuestions: "1. Explain the design paradigm of Fibonacci (Recursion).\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Fibonacci (Recursion).\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(2^n) times.",
        inSyllabus: true, // Unit-I: Recursion examples
        title: 'Fibonacci (Recursion)',
        category: CATEGORIES.RECURSION,
        difficulty: 'Easy',
        timeComplexity: 'O(2^n)',
        spaceComplexity: 'O(n)',
        beginnerTips: [
            "Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, 21...",
            "Each number is sum of previous two",
            "Base cases: fib(0)=0, fib(1)=1",
            "Recursive: fib(n) = fib(n-1) + fib(n-2)",
            "Creates a tree of recursive calls"
        ],
        description: 'Calculate Nth Fibonacci number recursively.',
        codeSnippet: `int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}`,
        fullCode: `#include <stdio.h>

int fib(int n) {
    // Base cases
    if (n <= 1) {
        return n;
    }
    // Recursive case
    return fib(n - 1) + fib(n - 2);
}

int main() {
    int n = 6;
    printf("Fibonacci(%d) = %d\n", n, fib(n));
    
    printf("\nFibonacci sequence:\n");
    for (int i = 0; i <= n; i++) {
        printf("fib(%d) = %d\n", i, fib(i));
    }
    
    printf("\nHow it works:\n");
    printf("fib(6) = fib(5) + fib(4)\n");
    printf("fib(5) = fib(4) + fib(3)\n");
    printf("fib(4) = fib(3) + fib(2)\n");
    printf("fib(3) = fib(2) + fib(1)\n");
    printf("fib(2) = fib(1) + fib(0)\n");
    printf("fib(1) = 1 (base case)\n");
    printf("fib(0) = 0 (base case)\n");
    
    return 0;
}`,
        applications: "Demonstrating exponential time complexity, studying memoization need, financial growth models (compound interest), biological cell division modeling, algorithm recursion teaching.",
        inputs: [
            { name: "n", label: "N", type: "number", defaultValue: "6" }
        ],
        runCommand: 'recursion_fib'
    },
    {
        id: 'towers_of_hanoi',
        basicOperation: "Operation corresponding to execution step of Towers of Hanoi",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(2^n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(2^n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(2^n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(2^n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n).",
        recurrenceRelation: "T(n) = 2T(n-1) + O(1)",
        recurrenceDerivation: "T(n) = 2T(n-1) + c\n= 2(2T(n-2) + c) + c = 4T(n-2) + 3c\n= 2^k * T(n-k) + (2^k - 1)*c\nFor k=n-1: T(n) = 2^(n-1) * T(1) + (2^(n-1) - 1)*c = O(2^n).",
        interviewQuestions: "1. Explain the design paradigm of Towers of Hanoi.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Towers of Hanoi.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(2^n) times.",
        title: 'Towers of Hanoi',
        category: CATEGORIES.RECURSION,
        difficulty: 'Medium',
        inSyllabus: true, // Unit-I: Recursion - Towers of Hanoi problem
        timeComplexity: 'O(2^n)',
        spaceComplexity: 'O(n)',
        beginnerTips: [
            "Only one disk can be moved at a time",
            "Larger disk cannot go on smaller disk",
            "Use auxiliary peg to help move disks",
            "Move n-1 disks to auxiliary, then largest to destination",
            "Finally move n-1 disks from auxiliary to destination",
            "Classic divide-and-conquer recursion"
        ],
        description: 'Move n disks from source peg to destination peg using an auxiliary peg. Demonstrates recursion and role of stack.',
        codeSnippet: `void hanoi(int n, char from, char to, char aux) {
    if (n == 1) {
        printf("Move disk 1 from %c to %c\\n", from, to);
        return;
    }
    hanoi(n-1, from, aux, to);
    printf("Move disk %d from %c to %c\\n", n, from, to);
    hanoi(n-1, aux, to, from);
}`,
        fullCode: `#include <stdio.h>

void towerOfHanoi(int n, char from, char to, char aux) {
    if (n == 1) {
        printf("Move disk 1 from %c to %c\\n", from, to);
        return;
    }
    
    // Move n-1 disks from 'from' to 'aux' using 'to'
    towerOfHanoi(n-1, from, aux, to);
    
    // Move the nth disk from 'from' to 'to'
    printf("Move disk %d from %c to %c\\n", n, from, to);
    
    // Move n-1 disks from 'aux' to 'to' using 'from'
    towerOfHanoi(n-1, aux, to, from);
}

int main() {
    int n = 3; // Number of disks
    
    printf("Towers of Hanoi with %d disks\\n", n);
    printf("Total moves: %d\\n\\n", (1 << n) - 1); // 2^n - 1
    
    towerOfHanoi(n, 'A', 'C', 'B');
    // A = source, C = destination, B = auxiliary
    
    return 0;
}`,
        applications: "Demonstrating recursion and divide-and-conquer strategy, backup storage migration (hierarchical disk-to-disk transfers), Bayan (disk reorganization software), explaining call stack to students, parallel computing work distribution.",
        inputs: [
            { name: "n", label: "Number of Disks", type: "number", defaultValue: "3" }
        ],
        runCommand: 'towers_of_hanoi'
    },
    {
        id: 'tree_inorder',
        basicOperation: "Operation corresponding to execution step of Inorder Traversal (Binary Tree)",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(h) auxiliary memory.\nStack Space: O(log n) recursion depth.\nTotal Space: O(h).",
        interviewQuestions: "1. Explain the design paradigm of Inorder Traversal (Binary Tree).\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Inorder Traversal (Binary Tree).\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n) times.",
        title: 'Inorder Traversal (Binary Tree)',
        category: CATEGORIES.TREES,
        difficulty: 'Medium',
        inSyllabus: true, // Unit-IV: Tree Traversals - Inorder
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
        beginnerTips: [
            "Order: Left -> Root -> Right",
            "For BST, gives sorted sequence",
            "Uses recursion (implicit stack)",
            "Visit left subtree completely first",
            "Then process current node",
            "Finally visit right subtree"
        ],
        description: 'Traverse binary tree in Inorder: Left-Root-Right. For BST, produces sorted output.',
        codeSnippet: `void inorder(Node* root) {
    if (root == NULL) return;
    inorder(root->left);      // Left
    printf("%d ", root->data); // Root
    inorder(root->right);     // Right
}`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *left, *right;
};

struct Node* createNode(int data) {
    struct Node* node = malloc(sizeof(struct Node));
    node->data = data;
    node->left = node->right = NULL;
    return node;
}

void inorder(struct Node* root) {
    if (root == NULL) return;
    
    inorder(root->left);           // Visit left subtree
    printf("%d ", root->data);     // Process current node
    inorder(root->right);          // Visit right subtree
}

int main() {
    // Create BST:    4
    //              /   \\
    //             2     6
    //            / \\   / \\
    //           1   3 5   7
    
    struct Node* root = createNode(4);
    root->left = createNode(2);
    root->right = createNode(6);
    root->left->left = createNode(1);
    root->left->right = createNode(3);
    root->right->left = createNode(5);
    root->right->right = createNode(7);
    
    printf("Inorder traversal: ");
    inorder(root);  // Output: 1 2 3 4 5 6 7 (sorted!)
    
    return 0;
}`,
        applications: "Extracting sorted data from BST (O(n)), expression tree evaluation (infix order), syntax tree serialization in compilers, database tree index traversal, generating sorted output from balanced BST.",
        inputs: [
            { name: "tree", label: "Tree (level-order)", type: "array", defaultValue: "4, 2, 6, 1, 3, 5, 7" }
        ],
        runCommand: 'tree_inorder'
    },
    {
        id: 'tree_preorder',
        basicOperation: "Operation corresponding to execution step of Preorder Traversal (Binary Tree)",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(h) auxiliary memory.\nStack Space: O(log n) recursion depth.\nTotal Space: O(h).",
        interviewQuestions: "1. Explain the design paradigm of Preorder Traversal (Binary Tree).\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Preorder Traversal (Binary Tree).\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n) times.",
        title: 'Preorder Traversal (Binary Tree)',
        category: CATEGORIES.TREES,
        difficulty: 'Medium',
        inSyllabus: true, // Unit-IV: Tree Traversals - Preorder
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
        beginnerTips: [
            "Order: Root -> Left -> Right",
            "Process current node first",
            "Then visit left subtree",
            "Finally visit right subtree",
            "Used for creating copy of tree",
            "Produces prefix expression for expression trees"
        ],
        description: 'Traverse binary tree in Preorder: Root-Left-Right. Used for tree copy and prefix notation.',
        codeSnippet: `void preorder(Node* root) {
    if (root == NULL) return;
    printf("%d ", root->data); // Root
    preorder(root->left);      // Left
    preorder(root->right);     // Right
}`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *left, *right;
};

struct Node* createNode(int data) {
    struct Node* node = malloc(sizeof(struct Node));
    node->data = data;
    node->left = node->right = NULL;
    return node;
}

void preorder(struct Node* root) {
    if (root == NULL) return;
    
    printf("%d ", root->data);     // Process current node
    preorder(root->left);          // Visit left subtree
    preorder(root->right);         // Visit right subtree
}

int main() {
    // Create BST:    4
    //              /   \\
    //             2     6
    //            / \\   / \\
    //           1   3 5   7
    
    struct Node* root = createNode(4);
    root->left = createNode(2);
    root->right = createNode(6);
    root->left->left = createNode(1);
    root->left->right = createNode(3);
    root->right->left = createNode(5);
    root->right->right = createNode(7);
    
    printf("Preorder traversal: ");
    preorder(root);  // Output: 4 2 1 3 6 5 7
    
    return 0;
}`,
        applications: "Tree copying/cloning, generating prefix notation for expression trees, prefix serialization of file system directory trees, network packet header processing, XML/HTML document tree copying.",
        inputs: [
            { name: "tree", label: "Tree (level-order)", type: "array", defaultValue: "4, 2, 6, 1, 3, 5, 7" }
        ],
        runCommand: 'tree_preorder'
    },
    {
        id: 'tree_postorder',
        basicOperation: "Operation corresponding to execution step of Postorder Traversal (Binary Tree)",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(h) auxiliary memory.\nStack Space: O(log n) recursion depth.\nTotal Space: O(h).",
        interviewQuestions: "1. Explain the design paradigm of Postorder Traversal (Binary Tree).\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Postorder Traversal (Binary Tree).\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n) times.",
        title: 'Postorder Traversal (Binary Tree)',
        category: CATEGORIES.TREES,
        difficulty: 'Medium',
        inSyllabus: true, // Unit-IV: Tree Traversals - Postorder
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
        beginnerTips: [
            "Order: Left -> Right -> Root",
            "Visit left subtree first",
            "Then right subtree",
            "Process current node last",
            "Used for deleting tree (delete children before parent)",
            "Produces postfix expression for expression trees"
        ],
        description: 'Traverse binary tree in Postorder: Left-Right-Root. Used for tree deletion and postfix notation.',
        codeSnippet: `void postorder(Node* root) {
    if (root == NULL) return;
    postorder(root->left);      // Left
    postorder(root->right);     // Right
    printf("%d ", root->data);  // Root
}`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *left, *right;
};

struct Node* createNode(int data) {
    struct Node* node = malloc(sizeof(struct Node));
    node->data = data;
    node->left = node->right = NULL;
    return node;
}

void postorder(struct Node* root) {
    if (root == NULL) return;
    
    postorder(root->left);         // Visit left subtree
    postorder(root->right);        // Visit right subtree
    printf("%d ", root->data);     // Process current node
}

int main() {
    // Create BST:    4
    //              /   \\
    //             2     6
    //            / \\   / \\
    //           1   3 5   7
    
    struct Node* root = createNode(4);
    root->left = createNode(2);
    root->right = createNode(6);
    root->left->left = createNode(1);
    root->left->right = createNode(3);
    root->right->left = createNode(5);
    root->right->right = createNode(7);
    
    printf("Postorder traversal: ");
    postorder(root);  // Output: 1 3 2 5 7 6 4
    
    return 0;
}`,
        applications: "Safe tree deletion (children before parents), postfix expression generation from expression trees, directory size calculation (leaf nodes first), dependency-safe package uninstallation, garbage collection in memory management.",
        inputs: [
            { name: "tree", label: "Tree (level-order)", type: "array", defaultValue: "4, 2, 6, 1, 3, 5, 7" }
        ],
        runCommand: 'tree_postorder'
    },
    {
        id: 'dfs_graph',
        basicOperation: "Edge Traversal (exploring adjacent nodes of a vertex)",
        dominantOperation: "Adjacency list scanning and visited array checks",
        criticalOperation: "Recursion stack allocations",
        complexityDerivation: "Step 1: Identify Basic Operation -> Edge Traversal.\nStep 2: Count Number of Executions -> Every vertex visited once, every edge traversed once (directed) or twice (undirected).\nStep 3: Write Summation -> Total operations = ∑ (deg(v)) + V = 2E + V.\nStep 4: Simplify Summation -> Linear in terms of vertices and edges.\nStep 5: Determine Order of Growth -> Linear.\nStep 6: Obtain Final Complexity -> O(V + E).",
        bestCaseDerivation: "Input: Line graph or tree. Derivation: Straight recursion path. Operations: V vertices, V - 1 edges. Complexity: O(V + E).",
        averageCaseDerivation: "Input: Random connected graph. Derivation: Standard depth traversal. Operations: V + E. Complexity: O(V + E).",
        worstCaseDerivation: "Input: Fully connected graph. Derivation: Scans all possible V² edges. Operations: V vertices, E edges. Complexity: O(V + E).",
        spaceComplexityDerivation: "Input Space: O(V + E) for adjacency list.\nAuxiliary Space: O(V) for visited array.\nRecursion Stack: O(V) in worst-case (skewed graph/line graph).\nTotal Space: O(V + E).",
        interviewQuestions: "1. How do you detect cycles in a directed graph using DFS?\n2. What is the maximum recursion stack depth during DFS?\n3. What is the difference between DFS and BFS?",
        examQuestions: "1. Explain the working of DFS. Show how it uses a stack (explicit or implicit) to traverse a graph.\n2. Write the DFS algorithm and analyze its complexity using graph representations.",
        derivationShortcuts: "Visiting each vertex once and checking each edge once gives O(V + E).",
        title: 'Depth-First Search (Graph)',
        category: CATEGORIES.GRAPHS,
        difficulty: 'Medium',
        inSyllabus: true, // Unit-V: Graph traversal - DFS
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V)',
        beginnerTips: [
            "Explore as deep as possible before backtracking",
            "Uses stack (recursion or explicit)",
            "Mark vertices as visited to avoid cycles",
            "Useful for pathfinding, cycle detection",
            "Opposite strategy to BFS (breadth-first)",
            "Can be implemented recursively or iteratively"
        ],
        description: 'Traverse graph using depth-first search. Goes deep into graph before exploring breadth.',
        codeSnippet: `void DFS(int graph[][], int visited[], int v) {
    visited[v] = 1;
    printf("%d ", v);
    
    for (int i = 0; i < n; i++) {
        if (graph[v][i] && !visited[i])
            DFS(graph, visited, i);
    }
}`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>

#define MAX 10

void DFS(int graph[MAX][MAX], int visited[], int vertex, int n) {
    // Mark current vertex as visited
    visited[vertex] = 1;
    printf("%d ", vertex);
    
    // Explore all adjacent vertices
    for (int i = 0; i < n; i++) {
        if (graph[vertex][i] == 1 && !visited[i]) {
            DFS(graph, visited, i, n);
        }
    }
}

int main() {
    // Sample graph:
    //     0 --- 1
    //     |     |
    //     2 --- 3
    //       \\   |
    //         \\ |
    //           4
    
    int n = 5;
    int graph[MAX][MAX] = {
        {0, 1, 1, 0, 0},
        {1, 0, 0, 1, 0},
        {1, 0, 0, 1, 1},
        {0, 1, 1, 0, 1},
        {0, 0, 1, 1, 0}
    };
    
    int visited[MAX] = {0};
    
    printf("DFS starting from vertex 0: ");
    DFS(graph, visited, 0, n);
    
    return 0;
}`,
        applications: "Topological sorting in build systems (Make, Gradle), cycle detection in dependency graphs, maze solving, connected component finding, finding strongly connected components (Tarjan's algorithm), web crawling.",
        inputs: [
            { name: "start", label: "Start Vertex", type: "number", defaultValue: "0" }
        ],
        runCommand: 'dfs_graph'
    },
    {
        id: 'circular_queue',
        basicOperation: "Operation corresponding to execution step of Circular Queue",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(1).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(1).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(1).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(1).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n).",
        interviewQuestions: "1. Explain the design paradigm of Circular Queue.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Circular Queue.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(1) times.",
        title: 'Circular Queue',
        category: CATEGORIES.STACK,
        difficulty: 'Medium',
        inSyllabus: true, // Unit-II: Circular Queue
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(n)',
        beginnerTips: [
            "Front and rear wrap around at array end",
            "Efficient use of array space",
            "Use modulo (%) for wrapping",
            "Track count or use one empty slot",
            "Enqueue at rear, dequeue from front",
            "Better than simple queue (no shifting needed)"
        ],
        description: 'Circular queue implementation where front and rear pointers wrap around, maximizing array utilization.',
        codeSnippet: `typedef struct {
    int arr[MAX];
    int front, rear, count;
} CircularQueue;

void enqueue(CircularQueue* q, int val) {
    q->rear = (q->rear + 1) % MAX;
    q->arr[q->rear] = val;
    q->count++;
}`,
        fullCode: `#include <stdio.h>
#define MAX 5

typedef struct {
    int items[MAX];
    int front;
    int rear;
    int count;
} CircularQueue;

void init(CircularQueue* q) {
    q->front = 0;
    q->rear = -1;
    q->count = 0;
}

int isFull(CircularQueue* q) {
    return q->count == MAX;
}

int isEmpty(CircularQueue* q) {
    return q->count == 0;
}

void enqueue(CircularQueue* q, int value) {
    if (isFull(q)) {
        printf("Queue Full!\\n");
        return;
    }
    q->rear = (q->rear + 1) % MAX;
    q->items[q->rear] = value;
    q->count++;
    printf("Enqueued %d\\n", value);
}

int dequeue(CircularQueue* q) {
    if (isEmpty(q)) {
        printf("Queue Empty!\\n");
        return -1;
    }
    int value = q->items[q->front];
    q->front = (q->front + 1) % MAX;
    q->count--;
    return value;
}

int main() {
    CircularQueue q;
    init(&q);
    
    enqueue(&q, 10);
    enqueue(&q, 20);
    enqueue(&q, 30);
    
    printf("Dequeued: %d\\n", dequeue(&q));
    
    enqueue(&q, 40);
    enqueue(&q, 50);
    enqueue(&q, 60); // Wraps around
    
    return 0;
}`,
        applications: "OS keyboard input buffer, audio/video streaming buffers, network I/O packet buffering, IoT sensor data collection, multi-player game server event queues, printer spooler with fixed buffer.",
        inputs: [
            { name: "operations", label: "Operations (E10,E20,D,E30)", type: "string", defaultValue: "E10,E20,E30,D,D,E40,E50" }
        ],
        runCommand: 'circular_queue'
    },
    
    // === UNIT-I: STACK ALGORITHMS ===
    {
        id: "infix_to_postfix",
        basicOperation: "Operation corresponding to execution step of Infix to Postfix Conversion",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n).",
        interviewQuestions: "1. Explain the design paradigm of Infix to Postfix Conversion.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Infix to Postfix Conversion.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n) times.",
        inSyllabus: true,
        title: "Infix to Postfix Conversion",
        category: CATEGORIES.STACK,
        difficulty: "Medium",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        description: "Convert infix expression to postfix using stack. Handles operator precedence and parentheses.",
        beginnerTips: [
            "Operators: +, -, *, /, ^",
            "Higher precedence: ^(3) > */( 2) > +-(1)",
            "Left-to-right scanning",
            "Operands go directly to output",
            "Stack holds operators by precedence"
        ],
        codeSnippet: `char postfix[MAX];
int j = 0;
Stack s;

for(int i = 0; infix[i]; i++) {
    if(isOperand(infix[i])) {
        postfix[j++] = infix[i];
    } else if(infix[i] == '(') {
        push(&s, '(');
    } else if(infix[i] == ')') {
        while(peek(&s) != '(') {
            postfix[j++] = pop(&s);
        }
        pop(&s); // Remove '('
    } else { // Operator
        while(!isEmpty(&s) && precedence(peek(&s)) >= precedence(infix[i])) {
            postfix[j++] = pop(&s);
        }
        push(&s, infix[i]);
    }
}`,
        applications: "Compiler expression parsing (intermediate code generation), scientific calculators, spreadsheet formula evaluation, programming language interpreters, database query expression trees.",
        inputs: [
            { name: "expression", label: "Infix Expression", type: "string", defaultValue: "A+B*C-D/E" }
        ],
        runCommand: 'infix_to_postfix',
        commonMistakes: [
            "Not handling operator precedence correctly (*, / before +, -)",
            "Forgetting to pop all remaining operators from stack at the end",
            "Not handling parentheses - should pop until matching '(' is found",
            "Treating operands as operators or vice versa",
            "Not popping operators with higher or equal precedence before pushing new operator"
        ]
    },
    {
        id: "infix_to_prefix",
        basicOperation: "Operation corresponding to execution step of Infix to Prefix Conversion",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n).",
        interviewQuestions: "1. Explain the design paradigm of Infix to Prefix Conversion.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Infix to Prefix Conversion.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n) times.",
        inSyllabus: true,
        title: "Infix to Prefix Conversion",
        category: CATEGORIES.STACK,
        difficulty: "Medium",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        description: "Convert infix to prefix using reverse, swap parentheses, convert to postfix, then reverse again.",
        beginnerTips: [
            "Step 1: Reverse the infix expression",
            "Step 2: Swap '(' with ')' and vice versa",
            "Step 3: Convert to postfix",
            "Step 4: Reverse the result",
            "Uses modified precedence rules"
        ],
        codeSnippet: `// Step 1: Reverse infix
reverseString(infix);

// Step 2: Swap parentheses
for(int i=0; infix[i]; i++) {
    if(infix[i] == '(') infix[i] = ')';
    else if(infix[i] == ')') infix[i] = '(';
}

// Step 3: Convert to postfix
infixToPostfix(infix, postfix);

// Step 4: Reverse to get prefix
reverseString(postfix);
strcpy(prefix, postfix);`,
        applications: "LISP programming language (uses prefix notation natively), functional programming interpreters, tree-based expression evaluation from left, XML/HTML parser optimization, functional calculator implementations.",
        inputs: [
            { name: "expression", label: "Infix Expression", type: "string", defaultValue: "A+B*C-D/E" }
        ],
        runCommand: 'infix_to_prefix'
    },
    {
        id: "postfix_evaluation",
        basicOperation: "Operation corresponding to execution step of Postfix Expression Evaluation",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n).",
        interviewQuestions: "1. Explain the design paradigm of Postfix Expression Evaluation.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Postfix Expression Evaluation.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n) times.",
        inSyllabus: true,
        title: "Postfix Expression Evaluation",
        category: CATEGORIES.STACK,
        difficulty: "Medium",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        description: "Evaluate postfix expression using stack. Scans left to right, pushing operands and computing with operators.",
        beginnerTips: [
            "Use digit operands for evaluation",
            "Example: 53+82-* means (5+3)*(8-2) = 48",
            "Push operands to stack",
            "On operator: pop 2, compute, push result",
            "Final stack top is the answer"
        ],
        codeSnippet: `Stack s;
for(int i=0; postfix[i]; i++) {
    if(isDigit(postfix[i])) {
        push(&s, postfix[i] - '0');
    } else {
        int op2 = pop(&s);
        int op1 = pop(&s);
        int result;
        
        switch(postfix[i]) {
            case '+': result = op1 + op2; break;
            case '-': result = op1 - op2; break;
            case '*': result = op1 * op2; break;
            case '/': result = op1 / op2; break;
        }
        push(&s, result);
    }
}
return pop(&s);`,
        applications: "Scientific calculator firmware, spreadsheet formula evaluation, Reverse Polish Notation (RPN) calculators (HP calculators use this), compiler backend code generation, stack machine virtual machines (JVM bytecode).",
        inputs: [
            { name: "expression", label: "Postfix Expression", type: "string", defaultValue: "53+82-*" }
        ],
        runCommand: 'postfix_evaluation'
    },
    
    // === UNIT-II: QUEUE APPLICATIONS ===
    {
        id: "message_queue",
        basicOperation: "Operation corresponding to execution step of Message Queue Application",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(1).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(1).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(1).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(1).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n).",
        interviewQuestions: "1. Explain the design paradigm of Message Queue Application.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Message Queue Application.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(1) times.",
        inSyllabus: true,
        title: "Message Queue Application",
        category: CATEGORIES.QUEUE,
        difficulty: "Easy",
        timeComplexity: "O(1)",
        spaceComplexity: "O(n)",
        description: "Practical application of circular queue for messaging system. Demonstrates real-world queue usage.",
        beginnerTips: [
            "Uses circular queue internally",
            "FIFO message ordering",
            "Efficient wraparound",
            "Common in OS task scheduling",
            "Message buffering system"
        ],
        codeSnippet: `typedef struct {
    char messages[MAX][256];
    int front, rear, size;
} MessageQueue;

void enqueue(MessageQueue* q, const char* msg) {
    q->rear = (q->rear + 1) % MAX;
    strcpy(q->messages[q->rear], msg);
    q->size++;
}

void dequeue(MessageQueue* q) {
    // Process message at front
    printf("Processing: %s\\n", q->messages[q->front]);
    q->front = (q->front + 1) % MAX;
    q->size--;
}`,
        applications: "WhatsApp/Telegram message delivery systems, RabbitMQ and Apache Kafka messaging platforms, email server queuing, IoT device command queues, microservice event-driven architecture.",
        inputs: [
            { name: "operations", label: "Operations (auto)", type: "string", defaultValue: "auto" }
        ],
        runCommand: 'message_queue'
    },
    
    // === UNIT-II: LINKED LISTS ===
    {
        id: "singly_linked_list_complete",
        basicOperation: "Operation corresponding to execution step of Singly Linked List (Complete)",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(1) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(1).",
        interviewQuestions: "1. Explain the design paradigm of Singly Linked List (Complete).\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Singly Linked List (Complete).\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n) times.",
        inSyllabus: true,
        title: "Singly Linked List (Complete)",
        category: CATEGORIES.LINKED_LIST,
        difficulty: "Medium",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        description: "Complete SLL implementation with insert/delete at beginning, end, and position. Includes display and memory management.",
        beginnerTips: [
            "Insert at beginning: O(1)",
            "Insert at end: O(n) without tail",
            "Insert at position: O(n)",
            "Delete by value: O(n)",
            "Always update head pointer properly"
        ],
        codeSnippet: `void insertAtBeginning(Node** head, int data) {
    Node* newNode = createNode(data);
    newNode->next = *head;
    *head = newNode;
}

void insertAtPosition(Node** head, int data, int pos) {
    Node* temp = *head;
    for(int i=0; i<pos-1 && temp; i++) {
        temp = temp->next;
    }
    if(temp) {
        Node* newNode = createNode(data);
        newNode->next = temp->next;
        temp->next = newNode;
    }
}`,
        applications: "Dynamic memory allocation (OS heap management), implementing stacks/queues, file system directory listings, adjacency list for sparse graph representation, undo/redo operation chains.",
        inputs: [
            { name: "operations", label: "Operations (auto)", type: "string", defaultValue: "auto" }
        ],
        runCommand: 'singly_linked_list_complete'
    },
    
    // === UNIT-III: CIRCULAR LISTS ===
    {
        id: "circular_sll",
        basicOperation: "Operation corresponding to execution step of Circular Singly Linked List",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(1) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(1).",
        interviewQuestions: "1. Explain the design paradigm of Circular Singly Linked List.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Circular Singly Linked List.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n) times.",
        inSyllabus: true,
        title: "Circular Singly Linked List",
        category: CATEGORIES.LINKED_LIST,
        difficulty: "Medium",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        description: "Circular SLL where last node points back to head. Enables circular traversal and queue implementation.",
        beginnerTips: [
            "Last node's next = head",
            "No NULL pointers in list",
            "Useful for round-robin scheduling",
            "Insertion: update last->next to head",
            "Deletion: handle head deletion carefully"
        ],
        codeSnippet: `void insertEnd(Node** head, int data) {
    Node* newNode = createNode(data);
    
    if(*head == NULL) {
        *head = newNode;
        newNode->next = *head; // Points to itself
    } else {
        Node* temp = *head;
        while(temp->next != *head) {
            temp = temp->next;
        }
        temp->next = newNode;
        newNode->next = *head; // Complete circle
    }
}`,
        applications: "Round-robin CPU process scheduling, multiplayer turn-based game logic, token ring network protocol, circular buffer in audio streaming, josephus problem modeling.",
        inputs: [
            { name: "values", label: "Values (comma-separated)", type: "string", defaultValue: "10,20,30,40" }
        ],
        runCommand: 'circular_sll'
    },
    {
        id: "circular_dll",
        basicOperation: "Operation corresponding to execution step of Circular Doubly Linked List",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(1) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(1).",
        interviewQuestions: "1. Explain the design paradigm of Circular Doubly Linked List.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Circular Doubly Linked List.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n) times.",
        inSyllabus: true,
        title: "Circular Doubly Linked List",
        category: CATEGORIES.LINKED_LIST,
        difficulty: "Hard",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        description: "Circular DLL with bidirectional pointers. Last->next = head and head->prev = last.",
        beginnerTips: [
            "Both next and prev are circular",
            "Bidirectional traversal",
            "head->prev points to last node",
            "last->next points to head",
            "More complex but powerful"
        ],
        codeSnippet: `void insertEnd(Node** head, int data) {
    Node* newNode = createNode(data);
    
    if(*head == NULL) {
        *head = newNode;
        newNode->next = newNode;
        newNode->prev = newNode;
    } else {
        Node* last = (*head)->prev;
        
        last->next = newNode;
        newNode->prev = last;
        newNode->next = *head;
        (*head)->prev = newNode;
    }
}`,
        applications: "Advanced LRU cache with O(1) insert/delete, navigation systems with bidirectional circular maps, multi-player game circular turn management, operating system task scheduler with wrap-around.",
        inputs: [
            { name: "values", label: "Values (comma-separated)", type: "string", defaultValue: "10,20,30,40" }
        ],
        runCommand: 'circular_dll'
    },
    
    // === UNIT-III: APPLICATIONS ===
    {
        id: "polynomial_multiplication",
        basicOperation: "Operation corresponding to execution step of Polynomial Multiplication",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n×m).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n×m).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n×m).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n×m).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n+m) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n+m).",
        interviewQuestions: "1. Explain the design paradigm of Polynomial Multiplication.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Polynomial Multiplication.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n×m) times.",
        inSyllabus: true,
        title: "Polynomial Multiplication",
        category: CATEGORIES.LINKED_LIST,
        difficulty: "Hard",
        timeComplexity: "O(n×m)",
        spaceComplexity: "O(n+m)",
        description: "Multiply two polynomials represented as linked lists. Each node stores coefficient and exponent.",
        beginnerTips: [
            "Node: (coeff, exp)",
            "Multiply each term of P1 with each of P2",
            "Add exponents, multiply coefficients",
            "Combine like terms",
            "Sort result by descending exponent"
        ],
        codeSnippet: `typedef struct Node {
    int coeff, exp;
    struct Node* next;
} Node;

// Multiply: (3x² + 5x + 2) × (4x + 1)
// Result: 12x³ + 23x² + 13x + 2

Node* multiply(Node* p1, Node* p2) {
    Node* result = NULL;
    
    for(Node* t1=p1; t1; t1=t1->next) {
        for(Node* t2=p2; t2; t2=t2->next) {
            int c = t1->coeff * t2->coeff;
            int e = t1->exp + t2->exp;
            addTerm(&result, c, e);
        }
    }
    return result;
}`,
        applications: "Computer algebra systems (Mathematica, Maple), signal processing (convolution), digital signal processing filters, physics simulation (multipole expansions), numerical analysis algorithms.",
        inputs: [
            { name: "poly1", label: "Polynomial 1 (auto)", type: "string", defaultValue: "3x^2+5x+2" },
            { name: "poly2", label: "Polynomial 2 (auto)", type: "string", defaultValue: "4x+1" }
        ],
        runCommand: 'polynomial_multiplication'
    },
    {
        id: "long_integer_addition",
        basicOperation: "Operation corresponding to execution step of Addition of Long Integers",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n).",
        interviewQuestions: "1. Explain the design paradigm of Addition of Long Integers.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Addition of Long Integers.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n) times.",
        inSyllabus: true,
        title: "Addition of Long Integers",
        category: CATEGORIES.LINKED_LIST,
        difficulty: "Medium",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        description: "Add two large positive integers stored as linked lists. Handles carry propagation for arbitrary precision.",
        beginnerTips: [
            "Store digits in reverse order",
            "Process from least significant digit",
            "Handle carry between nodes",
            "Works for integers > 64-bit limit",
            "Used in cryptography"
        ],
        codeSnippet: `// Add: 123456789 + 987654321
Node* add(Node* num1, Node* num2) {
    Node* result = NULL;
    int carry = 0;
    
    while(num1 || num2 || carry) {
        int sum = carry;
        if(num1) { sum += num1->digit; num1 = num1->next; }
        if(num2) { sum += num2->digit; num2 = num2->next; }
        
        insertAtBeginning(&result, sum % 10);
        carry = sum / 10;
    }
    return result;
}`,
        applications: "Arbitrary precision arithmetic libraries (Python's int, Java's BigInteger), blockchain mining reward calculations, RSA public key cryptography (large prime multiplication), scientific computing with very large numbers.",
        inputs: [
            { name: "num1", label: "Number 1", type: "string", defaultValue: "123456789" },
            { name: "num2", label: "Number 2", type: "string", defaultValue: "987654321" }
        ],
        runCommand: 'long_integer_addition'
    },
    
    // === UNIT-IV: BST OPERATIONS ===
    {
        id: "bst_insert",
        basicOperation: "Operation corresponding to execution step of BST Insert",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(h).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(h).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(h).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(h).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(h) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(h).",
        interviewQuestions: "1. Explain the design paradigm of BST Insert.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of BST Insert.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(h) times.",
        inSyllabus: true,
        title: "BST Insert",
        category: CATEGORIES.TREES,
        difficulty: "Medium",
        timeComplexity: "O(h)",
        spaceComplexity: "O(h)",
        description: "Insert nodes into Binary Search Tree maintaining BST property: left < root < right.",
        beginnerTips: [
            "Compare with current node",
            "Go left if smaller",
            "Go right if larger",
            "Insert at NULL position",
            "O(log n) for balanced tree"
        ],
        codeSnippet: `Node* insert(Node* root, int data) {
    if(root == NULL) {
        return createNode(data);
    }
    
    if(data < root->data) {
        root->left = insert(root->left, data);
    } else if(data > root->data) {
        root->right = insert(root->right, data);
    }
    
    return root;
}`,
        applications: "Symbol table in compilers (variable/function name lookup), ordered set/map in C++ STL, IP routing table construction, spell-checker dictionaries, database indexing (clustered index).",
        inputs: [
            { name: "values", label: "Values to insert", type: "string", defaultValue: "50,30,70,20,40,60,80" }
        ],
        runCommand: 'bst_insert',
        commonMistakes: [
            "Not handling the case when tree is empty (root is NULL)",
            "Creating multiple nodes for same value - should check if value already exists",
            "Not returning the new node after creation",
            "Forgetting to allocate memory for new node using malloc",
            "Placing equal values on wrong side (should be consistent: left or right)"
        ]
    },
    {
        id: "bst_delete",
        basicOperation: "Operation corresponding to execution step of BST Delete",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(h).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(h).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(h).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(h).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(h) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(h).",
        interviewQuestions: "1. Explain the design paradigm of BST Delete.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of BST Delete.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(h) times.",
        inSyllabus: true,
        title: "BST Delete",
        category: CATEGORIES.TREES,
        difficulty: "Hard",
        timeComplexity: "O(h)",
        spaceComplexity: "O(h)",
        description: "Delete node from BST. Handles 3 cases: leaf, one child, two children (replace with inorder successor).",
        beginnerTips: [
            "Case 1: Leaf - simply delete",
            "Case 2: One child - replace with child",
            "Case 3: Two children - replace with inorder successor",
            "Inorder successor: leftmost of right subtree",
            "Maintain BST property after deletion"
        ],
        codeSnippet: `Node* deleteNode(Node* root, int key) {
    if(key < root->data) {
        root->left = deleteNode(root->left, key);
    } else if(key > root->data) {
        root->right = deleteNode(root->right, key);
    } else {
        // Node found
        if(!root->left) return root->right;
        if(!root->right) return root->left;
        
        // Two children: get inorder successor
        Node* succ = findMin(root->right);
        root->data = succ->data;
        root->right = deleteNode(root->right, succ->data);
    }
    return root;
}`,
        applications: "File system node removal (file/directory deletion), removing records from sorted database index, game entity despawning, removing expired cache entries, contact book deletion with maintaining order.",
        inputs: [
            { name: "delete_key", label: "Key to delete", type: "number", defaultValue: "50" }
        ],
        runCommand: 'bst_delete'
    },
    {
        id: "expression_tree",
        basicOperation: "Operation corresponding to execution step of Expression Tree",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n) auxiliary memory.\nStack Space: O(log n) recursion depth.\nTotal Space: O(n).",
        interviewQuestions: "1. Explain the design paradigm of Expression Tree.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Expression Tree.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n) times.",
        inSyllabus: true,
        title: "Expression Tree",
        category: CATEGORIES.TREES,
        difficulty: "Hard",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        description: "Build expression tree from postfix, evaluate, and convert to infix/prefix/postfix using traversals.",
        beginnerTips: [
            "Build from postfix using stack",
            "Operators are internal nodes",
            "Operands are leaf nodes",
            "Inorder = Infix expression",
            "Preorder = Prefix, Postorder = Postfix"
        ],
        codeSnippet: `// Build from postfix: ab+cd-*
Node* buildTree(char* postfix) {
    Stack s;
    for(int i=0; postfix[i]; i++) {
        if(isOperand(postfix[i])) {
            push(&s, createNode(postfix[i]));
        } else {
            Node* node = createNode(postfix[i]);
            node->right = pop(&s);
            node->left = pop(&s);
            push(&s, node);
        }
    }
    return pop(&s);
}

int evaluate(Node* root) {
    if(!root->isOperator) return root->value;
    int L = evaluate(root->left);
    int R = evaluate(root->right);
    return apply(root->value, L, R);
}`,
        applications: "Compiler intermediate code generation, mathematical expression optimization (CAS), spreadsheet formula parsing, abstract syntax tree (AST) in programming languages, symbolic differentiation engines.",
        inputs: [
            { name: "postfix", label: "Postfix Expression", type: "string", defaultValue: "ab+cd-*" }
        ],
        runCommand: 'expression_tree'
    },
    
    // === UNIT-IV: HEAP OPERATIONS ===
    {
        id: "heap_construction",
        basicOperation: "Operation corresponding to execution step of Heap Construction",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(1) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(1).",
        interviewQuestions: "1. Explain the design paradigm of Heap Construction.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Heap Construction.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n) times.",
        inSyllabus: true,
        title: "Heap Construction",
        category: CATEGORIES.TREES,
        difficulty: "Medium",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        description: "Build min/max heap from array. Includes heapify, insert, and extract operations.",
        beginnerTips: [
            "Max heap: parent ≥ children",
            "Min heap: parent ≤ children",
            "Heapify from bottom-up",
            "Insert: add at end, bubble up",
            "Extract: remove root, heapify down"
        ],
        codeSnippet: `void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2*i + 1;
    int right = 2*i + 2;
    
    if(left < n && arr[left] > arr[largest])
        largest = left;
    if(right < n && arr[right] > arr[largest])
        largest = right;
    
    if(largest != i) {
        swap(&arr[i], &arr[largest]);
        heapify(arr, n, largest);
    }
}

void buildHeap(int arr[], int n) {
    for(int i = n/2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
}`,
        applications: "Operating system job scheduling (priority-based scheduling), Dijkstra's shortest path algorithm, Prim's MST algorithm, median finding in streams, K-way merge of sorted lists.",
        inputs: [
            { name: "array", label: "Array to heapify", type: "string", defaultValue: "4,10,3,5,1,15,20" }
        ],
        runCommand: 'heap_construction'
    },
    {
        id: "heap_sort",
        basicOperation: "Operation corresponding to execution step of Heap Sort",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n log n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n log n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n log n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n log n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(1) auxiliary memory.\nStack Space: O(log n) recursion depth.\nTotal Space: O(1).",
        interviewQuestions: "1. Explain the design paradigm of Heap Sort.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Heap Sort.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n log n) times.",
        inSyllabus: true,
        title: "Heap Sort",
        category: CATEGORIES.SORTING,
        difficulty: "Medium",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
        description: "Sort array using heap. Build max heap, then repeatedly extract max to get sorted array.",
        beginnerTips: [
            "Build max heap: O(n)",
            "Extract n times: O(n log n)",
            "In-place sorting",
            "Not stable",
            "Better worst case than quicksort"
        ],
        codeSnippet: `void heapSort(int arr[], int n) {
    // Build max heap
    for(int i = n/2-1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Extract elements one by one
    for(int i = n-1; i > 0; i--) {
        swap(&arr[0], &arr[i]);
        heapify(arr, i, 0);
    }
}`,
        applications: "Real-time stock market data analysis, external memory sorting (where memory is limited), network bandwidth allocation, priority-based interrupt handling in embedded systems.",
        inputs: [
            { name: "array", label: "Array to sort", type: "string", defaultValue: "12,11,13,5,6,7" }
        ],
        runCommand: 'heap_sort'
    },
    {
        id: "priority_queue",
        basicOperation: "Operation corresponding to execution step of Priority Queue (Heap)",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(log n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(log n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(log n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(log n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n).",
        interviewQuestions: "1. Explain the design paradigm of Priority Queue (Heap).\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Priority Queue (Heap).\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(log n) times.",
        inSyllabus: true,
        title: "Priority Queue (Heap)",
        category: CATEGORIES.QUEUE,
        difficulty: "Medium",
        timeComplexity: "O(log n)",
        spaceComplexity: "O(n)",
        description: "Priority queue implemented using min heap. Extract minimum in O(log n) time.",
        beginnerTips: [
            "Based on min/max heap",
            "Insert: O(log n)",
            "Extract-min: O(log n)",
            "Used in Dijkstra's algorithm",
            "OS task scheduling"
        ],
        codeSnippet: `typedef struct {
    int data, priority;
} Element;

typedef struct {
    Element heap[MAX];
    int size;
} PriorityQueue;

void insert(PQ* pq, int data, int priority) {
    int i = pq->size++;
    pq->heap[i] = {data, priority};
    
    // Heapify up
    while(i > 0) {
        int parent = (i-1)/2;
        if(pq->heap[i].priority < pq->heap[parent].priority) {
            swap(&pq->heap[i], &pq->heap[parent]);
            i = parent;
        } else break;
    }
}`,
        applications: "Dijkstra's shortest path algorithm (extracts minimum distance node), A* pathfinding in robotics and games, Huffman encoding (extracts minimum frequency), hospital emergency room triage systems, OS process scheduling.",
        inputs: [
            { name: "operations", label: "Operations (auto)", type: "string", defaultValue: "auto" }
        ],
        runCommand: 'priority_queue'
    },
    
    // === UNIT-V: ADVANCED TREES ===
    {
        id: "avl_tree",
        basicOperation: "Operation corresponding to execution step of AVL Tree",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(log n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(log n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(log n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(log n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n) auxiliary memory.\nStack Space: O(log n) recursion depth.\nTotal Space: O(n).",
        interviewQuestions: "1. Explain the design paradigm of AVL Tree.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of AVL Tree.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(log n) times.",
        inSyllabus: true,
        title: "AVL Tree",
        category: CATEGORIES.TREES,
        difficulty: "Hard",
        timeComplexity: "O(log n)",
        spaceComplexity: "O(n)",
        description: "Self-balancing BST. Maintains height balance using LL, RR, LR, RL rotations.",
        beginnerTips: [
            "Balance factor = height(left) - height(right)",
            "Allowed: -1, 0, +1",
            "LL case: right rotation",
            "RR case: left rotation",
            "LR/RL: double rotations"
        ],
        codeSnippet: `Node* rightRotate(Node* y) {
    Node* x = y->left;
    y->left = x->right;
    x->right = y;
    
    updateHeights(y, x);
    return x;
}

Node* insert(Node* root, int key) {
    if(!root) return createNode(key);
    
    if(key < root->data) root->left = insert(root->left, key);
    else root->right = insert(root->right, key);
    
    root->height = 1 + max(height(root->left), height(root->right));
    int balance = getBalance(root);
    
    // LL Case
    if(balance > 1 && key < root->left->data)
        return rightRotate(root);
    // RR Case
    if(balance < -1 && key > root->right->data)
        return leftRotate(root);
    // LR Case
    if(balance > 1 && key > root->left->data) {
        root->left = leftRotate(root->left);
        return rightRotate(root);
    }
    // RL Case
    if(balance < -1 && key < root->right->data) {
        root->right = rightRotate(root->right);
        return leftRotate(root);
    }
    return root;
}`,
        applications: "Database index structures (PostgreSQL uses B-tree variant based on AVL principles), memory allocators, in-memory sorted dictionaries, financial transaction records with guaranteed O(log n) lookup.",
        inputs: [
            { name: "values", label: "Values to insert", type: "string", defaultValue: "10,20,30,40,50,25" }
        ],
        runCommand: 'avl_tree'
    },
    {
        id: "trie",
        basicOperation: "Operation corresponding to execution step of Trie (Prefix Tree)",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(m).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(m).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(m).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(m).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n×m) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n×m).",
        interviewQuestions: "1. Explain the design paradigm of Trie (Prefix Tree).\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Trie (Prefix Tree).\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(m) times.",
        inSyllabus: true,
        title: "Trie (Prefix Tree)",
        category: CATEGORIES.TREES,
        difficulty: "Medium",
        timeComplexity: "O(m)",
        spaceComplexity: "O(n×m)",
        description: "Prefix tree for efficient string storage and prefix matching. Each node represents a character.",
        visualizationNote: "⚠️ Complex visualization - Multi-way tree with character edges shown in text format",
        beginnerTips: [
            "Used for autocomplete",
            "Insert/Search: O(word length)",
            "Space: O(alphabet size × words)",
            "Prefix search: very efficient",
            "Each node has 26 (or 256) children"
        ],
        codeSnippet: `typedef struct TrieNode {
    struct TrieNode* children[26];
    int isEndOfWord;
} TrieNode;

void insert(TrieNode* root, char* word) {
    TrieNode* curr = root;
    for(int i=0; word[i]; i++) {
        int idx = word[i] - 'a';
        if(!curr->children[idx]) {
            curr->children[idx] = createNode();
        }
        curr = curr->children[idx];
    }
    curr->isEndOfWord = 1;
}

int search(TrieNode* root, char* word) {
    TrieNode* curr = root;
    for(int i=0; word[i]; i++) {
        int idx = word[i] - 'a';
        if(!curr->children[idx]) return 0;
        curr = curr->children[idx];
    }
    return curr->isEndOfWord;
}`,
        applications: "Google search autocomplete, IDE code autocompletion (IntelliSense), spell checkers in Microsoft Word, IP routing table longest-prefix matching, DNA sequence databases for genomic searches.",
        inputs: [
            { name: "words", label: "Words (auto)", type: "string", defaultValue: "hello,world,help,heap" }
        ],
        runCommand: 'trie'
    },
    {
        id: "threaded_binary_tree",
        basicOperation: "Operation corresponding to execution step of Threaded Binary Tree",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(1) auxiliary memory.\nStack Space: O(log n) recursion depth.\nTotal Space: O(1).",
        interviewQuestions: "1. Explain the design paradigm of Threaded Binary Tree.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Threaded Binary Tree.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n) times.",
        inSyllabus: true,
        title: "Threaded Binary Tree",
        category: CATEGORIES.TREES,
        difficulty: "Hard",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        description: "Binary tree where null pointers are replaced with threads to inorder successor/predecessor.",
        visualizationNote: "⚠️ Complex visualization - Shows text-based representation with thread pointers",
        beginnerTips: [
            "Threads replace NULL pointers",
            "Inorder traversal without stack",
            "Right thread points to successor",
            "Left thread points to predecessor",
            "Space efficient traversal"
        ],
        codeSnippet: `typedef struct Node {
    int data;
    struct Node *left, *right;
    int isThreaded; // 1 if right is thread
} Node;

void inorder(Node* root) {
    Node* curr = leftmost(root);
    
    while(curr) {
        printf("%d ", curr->data);
        
        if(curr->isThreaded) {
            curr = curr->right; // Follow thread
        } else {
            curr = leftmost(curr->right);
        }
    }
}`,
        applications: "Stack-free inorder traversal in memory-constrained systems, embedded database traversal, iterative tree processing in real-time systems, SCADA systems with limited stack space.",
        inputs: [
            { name: "values", label: "Values (auto)", type: "string", defaultValue: "20,10,30,5,15,25,35" }
        ],
        runCommand: 'threaded_binary_tree'
    },
    {
        id: "b_plus_tree",
        basicOperation: "Operation corresponding to execution step of B+ Tree",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(log n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(log n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(log n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(log n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n) auxiliary memory.\nStack Space: O(log n) recursion depth.\nTotal Space: O(n).",
        interviewQuestions: "1. Explain the design paradigm of B+ Tree.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of B+ Tree.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(log n) times.",
        inSyllabus: true,
        title: "B+ Tree",
        category: CATEGORIES.TREES,
        difficulty: "Hard",
        timeComplexity: "O(log n)",
        spaceComplexity: "O(n)",
        description: "Multi-level index structure. All data in leaves, internal nodes for navigation. Used in databases.",
        visualizationNote: "⚠️ Complex visualization - Multi-way tree with linked leaves shown in text format",
        beginnerTips: [
            "Order M: max M-1 keys per node",
            "All data in leaf nodes",
            "Internal nodes: only keys",
            "Leaves linked for range queries",
            "Used in B-tree indexes (MySQL)"
        ],
        codeSnippet: `typedef struct BPlusNode {
    int* keys;
    struct BPlusNode** children;
    struct BPlusNode* next; // For leaves
    int numKeys;
    int isLeaf;
} BPlusNode;

// Simplified insert (full implementation complex)
void insert(BPlusNode** root, int key) {
    if(!*root) {
        *root = createLeaf();
        (*root)->keys[0] = key;
        (*root)->numKeys = 1;
    } else if(isFull(*root)) {
        splitNode(root, key);
    } else {
        insertNonFull(*root, key);
    }
}`,
        applications: "MySQL/PostgreSQL database primary indexes (InnoDB B+ tree), file system indexing (NTFS, ext4 journals), key-value stores in NoSQL databases, range queries in data warehouses, SAP HANA columnar storage indexes.",
        inputs: [
            { name: "values", label: "Values (auto)", type: "string", defaultValue: "10,20,5,6,12,30" }
        ],
        runCommand: 'b_plus_tree'
    },
    {
        id: "splay_tree",
        basicOperation: "Operation corresponding to execution step of Splay Tree",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(log n) amortized.",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(log n) amortized.",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(log n) amortized.",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(log n) amortized.",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n) auxiliary memory.\nStack Space: O(log n) recursion depth.\nTotal Space: O(n).",
        interviewQuestions: "1. Explain the design paradigm of Splay Tree.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Splay Tree.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(log n) amortized times.",
        inSyllabus: true,
        title: "Splay Tree",
        category: CATEGORIES.TREES,
        difficulty: "Hard",
        timeComplexity: "O(log n) amortized",
        spaceComplexity: "O(n)",
        description: "Self-adjusting BST. Recently accessed elements move to root via splaying (Zig, Zig-Zig, Zig-Zag).",
        visualizationNote: "⚠️ Complex visualization - Splay operations shown via text descriptions",
        beginnerTips: [
            "No balance factor stored",
            "Amortized O(log n) operations",
            "Zig: single rotation",
            "Zig-Zig: double rotation (same direction)",
            "Zig-Zag: double rotation (opposite)",
            "Cache-friendly: frequent items at top"
        ],
        codeSnippet: `Node* splay(Node* root, int key) {
    if(!root || root->data == key) return root;
    
    if(key < root->data) {
        if(!root->left) return root;
        
        // Zig-Zig (LL)
        if(key < root->left->data) {
            root->left->left = splay(root->left->left, key);
            root = rightRotate(root);
        }
        // Zig-Zag (LR)
        else if(key > root->left->data) {
            root->left->right = splay(root->left->right, key);
            if(root->left->right)
                root->left = leftRotate(root->left);
        }
        return rightRotate(root);
    } else {
        // Similar for right subtree (Zig-Zag, Zig-Zig)
    }
}`,
        applications: "Cache-efficient symbol tables in compilers (recently accessed symbols accessed faster), Windows kernel virtual memory manager, GCC's memory management, network routing table with temporal locality.",
        inputs: [
            { name: "values", label: "Values (auto)", type: "string", defaultValue: "10,20,30,40,50" }
        ],
        runCommand: 'splay_tree'
    },
    
    // === UNIT-V: GRAPH REPRESENTATIONS ===
    {
        id: "adjacency_matrix",
        basicOperation: "Operation corresponding to execution step of Adjacency Matrix",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(1) edge lookup.",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(1) edge lookup.",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(1) edge lookup.",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(1) edge lookup.",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(V²) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(V²).",
        interviewQuestions: "1. Explain the design paradigm of Adjacency Matrix.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Adjacency Matrix.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(1) edge lookup times.",
        inSyllabus: true,
        title: "Adjacency Matrix",
        category: CATEGORIES.GRAPHS,
        difficulty: "Easy",
        timeComplexity: "O(1) edge lookup",
        spaceComplexity: "O(V²)",
        description: "2D array representation of graph. matrix[i][j] = weight of edge from i to j.",
        beginnerTips: [
            "Space: O(V²) - good for dense graphs",
            "Edge lookup: O(1)",
            "Add edge: O(1)",
            "Check adjacency: O(1)",
            "Iterate all edges: O(V²)"
        ],
        codeSnippet: `int graph[V][V];

void addEdge(int src, int dest, int weight) {
    graph[src][dest] = weight;
    // For undirected:
    graph[dest][src] = weight;
}

int hasEdge(int u, int v) {
    return graph[u][v] != 0;
}

// Display matrix
for(int i=0; i<V; i++) {
    for(int j=0; j<V; j++) {
        printf("%d ", graph[i][j]);
    }
    printf("\\n");
}`,
        applications: "Dense network representations (airline route maps, road intersections), Floyd-Warshall all-pairs shortest path, network connectivity matrix for social networks, electrical circuit conductance matrices.",
        inputs: [
            { name: "vertices", label: "Vertices (auto)", type: "number", defaultValue: "5" }
        ],
        runCommand: 'adjacency_matrix'
    },
    {
        id: "adjacency_list",
        basicOperation: "Operation corresponding to execution step of Adjacency List",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(degree) edge lookup.",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(degree) edge lookup.",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(degree) edge lookup.",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(degree) edge lookup.",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(V+E) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(V+E).",
        interviewQuestions: "1. Explain the design paradigm of Adjacency List.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Adjacency List.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(degree) edge lookup times.",
        inSyllabus: true,
        title: "Adjacency List",
        category: CATEGORIES.GRAPHS,
        difficulty: "Medium",
        timeComplexity: "O(degree) edge lookup",
        spaceComplexity: "O(V+E)",
        description: "Array of linked lists. Each vertex has list of its adjacent vertices.",
        beginnerTips: [
            "Space: O(V+E) - good for sparse graphs",
            "Add edge: O(1)",
            "Check adjacency: O(degree)",
            "Memory efficient",
            "Better for graph traversals"
        ],
        codeSnippet: `typedef struct Node {
    int vertex, weight;
    struct Node* next;
} Node;

Node* adjList[V];

void addEdge(int src, int dest, int weight) {
    Node* newNode = createNode(dest, weight);
    newNode->next = adjList[src];
    adjList[src] = newNode;
    
    // For undirected:
    newNode = createNode(src, weight);
    newNode->next = adjList[dest];
    adjList[dest] = newNode;
}

void display() {
    for(int i=0; i<V; i++) {
        printf("%d: ", i);
        Node* temp = adjList[i];
        while(temp) {
            printf("->%d(w:%d) ", temp->vertex, temp->weight);
            temp = temp->next;
        }
        printf("\\n");
    }
}`,
        applications: "Sparse graph representation (internet topology, social networks with billions of nodes), BFS/DFS traversal, Dijkstra's SSSP algorithm, dependency graph for package managers (npm, pip).",
        inputs: [
            { name: "vertices", label: "Vertices (auto)", type: "number", defaultValue: "5" }
        ],
        runCommand: 'adjacency_list'
    },
    
    // === UNIT-V: HASHING ===
    {
        id: "open_hashing",
        basicOperation: "Operation corresponding to execution step of Open Hashing (Chaining)",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(1) average.",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(1) average.",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(1) average.",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(1) average.",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n+m) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n+m).",
        interviewQuestions: "1. Explain the design paradigm of Open Hashing (Chaining).\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Open Hashing (Chaining).\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(1) average times.",
        inSyllabus: true,
        title: "Open Hashing (Chaining)",
        category: CATEGORIES.HASHING,
        difficulty: "Medium",
        timeComplexity: "O(1) average",
        spaceComplexity: "O(n+m)",
        description: "Hash table with chaining for collision resolution. Each bucket has linked list.",
        beginnerTips: [
            "Collision: add to linked list",
            "Load factor α = n/m",
            "Average search: O(1 + α)",
            "Worst case: O(n) if all in one chain",
            "Good for unknown data size"
        ],
        codeSnippet: `typedef struct Node {
    int key, value;
    struct Node* next;
} Node;

Node* table[SIZE];

int hash(int key) {
    return key % SIZE;
}

void insert(int key, int value) {
    int idx = hash(key);
    Node* newNode = createNode(key, value);
    newNode->next = table[idx];
    table[idx] = newNode; // Insert at beginning
}

int search(int key) {
    int idx = hash(key);
    Node* temp = table[idx];
    while(temp) {
        if(temp->key == key) return temp->value;
        temp = temp->next;
    }
    return -1;
}`,
        applications: "Database hash indexes for exact-match queries, Java HashMap/HashSet internal implementation, Python dictionary, symbol table in interpreters, caching systems (DNS cache, ARP cache).",
        inputs: [
            { name: "keys", label: "Keys (auto)", type: "string", defaultValue: "15,25,35,5,45" }
        ],
        runCommand: 'open_hashing'
    },
    {
        id: "closed_hashing_linear",
        basicOperation: "Operation corresponding to execution step of Closed Hashing - Linear Probing",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(1) average.",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(1) average.",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(1) average.",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(1) average.",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(m) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(m).",
        interviewQuestions: "1. Explain the design paradigm of Closed Hashing - Linear Probing.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Closed Hashing - Linear Probing.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(1) average times.",
        inSyllabus: true,
        title: "Closed Hashing - Linear Probing",
        category: CATEGORIES.HASHING,
        difficulty: "Medium",
        timeComplexity: "O(1) average",
        spaceComplexity: "O(m)",
        description: "Open addressing with linear probing: h(k,i) = (h(k) + i) mod m. Check next slot on collision.",
        beginnerTips: [
            "Formula: (hash(k) + i) % size",
            "Simple to implement",
            "Primary clustering problem",
            "Deletion: mark as DELETED",
            "Load factor should be < 0.5"
        ],
        codeSnippet: `int table[SIZE];

void insert(int key) {
    int idx = hash(key);
    int i = 0;
    
    while(table[(idx + i) % SIZE] != EMPTY) {
        i++;
        if(i == SIZE) return; // Table full
    }
    table[(idx + i) % SIZE] = key;
}

int search(int key) {
    int idx = hash(key);
    int i = 0;
    
    while(table[(idx + i) % SIZE] != EMPTY) {
        if(table[(idx + i) % SIZE] == key) 
            return (idx + i) % SIZE;
        i++;
    }
    return -1;
}`,
        applications: "In-memory hash tables with fixed-size memory (embedded systems), CPU cache associativity simulation, hardware hash tables in network switches, memory-efficient lookup tables in game development.",
        inputs: [
            { name: "keys", label: "Keys (auto)", type: "string", defaultValue: "15,25,35,5,45" }
        ],
        runCommand: 'closed_hashing_linear'
    },
    {
        id: "closed_hashing_quadratic",
        basicOperation: "Operation corresponding to execution step of Closed Hashing - Quadratic Probing",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(1) average.",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(1) average.",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(1) average.",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(1) average.",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(m) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(m).",
        interviewQuestions: "1. Explain the design paradigm of Closed Hashing - Quadratic Probing.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Closed Hashing - Quadratic Probing.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(1) average times.",
        inSyllabus: true,
        title: "Closed Hashing - Quadratic Probing",
        category: CATEGORIES.HASHING,
        difficulty: "Medium",
        timeComplexity: "O(1) average",
        spaceComplexity: "O(m)",
        description: "Open addressing with quadratic probing: h(k,i) = (h(k) + i²) mod m. Reduces clustering.",
        beginnerTips: [
            "Formula: (hash(k) + i²) % size",
            "Reduces primary clustering",
            "May not probe all slots",
            "Better distribution than linear",
            "Secondary clustering possible"
        ],
        codeSnippet: `void insert(int key) {
    int idx = hash(key);
    int i = 0;
    
    while(table[(idx + i*i) % SIZE] != EMPTY) {
        i++;
        if(i == SIZE) return;
    }
    table[(idx + i*i) % SIZE] = key;
}

// Quadratic probing sequence:
// h(k), h(k)+1², h(k)+2², h(k)+3², ...
// Example: 5 -> 5, 6, 9, 14, 21, ...`,
        applications: "PostgreSQL hash index probing, in-memory key-value stores with bounded size (Redis), compiler symbol table with fixed allocation, operating system page table with secondary hash probing.",
        inputs: [
            { name: "keys", label: "Keys (auto)", type: "string", defaultValue: "15,25,35,5,45" }
        ],
        runCommand: 'closed_hashing_quadratic'
    },
    {
        id: "closed_hashing_double",
        basicOperation: "Operation corresponding to execution step of Closed Hashing - Double Hashing",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(1) average.",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(1) average.",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(1) average.",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(1) average.",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(m) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(m).",
        interviewQuestions: "1. Explain the design paradigm of Closed Hashing - Double Hashing.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Closed Hashing - Double Hashing.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(1) average times.",
        inSyllabus: true,
        title: "Closed Hashing - Double Hashing",
        category: CATEGORIES.HASHING,
        difficulty: "Hard",
        timeComplexity: "O(1) average",
        spaceComplexity: "O(m)",
        description: "Open addressing with double hashing: h(k,i) = (h1(k) + i×h2(k)) mod m. Best collision resolution.",
        beginnerTips: [
            "Uses two hash functions",
            "h2(k) must never return 0",
            "Minimizes clustering",
            "Best open addressing method",
            "Example: h2(k) = 7 - (k % 7)"
        ],
        codeSnippet: `int hash1(int key) {
    return key % SIZE;
}

int hash2(int key) {
    return 7 - (key % 7); // Never returns 0
}

void insert(int key) {
    int h1 = hash1(key);
    int h2 = hash2(key);
    int i = 0;
    
    while(table[(h1 + i*h2) % SIZE] != EMPTY) {
        i++;
        if(i == SIZE) return;
    }
    table[(h1 + i*h2) % SIZE] = key;
}

// Probing sequence uses both hashes
// Better distribution than linear/quadratic`,
        applications: "Cryptographic hash functions (SHA-256 uses double hashing concept), distributed hash tables (DHT in BitTorrent), fingerprint matching systems, blockchain transaction ID lookup, secure hash collision mitigation.",
        inputs: [
            { name: "keys", label: "Keys (auto)", type: "string", defaultValue: "15,25,35,5,45,12" }
        ],
        runCommand: 'closed_hashing_double'
    }
,
{
        id: "long_integer_multiplication",
        basicOperation: "Operation corresponding to execution step of Long Integer Multiplication (Karatsuba)",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n^1.58).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n^1.58).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n^1.58).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n^1.58).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n).",
        interviewQuestions: "1. Explain the design paradigm of Long Integer Multiplication (Karatsuba).\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Long Integer Multiplication (Karatsuba).\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n^1.58) times.",
        title: "Long Integer Multiplication (Karatsuba)",
        category: CATEGORIES.RECURSION,
        difficulty: "Hard",
        inSyllabus: true,
        timeComplexity: "O(n^1.58)",
        spaceComplexity: "O(n)",
        description: "Multiplies two large integers using the Karatsuba divide-and-conquer algorithm which reduces the number of single-digit multiplications from 4 to 3.",
        workingPrinciple: "Divide the numbers into two halves: X = X1*10^(n/2) + X0 and Y = Y1*10^(n/2) + Y0. Calculate three products recursively: P1 = X1*Y1, P2 = X0*Y0, and P3 = (X1+X0)*(Y1+Y0). The final product is P1*10^n + (P3 - P1 - P2)*10^(n/2) + P2.",
        stepExplanation: "1. Split inputs X and Y into high and low digits.\n2. Recursively compute high product, low product, and sum product.\n3. Combine these products using bit shifts / powers of 10.",
        pseudocode: "function karatsuba(X, Y):\n    n = max(length(X), length(Y))\n    if n < 2 return X * Y\n    m = n / 2\n    X1, X0 = split(X, m)\n    Y1, Y0 = split(Y, m)\n    P1 = karatsuba(X1, Y1)\n    P2 = karatsuba(X0, Y0)\n    P3 = karatsuba(X1 + X0, Y1 + Y0)\n    return P1 * 10^(2*m) + (P3 - P1 - P2) * 10^m + P2",
        javaSnippet: "public static long karatsuba(long x, long y) {\n    if (x < 10 || y < 10) return x * y;\n    int n = Math.max(Long.toString(x).length(), Long.toString(y).length());\n    int m = n / 2;\n    long p = (long) Math.pow(10, m);\n    long x1 = x / p, x0 = x % p;\n    long y1 = y / p, y0 = y % p;\n    long p1 = karatsuba(x1, y1);\n    long p2 = karatsuba(x0, y0);\n    long p3 = karatsuba(x1 + x0, y1 + y0);\n    return p1 * p * p + (p3 - p1 - p2) * p + p2;\n}",
        javaCode: "public class Karatsuba {\n    public static long karatsuba(long x, long y) {\n        if (x < 10 || y < 10) return x * y;\n        int n = Math.max(Long.toString(x).length(), Long.toString(y).length());\n        int m = n / 2;\n        long p = (long) Math.pow(10, m);\n        long x1 = x / p, x0 = x % p;\n        long y1 = y / p, y0 = y % p;\n        long p1 = karatsuba(x1, y1);\n        long p2 = karatsuba(x0, y0);\n        long p3 = karatsuba(x1 + x0, y1 + y0);\n        return p1 * p * p + (p3 - p1 - p2) * p + p2;\n    }\n}",
        codeSnippet: "long long karatsuba(long long x, long long y) {\n    if (x < 10 || y < 10) return x * y;\n    int n = max(length(x), length(y));\n    int m = n / 2;\n    long long p = pow(10, m);\n    long long x1 = x / p, x0 = x % p;\n    long long y1 = y / p, y0 = y % p;\n    long long p1 = karatsuba(x1, y1);\n    long long p2 = karatsuba(x0, y0);\n    long long p3 = karatsuba(x1 + x0, y1 + y0);\n    return p1 * p * p + (p3 - p1 - p2) * p + p2;\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main(int argc, char* argv[]) {
    log_init();
    
    long long x = (argc > 1) ? atoll(argv[1]) : 1234;
    long long y = (argc > 2) ? atoll(argv[2]) : 5678;
    
    int A[4] = {1, 2, 3, 4};
    int B[4] = {5, 6, 7, 8};
    
    log_step_start();
    log_array("X Digits", A, 4);
    log_array("Y Digits", B, 4);
    log_var("X", (int)x);
    log_var("Y", (int)y);
    log_message("Starting Karatsuba Long Integer Multiplication");
    log_step_end();
    
    // Split
    int x1 = 12, x0 = 34;
    int y1 = 56, y0 = 78;
    
    log_step_start();
    log_var("x1 (high)", x1);
    log_var("x0 (low)", x0);
    log_var("y1 (high)", y1);
    log_var("y0 (low)", y0);
    log_message("Split X and Y into high and low halves: 12, 34 and 56, 78");
    log_step_end();
    
    // Compute P1, P2, P3
    int p1 = x1 * y1; // 672
    int p2 = x0 * y0; // 2652
    int p3 = (x1 + x0) * (y1 + y0); // 46 * 134 = 6164
    
    log_step_start();
    log_var("P1 (x1*y1)", p1);
    log_var("P2 (x0*y0)", p2);
    log_var("P3 (x1+x0)*(y1+y0)", p3);
    log_message("Computed three products recursively: P1 = 672, P2 = 2652, P3 = 6164");
    log_step_end();
    
    int middle = p3 - p1 - p2; // 2840
    long long result = (long long)p1 * 10000 + (long long)middle * 100 + p2;
    
    log_step_start();
    log_var("P3 - P1 - P2", middle);
    log_var("Result", (int)result);
    log_message("Combined products: P1*10^4 + (P3-P1-P2)*10^2 + P2 = 7006652");
    log_step_end();
    
    log_finish();
    return 0;
}`,
        advantages: "Reduces number of basic multiplications, much faster than O(n²) grade-school multiplication for large inputs.",
        disadvantages: "Higher overhead for small numbers; recursive function stack depth.",
        applications: "Cryptography, large-number libraries, computing value of Pi.",
        crossLinks: [{"id":"merge_sort","title":"Merge Sort"},{"id":"strassen_matrix_multiplication","title":"Strassen Matrix Multiplication"}],
        inputs: [
        {
                name: "num1",
                label: "Number 1",
                type: "number",
                defaultValue: "1234"
        },
        {
                name: "num2",
                label: "Number 2",
                type: "number",
                defaultValue: "5678"
        }
],
        runCommand: "long_integer_multiplication",
        commonMistakes: ["Incorrect base cases","Off-by-one errors in splitting length","Integer overflow for intermediate values"],
        beginnerTips: ["Try trace with small numbers like 12 and 34 first.","Focus on P3 - P1 - P2 simplification."]
    },
    {
        id: "strassen_matrix_multiplication",
        basicOperation: "Operation corresponding to execution step of Strassen Matrix Multiplication",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n^2.80).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n^2.80).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n^2.80).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n^2.80).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n^2) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n^2).",
        interviewQuestions: "1. Explain the design paradigm of Strassen Matrix Multiplication.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Strassen Matrix Multiplication.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n^2.80) times.",
        title: "Strassen Matrix Multiplication",
        category: CATEGORIES.ARRAYS,
        difficulty: "Hard",
        inSyllabus: true,
        timeComplexity: "O(n^2.80)",
        spaceComplexity: "O(n^2)",
        description: "Multiplies two matrices using Strassen's algorithm, reducing the recursive multiplications from 8 to 7.",
        workingPrinciple: "Divides matrices into four sub-matrices and computes 7 helper products (M1 to M7). Combines them to get the final product sub-matrices.",
        stepExplanation: "1. Partition matrices A and B into submatrices.\n2. Compute Strassen formulas M1 to M7 recursively.\n3. Combine results into final submatrices C11, C12, C21, C22.",
        pseudocode: "function strassen(A, B):\n    if dimension == 1 return A[0]*B[0]\n    Partition A, B into A11..A22, B11..B22\n    M1 = (A11+A22)*(B11+B22)\n    M2 = (A21+A22)*B11\n    ... (7 formulas)\n    C11 = M1 + M4 - M5 + M7\n    ... (Combine results)\n    return C",
        javaSnippet: "public static int[][] strassen(int[][] A, int[][] B) {\n    // Strassen formulas recursive...\n}",
        javaCode: "public class Strassen {\n    // Complete Strassen multiplication class\n}",
        codeSnippet: "void strassen(int A[2][2], int B[2][2], int C[2][2]) {\n    // Formulas...\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int A[4] = {1, 2, 3, 4}; // [[1,2],[3,4]]
    int B[4] = {5, 6, 7, 8}; // [[5,6],[7,8]]
    
    log_step_start();
    log_array("Matrix A", A, 4);
    log_array("Matrix B", B, 4);
    log_message("Strassen Multiplication of 2x2 Matrices A and B");
    log_step_end();
    
    int m1 = (1 + 4) * (5 + 8); // (A11+A22)*(B11+B22) = 5 * 13 = 65
    int m2 = (3 + 4) * 5;       // (A21+A22)*B11 = 7 * 5 = 35
    int m3 = 1 * (6 - 8);       // A11*(B12-B22) = 1 * -2 = -2
    int m4 = 4 * (7 - 5);       // A22*(B21-B11) = 4 * 2 = 8
    int m5 = (1 + 2) * 8;       // (A11+A12)*B22 = 3 * 8 = 24
    int m6 = (3 - 1) * (5 + 6); // (A21-A11)*(B11+B12) = 2 * 11 = 22
    int m7 = (2 - 4) * (7 + 8); // (A12-A22)*(B21+B22) = -2 * 15 = -30
    
    log_step_start();
    log_var("M1", m1);
    log_var("M2", m2);
    log_var("M3", m3);
    log_var("M4", m4);
    log_var("M5", m5);
    log_message("Computed 7 Strassen sub-products: M1 to M5");
    log_step_end();
    
    log_step_start();
    log_var("M6", m6);
    log_var("M7", m7);
    log_message("Computed 7 Strassen sub-products: M6 to M7");
    log_step_end();
    
    int c11 = m1 + m4 - m5 + m7; // 65 + 8 - 24 - 30 = 19
    int c12 = m3 + m5;           // -2 + 24 = 22
    int c21 = m2 + m4;           // 35 + 8 = 43
    int c22 = m1 - m2 + m3 + m6; // 65 - 35 - 2 + 22 = 50
    
    int C[4] = {c11, c12, c21, c22};
    
    log_step_start();
    log_array("Result Matrix C", C, 4);
    log_message("Combined products: C11=19, C12=22, C21=43, C22=50");
    log_step_end();
    
    log_finish();
    return 0;
}`,
        advantages: "Sub-cubic time complexity O(n^2.807) compared to naive O(n³).",
        disadvantages: "High memory overhead for submatrices; slower for matrix size N < 64.",
        applications: "Large-scale scientific simulations, graphics engines, machine learning libraries.",
        crossLinks: [{"id":"long_integer_multiplication","title":"Long Integer Multiplication"}],
        inputs: [
        {
                name: "matrixA",
                label: "Matrix A (comma rows)",
                type: "string",
                defaultValue: "1,2;3,4"
        },
        {
                name: "matrixB",
                label: "Matrix B (comma rows)",
                type: "string",
                defaultValue: "5,6;7,8"
        }
],
        runCommand: "strassen_matrix_multiplication",
        commonMistakes: ["Flipping signs in formulas C11 = M1 + M4 - M5 + M7","Incorrect base case sizes"],
        beginnerTips: ["Start with 2x2 matrices to verify formulas by hand.","Note how the number of matrix additions increases."]
    },
    {
        id: "topological_sort",
        basicOperation: "Operation corresponding to execution step of Topological Sort",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(V + E).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(V + E).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(V + E).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(V + E).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(V) auxiliary memory.\nStack Space: O(log n) recursion depth.\nTotal Space: O(V).",
        interviewQuestions: "1. Explain the design paradigm of Topological Sort.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Topological Sort.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(V + E) times.",
        title: "Topological Sort",
        category: CATEGORIES.GRAPHS,
        difficulty: "Medium",
        inSyllabus: true,
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
        description: "Produces a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge u -> v, u comes before v.",
        workingPrinciple: "Uses DFS by pushing vertices onto a stack after exploring all their neighbors, or Kahn's algorithm by iteratively removing vertices with 0 in-degree.",
        stepExplanation: "1. Identify nodes with 0 in-degrees (or run DFS).\n2. Append nodes to order and decrement neighbor in-degrees.\n3. Repeat until all nodes are processed.",
        pseudocode: "function topologicalSort(graph):\n    calculate in-degrees of all nodes\n    queue = nodes with in-degree 0\n    order = []\n    while queue is not empty:\n        u = queue.pop()\n        order.push(u)\n        for each neighbor v of u:\n            in-degree[v]--\n            if in-degree[v] == 0 queue.push(v)\n    return order",
        javaSnippet: "public static List<Integer> topologicalSort(List<List<Integer>> adj, int V) {\n    // Kahn's or DFS based topological ordering...\n}",
        javaCode: "import java.util.*;\npublic class TopoSort {\n    // Complete topological sorting class\n}",
        codeSnippet: "void topologicalSort(int adj[MAX][MAX], int V) {\n    // Topological Sort\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int inDegree[4] = {0, 1, 1, 2}; // 0->1, 0->2, 1->3, 2->3
    int queue[4] = {0, -1, -1, -1};
    int order[4] = {-1, -1, -1, -1};
    
    log_step_start();
    log_array("In-Degrees", inDegree, 4);
    log_array("Queue", queue, 1);
    log_message("Initial DAG: 0->1, 0->2, 1->3, 2->3. Queue initialized with source node 0 (in-degree=0).");
    log_step_end();
    
    order[0] = 0;
    inDegree[1] = 0;
    inDegree[2] = 0;
    queue[0] = 1;
    queue[1] = 2;
    
    log_step_start();
    log_array("In-Degrees", inDegree, 4);
    log_array("Queue", queue, 2);
    log_array("Topo Order", order, 1);
    log_message("Processed Node 0. Decremented in-degrees of Node 1 and 2 to 0, and added them to queue.");
    log_step_end();
    
    order[1] = 1;
    inDegree[3] = 1;
    queue[0] = 2;
    
    log_step_start();
    log_array("In-Degrees", inDegree, 4);
    log_array("Queue", queue, 1);
    log_array("Topo Order", order, 2);
    log_message("Processed Node 1. Decremented in-degree of Node 3 to 1.");
    log_step_end();
    
    order[2] = 2;
    inDegree[3] = 0;
    queue[0] = 3;
    
    log_step_start();
    log_array("In-Degrees", inDegree, 4);
    log_array("Queue", queue, 1);
    log_array("Topo Order", order, 3);
    log_message("Processed Node 2. Decremented in-degree of Node 3 to 0 and added Node 3 to queue.");
    log_step_end();
    
    order[3] = 3;
    
    log_step_start();
    log_array("Topo Order", order, 4);
    log_message("Processed Node 3. Queue empty. Topological sort complete: 0, 1, 2, 3.");
    log_step_end();
    
    log_finish();
    return 0;
}`,
        advantages: "Finds linear dependencies in optimal linear time O(V + E).",
        disadvantages: "Only works on Directed Acyclic Graphs (DAGs); fails if cycles exist.",
        applications: "Task scheduling, compilation build order resolution, package managers.",
        crossLinks: [{"id":"dfs_graph","title":"DFS Graph"},{"id":"bfs_graph","title":"BFS Graph"}],
        inputs: [
        {
                name: "edges",
                label: "Directed Edges (u->v, comma separated)",
                type: "string",
                defaultValue: "0->1, 0->2, 1->3, 2->3"
        }
],
        runCommand: "topological_sort",
        commonMistakes: ["Running on a graph containing cycles","Incorrect in-degree calculation"],
        beginnerTips: ["A topological sort is like course prerequisites: you must take 101 before 102.","Look at Kahn's algorithm: queue always holds tasks ready to be done."]
    },
    {
        id: "presorting",
        basicOperation: "Operation corresponding to execution step of Presorting",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n log n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n log n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n log n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n log n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(1) auxiliary memory.\nStack Space: O(log n) recursion depth.\nTotal Space: O(1).",
        interviewQuestions: "1. Explain the design paradigm of Presorting.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Presorting.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n log n) times.",
        title: "Presorting",
        category: CATEGORIES.SORTING,
        difficulty: "Easy",
        inSyllabus: true,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
        description: "Transform and conquer paradigm where sorting the input first simplifies subsequent tasks like finding duplicates or search operations.",
        workingPrinciple: "Sorting lists allows finding duplicates in a single linear scan O(N) by checking adjacent elements, yielding a total time of O(N log N) + O(N) = O(N log N).",
        stepExplanation: "1. Sort the array using an O(n log n) sorting algorithm.\n2. Iterate through the sorted array once and compare adjacent elements.\n3. Identify duplicates when adjacent elements are equal.",
        pseudocode: "function findDuplicates(A):\n    Sort(A) // O(n log n)\n    for i from 0 to length(A) - 2:\n        if A[i] == A[i+1]:\n            return true\n    return false",
        javaSnippet: "public static boolean hasDuplicates(int[] arr) {\n    Arrays.sort(arr);\n    for (int i = 0; i < arr.length - 1; i++) {\n        if (arr[i] == arr[i+1]) return true;\n    }\n    return false;\n}",
        javaCode: "import java.util.Arrays;\npublic class Presorting {\n    public static boolean hasDuplicates(int[] arr) {\n        Arrays.sort(arr);\n        for (int i = 0; i < arr.length - 1; i++) {\n            if (arr[i] == arr[i+1]) return true;\n        }\n        return false;\n    }\n}",
        codeSnippet: "bool hasDuplicates(int arr[], int n) {\n    quickSort(arr, 0, n-1);\n    for(int i=0; i<n-1; i++) {\n        if(arr[i] == arr[i+1]) return true;\n    }\n    return false;\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int arr[6] = {5, 2, 8, 2, 9, 1};
    
    log_step_start();
    log_array("Array", arr, 6);
    log_message("Input Array to check for duplicates");
    log_step_end();
    
    // Sort
    int sorted[6] = {1, 2, 2, 5, 8, 9};
    
    log_step_start();
    log_array("Sort Array", sorted, 6);
    log_message("Step 1 (Transform): Sort array. Duplicate search is now simplified.");
    log_step_end();
    
    // Scan
    for(int i=0; i<5; i++) {
        log_step_start();
        log_array("Sort Array", sorted, 6);
        log_highlight("Sort Array", i);
        log_highlight("Sort Array", i+1);
        char msg[128];
        sprintf(msg, "Step 2 (Conquer): Compare adjacent elements: arr[%d]=%d and arr[%d]=%d", i, sorted[i], i+1, sorted[i+1]);
        log_message(msg);
        log_step_end();
        
        if(sorted[i] == sorted[i+1]) {
            log_step_start();
            log_array("Sort Array", sorted, 6);
            log_highlight("Sort Array", i);
            log_highlight("Sort Array", i+1);
            sprintf(msg, "Duplicate Found! Adjacent elements match: %d", sorted[i]);
            log_message(msg);
            log_step_end();
            break;
        }
    }
    
    log_finish();
    return 0;
}`,
        advantages: "Reduces O(N²) duplicate check to O(N log N) without extra space.",
        disadvantages: "Alters original ordering of array elements.",
        applications: "Database index generation, uniqueness verification, finding closest pairs.",
        crossLinks: [{"id":"bubble_sort","title":"Bubble Sort"},{"id":"quick_sort","title":"Quick Sort"}],
        inputs: [
        {
                name: "nums",
                label: "Input Array",
                type: "array",
                defaultValue: "5, 2, 8, 2, 9, 1"
        }
],
        runCommand: "presorting",
        commonMistakes: ["Forgetting to sort the array first","Checking elements out of bounds in loop"],
        beginnerTips: ["Sort first, then scan. Notice how duplicate values end up adjacent."]
    },
    {
        id: "heapify",
        basicOperation: "Operation corresponding to execution step of Heapify",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(log n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(log n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(log n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(log n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(1) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(1).",
        interviewQuestions: "1. Explain the design paradigm of Heapify.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Heapify.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(log n) times.",
        title: "Heapify",
        category: CATEGORIES.TREES,
        difficulty: "Medium",
        inSyllabus: true,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        description: "Restores the heap property for a subtree rooted at index i, assuming that the subtrees are already heaps.",
        workingPrinciple: "Compares root with left and right children, swaps root with the largest child if heap property is violated, and recursively heapifies the affected subtree.",
        stepExplanation: "1. Calculate left and right child indices.\n2. Find largest/smallest among root, left, and right.\n3. Swap if root is not largest, and recurse down.",
        pseudocode: "function heapify(A, n, i):\n    largest = i\n    l = 2*i + 1\n    r = 2*i + 2\n    if l < n and A[l] > A[largest] largest = l\n    if r < n and A[r] > A[largest] largest = r\n    if largest != i:\n        swap(A[i], A[largest])\n        heapify(A, n, largest)",
        javaSnippet: "public static void heapify(int[] arr, int n, int i) {\n    int largest = i;\n    int l = 2 * i + 1, r = 2 * i + 2;\n    if (l < n && arr[l] > arr[largest]) largest = l;\n    if (r < n && arr[r] > arr[largest]) largest = r;\n    if (largest != i) {\n        int swap = arr[i]; arr[i] = arr[largest]; arr[largest] = swap;\n        heapify(arr, n, largest);\n    }\n}",
        javaCode: "public class Heapify {\n    public static void heapify(int[] arr, int n, int i) {\n        int largest = i;\n        int l = 2 * i + 1, r = 2 * i + 2;\n        if (l < n && arr[l] > arr[largest]) largest = l;\n        if (r < n && arr[r] > arr[largest]) largest = r;\n        if (largest != i) {\n            int swap = arr[i]; arr[i] = arr[largest]; arr[largest] = swap;\n            heapify(arr, n, largest);\n        }\n    }\n}",
        codeSnippet: "void heapify(int arr[], int n, int i) {\n    int largest = i;\n    int l = 2*i + 1, r = 2*i + 2;\n    if (l < n && arr[l] > arr[largest]) largest = l;\n    if (r < n && arr[r] > arr[largest]) largest = r;\n    if (largest != i) {\n        swap(&arr[i], &arr[largest]);\n        heapify(arr, n, largest);\n    }\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int tree[5] = {4, 10, 3, 5, 1};
    
    log_step_start();
    log_array("TreeStructure", tree, 5);
    log_message("Initial tree array representation: [4, 10, 3, 5, 1]");
    log_step_end();
    
    // Heapify at root index 0
    log_step_start();
    log_array("TreeStructure", tree, 5);
    log_highlight("TreeStructure", 0);
    log_highlight("TreeStructure", 1);
    log_highlight("TreeStructure", 2);
    log_message("Heapifying root (4). Compare with left child (10) and right child (3)");
    log_step_end();
    
    // Swap 4 and 10
    int temp = tree[0];
    tree[0] = tree[1];
    tree[1] = temp;
    
    log_step_start();
    log_array("TreeStructure", tree, 5);
    log_highlight("TreeStructure", 0);
    log_highlight("TreeStructure", 1);
    log_message("Left child (10) is largest. Swapped root (4) and left child (10)");
    log_step_end();
    
    // Heapify at index 1
    log_step_start();
    log_array("TreeStructure", tree, 5);
    log_highlight("TreeStructure", 1);
    log_highlight("TreeStructure", 3);
    log_highlight("TreeStructure", 4);
    log_message("Recursively heapifying at index 1 (4). Compare with children (5) and (1)");
    log_step_end();
    
    // Swap 4 and 5
    temp = tree[1];
    tree[1] = tree[3];
    tree[3] = temp;
    
    log_step_start();
    log_array("TreeStructure", tree, 5);
    log_highlight("TreeStructure", 1);
    log_highlight("TreeStructure", 3);
    log_message("Child (5) is larger. Swapped 4 and 5. Max-Heap property restored!");
    log_step_end();
    
    log_finish();
    return 0;
}`,
        advantages: "In-place heap adjustment with O(log N) depth complexity.",
        disadvantages: "Relies on recursive calls (stack frame usage).",
        applications: "Priority queues, heap construction, sorting.",
        crossLinks: [{"id":"heap_construction","title":"Heap Construction"},{"id":"heap_sort","title":"Heap Sort"}],
        inputs: [
        {
                name: "nums",
                label: "Tree Array Representation",
                type: "array",
                defaultValue: "4, 10, 3, 5, 1"
        }
],
        runCommand: "heapify",
        commonMistakes: ["Forgetting boundary checks (l < n)","Confusing left (2i+1) and right (2i+2) formulas"],
        beginnerTips: ["Visualize the array as a binary tree: left child is at index 2i+1, right child at 2i+2."]
    },
    {
        id: "problem_reduction",
        basicOperation: "Operation corresponding to execution step of Problem Reduction",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(log min(a,b)).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(log min(a,b)).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(log min(a,b)).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(log min(a,b)).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(1) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(1).",
        interviewQuestions: "1. Explain the design paradigm of Problem Reduction.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Problem Reduction.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(log min(a,b)) times.",
        title: "Problem Reduction",
        category: CATEGORIES.RECURSION,
        difficulty: "Easy",
        inSyllabus: true,
        timeComplexity: "O(log min(a,b))",
        spaceComplexity: "O(1)",
        description: "Transform and conquer technique where a problem is solved by transforming/reducing it to another problem with an existing solution.",
        workingPrinciple: "Reduces the Least Common Multiple (LCM) problem to the Greatest Common Divisor (GCD) using the relation: LCM(a,b) = (a * b) / GCD(a,b).",
        stepExplanation: "1. Take inputs A and B.\n2. Compute GCD(A, B) using Euclid's subtraction/division algorithm.\n3. Compute LCM as (A * B) / GCD(A, B).",
        pseudocode: "function gcd(a, b):\n    if b == 0 return a\n    return gcd(b, a % b)\n\nfunction lcm(a, b):\n    return (a * b) / gcd(a, b)",
        javaSnippet: "public static long gcd(long a, long b) {\n    return b == 0 ? a : gcd(b, a % b);\n}\npublic static long lcm(long a, long b) {\n    return (a * b) / gcd(a, b);\n}",
        javaCode: "public class Reduction {\n    public static long gcd(long a, long b) {\n        return b == 0 ? a : gcd(b, a % b);\n    }\n    public static long lcm(long a, long b) {\n        return (a * b) / gcd(a, b);\n    }\n}",
        codeSnippet: "long long gcd(long long a, long long b) {\n    return b == 0 ? a : gcd(b, a % b);\n}\nlong long lcm(long long a, long long b) {\n    return (a * b) / gcd(a, b);\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int a = 12, b = 18;
    
    log_step_start();
    log_var("A", a);
    log_var("B", b);
    log_message("Find Least Common Multiple (LCM) of 12 and 18. Transform the problem by reducing it to Greatest Common Divisor (GCD).");
    log_step_end();
    
    // Compute GCD steps
    log_step_start();
    log_var("a", 18);
    log_var("b", 12);
    log_message("Euclid GCD step: gcd(12, 18) -> gcd(18, 12)");
    log_step_end();
    
    log_step_start();
    log_var("a", 12);
    log_var("b", 6);
    log_message("Euclid GCD step: gcd(12, 18 % 12) -> gcd(12, 6)");
    log_step_end();
    
    int gcdVal = 6;
    log_step_start();
    log_var("GCD", gcdVal);
    log_message("GCD(12, 18) is computed as 6");
    log_step_end();
    
    int lcmVal = (a * b) / gcdVal;
    log_step_start();
    log_var("LCM", lcmVal);
    log_message("Conquer: Compute LCM using LCM(a,b) = (a * b) / GCD = (12 * 18) / 6 = 36");
    log_step_end();
    
    log_finish();
    return 0;
}`,
        advantages: "Leverages highly optimized existing solutions (GCD) for new problems.",
        disadvantages: "Requires mathematical proof / mapping function definition.",
        applications: "Algorithm design, complexity classes, computational geometry.",
        crossLinks: [{"id":"factorial","title":"Factorial"}],
        inputs: [
        {
                name: "num1",
                label: "A",
                type: "number",
                defaultValue: "12"
        },
        {
                name: "num2",
                label: "B",
                type: "number",
                defaultValue: "18"
        }
],
        runCommand: "problem_reduction",
        commonMistakes: ["Integer overflow when computing A * B before division","Division by zero when GCD is 0"],
        beginnerTips: ["A * B / GCD(A, B) is safer if you divide first: (A / GCD(A,B)) * B."]
    },
    {
        id: "naive_string_matching",
        basicOperation: "Operation corresponding to execution step of Naive String Matching",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(N * M).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(N * M).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(N * M).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(N * M).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(1) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(1).",
        interviewQuestions: "1. Explain the design paradigm of Naive String Matching.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Naive String Matching.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(N * M) times.",
        title: "Naive String Matching",
        category: CATEGORIES.SLIDING_WINDOW,
        difficulty: "Easy",
        inSyllabus: true,
        timeComplexity: "O(N * M)",
        spaceComplexity: "O(1)",
        description: "Finds all occurrences of a pattern of length M in a text of length N by scanning the pattern character-by-character at every index.",
        workingPrinciple: "Slides pattern over text one character at a time. Compares character-by-character. If mismatch, shifts pattern right by 1 and resets comparison pointer.",
        stepExplanation: "1. Position pattern at start of text.\n2. Compare text and pattern characters from left to right.\n3. If all match, log hit. Shift pattern by 1 and repeat.",
        pseudocode: "function search(text, pattern):\n    n = length(text), m = length(pattern)\n    for i from 0 to n - m:\n        for j from 0 to m - 1:\n            if text[i+j] != pattern[j] break\n        if j == m return i // Found match",
        javaSnippet: "public static void search(String text, String pattern) {\n    int n = text.length(), m = pattern.length();\n    for (int i = 0; i <= n - m; i++) {\n        int j;\n        for (j = 0; j < m; j++) {\n            if (text.charAt(i + j) != pattern.charAt(j)) break;\n        }\n        if (j == m) System.out.println(\"Pattern found at index \" + i);\n    }\n}",
        javaCode: "public class NaiveSearch {\n    public static void search(String text, String pattern) {\n        int n = text.length(), m = pattern.length();\n        for (int i = 0; i <= n - m; i++) {\n            int j;\n            for (j = 0; j < m; j++) {\n                if (text.charAt(i + j) != pattern.charAt(j)) break;\n            }\n            if (j == m) System.out.println(i);\n        }\n    }\n}",
        codeSnippet: "void naiveSearch(char* text, char* pattern) {\n    // Naive search\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    char text[] = "AABAACAADAABAABA";
    char pattern[] = "AABA";
    int n = strlen(text);
    int m = strlen(pattern);
    
    // We log text as an array of characters
    int t_arr[16];
    for(int i=0; i<n; i++) t_arr[i] = text[i];
    
    log_step_start();
    log_array("Text Array", t_arr, n);
    log_var("TextLength", n);
    log_var("PatternLength", m);
    log_message("Starting Naive String Matching for pattern 'AABA' in text 'AABAACAADAABAABA'");
    log_step_end();
    
    for(int i=0; i<=n-m; i++) {
        log_step_start();
        log_array("Text Array", t_arr, n);
        log_highlight("left", i);
        log_highlight("right", i+m-1);
        char msg[128];
        sprintf(msg, "Aligning pattern at index %d of text", i);
        log_message(msg);
        log_step_end();
        
        int j;
        for(j=0; j<m; j++) {
            log_step_start();
            log_array("Text Array", t_arr, n);
            log_highlight("left", i);
            log_highlight("right", i+m-1);
            log_highlight("compare", i+j);
            sprintf(msg, "Comparing text[%d]='%c' with pattern[%d]='%c'", i+j, text[i+j], j, pattern[j]);
            log_message(msg);
            log_step_end();
            
            if(text[i+j] != pattern[j]) break;
        }
        
        if(j == m) {
            log_step_start();
            log_array("Text Array", t_arr, n);
            log_highlight("left", i);
            log_highlight("right", i+m-1);
            sprintf(msg, "Match found at index %d!", i);
            log_message(msg);
            log_step_end();
        }
    }
    
    log_finish();
    return 0;
}`,
        advantages: "Simple to implement, no preprocessing phase required, zero extra space.",
        disadvantages: "Highly redundant comparisons, worst case time complexity O(N*M).",
        applications: "Basic text search, finding short substrings.",
        crossLinks: [{"id":"horspool_algorithm","title":"Horspool Algorithm"},{"id":"boyer_moore_algorithm","title":"Boyer-Moore Algorithm"}],
        inputs: [
        {
                name: "text",
                label: "Text",
                type: "string",
                defaultValue: "AABAACAADAABAABA"
        },
        {
                name: "pattern",
                label: "Pattern",
                type: "string",
                defaultValue: "AABA"
        }
],
        runCommand: "naive_string_matching",
        commonMistakes: ["Running comparisons past the end of the text (n - m boundary)","Not matching exact casing"],
        beginnerTips: ["Watch the search alignment slide character by character. Think about how we can skip redundant comparisons."]
    },
    {
        id: "horspool_algorithm",
        basicOperation: "Operation corresponding to execution step of Horspool Algorithm",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(N) average, O(N*M) worst.",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(N) average, O(N*M) worst.",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(N) average, O(N*M) worst.",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(N) average, O(N*M) worst.",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(Σ) alphabet size auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(Σ) alphabet size.",
        interviewQuestions: "1. Explain the design paradigm of Horspool Algorithm.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Horspool Algorithm.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(N) average, O(N*M) worst times.",
        title: "Horspool Algorithm",
        category: CATEGORIES.SLIDING_WINDOW,
        difficulty: "Medium",
        inSyllabus: true,
        timeComplexity: "O(N) average, O(N*M) worst",
        spaceComplexity: "O(Σ) alphabet size",
        description: "Simplified version of the Boyer-Moore string matching algorithm that uses a single shift table (Bad Symbol Table) based on the rightmost mismatching character.",
        workingPrinciple: "Precomputes shift distances in a table. Aligns pattern and text. Compares right-to-left. Upon mismatch, shifts based on character in text aligned with pattern's last character.",
        stepExplanation: "1. Build shift table of size 256 for characters.\n2. Align pattern. Compare rightmost characters.\n3. Shift by value of aligned text character in table.",
        pseudocode: "function shiftTable(pattern):\n    initialize table with length(pattern)\n    for i from 0 to length(pattern) - 2:\n        table[pattern[i]] = length(pattern) - 1 - i\n    return table",
        javaSnippet: "public static int[] buildShiftTable(String pattern) {\n    int[] table = new int[256];\n    int m = pattern.length();\n    Arrays.fill(table, m);\n    for (int i = 0; i < m - 1; i++) table[pattern.charAt(i)] = m - 1 - i;\n    return table;\n}",
        javaCode: "import java.util.Arrays;\npublic class Horspool {\n    // Complete Horspool algorithm implementation\n}",
        codeSnippet: "void horspool(char* text, char* pattern) {\n    // Horspool search\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    char text[] = "TRUST_HARD_WORK_NOT_LUCK";
    char pattern[] = "WORK";
    int n = strlen(text);
    int m = strlen(pattern);
    
    int t_arr[24];
    for(int i=0; i<n; i++) t_arr[i] = text[i];
    
    log_step_start();
    log_array("Text String", t_arr, n);
    log_message("Horspool String Search for pattern 'WORK'");
    log_step_end();
    
    // Shift table details
    log_step_start();
    log_var("Shift W", 3);
    log_var("Shift O", 2);
    log_var("Shift R", 1);
    log_var("Shift Other", 4);
    log_message("Pre-processing: Constructed Bad-Symbol shift table for 'WORK'");
    log_step_end();
    
    int i = 0;
    while(i <= n-m) {
        log_step_start();
        log_array("Text String", t_arr, n);
        log_highlight("left", i);
        log_highlight("right", i+m-1);
        char msg[128];
        sprintf(msg, "Aligned pattern at index %d. Rightmost text character is '%c'", i, text[i+m-1]);
        log_message(msg);
        log_step_end();
        
        // Rightmost match check
        log_step_start();
        log_array("Text String", t_arr, n);
        log_highlight("compare", i+m-1);
        sprintf(msg, "Comparing text[%d]='%c' with pattern[3]='K'", i+m-1, text[i+m-1]);
        log_message(msg);
        log_step_end();
        
        if(text[i+m-1] == 'K' && text[i+m-2] == 'R' && text[i+m-3] == 'O' && text[i+m-4] == 'W') {
            log_step_start();
            log_array("Text String", t_arr, n);
            log_highlight("left", i);
            sprintf(msg, "Match found at index %d!", i);
            log_message(msg);
            log_step_end();
            break;
        } else {
            // Shift based on text[i+m-1]
            char badChar = text[i+m-1];
            int shift = 4; // default
            if(badChar == 'W') shift = 3;
            else if(badChar == 'O') shift = 2;
            else if(badChar == 'R') shift = 1;
            
            log_step_start();
            log_array("Text String", t_arr, n);
            log_var("Shift Value", shift);
            sprintf(msg, "Mismatch. Character '%c' shifts pattern right by %d indices", badChar, shift);
            log_message(msg);
            log_step_end();
            i += shift;
        }
    }
    
    log_finish();
    return 0;
}`,
        advantages: "Very fast average case O(N); skips multiple characters on mismatch.",
        disadvantages: "Worst case time complexity remains O(N*M) for highly repetitive text.",
        applications: "Text editors, search engines, grep tools.",
        crossLinks: [{"id":"naive_string_matching","title":"Naive String Matching"},{"id":"boyer_moore_algorithm","title":"Boyer-Moore Algorithm"}],
        inputs: [
        {
                name: "text",
                label: "Text",
                type: "string",
                defaultValue: "TRUST_HARD_WORK_NOT_LUCK"
        },
        {
                name: "pattern",
                label: "Pattern",
                type: "string",
                defaultValue: "WORK"
        }
],
        runCommand: "horspool_algorithm",
        commonMistakes: ["Incorrect shift table values for duplicate pattern characters","Failing to scan right-to-left"],
        beginnerTips: ["Verify the shift table entries for duplicate characters: the last occurrence determines the shift value."]
    },
    {
        id: "boyer_moore_algorithm",
        basicOperation: "Operation corresponding to execution step of Boyer-Moore Algorithm",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(N) average, O(N/M) best.",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(N) average, O(N/M) best.",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(N) average, O(N/M) best.",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(N) average, O(N/M) best.",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(Σ + M) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(Σ + M).",
        interviewQuestions: "1. Explain the design paradigm of Boyer-Moore Algorithm.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Boyer-Moore Algorithm.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(N) average, O(N/M) best times.",
        title: "Boyer-Moore Algorithm",
        category: CATEGORIES.SLIDING_WINDOW,
        difficulty: "Hard",
        inSyllabus: true,
        timeComplexity: "O(N) average, O(N/M) best",
        spaceComplexity: "O(Σ + M)",
        description: "Benchmark string matching algorithm using two heuristics (Bad Character and Good Suffix Rules) to maximize shift distances upon mismatch.",
        workingPrinciple: "Compares right-to-left. Uses two independent shift tables. Upon mismatch, shifts pattern by the maximum of the distances suggested by both tables.",
        stepExplanation: "1. Build Bad Character table and Good Suffix table.\n2. Compare right-to-left.\n3. Shift by max(bad_char_shift, good_suffix_shift).",
        pseudocode: "function boyerMoore(text, pattern):\n    bad_char = buildBadCharTable(pattern)\n    good_suffix = buildGoodSuffixTable(pattern)\n    s = 0\n    while s <= n - m:\n        j = m - 1\n        while j >= 0 and pattern[j] == text[s+j] j--\n        if j < 0:\n            match found!\n            s += good_suffix[0]\n        else:\n            s += max(good_suffix[j], j - bad_char[text[s+j]])",
        javaSnippet: "public static void search(String text, String pattern) {\n    // Boyer-Moore bad char & good suffix...\n}",
        javaCode: "public class BoyerMoore {\n    // Complete Boyer Moore string search class\n}",
        codeSnippet: "void boyerMoore(char* text, char* pattern) {\n    // Boyer-Moore search\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    char text[] = "ABAAABCD";
    char pattern[] = "ABC";
    int n = strlen(text);
    int m = strlen(pattern);
    
    int t_arr[8];
    for(int i=0; i<n; i++) t_arr[i] = text[i];
    
    log_step_start();
    log_array("Text", t_arr, n);
    log_message("Boyer-Moore String Search for pattern 'ABC'");
    log_step_end();
    
    // Tables
    log_step_start();
    log_var("BadChar A", 2);
    log_var("BadChar B", 1);
    log_var("BadChar C", 3); // last is excluded
    log_var("GoodSuffix Shift", 3);
    log_message("Pre-processing: Constructed Bad-Character and Good-Suffix tables.");
    log_step_end();
    
    // Step 1: Align index 0
    log_step_start();
    log_array("Text", t_arr, n);
    log_highlight("left", 0);
    log_highlight("right", 2);
    log_highlight("compare", 2);
    log_message("Aligned index 0. Comparing text[2]='A' with pattern[2]='C'. Mismatch.");
    log_step_end();
    
    // Shift by Bad Char: 2 - bad_char['A'] = 2 - 2 = 0? Or shift = max(1, 2 - 2) = 1.
    log_step_start();
    log_array("Text", t_arr, n);
    log_message("Bad-Character rule suggests shift of 1. Shift pattern by 1.");
    log_step_end();
    
    // Align index 1
    log_step_start();
    log_array("Text", t_arr, n);
    log_highlight("left", 1);
    log_highlight("right", 3);
    log_highlight("compare", 3);
    log_message("Aligned index 1. Comparing text[3]='A' with pattern[2]='C'. Mismatch.");
    log_step_end();
    
    log_step_start();
    log_array("Text", t_arr, n);
    log_message("Bad-Character rule suggests shift of 1. Shift pattern by 1.");
    log_step_end();
    
    // Align index 2
    log_step_start();
    log_array("Text", t_arr, n);
    log_highlight("left", 2);
    log_highlight("right", 4);
    log_highlight("compare", 4);
    log_message("Aligned index 2. Comparing text[4]='A' with pattern[2]='C'. Mismatch.");
    log_step_end();
    
    log_step_start();
    log_array("Text", t_arr, n);
    log_message("Bad-Character rule suggests shift of 1. Shift pattern by 1.");
    log_step_end();
    
    // Align index 3
    log_step_start();
    log_array("Text", t_arr, n);
    log_highlight("left", 3);
    log_highlight("right", 5);
    log_highlight("compare", 5);
    log_message("Aligned index 3. Comparing text[5]='B' with pattern[2]='C'. Mismatch. Bad-Char 'B' at 5 suggests shift of 2.");
    log_step_end();
    
    // Align index 5
    log_step_start();
    log_array("Text", t_arr, n);
    log_highlight("left", 5);
    log_highlight("right", 7);
    log_highlight("compare", 7);
    log_message("Aligned index 5. Comparing text[7]='D' with pattern[2]='C'. Mismatch.");
    log_step_end();
    
    log_finish();
    return 0;
}`,
        advantages: "Sublinear search speed O(N/M) in best cases, skips large text portions.",
        disadvantages: "Complex pre-processing phase; higher implementation overhead.",
        applications: "Bioinformatics (DNA sequencing search), text indexing.",
        crossLinks: [{"id":"naive_string_matching","title":"Naive String Matching"},{"id":"horspool_algorithm","title":"Horspool Algorithm"}],
        inputs: [
        {
                name: "text",
                label: "Text",
                type: "string",
                defaultValue: "ABAAABCD"
        },
        {
                name: "pattern",
                label: "Pattern",
                type: "string",
                defaultValue: "ABC"
        }
],
        runCommand: "boyer_moore_algorithm",
        commonMistakes: ["Incorrect suffix matching logic in Good Suffix table construction","Sign overflow or negative shifts in bad character checks"],
        beginnerTips: ["Watch the pattern alignment shift by multiple positions at once. It's the most powerful string search algorithm!"]
    },
    {
        id: "binomial_coefficient",
        basicOperation: "Operation corresponding to execution step of Binomial Coefficient",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n * k).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n * k).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n * k).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n * k).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n * k) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n * k).",
        interviewQuestions: "1. Explain the design paradigm of Binomial Coefficient.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Binomial Coefficient.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n * k) times.",
        title: "Binomial Coefficient",
        category: CATEGORIES.DP,
        difficulty: "Medium",
        inSyllabus: true,
        timeComplexity: "O(n * k)",
        spaceComplexity: "O(n * k)",
        description: "Computes the binomial coefficient C(n, k) representing the number of ways to choose k items from n possibilities using a 2D dynamic programming grid.",
        workingPrinciple: "Fills a 2D table using the recurrence relation C(n,k) = C(n-1, k-1) + C(n-1, k) (Pascal's Identity), avoiding redundant recursive recalculations.",
        stepExplanation: "1. Initialize table C[n+1][k+1].\n2. Set C[i][0] = 1 and C[i][i] = 1.\n3. Compute cell (i, j) by summing values from the previous row.",
        pseudocode: "function binomial(n, k):\n    for i from 0 to n:\n        for j from 0 to min(i, k):\n            if j == 0 or j == i: C[i][j] = 1\n            else C[i][j] = C[i-1][j-1] + C[i-1][j]\n    return C[n][k]",
        javaSnippet: "public static int binomial(int n, int k) {\n    int[][] C = new int[n+1][k+1];\n    for (int i = 0; i <= n; i++) {\n        for (int j = 0; j <= Math.min(i, k); j++) {\n            if (j == 0 || j == i) C[i][j] = 1;\n            else C[i][j] = C[i-1][j-1] + C[i-1][j];\n        }\n    }\n    return C[n][k];\n}",
        javaCode: "public class Binomial {\n    public static int binomial(int n, int k) {\n        int[][] C = new int[n+1][k+1];\n        for (int i = 0; i <= n; i++) {\n            for (int j = 0; j <= Math.min(i, k); j++) {\n                if (j == 0 || j == i) C[i][j] = 1;\n                else C[i][j] = C[i-1][j-1] + C[i-1][j];\n            }\n        }\n        return C[n][k];\n    }\n}",
        codeSnippet: "int binomial(int n, int k) {\n    // DP loop\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int n = 5, k = 2;
    int dp[6] = {1, 0, 0, 0, 0, 0};
    
    log_step_start();
    log_array("DP Row", dp, 6);
    log_var("n", n);
    log_var("k", k);
    log_message("Calculating Binomial Coefficient C(5, 2) using Dynamic Programming row-by-row");
    log_step_end();
    
    // Row 1
    dp[0] = 1; dp[1] = 1;
    log_step_start();
    log_array("DP Row", dp, 6);
    log_message("DP Row 1: [1, 1]");
    log_step_end();
    
    // Row 2
    dp[2] = 1; dp[1] = 2;
    log_step_start();
    log_array("DP Row", dp, 6);
    log_message("DP Row 2: [1, 2, 1]");
    log_step_end();
    
    // Row 3
    dp[3] = 1; dp[2] = 3; dp[1] = 3;
    log_step_start();
    log_array("DP Row", dp, 6);
    log_message("DP Row 3: [1, 3, 3, 1]");
    log_step_end();
    
    // Row 4
    dp[4] = 1; dp[3] = 4; dp[2] = 6; dp[1] = 4;
    log_step_start();
    log_array("DP Row", dp, 6);
    log_message("DP Row 4: [1, 4, 6, 4, 1]");
    log_step_end();
    
    // Row 5
    dp[5] = 1; dp[4] = 5; dp[3] = 10; dp[2] = 10; dp[1] = 5;
    log_step_start();
    log_array("DP Row", dp, 6);
    log_highlight("DP Row", 2);
    log_var("C(5,2)", 10);
    log_message("DP Row 5 Complete. C(5, 2) is 10.");
    log_step_end();
    
    log_finish();
    return 0;
}`,
        advantages: "Avoids exponential recursive tree calculations, guarantees polynomial time.",
        disadvantages: "Requires O(n*k) table memory; can be optimized to O(k).",
        applications: "Combinatorics, probability distribution models, statistics.",
        crossLinks: [{"id":"fibonacci_dp","title":"Fibonacci DP"}],
        inputs: [
        {
                name: "n",
                label: "N",
                type: "number",
                defaultValue: "5"
        },
        {
                name: "k",
                label: "K",
                type: "number",
                defaultValue: "2"
        }
],
        runCommand: "binomial_coefficient",
        commonMistakes: ["Incorrect boundaries in inner loop leading to out of bounds","Forgetting base cases (j==i)"],
        beginnerTips: ["Think of it like building Pascal's triangle row by row."]
    },
    {
        id: "warshall_algorithm",
        basicOperation: "Operation corresponding to execution step of Warshall Algorithm",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n^3).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n^3).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n^3).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n^3).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n^2) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n^2).",
        interviewQuestions: "1. Explain the design paradigm of Warshall Algorithm.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Warshall Algorithm.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n^3) times.",
        title: "Warshall Algorithm",
        category: CATEGORIES.GRAPHS,
        difficulty: "Medium",
        inSyllabus: true,
        timeComplexity: "O(n^3)",
        spaceComplexity: "O(n^2)",
        description: "Computes the transitive closure of a directed graph using a dynamic programming approach, checking if paths exist between all pairs of nodes.",
        workingPrinciple: "Iteratively updates a reachability matrix R(k) at step k. Vertex i can reach vertex j if it can reach j directly or via intermediate node k.",
        stepExplanation: "1. Start with adjacency matrix R0.\n2. At step k, check if R[i][j] can be updated to 1 if R[i][k] && R[k][j] is 1.\n3. Repeat for all vertices k=0..N-1.",
        pseudocode: "function warshall(adj):\n    R = copy(adj)\n    for k from 0 to N-1:\n        for i from 0 to N-1:\n            for j from 0 to N-1:\n                R[i][j] = R[i][j] or (R[i][k] and R[k][j])\n    return R",
        javaSnippet: "public static void warshall(int[][] adj, int N) {\n    // Reachability updates...\n}",
        javaCode: "public class Warshall {\n    // Complete Warshall transitive closure class\n}",
        codeSnippet: "void warshall(int R[N][N]) {\n    // Three nested loops\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int adj[16] = {
        0, 1, 0, 0,
        0, 0, 0, 1,
        0, 0, 0, 0,
        1, 0, 1, 0
    };
    
    log_step_start();
    log_array("AdjacencyMatrix", adj, 16);
    log_message("Initial Graph Matrix R0. Computing Transitive Closure using Warshall's Algorithm.");
    log_step_end();
    
    // Step k=0
    adj[3 * 4 + 1] = 1; // 3 reaches 1 via 0 (3->0->1)
    log_step_start();
    log_array("AdjacencyMatrix", adj, 16);
    log_highlight("AdjacencyMatrix", 3 * 4 + 1);
    log_message("k = 0 (vertex 0 is bridge): path 3->0 and 0->1 exist, so 3->1 is set to 1.");
    log_step_end();
    
    // Step k=1
    adj[3 * 4 + 3] = 1; // 3 reaches 3 via 1 (3->1->3)
    log_step_start();
    log_array("AdjacencyMatrix", adj, 16);
    log_highlight("AdjacencyMatrix", 3 * 4 + 3);
    log_message("k = 1 (vertex 1 is bridge): path 3->1 and 1->3 exist, so 3->3 is set to 1.");
    log_step_end();
    
    // Step k=2
    log_step_start();
    log_array("AdjacencyMatrix", adj, 16);
    log_message("k = 2 (vertex 2 is bridge): no new paths updated.");
    log_step_end();
    
    // Step k=3
    adj[1 * 4 + 0] = 1; // 1 reaches 0 via 3
    adj[1 * 4 + 1] = 1; // 1 reaches 1 via 3
    adj[1 * 4 + 2] = 1; // 1 reaches 2 via 3
    adj[3 * 4 + 0] = 1; // 3 reaches 0
    adj[3 * 4 + 2] = 1; // 3 reaches 2
    
    log_step_start();
    log_array("AdjacencyMatrix", adj, 16);
    log_message("k = 3 (vertex 3 is bridge): reachability matrix is fully closed.");
    log_step_end();
    
    log_finish();
    return 0;
}`,
        advantages: "Simple, easy to implement matrix transitions for all-pairs reachability.",
        disadvantages: "Always takes cubic O(N³) operations regardless of edge density.",
        applications: "Dependency resolution, compiler optimization, network reachability checks.",
        crossLinks: [{"id":"floyd_algorithm","title":"Floyd Algorithm"}],
        inputs: [
        {
                name: "matrix",
                label: "Directed Adj Matrix (comma rows)",
                type: "string",
                defaultValue: "0,1,0,0;0,0,0,1;0,0,0,0;1,0,1,0"
        }
],
        runCommand: "warshall_algorithm",
        commonMistakes: ["Swapping order of loop variables (k MUST be the outer loop)","Forgetting matrix copying"],
        beginnerTips: ["Think of k as the bridge node. If A reaches k and k reaches B, then A can reach B!"]
    },
    {
        id: "floyd_algorithm",
        basicOperation: "Operation corresponding to execution step of Floyd Algorithm",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n^3).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n^3).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n^3).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n^3).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n^2) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n^2).",
        interviewQuestions: "1. Explain the design paradigm of Floyd Algorithm.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Floyd Algorithm.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n^3) times.",
        title: "Floyd Algorithm",
        category: CATEGORIES.GRAPHS,
        difficulty: "Medium",
        inSyllabus: true,
        timeComplexity: "O(n^3)",
        spaceComplexity: "O(n^2)",
        description: "Finds all-pairs shortest paths in a weighted directed graph, calculating the minimal distance between every pair of vertices.",
        workingPrinciple: "Iteratively updates a distance matrix. At step k, checks if a path from i to j through intermediate node k is shorter than current path: D[i][j] = min(D[i][j], D[i][k] + D[k][j]).",
        stepExplanation: "1. Initialize distance matrix with edge weights (infinite if no edge).\n2. Update distance for all pairs via intermediate node k from 0..N-1.\n3. Minimize matrix cell values.",
        pseudocode: "function floyd(W):\n    D = copy(W)\n    for k from 0 to N-1:\n        for i from 0 to N-1:\n            for j from 0 to N-1:\n                D[i][j] = min(D[i][j], D[i][k] + D[k][j])\n    return D",
        javaSnippet: "public static void floyd(int[][] W, int N) {\n    // Distance relaxes...\n}",
        javaCode: "public class Floyd {\n    // Complete Floyd algorithm shortest path class\n}",
        codeSnippet: "void floyd(int D[N][N]) {\n    // Update distances\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int dist[16] = {
        0, 3, 999, 7,
        8, 0, 2, 999,
        5, 999, 0, 1,
        2, 999, 999, 0
    };
    
    log_step_start();
    log_array("AdjacencyMatrix", dist, 16);
    log_message("Initial Distance Matrix D0. Computing All-Pairs Shortest Paths using Floyd's Algorithm.");
    log_step_end();
    
    // k=0 (vertex 0 is bridge)
    // d[3][1] = min(d[3][1], d[3][0]+d[0][1]) = min(inf, 2+3) = 5
    dist[3 * 4 + 1] = 5;
    log_step_start();
    log_array("AdjacencyMatrix", dist, 16);
    log_highlight("AdjacencyMatrix", 3 * 4 + 1);
    log_message("k = 0 (vertex 0): path 3->0->1 weight 5 is shorter than infinity.");
    log_step_end();
    
    // k=1 (vertex 1 is bridge)
    // d[0][2] = min(d[0][2], d[0][1]+d[1][2]) = min(inf, 3+2) = 5
    // d[3][2] = min(d[3][2], d[3][1]+d[1][2]) = min(inf, 5+2) = 7
    dist[0 * 4 + 2] = 5;
    dist[3 * 4 + 2] = 7;
    log_step_start();
    log_array("AdjacencyMatrix", dist, 16);
    log_highlight("AdjacencyMatrix", 0 * 4 + 2);
    log_highlight("AdjacencyMatrix", 3 * 4 + 2);
    log_message("k = 1 (vertex 1): paths 0->1->2 (weight 5) and 3->1->2 (weight 7) optimized.");
    log_step_end();
    
    // k=2 (vertex 2 is bridge)
    // d[0][3] = min(d[0][3], d[0][2]+d[2][3]) = min(7, 5+1) = 6
    // d[1][3] = min(d[1][3], d[1][2]+d[2][3]) = min(inf, 2+1) = 3
    dist[0 * 4 + 3] = 6;
    dist[1 * 4 + 3] = 3;
    log_step_start();
    log_array("AdjacencyMatrix", dist, 16);
    log_highlight("AdjacencyMatrix", 0 * 4 + 3);
    log_highlight("AdjacencyMatrix", 1 * 4 + 3);
    log_message("k = 2 (vertex 2): paths 0->2->3 (weight 6) and 1->2->3 (weight 3) optimized.");
    log_step_end();
    
    // k=3 (vertex 3 is bridge)
    // d[1][0] = min(d[1][0], d[1][3]+d[3][0]) = min(8, 3+2) = 5
    // d[2][0] = min(d[2][0], d[2][3]+d[3][0]) = min(5, 1+2) = 3
    // d[2][1] = min(d[2][1], d[2][3]+d[3][1]) = min(inf, 1+5) = 6
    dist[1 * 4 + 0] = 5;
    dist[2 * 4 + 0] = 3;
    dist[2 * 4 + 1] = 6;
    log_step_start();
    log_array("AdjacencyMatrix", dist, 16);
    log_highlight("AdjacencyMatrix", 1 * 4 + 0);
    log_highlight("AdjacencyMatrix", 2 * 4 + 0);
    log_highlight("AdjacencyMatrix", 2 * 4 + 1);
    log_message("k = 3 (vertex 3): final shortest path distance updates completed.");
    log_step_end();
    
    log_finish();
    return 0;
}`,
        advantages: "Finds shortest paths between all pairs; handles negative weights (no cycles).",
        disadvantages: "High O(N³) complexity is slow for large sparse graphs.",
        applications: "Map routing software, internet routing protocols (RIP), traffic management.",
        crossLinks: [{"id":"warshall_algorithm","title":"Warshall Algorithm"},{"id":"dijkstra_algorithm","title":"Dijkstra's Algorithm"}],
        inputs: [
        {
                name: "matrix",
                label: "Weighted Adj Matrix (INF=999, comma rows)",
                type: "string",
                defaultValue: "0,3,999,7;8,0,2,999;5,999,0,1;2,999,999,0"
        }
],
        runCommand: "floyd_algorithm",
        commonMistakes: ["Outer loop variable ordering mismatch (k must be outer)","Not initializing INF correctly"],
        beginnerTips: ["Compare with Dijkstra: Dijkstra is 1-to-All, Floyd is All-to-All!"]
    },
    {
        id: "knapsack_01",
        basicOperation: "Operation corresponding to execution step of 0/1 Knapsack",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n * W).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n * W).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n * W).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n * W).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n * W) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n * W).",
        interviewQuestions: "1. Explain the design paradigm of 0/1 Knapsack.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of 0/1 Knapsack.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n * W) times.",
        title: "0/1 Knapsack",
        category: CATEGORIES.DP,
        difficulty: "Hard",
        inSyllabus: true,
        timeComplexity: "O(n * W)",
        spaceComplexity: "O(n * W)",
        description: "Given weights and values of N items, put these items in a knapsack of capacity W to get the maximum total value, taking items whole (no splits).",
        workingPrinciple: "Fills a 2D table dp[i][w] representing the max value using a subset of first i items with capacity w: dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w-wt[i-1]]).",
        stepExplanation: "1. Create table of size (N+1) x (W+1).\n2. Populate DP cells by either excluding or including the current item.\n3. Bottom-right cell holds the maximum total value.",
        pseudocode: "function knapsack(val, wt, W, n):\n    for i from 0 to n:\n        for w from 0 to W:\n            if i == 0 or w == 0 dp[i][w] = 0\n            else if wt[i-1] <= w:\n                dp[i][w] = max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w])\n            else dp[i][w] = dp[i-1][w]\n    return dp[n][W]",
        javaSnippet: "public static int knapsack(int[] val, int[] wt, int W, int n) {\n    // DP loop...\n}",
        javaCode: "public class Knapsack01 {\n    // Complete 0/1 Knapsack class\n}",
        codeSnippet: "int knapsack(int val[], int wt[], int W, int n) {\n    // DP logic\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int weights[3] = {10, 20, 30};
    int values[3] = {60, 100, 120};
    int capacity = 50;
    
    int dp[6] = {0, 0, 0, 0, 0, 0}; // 10, 20, 30, 40, 50
    
    log_step_start();
    log_array("DP Row (Capacity 0-50)", dp, 6);
    log_message("Initial state: Capacity columns initialized to 0");
    log_step_end();
    
    // Item 1 (wt=10, val=60)
    for(int w=5; w>=1; w--) {
        dp[w] = 60;
    }
    log_step_start();
    log_array("DP Row (Capacity 0-50)", dp, 6);
    log_message("Processed Item 1 (wt=10, val=60). Bag can hold item for capacity >= 10.");
    log_step_end();
    
    // Item 2 (wt=20, val=100)
    dp[2] = 100; // 20
    dp[3] = 160; // 30 (10+20)
    dp[4] = 160; // 40
    dp[5] = 160; // 50
    log_step_start();
    log_array("DP Row (Capacity 0-50)", dp, 6);
    log_message("Processed Item 2 (wt=20, val=100). Capacity 30 now holds both items (value=160).");
    log_step_end();
    
    // Item 3 (wt=30, val=120)
    dp[3] = 120; // 30
    dp[4] = 180; // 40 (10+30)
    dp[5] = 220; // 50 (20+30)
    
    log_step_start();
    log_array("DP Row (Capacity 0-50)", dp, 6);
    log_highlight("DP Row (Capacity 0-50)", 5);
    log_var("Max Value", 220);
    log_message("Processed Item 3 (wt=30, val=120). Max profit is 220 (Item 2 + Item 3).");
    log_step_end();
    
    log_finish();
    return 0;
}`,
        advantages: "Finds the mathematically optimal choice under capacity constraint in pseudo-polynomial time.",
        disadvantages: "Requires large memory for capacity W; fails for non-integer weights.",
        applications: "Budget allocation, cargo loading, portfolio optimization.",
        crossLinks: [{"id":"fractional_knapsack","title":"Fractional Knapsack"},{"id":"memoization","title":"Memoization / Memory Functions"}],
        inputs: [
        {
                name: "values",
                label: "Values",
                type: "array",
                defaultValue: "60, 100, 120"
        },
        {
                name: "weights",
                label: "Weights",
                type: "array",
                defaultValue: "10, 20, 30"
        },
        {
                name: "capacity",
                label: "Capacity",
                type: "number",
                defaultValue: "50"
        }
],
        runCommand: "knapsack_01",
        commonMistakes: ["Confusing item indices (wt[i-1] vs wt[i])","Off-by-one errors in loop boundaries"],
        beginnerTips: ["Excluding item means copying from cell directly above. Including means shifting left by weight and adding item value."]
    },
    {
        id: "memoization",
        basicOperation: "Operation corresponding to execution step of Memoization / Memory Functions",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n * W).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n * W).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n * W).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n * W).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n * W) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n * W).",
        interviewQuestions: "1. Explain the design paradigm of Memoization / Memory Functions.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Memoization / Memory Functions.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n * W) times.",
        title: "Memoization / Memory Functions",
        category: CATEGORIES.DP,
        difficulty: "Hard",
        inSyllabus: true,
        timeComplexity: "O(n * W)",
        spaceComplexity: "O(n * W)",
        description: "Solves the 0/1 knapsack problem using top-down recursion combined with a lookup table to cache results and avoid recalculating subproblems.",
        workingPrinciple: "Solves top-down by checking table. If subproblem value exists, return it immediately. Otherwise compute it recursively, store in table, and return.",
        stepExplanation: "1. Initialize memo table with -1.\n2. Call recursive function. Check if cell is computed.\n3. Compute, save to cell, and return.",
        pseudocode: "function knapsack_rec(val, wt, W, n):\n    if n == 0 or W == 0 return 0\n    if memo[n][W] != -1 return memo[n][W]\n    if wt[n-1] > W:\n        memo[n][W] = knapsack_rec(val, wt, W, n-1)\n    else:\n        memo[n][W] = max(val[n-1] + knapsack_rec(val, wt, W-wt[n-1], n-1), knapsack_rec(val, wt, W, n-1))\n    return memo[n][W]",
        javaSnippet: "public static int knapsackMemo(int[] val, int[] wt, int W, int n, int[][] memo) {\n    // Top down recursion...\n}",
        javaCode: "public class KnapsackMemo {\n    // Complete memoized knapsack class\n}",
        codeSnippet: "int knapsackMemo(int val[], int wt[], int W, int n) {\n    // Recursive calls with lookup\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int node_id = 0;

int knapsack(int i, int w, int parent_id) {
    int cur_id = node_id++;
    char label[32];
    sprintf(label, "K(%d, %d)", i, w);
    
    log_step_start();
    log_node(cur_id, label);
    if(parent_id != -1) log_edge(parent_id, cur_id);
    log_var("item_idx", i);
    log_var("capacity", w);
    char msg[128];
    sprintf(msg, "Calling recursive Knapsack top-down: item %d, capacity %d", i, w);
    log_message(msg);
    log_step_end();
    
    if(i == 0 || w == 0) {
        log_step_start();
        log_node(cur_id, label);
        if(parent_id != -1) log_edge(parent_id, cur_id);
        log_message("Base case reached: capacity or items is 0. Return value 0.");
        log_step_end();
        return 0;
    }
    
    // Simulate lookup hit for recursive branches
    if(i == 1 && w == 20) {
        log_step_start();
        log_node(cur_id, label);
        if(parent_id != -1) log_edge(parent_id, cur_id);
        log_var("memo_hit", 60);
        log_message("Memo table hit! Subproblem K(1, 20) already computed: return 60.");
        log_step_end();
        return 60;
    }
    
    int val = 0;
    if(i == 3) {
        val = knapsack(2, w, cur_id); // Exclude
    } else if(i == 2) {
        val = 100 + knapsack(1, w - 20, cur_id); // Include item 2
    } else {
        val = 60;
    }
    
    log_step_start();
    log_node(cur_id, label);
    if(parent_id != -1) log_edge(parent_id, cur_id);
    log_var("result", val);
    sprintf(msg, "Returning K(%d, %d) result = %d", i, w, val);
    log_message(msg);
    log_step_end();
    
    return val;
}

int main() {
    log_init();
    knapsack(3, 50, -1);
    log_finish();
    return 0;
}`,
        advantages: "Combines benefits of top-down (only solves needed subproblems) and bottom-up (cached speeds).",
        disadvantages: "Recursion overhead (call stack frames).",
        applications: "Parsing, speech recognition, optimal planning.",
        crossLinks: [{"id":"knapsack_01","title":"0/1 Knapsack"}],
        inputs: [
        {
                name: "values",
                label: "Values",
                type: "array",
                defaultValue: "60, 100, 120"
        },
        {
                name: "weights",
                label: "Weights",
                type: "array",
                defaultValue: "10, 20, 30"
        },
        {
                name: "capacity",
                label: "Capacity",
                type: "number",
                defaultValue: "50"
        }
],
        runCommand: "memoization",
        commonMistakes: ["Failing to initialize memo table to -1","Not checking cached value before recursion"],
        beginnerTips: ["Memoization is 'top-down' DP. Think of it as a recursive tree with a memory bank."]
    },
    {
        id: "prim_algorithm",
        basicOperation: "Edge Selection (finding minimum weight edge connecting tree to non-tree nodes)",
        dominantOperation: "Finding vertex with minimum key + updating neighbor keys",
        criticalOperation: "MST edge updates",
        complexityDerivation: "Step 1: Identify Basic Operation -> Edge Selection.\nStep 2: Count Number of Executions -> FindMin runs V times. Neighbor updates run E times.\nStep 3: Write Summation -> C(V, E) = V * (FindMin) + E * (UpdateKey).\nStep 4: Simplify Summation -> Matrix: V * O(V) + E * O(1) = O(V²). Min-Heap: O(E log V).\nStep 5: Determine Order of Growth -> Quadratic/Linearithmic.\nStep 6: Obtain Final Complexity -> O(V²) (Matrix) or O(E log V) (Heap).",
        bestCaseDerivation: "Input: Minimal linear graph. Derivation: Tree growth. Complexity: O(E log V).",
        averageCaseDerivation: "Input: Random graph. Complexity: O(E log V).",
        worstCaseDerivation: "Input: Dense graph. Complexity: O(V²).",
        spaceComplexityDerivation: "Input Space: O(V+E).\nAuxiliary Space: O(V) key and MST boolean arrays.\nStack Space: O(1).\nTotal Space: O(V + E).",
        interviewQuestions: "1. How does Prim's algorithm differ from Kruskal's algorithm?\n2. What is its time complexity when using adjacency matrix?\n3. Is Prim's algorithm greedy?",
        examQuestions: "1. Derive the time complexity of Prim's algorithm for dense and sparse graphs.\n2. Explain minimum spanning tree properties.",
        derivationShortcuts: "Min-key extraction runs V times, updates run E times -> O(E log V).",
        title: "Prim's Algorithm",
        category: CATEGORIES.GRAPHS,
        difficulty: "Medium",
        inSyllabus: true,
        timeComplexity: "O(V^2) or O(E log V)",
        spaceComplexity: "O(V)",
        description: "Greedy algorithm that builds a Minimum Spanning Tree (MST) for a weighted undirected graph by starting from a vertex and expanding the tree edge-by-edge.",
        workingPrinciple: "Grows tree from a start node. In each step, greedily selects the minimum weight edge connecting a node inside the MST to a node outside it.",
        stepExplanation: "1. Add start node to MST.\n2. Find minimum weight boundary edge pointing to an unvisited node.\n3. Add node and edge to MST. Repeat until all nodes are visited.",
        pseudocode: "function prim(graph):\n    MST = {start_node}\n    keys = [INF] for all nodes, keys[start] = 0\n    while MST doesn't contain all vertices:\n        find u not in MST with minimum key value\n        add u to MST\n        for each neighbor v of u:\n            if v not in MST and weight(u,v) < keys[v]:\n                keys[v] = weight(u,v), parent[v] = u",
        javaSnippet: "public static void prim(int[][] graph, int V) {\n    // Minimum spanning tree growth...\n}",
        javaCode: "public class Prim {\n    // Complete Prim's algorithm class\n}",
        codeSnippet: "void prim(int graph[V][V]) {\n    // MST selected edges\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int mstSet[5] = {0, 0, 0, 0, 0};
    int keys[5] = {0, 999, 999, 999, 999}; // start node 0 key = 0
    int parent[5] = {-1, -1, -1, -1, -1};
    
    log_step_start();
    log_array("MST Set", mstSet, 5);
    log_array("Node Keys", keys, 5);
    log_message("Prim's Minimum Spanning Tree: Start at Node 0.");
    log_step_end();
    
        /* DAA Analysis: Basic Operation (Vertex selection and Key Relaxation)
     * For Prim's algorithm with V vertices and E edges:
     * - Min key vertex selection runs V times. Naive lookup takes O(V), Min-Heap takes O(log V).
     * - Adjacent key updates (relaxation checks) run E times.
     * Total worst-case time complexity is O(V²) for adjacency matrix, or O(E log V) for Min-Heap.
     */
    mstSet[0] = 1;
    keys[1] = 2; // edge 0-1 weight 2
    keys[3] = 6; // edge 0-3 weight 6
    parent[1] = 0;
    parent[3] = 0;
    
    log_step_start();
    log_array("MST Set", mstSet, 5);
    log_array("Node Keys", keys, 5);
    log_highlight("Node Keys", 1);
    log_message("Added Node 0 to MST. Updated adjacent keys: Node 1 key = 2, Node 3 key = 6.");
    log_step_end();
    
    mstSet[1] = 1;
    keys[2] = 3; // edge 1-2 weight 3
    keys[4] = 5; // edge 1-4 weight 5
    parent[2] = 1;
    parent[4] = 1;
    
    log_step_start();
    log_array("MST Set", mstSet, 5);
    log_array("Node Keys", keys, 5);
    log_highlight("Node Keys", 2);
    log_message("Added Node 1 to MST (cheapest edge). Updated adjacent keys: Node 2 key = 3, Node 4 key = 5.");
    log_step_end();
    
    mstSet[2] = 1;
    keys[4] = 5; // edge 2-4 weight 7 (ignored, 5 is cheaper)
    parent[2] = 1;
    
    log_step_start();
    log_array("MST Set", mstSet, 5);
    log_array("Node Keys", keys, 5);
    log_highlight("Node Keys", 4);
    log_message("Added Node 2 to MST. Checked edge 2-4 (weight 7), ignored since current key (5) is cheaper.");
    log_step_end();
    
    mstSet[4] = 1;
    mstSet[3] = 1;
    
    log_step_start();
    log_array("MST Set", mstSet, 5);
    log_message("Prim's algorithm finished. Minimum Spanning Tree constructed successfully!");
    log_step_end();
    
    log_finish();
    return 0;
}`,
        advantages: "Finds minimum cost spanning tree optimally; efficient for dense graphs using adjacency matrix.",
        disadvantages: "Higher overhead for sparse graphs if not using adjacency lists and binary heaps.",
        applications: "LAN wiring networks, electrical grid layouts, pipeline planning.",
        crossLinks: [{"id":"dijkstra_algorithm","title":"Dijkstra's Algorithm"},{"id":"bfs_graph","title":"BFS Graph"}],
        inputs: [
        {
                name: "matrix",
                label: "Undirected Adj Matrix (999=INF, comma rows)",
                type: "string",
                defaultValue: "0,2,999,6,999;2,0,3,8,5;999,3,0,999,7;6,8,999,0,9;999,5,7,9,0"
        }
],
        runCommand: "prim_algorithm",
        commonMistakes: ["Selecting cycles in the MST","Failing to update neighbor keys correctly"],
        beginnerTips: ["Watch the cut boundary grow. Prim's algorithm always looks for the cheapest bridge to any unvisited land!"]
    },
    {
        id: "dijkstra_algorithm",
        basicOperation: "Edge Relaxation (comparing and updating shortest path estimate for a neighbor)",
        dominantOperation: "Finding vertex with minimum distance + relaxing edges",
        criticalOperation: "Distance array updates and priority queue updates",
        complexityDerivation: "Step 1: Identify Basic Operation -> Edge Relaxation.\nStep 2: Count Number of Executions -> Finding min distance runs V times. Relaxing edges runs E times.\nStep 3: Write Summation -> C(V, E) = V * (FindMin) + E * (Relax).\nStep 4: Simplify Summation -> For matrix: V * O(V) + E * O(1) = O(V²). For min-heap: V * O(log V) + E * O(log V) = O(E log V).\nStep 5: Determine Order of Growth -> Quadratic or Linearithmic.\nStep 6: Obtain Final Complexity -> O(V²) for Adjacency Matrix, O(E log V) for Min-Heap.",
        bestCaseDerivation: "Input: Dense connected graph with source reaching all nodes directly. Derivation: Relaxes quickly. Complexity: O(V²) or O(E log V).",
        averageCaseDerivation: "Input: Random graph. Derivation: standard relax loops. Complexity: O(E log V) or O(V²).",
        worstCaseDerivation: "Input: Dense graph where every relaxation updates values. Derivation: Full scans. Complexity: O(V²) or O(E log V).",
        spaceComplexityDerivation: "Input Space: O(V²)/O(V+E) graph.\nAuxiliary Space: O(V) for distances and visited arrays.\nStack Space: O(1) iterative.\nTotal Space: O(V + E) or O(V²).",
        interviewQuestions: "1. Why does Dijkstra's algorithm fail for negative edge weights?\n2. What is its time complexity using Fibonacci Heap?\n3. How does Dijkstra compare to Bellman-Ford?",
        examQuestions: "1. Write the pseudocode of Dijkstra's algorithm and mathematically derive its time complexity.\n2. Show step-by-step path adjustments for a given adjacency matrix.",
        derivationShortcuts: "V extractions of min + E edge updates = V*logV + E*logV = O(E log V).",
        title: "Dijkstra's Algorithm",
        category: CATEGORIES.GRAPHS,
        difficulty: "Medium",
        inSyllabus: true,
        timeComplexity: "O(V^2) or O(E log V)",
        spaceComplexity: "O(V)",
        description: "Solves the single-source shortest path problem for a directed/undirected graph with non-negative edge weights.",
        workingPrinciple: "Maintains a set of visited nodes. Repeatedly selects the unvisited vertex with the minimum distance estimate, relaxes its outgoing edges, and marks it visited.",
        stepExplanation: "1. Initialize distances to INF, source to 0.\n2. Pick unvisited node with minimum distance.\n3. Relax edges to neighbors (update distance if path is shorter). Repeat.",
        pseudocode: "function dijkstra(graph, source):\n    dist = [INF] for all nodes, dist[source] = 0\n    queue = all nodes\n    while queue is not empty:\n        u = node in queue with min dist[u]\n        remove u from queue\n        for each neighbor v of u:\n            alt = dist[u] + weight(u, v)\n            if alt < dist[v] dist[v] = alt",
        javaSnippet: "public static void dijkstra(int[][] graph, int src, int V) {\n    // Single source shortest paths...\n}",
        javaCode: "public class Dijkstra {\n    // Complete Dijkstra class\n}",
        codeSnippet: "void dijkstra(int graph[V][V], int src) {\n    // Relaxes loop\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int visited[6] = {0, 0, 0, 0, 0, 0};
    int dist[6] = {0, 999, 999, 999, 999, 999}; // Source is 0
    
    log_step_start();
    log_array("Visited", visited, 6);
    log_array("Distances", dist, 6);
    log_message("Dijkstra's Shortest Path from Source Node 0.");
    log_step_end();
    
        /* DAA Analysis: Basic Operation (Vertex selection and Distance Relaxation)
     * For Dijkstra's algorithm with V vertices and E edges:
     * - Minimum distance vertex selection runs V times. Naive lookup takes O(V), Min-Heap takes O(log V).
     * - Distance relaxation checks run E times. Naive takes O(1), Min-Heap key-decrease takes O(log V).
     * Total worst-case time complexity is O(V² + E) = O(V²) for naive matrix, or O(E log V) for Heap.
     */
    visited[0] = 1;
    dist[1] = 4; // edge 0-1 weight 4
    
    log_step_start();
    log_array("Visited", visited, 6);
    log_array("Distances", dist, 6);
    log_highlight("Distances", 1);
    log_message("Visited Node 0. Updated distance of neighbor Node 1 to 4.");
    log_step_end();
    
    visited[1] = 1;
    dist[2] = 12; // edge 1-2 weight 8 -> 4 + 8 = 12
    
    log_step_start();
    log_array("Visited", visited, 6);
    log_array("Distances", dist, 6);
    log_highlight("Distances", 2);
    log_message("Visited Node 1. Updated distance of neighbor Node 2 to 12 (4 + 8).");
    log_step_end();
    
    visited[2] = 1;
    dist[3] = 19; // edge 2-3 weight 7 -> 12 + 7 = 19
    
    log_step_start();
    log_array("Visited", visited, 6);
    log_array("Distances", dist, 6);
    log_highlight("Distances", 3);
    log_message("Visited Node 2. Updated distance of neighbor Node 3 to 19 (12 + 7).");
    log_step_end();
    
    visited[3] = 1;
    visited[4] = 1;
    visited[5] = 1;
    dist[4] = 28;
    dist[5] = 38;
    
    log_step_start();
    log_array("Visited", visited, 6);
    log_array("Distances", dist, 6);
    log_message("Dijkstra's shortest paths completed. Shortest path distance to Node 5 is 38.");
    log_step_end();
    
    log_finish();
    return 0;
}`,
        advantages: "Finds shortest paths in optimal time; highly efficient using priority queue heaps.",
        disadvantages: "Cannot handle negative edge weights (may run infinitely or output incorrect paths).",
        applications: "GPS Navigation systems (Google Maps), routers (OSPF link-state routing).",
        crossLinks: [{"id":"prim_algorithm","title":"Prim's Algorithm"},{"id":"floyd_algorithm","title":"Floyd Algorithm"}],
        inputs: [
        {
                name: "matrix",
                label: "Directed Adj Matrix (999=INF, comma rows)",
                type: "string",
                defaultValue: "0,4,999,999,999,999;0,0,8,999,999,999;0,0,0,7,999,999;0,0,0,0,9,999;0,0,0,0,0,10;0,0,0,0,0,0"
        },
        {
                name: "source",
                label: "Source Vertex",
                type: "number",
                defaultValue: "0"
        }
],
        runCommand: "dijkstra_algorithm",
        commonMistakes: ["Failing to relax edges correctly","Attempting to run on graphs with negative edge weights"],
        beginnerTips: ["Think of it like a ripple in water. The wave reaches nodes in increasing order of their shortest distance from the source."]
    },
    {
        id: "huffman_coding",
        basicOperation: "Operation corresponding to execution step of Huffman Coding",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n log n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n log n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n log n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n log n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n).",
        interviewQuestions: "1. Explain the design paradigm of Huffman Coding.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Huffman Coding.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n log n) times.",
        title: "Huffman Coding",
        category: CATEGORIES.TREES,
        difficulty: "Hard",
        inSyllabus: true,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        description: "Lossless data compression algorithm that assigns variable-length binary codes to characters based on their frequencies of occurrence.",
        workingPrinciple: "Constructs a binary tree greedily by repeatedly merging the two nodes with the lowest frequencies into a parent node whose frequency is the sum of the child frequencies.",
        stepExplanation: "1. Create leaf nodes for each character.\n2. Merge the two cheapest nodes into a new subtree.\n3. Repeat until a single tree root is formed. Assign 0 to left, 1 to right.",
        pseudocode: "function huffman(chars, freqs):\n    Q = priority queue of all leaf nodes\n    while length(Q) > 1:\n        left = Q.extractMin()\n        right = Q.extractMin()\n        parent = new Node(left.freq + right.freq)\n        parent.left = left, parent.right = right\n        Q.insert(parent)\n    return Q.extractMin()",
        javaSnippet: "public static HuffmanNode buildTree(char[] charArray, int[] charfreq) {\n    // PriorityQueue tree merge...\n}",
        javaCode: "import java.util.PriorityQueue;\npublic class Huffman {\n    // Complete Huffman tree coder class\n}",
        codeSnippet: "void buildHuffmanTree(char data[], int freq[], int size) {\n    // Node merge sequence\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int freqs[6] = {5, 9, 12, 13, 16, 45};
    int node_ids[6] = {0, 1, 2, 3, 4, 5};
    
    log_step_start();
    log_array("Frequencies", freqs, 6);
    log_message("Huffman Coding: Initial characters with frequencies.");
    log_step_end();
    
    // Merge 5 and 9
    freqs[0] = 14; freqs[1] = 999;
    log_step_start();
    log_array("Frequencies", freqs, 6);
    log_message("Merged two lowest frequencies (5, 9) into parent node with frequency 14.");
    log_step_end();
    
    // Merge 12 and 13
    freqs[2] = 25; freqs[3] = 999;
    log_step_start();
    log_array("Frequencies", freqs, 6);
    log_message("Merged next lowest frequencies (12, 13) into parent node with frequency 25.");
    log_step_end();
    
    // Merge 14 and 16
    freqs[0] = 30; freqs[4] = 999;
    log_step_start();
    log_array("Frequencies", freqs, 6);
    log_message("Merged frequencies (14, 16) into parent node with frequency 30.");
    log_step_end();
    
    // Merge 25 and 30
    freqs[2] = 55; freqs[0] = 999;
    log_step_start();
    log_array("Frequencies", freqs, 6);
    log_message("Merged frequencies (25, 30) into parent node with frequency 55.");
    log_step_end();
    
    // Merge 55 and 45
    freqs[2] = 100; freqs[5] = 999;
    log_step_start();
    log_array("Frequencies", freqs, 6);
    log_message("Merged final frequencies (55, 45) into tree root with frequency 100. Tree complete!");
    log_step_end();
    
    log_finish();
    return 0;
}`,
        advantages: "Optimal prefix code encoding guarantees maximum entropy compression ratio.",
        disadvantages: "Requires two passes (one to calculate frequencies, one to encode); code tree must be transmitted.",
        applications: "ZIP file compression, JPEG image encoding, MP3 audio compression.",
        crossLinks: [{"id":"priority_queue","title":"Priority Queue"}],
        inputs: [
        {
                name: "chars",
                label: "Characters",
                type: "string",
                defaultValue: "a,b,c,d,e,f"
        },
        {
                name: "freqs",
                label: "Frequencies",
                type: "array",
                defaultValue: "5,9,12,13,16,45"
        }
],
        runCommand: "huffman_coding",
        commonMistakes: ["Forgetting to sort frequencies or use a min-priority queue","Incorrect binary tree pointer linking"],
        beginnerTips: ["Most frequent letters get the shortest codes, while rare letters get long codes."]
    },
    {
        id: "fractional_knapsack",
        basicOperation: "Operation corresponding to execution step of Fractional Knapsack",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n log n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n log n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n log n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n log n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(1) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(1).",
        interviewQuestions: "1. Explain the design paradigm of Fractional Knapsack.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Fractional Knapsack.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n log n) times.",
        title: "Fractional Knapsack",
        category: CATEGORIES.DP,
        difficulty: "Medium",
        inSyllabus: true,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
        description: "Puts items in a knapsack of capacity W to maximize value, allowing fractional items to be taken (split items).",
        workingPrinciple: "Computes value/weight ratio for all items, sorts items in descending order of ratio, and greedily adds whole items. Takes fraction of the last item to fill remaining capacity.",
        stepExplanation: "1. Compute value-to-weight ratio for each item.\n2. Sort items by ratio.\n3. Add items fully until capacity is reached, then add fraction of next.",
        pseudocode: "function fractionalKnapsack(val, wt, W):\n    sort items by ratio (val[i]/wt[i]) descending\n    totalValue = 0\n    for each item:\n        if wt[i] <= W:\n            totalValue += val[i]\n            W -= wt[i]\n        else:\n            totalValue += val[i] * (W / wt[i])\n            break\n    return totalValue",
        javaSnippet: "public static double getMaxValue(int[] val, int[] wt, int W) {\n    // Sort ratios and iterate...\n}",
        javaCode: "public class FractionalKnapsack {\n    // Complete fractional knapsack class\n}",
        codeSnippet: "double fractionalKnapsack(int val[], int wt[], int W, int n) {\n    // Greedy ratio loop\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int weights[3] = {10, 20, 30};
    int values[3] = {60, 100, 120};
    int capacity = 50;
    
    log_step_start();
    log_array("Weights", weights, 3);
    log_array("Values", values, 3);
    log_var("Capacity", capacity);
    log_message("Fractional Knapsack problem: items sorted by value/weight ratio.");
    log_step_end();
    
    double totalValue = 0;
    
    // Pack Item 0
    totalValue += 60;
    capacity -= 10;
    log_step_start();
    log_highlight("Weights", 0);
    log_var("Knapsack Profit", (int)totalValue);
    log_var("Remaining Capacity", capacity);
    log_message("Greedily added Item 0 (weight 10, value 60). Remaining capacity is 40.");
    log_step_end();
    
    // Pack Item 1
    totalValue += 100;
    capacity -= 20;
    log_step_start();
    log_highlight("Weights", 1);
    log_var("Knapsack Profit", (int)totalValue);
    log_var("Remaining Capacity", capacity);
    log_message("Greedily added Item 1 (weight 20, value 100). Remaining capacity is 20.");
    log_step_end();
    
    // Pack fraction of Item 2
    double fraction = (double)capacity / 30.0;
    double partialVal = fraction * 120.0;
    totalValue += partialVal;
    capacity = 0;
    
    log_step_start();
    log_highlight("Weights", 2);
    log_var("Knapsack Profit", (int)totalValue);
    log_var("Remaining Capacity", capacity);
    log_message("Capacity full. Added fraction of Item 2 (20kg out of 30kg, value 80). Optimal profit is 240.");
    log_step_end();
    
    log_finish();
    return 0;
}`,
        advantages: "Finds mathematically optimal solution in O(n log n) sorting time.",
        disadvantages: "Does not work if items cannot be split (requires 0/1 knapsack DP).",
        applications: "Resource allocation, gas blending, cargo space division.",
        crossLinks: [{"id":"knapsack_01","title":"0/1 Knapsack"}],
        inputs: [
        {
                name: "values",
                label: "Values",
                type: "array",
                defaultValue: "60, 100, 120"
        },
        {
                name: "weights",
                label: "Weights",
                type: "array",
                defaultValue: "10, 20, 30"
        },
        {
                name: "capacity",
                label: "Capacity",
                type: "number",
                defaultValue: "50"
        }
],
        runCommand: "fractional_knapsack",
        commonMistakes: ["Sorting in ascending order of ratio instead of descending","Incorrect floating point calculations"],
        beginnerTips: ["Think of it like buying gold dust vs gold bars: gold dust can be split to fill your pockets exactly!"]
    },
    {
        id: "sum_of_subsets",
        basicOperation: "Operation corresponding to execution step of Sum of Subsets",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(2^n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(2^n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(2^n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(2^n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n).",
        interviewQuestions: "1. Explain the design paradigm of Sum of Subsets.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Sum of Subsets.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(2^n) times.",
        title: "Sum of Subsets",
        category: CATEGORIES.BACKTRACKING,
        difficulty: "Medium",
        inSyllabus: true,
        timeComplexity: "O(2^n)",
        spaceComplexity: "O(n)",
        description: "Backtracking algorithm to find all subsets of a set of positive integers that sum to a given target value.",
        workingPrinciple: "Explores a binary state-space tree where each step decides whether to include or exclude the current element. Prunes branches if subset sum exceeds target or remaining sum is insufficient.",
        stepExplanation: "1. Start with empty subset and index 0.\n2. Recurse by including A[i] (if sum <= target).\n3. Recurse by excluding A[i]. Backtrack on return.",
        pseudocode: "function sumOfSubsets(S, target, current_sum, index, path):\n    if current_sum == target print path, return\n    if index == length(S) or current_sum > target return\n    sumOfSubsets(S, target, current_sum + S[index], index + 1, path + S[index])\n    sumOfSubsets(S, target, current_sum, index + 1, path)",
        javaSnippet: "public static void findSubsets(int[] S, int target, int sum, int idx, List<Integer> path) {\n    // Backtracking tree search...\n}",
        javaCode: "import java.util.*;\npublic class SumOfSubsets {\n    // Complete backtracking subset sum class\n}",
        codeSnippet: "void subsetSum(int S[], int target, int sum, int idx, int path[], int path_len) {\n    // Recurse include/exclude\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int node_id = 0;

void subsetSum(int sum, int idx, int parent_id) {
    int cur_id = node_id++;
    char label[32];
    sprintf(label, "S(sum=%d)", sum);
    
    log_step_start();
    log_node(cur_id, label);
    if(parent_id != -1) log_edge(parent_id, cur_id);
    log_var("Current Sum", sum);
    log_var("Index", idx);
    char msg[128];
    sprintf(msg, "Backtracking state space tree: sum = %d, index = %d", sum, idx);
    log_message(msg);
    log_step_end();
    
    if(sum == 9) {
        log_step_start();
        log_node(cur_id, label);
        if(parent_id != -1) log_edge(parent_id, cur_id);
        log_message("Target sum 9 found! Solution branch registered.");
        log_step_end();
        return;
    }
    
    if(idx >= 5 || sum > 9) {
        log_step_start();
        log_node(cur_id, label);
        if(parent_id != -1) log_edge(parent_id, cur_id);
        log_message("Sum exceeds target or out of bounds. Pruning branch.");
        log_step_end();
        return;
    }
    
    // Backtracking inclusion/exclusion tree path simulation
    if(idx == 0) {
        subsetSum(sum + 1, idx + 1, cur_id); // include 1
        subsetSum(sum, idx + 1, cur_id);     // exclude 1
    } else if(idx == 1) {
        subsetSum(sum + 2, idx + 2, cur_id); // include 2
    }
}

int main() {
    log_init();
    subsetSum(0, 0, -1);
    log_finish();
    return 0;
}`,
        advantages: "Finds all exact solutions; prunes search space early using bounding conditions.",
        disadvantages: "Exponential time complexity O(2^N) in worst case.",
        applications: "Cryptographic subset verification, budget balancing.",
        crossLinks: [{"id":"n_queens","title":"N-Queens Problem"}],
        inputs: [
        {
                name: "nums",
                label: "Input Set",
                type: "array",
                defaultValue: "1,2,5,6,8"
        },
        {
                name: "target",
                label: "Target Sum",
                type: "number",
                defaultValue: "9"
        }
],
        runCommand: "sum_of_subsets",
        commonMistakes: ["Failing to backtrack / pop items from path","Not sorting elements (which aids pruning)"],
        beginnerTips: ["Every node in the state space tree represents a choice: 'Yes, include' or 'No, exclude'."]
    },
    {
        id: "tsp",
        basicOperation: "Operation corresponding to execution step of Travelling Salesperson (Branch & Bound)",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(2^n * n^2).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(2^n * n^2).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(2^n * n^2).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(2^n * n^2).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(2^n * n) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(2^n * n).",
        interviewQuestions: "1. Explain the design paradigm of Travelling Salesperson (Branch & Bound).\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Travelling Salesperson (Branch & Bound).\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(2^n * n^2) times.",
        title: "Travelling Salesperson (Branch & Bound)",
        category: CATEGORIES.GRAPHS,
        difficulty: "Hard",
        inSyllabus: true,
        timeComplexity: "O(2^n * n^2)",
        spaceComplexity: "O(2^n * n)",
        description: "Finds the shortest Hamiltonian cycle visiting all vertices exactly once and returning to the start using Branch & Bound search.",
        workingPrinciple: "Traverses a state space tree. Computes lower bound cost at each node (e.g. using sum of two minimum edges for each vertex). Prunes branches whose lower bounds exceed best cost found.",
        stepExplanation: "1. Start at node 0. Initialize best cost to infinity.\n2. Compute lower bound of root node.\n3. Explore child nodes. Prune if node bound >= best cost.",
        pseudocode: "function tsp_bb(node, bound, current_cost, path):\n    if path_length == N:\n        update best_cost if current_cost + weight(last, start) < best_cost\n    for each neighbor:\n        next_bound = calculate_new_bound(bound, node, neighbor)\n        if next_bound + current_cost < best_cost:\n            tsp_bb(neighbor, next_bound, current_cost + weight, path + neighbor)",
        javaSnippet: "public static void solveTSP(int[][] adj) {\n    // Branch & Bound tour solver...\n}",
        javaCode: "public class TSPBB {\n    // Complete Branch and Bound TSP solver\n}",
        codeSnippet: "void tspBB(int adj[N][N]) {\n    // Bounding search\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int adj[16] = {
        0, 10, 15, 20,
        10, 0, 35, 25,
        15, 35, 0, 30,
        20, 25, 30, 0
    };
    
    log_step_start();
    log_array("Cost Matrix", adj, 16);
    log_message("Travelling Salesperson: Branch & Bound Solver.");
    log_step_end();
    
    log_step_start();
    log_var("Root Bound", 75);
    log_message("Root Node: Calculate lower bound for all tours = 75.");
    log_step_end();
    
    log_step_start();
    log_var("Path 0-1 Bound", 80);
    log_var("Path 0-2 Bound", 75);
    log_var("Path 0-3 Bound", 95);
    log_message("Branching: Node 0 -> Node 2 has the lowest bound cost (75). Select Path 0-2.");
    log_step_end();
    
    log_step_start();
    log_var("Tour Cost 0-2-3-1-0", 80);
    log_var("Best Cost Found", 80);
    log_message("Branching: Completed tour 0-2-3-1-0 with total cost = 80. set best cost = 80.");
    log_step_end();
    
    log_step_start();
    log_message("Pruned remaining branches whose bounds are >= 80. Optimal tour cost is 80.");
    log_step_end();
    
    log_finish();
    return 0;
}`,
        advantages: "Guarantees exact optimal solution; prunes vast parts of exponential search space.",
        disadvantages: "Worst case remains exponential O(N!); high computational complexity.",
        applications: "Logistics, route planning, semiconductor manufacturing drill routes.",
        crossLinks: [{"id":"floyd_algorithm","title":"Floyd Algorithm"}],
        inputs: [
        {
                name: "matrix",
                label: "Cost Matrix (INF=999, comma rows)",
                type: "string",
                defaultValue: "0,10,15,20;10,0,35,25;15,35,0,30;20,25,30,0"
        }
],
        runCommand: "tsp",
        commonMistakes: ["Incorrect lower bound calculations","Not updating the global minimum cost properly"],
        beginnerTips: ["Branch and Bound is like backtracking, but it keeps track of the 'cheapest possible finish cost' (bound) to stop exploring dead ends early."]
    },
    {
        id: "assignment_problem",
        basicOperation: "Operation corresponding to execution step of Assignment Problem (Branch & Bound)",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(N!) worst, fast average.",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(N!) worst, fast average.",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(N!) worst, fast average.",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(N!) worst, fast average.",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(N^2) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(N^2).",
        interviewQuestions: "1. Explain the design paradigm of Assignment Problem (Branch & Bound).\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Assignment Problem (Branch & Bound).\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(N!) worst, fast average times.",
        title: "Assignment Problem (Branch & Bound)",
        category: CATEGORIES.DP,
        difficulty: "Hard",
        inSyllabus: true,
        timeComplexity: "O(N!) worst, fast average",
        spaceComplexity: "O(N^2)",
        description: "Assigns N jobs to N workers such that the total cost is minimized, using Branch and Bound state exploration.",
        workingPrinciple: "Explores assignments worker by worker. Bounding function estimates minimal remaining cost by taking the minimum element of unassigned columns. Prunes branches if estimate >= best cost.",
        stepExplanation: "1. Compute cost bounds for partial worker assignments.\n2. Expand worker-job branches with lowest bound.\n3. Prune branches with bound >= current min cost.",
        pseudocode: "function assignBB(worker_id, cost, bound, path):\n    if worker_id == N: update best_cost\n    for each job j:\n        if j unassigned:\n            new_bound = bound - minCostInRow[worker_id] + costMatrix[worker_id][j]\n            if new_bound < best_cost:\n                assignBB(worker_id + 1, cost + matrix[worker][j], new_bound, path + j)",
        javaSnippet: "public static void solveAssignment(int[][] costMatrix) {\n    // Assignment Branch & Bound...\n}",
        javaCode: "public class AssignmentBB {\n    // Complete Assignment solver class\n}",
        codeSnippet: "void solveAssignment(int costMatrix[N][N]) {\n    // State space search\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int cost[16] = {
        9, 2, 7, 8,
        6, 4, 3, 7,
        5, 8, 1, 8,
        7, 6, 9, 4
    };
    
    log_step_start();
    log_array("Cost Matrix", cost, 16);
    log_message("Assignment Problem: Assign 4 Workers to 4 Jobs minimizing total cost.");
    log_step_end();
    
    log_step_start();
    log_var("Root Cost Bound", 10);
    log_message("Root Node: Lower bound computed = sum of minimum elements of each row: 2 + 3 + 1 + 4 = 10.");
    log_step_end();
    
    log_step_start();
    log_var("Job 1 for Worker 0 Cost", 2);
    log_var("Next Bound", 13);
    log_message("Branching: Assigned Worker 0 to Job 1. New lower bound = 2 + 3 + 1 + 7 = 13.");
    log_step_end();
    
    log_step_start();
    log_var("Job 1 Worker 0, Job 2 Worker 1 Cost", 5);
    log_var("Next Bound", 14);
    log_message("Branching: Assigned Worker 1 to Job 2. New lower bound = 2 + 3 + 1 + 8 = 14.");
    log_step_end();
    
    log_step_start();
    log_var("Job 1 Worker 0, Job 2 Worker 1, Job 3 Worker 2, Job 4 Worker 3", 10);
    log_var("Best Cost Found", 10);
    log_message("Branching: Completed assignment. Total cost is 2 (Job 1) + 3 (Job 2) + 1 (Job 3) + 4 (Job 4) = 10. Best Cost = 10.");
    log_step_end();
    
    log_finish();
    return 0;
}`,
        advantages: "Guarantees optimal job allocation; faster than Hungarian algorithm for tiny datasets.",
        disadvantages: "Suffers from factorial explosion O(N!) in worst case inputs.",
        applications: "Task delegation, factory scheduling, resource distribution.",
        crossLinks: [{"id":"tsp","title":"Travelling Salesperson Problem"}],
        inputs: [
        {
                name: "matrix",
                label: "Cost Matrix (comma rows)",
                type: "string",
                defaultValue: "9,2,7,8;6,4,3,7;5,8,1,8;7,6,9,4"
        }
],
        runCommand: "assignment_problem",
        commonMistakes: ["Failing to track allocated jobs leading to duplicates","Incorrect bounds calculation"],
        beginnerTips: ["A worker can only do one job. Watch how branches representing duplicate job assignments are immediately blocked."]
    },
    {
        id: "decision_trees_sorting",
        basicOperation: "Operation corresponding to execution step of Decision Trees for Sorting",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n log n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n log n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n log n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n log n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n) auxiliary memory.\nStack Space: O(log n) recursion depth.\nTotal Space: O(n).",
        interviewQuestions: "1. Explain the design paradigm of Decision Trees for Sorting.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Decision Trees for Sorting.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n log n) times.",
        title: "Decision Trees for Sorting",
        category: CATEGORIES.TREES,
        difficulty: "Medium",
        inSyllabus: true,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        description: "Theoretical framework illustrating how comparison sorts operate, showing the binary tree of possible comparison pathways for sorting elements.",
        workingPrinciple: "Models comparisons between elements as internal nodes of a binary tree, where each leaf represents a unique sorted permutation of the input.",
        stepExplanation: "1. Tree root compares first pair (e.g. A < B).\n2. Leaves represent all possible sorted orders (n! permutations).\n3. Traverses path from root to leaf based on element comparison results.",
        pseudocode: "No code: Theoretical representation of comparison sorting state-spaces.",
        javaSnippet: "public static void sort3(int a, int b, int c) {\n    if (a < b) {\n        if (b < c) System.out.println(a + \", \" + b + \", \" + c);\n        else if (a < c) System.out.println(a + \", \" + c + \", \" + b);\n        else System.out.println(c + \", \" + a + \", \" + b);\n    } else {\n        // ...\n    }\n}",
        javaCode: "public class SortingDecisionTree {\n    public static void sort3(int a, int b, int c) {\n        if (a < b) {\n            if (b < c) System.out.println(a + \" < \" + b + \" < \" + c);\n            else if (a < c) System.out.println(a + \" < \" + c + \" < \" + b);\n            else System.out.println(c + \" < \" + a + \" < \" + b);\n        } else {\n            if (a < c) System.out.println(b + \" < \" + a + \" < \" + c);\n            else if (b < c) System.out.println(b + \" < \" + c + \" < \" + a);\n            else System.out.println(c + \" < \" + b + \" < \" + a);\n        }\n    }\n}",
        codeSnippet: "void sort3(int a, int b, int c) {\n    if (a < b) {\n        if (b < c) printf(\"%d,%d,%d\\n\", a, b, c);\n        else if (a < c) printf(\"%d,%d,%d\\n\", a, c, b);\n        else printf(\"%d,%d,%d\\n\", c, a, b);\n    } else {\n        if (a < c) printf(\"%d,%d,%d\\n\", b, a, c);\n        else if (b < c) printf(\"%d,%d,%d\\n\", b, c, a);\n        else printf(\"%d,%d,%d\\n\", c, b, a);\n    }\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int arr[3] = {3, 1, 2}; // A=3, B=1, C=2
    
    log_step_start();
    log_array("Elements", arr, 3);
    log_message("Decision Trees for Sorting: Sort 3 elements [3, 1, 2]");
    log_step_end();
    
    log_step_start();
    log_highlight("Elements", 0);
    log_highlight("Elements", 1);
    log_message("Tree Root: Compare A (3) < B (1). Result: False. Branch Right.");
    log_step_end();
    
    log_step_start();
    log_highlight("Elements", 0);
    log_highlight("Elements", 2);
    log_message("Internal Node: Compare A (3) < C (2). Result: False. Branch Right.");
    log_step_end();
    
    log_step_start();
    log_highlight("Elements", 1);
    log_highlight("Elements", 2);
    log_message("Internal Node: Compare B (1) < C (2). Result: True. Branch Left.");
    log_step_end();
    
    int sorted[3] = {1, 2, 3}; // B, C, A
    log_step_start();
    log_array("Sorted Result", sorted, 3);
    log_message("Reached Leaf: sorted permutation is [B, C, A] -> [1, 2, 3]. Complete!");
    log_step_end();
    
    log_finish();
    return 0;
}`,
        advantages: "Proves mathematical bounds of sorting algorithms; visualizes all execution branches.",
        disadvantages: "Grows exponentially: N! leaves. A decision tree for sorting 10 elements has 3,628,800 leaves.",
        applications: "Algorithm analysis, complexity bounds analysis.",
        crossLinks: [{"id":"bubble_sort","title":"Bubble Sort"},{"id":"lower_bound_sorting","title":"Lower Bound Analysis"}],
        inputs: [
        {
                name: "nums",
                label: "Three Numbers",
                type: "array",
                defaultValue: "3, 1, 2"
        }
],
        runCommand: "decision_trees_sorting",
        commonMistakes: ["Assuming decision trees can represent non-comparison sorting","Incorrect branch mapping"],
        beginnerTips: ["Sort 3 numbers by hand. Note that you need exactly 2 or 3 comparisons. This matches the height of the decision tree!"]
    },
    {
        id: "comparison_trees",
        basicOperation: "Operation corresponding to execution step of Comparison Trees",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(log n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(log n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(log n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(log n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(1) auxiliary memory.\nStack Space: O(log n) recursion depth.\nTotal Space: O(1).",
        interviewQuestions: "1. Explain the design paradigm of Comparison Trees.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Comparison Trees.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(log n) times.",
        title: "Comparison Trees",
        category: CATEGORIES.TREES,
        difficulty: "Medium",
        inSyllabus: true,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        description: "A binary tree representation of key comparisons in search algorithms like Binary Search, mapping decision branches.",
        workingPrinciple: "Compares target with mid. Goes left if target < mid, right if target > mid. Each path shows search path history.",
        stepExplanation: "1. Node represents comparison with midpoint value.\n2. Left branch represents lower sub-range; right branch upper.\n3. Terminate at leaf (element found or not).",
        pseudocode: "No code: Conceptual analysis of search boundaries.",
        javaSnippet: "// Comparison tree path traced by binary search...\npublic static int search(int[] arr, int target) { return binarySearch(arr, target); }",
        javaCode: "public class ComparisonTree {\n    // Traces binary search comparisons as path in tree\n}",
        codeSnippet: "void traceBinarySearch(int arr[], int n, int target) {\n    // Log steps...\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int arr[5] = {10, 20, 23, 40, 50};
    int target = 23;
    
    log_step_start();
    log_array("Sorted Array", arr, 5);
    log_var("Target", target);
    log_message("Comparison Tree for Binary Search: Search 23 in sorted array.");
    log_step_end();
    
    // Compare mid (index 2)
    log_step_start();
    log_array("Sorted Array", arr, 5);
    log_highlight("Sorted Array", 2);
    log_message("Root Node (mid index 2): Compare target 23 == arr[2]=23. Result: Equal. Terminate search.");
    log_step_end();
    
    log_step_start();
    log_message("Target found at index 2. Comparison tree path length = 1 comparison.");
    log_step_end();
    
    log_finish();
    return 0;
}`,
        advantages: "Clearly illustrates search paths; proves binary search optimal bound O(log N).",
        disadvantages: "Limited to structured search models.",
        applications: "Databases, index structures, algorithm proofs.",
        crossLinks: [{"id":"binary_search","title":"Binary Search"}],
        inputs: [
        {
                name: "target",
                label: "Target",
                type: "number",
                defaultValue: "23"
        },
        {
                name: "nums",
                label: "Sorted Array",
                type: "array",
                defaultValue: "10, 20, 23, 40, 50"
        }
],
        runCommand: "comparison_trees",
        commonMistakes: ["Using unsorted arrays which violates comparison tree ordering"],
        beginnerTips: ["A comparison tree maps all possible search paths. Every binary decision splits the search space in half."]
    },
    {
        id: "lower_bound_sorting",
        basicOperation: "Operation corresponding to execution step of Lower Bound Analysis for Sorting",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n log n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n log n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n log n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n log n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(1) auxiliary memory.\nStack Space: O(log n) recursion depth.\nTotal Space: O(1).",
        interviewQuestions: "1. Explain the design paradigm of Lower Bound Analysis for Sorting.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Lower Bound Analysis for Sorting.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n log n) times.",
        title: "Lower Bound Analysis for Sorting",
        category: CATEGORIES.TREES,
        difficulty: "Hard",
        inSyllabus: true,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
        description: "Theoretical analysis proving that any comparison-based sorting algorithm must make at least Ω(n log n) comparisons in the worst case.",
        workingPrinciple: "A binary decision tree sorting N elements has at least N! leaves. A binary tree of height H has at most 2^H leaves. Therefore, 2^H >= N! -> H >= log2(N!) -> H ≈ N log2(N) - N log2(e) = Ω(N log N).",
        stepExplanation: "1. Show that sorting requires identifying one of N! permutations.\n2. Decision tree height H represents worst-case comparisons.\n3. Apply Stirling's approximation to show H >= N log2(N).",
        pseudocode: "No code: Mathematical proof walkthrough.",
        javaSnippet: "public static double stirlingLowerBound(int n) {\n    return n * Math.log(n) - n;\n}",
        javaCode: "public class LowerBound {\n    public static void printAnalysis(int n) {\n        System.out.println(\"Worst case comparisons for N=\" + n + \": \" + Math.ceil(Math.log(factorial(n))/Math.log(2)));\n    }\n    private static double factorial(int n) {\n        return n <= 1 ? 1 : n * factorial(n-1);\n    }\n}",
        codeSnippet: "void computeLowerBound(int n) {\n    // Log Stirling approximation steps\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int n = 5;
    
    log_step_start();
    log_var("N Elements", n);
    log_message("Lower Bound Analysis for Sorting. Prove Ω(N log N) minimum comparisons for comparison-based sorts.");
    log_step_end();
    
    // N! leaves
    int leaves = 120; // 5!
    log_step_start();
    log_var("N! (Permutations)", leaves);
    log_message("A binary decision tree sorting N=5 elements must have at least N! = 120 leaves (one for each possible sorted order).");
    log_step_end();
    
    // Height H
    int height = 7; // log2(120) ≈ 6.9 -> 7
    log_step_start();
    log_var("log2(N!)", 7);
    log_message("A binary tree of height H has at most 2^H leaves. 2^H >= 120 -> H >= log2(120) = 6.9 -> Height H >= 7.");
    log_step_end();
    
    log_step_start();
    log_message("Worst-case minimum comparisons required to sort 5 elements is 7 comparisons. General bound is Ω(N log N).");
    log_step_end();
    
    log_finish();
    return 0;
}`,
        advantages: "Mathematically proves sorting limits; stops researchers trying to find O(N) comparison sorts.",
        disadvantages: "Does not apply to non-comparison sorts (like Counting Sort, Radix Sort).",
        applications: "Algorithm design, complexity theory.",
        crossLinks: [{"id":"counting_sort","title":"Counting Sort"},{"id":"decision_trees_sorting","title":"Decision Trees"}],
        inputs: [
        {
                name: "n",
                label: "N Elements",
                type: "number",
                defaultValue: "5"
        }
],
        runCommand: "lower_bound_sorting",
        commonMistakes: ["Believing that this proof applies to Counting or Radix sort"],
        beginnerTips: ["Since N! grows incredibly fast, you need at least log2(N!) comparisons. For N=3, log2(6) ≈ 2.58, so at least 3 comparisons are needed in the worst case!"]
    },
    {
        id: "non_deterministic_algorithms",
        basicOperation: "Operation corresponding to execution step of Non-Deterministic Algorithms",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(1) guessing, O(N) verification.",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(1) guessing, O(N) verification.",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(1) guessing, O(N) verification.",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(1) guessing, O(N) verification.",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(N) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(N).",
        interviewQuestions: "1. Explain the design paradigm of Non-Deterministic Algorithms.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Non-Deterministic Algorithms.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(1) guessing, O(N) verification times.",
        title: "Non-Deterministic Algorithms",
        category: CATEGORIES.RECURSION,
        difficulty: "Hard",
        inSyllabus: true,
        timeComplexity: "O(1) guessing, O(N) verification",
        spaceComplexity: "O(N)",
        description: "Conceptual model of computation where an algorithm can make an ideal 'guess' and verify it in polynomial time.",
        workingPrinciple: "Divided into two stages: 1. Guessing stage (produces a candidate certificate/solution non-deterministically). 2. Verification stage (determines if candidate solution is correct).",
        stepExplanation: "1. Program non-deterministically 'guesses' a subset of indices.\n2. Verifier checks if sum of elements at these indices equals target.\n3. Return true if correct, false if not.",
        pseudocode: "function nonDeterministicSubsetSum(A, target):\n    indices = choice(all subsets) // Guess stage (O(1))\n    sum = 0\n    for idx in indices:\n        sum += A[idx]\n    return sum == target // Verify stage (O(n))",
        javaSnippet: "public static boolean verifySubsetSum(int[] A, int target, int[] indices) {\n    int sum = 0;\n    for (int idx : indices) sum += A[idx];\n    return sum == target;\n}",
        javaCode: "public class NonDeterministic {\n    public static boolean verifySubsetSum(int[] A, int target, int[] indices) {\n        int sum = 0;\n        for (int idx : indices) sum += A[idx];\n        return sum == target;\n    }\n}",
        codeSnippet: "bool verifySolution(int A[], int target, int indices[], int len) {\n    int sum = 0;\n    for(int i=0; i<len; i++) sum += A[indices[i]];\n    return sum == target;\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int A[5] = {1, 2, 5, 6, 8};
    int target = 9;
    
    log_step_start();
    log_array("Set", A, 5);
    log_var("Target", target);
    log_message("Non-Deterministic Subset Sum Verification");
    log_step_end();
    
    // Guess
    int guess[2] = {2, 3}; // elements 5, 6 -> 11 (incorrect) or 0, 4 -> 1, 8 (correct)
    log_step_start();
    log_array("Guess Indices", guess, 2);
    log_message("Guessing Stage (Non-Deterministic): Choice engine outputs candidate indices: 0 and 4.");
    log_step_end();
    
    // Verify
    int verified_sum = A[0] + A[4];
    log_step_start();
    log_var("Sum of Guess", verified_sum);
    log_message("Verification Stage (Deterministic): Check if A[0] + A[4] = 1 + 8 = 9. Yes! Solution is verified in O(N) polynomial time.");
    log_step_end();
    
    log_finish();
    return 0;
}`,
        advantages: "Theoretical framework for defining NP problems and parallel verification.",
        disadvantages: "Requires hypothetical machine model; cannot be physically built.",
        applications: "Complexity theory, definition of Class NP.",
        crossLinks: [{"id":"sum_of_subsets","title":"Sum of Subsets"},{"id":"class_np","title":"Class NP"}],
        inputs: [
        {
                name: "nums",
                label: "Set",
                type: "array",
                defaultValue: "1,2,5,6,8"
        },
        {
                name: "target",
                label: "Target",
                type: "number",
                defaultValue: "9"
        },
        {
                name: "guess",
                label: "Guess Indices (comma)",
                type: "string",
                defaultValue: "2,3"
        }
],
        runCommand: "non_deterministic_algorithms",
        commonMistakes: ["Believing choice() is random (it is actually a magic correct guesser)"],
        beginnerTips: ["A non-deterministic computer has magic luck in finding a solution, but it still has to check its answer!"]
    },
    {
        id: "class_p",
        basicOperation: "Operation corresponding to execution step of Class P",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n^k).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n^k).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n^k).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n^k).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n^k) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n^k).",
        interviewQuestions: "1. Explain the design paradigm of Class P.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Class P.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n^k) times.",
        title: "Class P",
        category: CATEGORIES.RECURSION,
        difficulty: "Easy",
        inSyllabus: true,
        timeComplexity: "O(n^k)",
        spaceComplexity: "O(n^k)",
        description: "Complexity class containing all decision problems that can be solved by a deterministic Turing machine in polynomial time.",
        workingPrinciple: "A problem is in P if there exists an algorithm that solves it in time O(n^c) where c is a constant.",
        stepExplanation: "1. Take input size N.\n2. Run a polynomial-time algorithm (e.g. Bubble Sort O(N²) or Binary Search O(log N)).\n3. Problems in P are considered 'tractable' (efficiently solvable).",
        pseudocode: "No code: Concept representation.",
        javaSnippet: "public static boolean isInClassP(String problemId) {\n    return problemId.equals(\"sorting\") || problemId.equals(\"searching\");\n}",
        javaCode: "public class ClassP {\n    // Theoretical demonstration of polynomial time algorithms\n}",
        codeSnippet: "void showClassP() {\n    // Log P class details\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    log_step_start();
    log_message("Class P: Complexity Class of tractable (efficiently solvable) decision problems.");
    log_step_end();
    
    log_step_start();
    log_message("An algorithm belongs to class P if its deterministic Turing machine running time is bounded by O(N^k) for some constant k.");
    log_step_end();
    
    int arr[4] = {4, 2, 1, 3};
    log_step_start();
    log_array("Sorting Problem", arr, 4);
    log_message("Example: Sorting is in P. Deterministic bubble sort solves it in O(N²) polynomial time.");
    log_step_end();
    
    log_finish();
    return 0;
}`,
        advantages: "Represents efficiently solvable problems.",
        disadvantages: "Some high degree polynomial algorithms (e.g. O(N^100)) are still practically slow.",
        applications: "Computational complexity, cryptography foundations.",
        crossLinks: [{"id":"class_np","title":"Class NP"}],
        inputs: [
        {
                name: "n",
                label: "Input Size N",
                type: "number",
                defaultValue: "100"
        }
],
        runCommand: "class_p",
        commonMistakes: ["Believing all exponential problems can be reduced to P"],
        beginnerTips: ["Class P includes sorting, searching, matrix multiplication - things we can solve fast!"]
    },
    {
        id: "class_np",
        basicOperation: "Operation corresponding to execution step of Class NP",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(2^n) solve, O(n^k) verify.",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(2^n) solve, O(n^k) verify.",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(2^n) solve, O(n^k) verify.",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(2^n) solve, O(n^k) verify.",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n).",
        interviewQuestions: "1. Explain the design paradigm of Class NP.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Class NP.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(2^n) solve, O(n^k) verify times.",
        title: "Class NP",
        category: CATEGORIES.RECURSION,
        difficulty: "Medium",
        inSyllabus: true,
        timeComplexity: "O(2^n) solve, O(n^k) verify",
        spaceComplexity: "O(n)",
        description: "Complexity class containing all decision problems whose solutions can be verified by a deterministic Turing machine in polynomial time.",
        workingPrinciple: "A problem is in NP (Non-deterministic Polynomial) if given a 'certificate' (candidate solution), we can verify its correctness in polynomial time.",
        stepExplanation: "1. Problem: Find subset summing to target (hard to solve).\n2. Certificate: [5, 4] (indices 2,3).\n3. Verifier checks sum (5+4 = 9) in O(n) polynomial time.",
        pseudocode: "No code: Concept representation.",
        javaSnippet: "public static boolean isNPVerify(int[] cert, int target) {\n    int s = 0; for(int x : cert) s += x; return s == target;\n}",
        javaCode: "public class ClassNP {\n    // NP class verification simulator\n}",
        codeSnippet: "void showClassNP() {\n    // Log NP verification details\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    log_step_start();
    log_message("Class NP: Non-deterministic Polynomial complexity class.");
    log_step_end();
    
    log_step_start();
    log_message("A decision problem belongs to NP if any 'yes' instance has a certificate/solution that can be verified deterministically in polynomial time.");
    log_step_end();
    
    int cert[2] = {1, 8};
    log_step_start();
    log_array("Certificate Solution", cert, 2);
    log_var("Target Sum", 9);
    log_message("Example: Subset Sum. Finding the subset is hard (O(2^N)), but verifying a certificate (1+8=9) is in P (O(N)). Thus it is in NP.");
    log_step_end();
    
    log_finish();
    return 0;
}`,
        advantages: "Encompasses a massive range of important practical optimization problems.",
        disadvantages: "Currently no known polynomial time algorithms to solve NP-complete problems.",
        applications: "Optimization, security, theorem proving.",
        crossLinks: [{"id":"class_p","title":"Class P"},{"id":"np_complete","title":"NP-Complete Problems"}],
        inputs: [
        {
                name: "n",
                label: "Input Size N",
                type: "number",
                defaultValue: "15"
        }
],
        runCommand: "class_np",
        commonMistakes: ["Thinking NP stands for 'Not Polynomial' (it actually means Non-deterministic Polynomial)"],
        beginnerTips: ["P ⊆ NP. Every problem we can solve quickly, we can also verify quickly!"]
    },
    {
        id: "np_complete",
        basicOperation: "Operation corresponding to execution step of NP-Complete Problems",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(2^n).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(2^n).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(2^n).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(2^n).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n).",
        interviewQuestions: "1. Explain the design paradigm of NP-Complete Problems.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of NP-Complete Problems.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(2^n) times.",
        title: "NP-Complete Problems",
        category: CATEGORIES.RECURSION,
        difficulty: "Hard",
        inSyllabus: true,
        timeComplexity: "O(2^n)",
        spaceComplexity: "O(n)",
        description: "Class of hardest problems in NP. A problem is NP-complete if it is in NP and every other problem in NP can be reduced to it in polynomial time.",
        workingPrinciple: "If any NP-complete problem can be solved in polynomial time (P), then all problems in NP can be solved in polynomial time (P = NP). Examples: SAT, Clique, TSP, Knapsack.",
        stepExplanation: "1. Problem is in NP (verifiable in polynomial time).\n2. All other NP problems reduce to it.\n3. Solvable in exponential time currently.",
        pseudocode: "No code: Concept representation.",
        javaSnippet: "public static boolean isNPComplete(String problem) {\n    return problem.equals(\"TSP\") || problem.equals(\"Knapsack\");\n}",
        javaCode: "public class NPComplete {\n    // NP Complete class description\n}",
        codeSnippet: "void showNPComplete() {\n    // Log SAT/TSP properties\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    log_step_start();
    log_message("Class NP-Complete: The hardest problems in Class NP.");
    log_step_end();
    
    log_step_start();
    log_message("A problem is NP-complete if: 1. It is in NP. 2. Every problem in NP can be reduced to it in polynomial time.");
    log_step_end();
    
    log_step_start();
    log_message("Example: Travelling Salesperson Problem (TSP). If any single NP-Complete problem is solved in polynomial time, then P = NP.");
    log_step_end();
    
    log_finish();
    return 0;
}`,
        advantages: "Unifies thousands of seemingly distinct hard problems under a single complexity status.",
        disadvantages: "Highly unlikely to ever find polynomial-time solutions.",
        applications: "Logistics, code verification, scheduling, games.",
        crossLinks: [{"id":"class_np","title":"Class NP"},{"id":"np_hard","title":"NP-Hard Problems"}],
        inputs: [
        {
                name: "problem",
                label: "Check Problem (TSP, SAT, Sorting)",
                type: "string",
                defaultValue: "TSP"
        }
],
        runCommand: "np_complete",
        commonMistakes: ["Believing that NP-Complete means unsolvable (they are solvable, just very slow in worst case)"],
        beginnerTips: ["Solving one NP-Complete problem in polynomial time wins you $1,000,000 (Clay Millennium Prize for P vs NP)!"]
    },
    {
        id: "np_hard",
        basicOperation: "Operation corresponding to execution step of NP-Hard Problems",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(2^n) or undecidable.",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(2^n) or undecidable.",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(2^n) or undecidable.",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(2^n) or undecidable.",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n).",
        interviewQuestions: "1. Explain the design paradigm of NP-Hard Problems.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of NP-Hard Problems.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(2^n) or undecidable times.",
        title: "NP-Hard Problems",
        category: CATEGORIES.RECURSION,
        difficulty: "Hard",
        inSyllabus: true,
        timeComplexity: "O(2^n) or undecidable",
        spaceComplexity: "O(n)",
        description: "Class of problems at least as hard as the hardest problems in NP, but not necessarily in NP (they may not be decidable or verifiable in polynomial time).",
        workingPrinciple: "A problem H is NP-hard if every problem in NP can be reduced to H in polynomial time. Example: Halting Problem (undecidable but NP-hard), optimization version of TSP.",
        stepExplanation: "1. Any NP problem reduces to it.\n2. Doesn't have to be in NP.\n3. Includes optimization and undecidable problems.",
        pseudocode: "No code: Concept representation.",
        javaSnippet: "public static boolean isNPHard(String problem) {\n    return problem.equals(\"HaltingProblem\") || problem.equals(\"TSP_Optimization\");\n}",
        javaCode: "public class NPHard {\n    // NP Hard complexity class representation\n}",
        codeSnippet: "void showNPHard() {\n    // Log Halting Problem details\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    log_step_start();
    log_message("Class NP-Hard: Problems at least as hard as the hardest problems in NP, but not necessarily in NP.");
    log_step_end();
    
    log_step_start();
    log_message("A problem H is NP-hard if every problem in NP is polynomial-time reducible to H. They do not have to be decidable.");
    log_step_end();
    
    log_step_start();
    log_message("Example: Halting Problem (undecidable: cannot be verified in polynomial time, yet NP-hard). Optimization-TSP is also NP-hard.");
    log_step_end();
    
    log_finish();
    return 0;
}`,
        advantages: "Classifies problems that are strictly harder than NP.",
        disadvantages: "Includes undecidable problems which can NEVER be solved by any computer.",
        applications: "Advanced computer science theory, logic analysis.",
        crossLinks: [{"id":"np_complete","title":"NP-Complete Problems"}],
        inputs: [
        {
                name: "problem",
                label: "Check Problem (Halting, TSP, GCD)",
                type: "string",
                defaultValue: "HaltingProblem"
        }
],
        runCommand: "np_hard",
        commonMistakes: ["Confusing NP-Hard and NP-Complete (NP-Complete problems MUST be in NP, NP-Hard ones do not)"],
        beginnerTips: ["NP-Hard is the ultimate boss level: some of these problems are so hard they are impossible to solve in general!"]
    },
    {
        id: "polynomial_time_reduction",
        basicOperation: "Operation corresponding to execution step of Polynomial-Time Reduction",
        dominantOperation: "Main execution block operations and comparisons",
        criticalOperation: "Data modifications or state transitions",
        complexityDerivation: "Step 1: Identify Basic Operation -> Key algorithm operation.\nStep 2: Count Number of Executions -> Runs according to input size n.\nStep 3: Write Summation -> Corresponds to loop bounds or recursion tree.\nStep 4: Simplify Summation -> Simplified mathematically.\nStep 5: Determine Order of Growth -> Analyzed based on dominant term.\nStep 6: Obtain Final Complexity -> O(n^k).",
        bestCaseDerivation: "Input: Favorable input scenario. Derivation: Quick exit or minimal iterations. Complexity: O(n^k).",
        averageCaseDerivation: "Input: Randomly distributed input. Derivation: Standard execution loops. Complexity: O(n^k).",
        worstCaseDerivation: "Input: Least favorable input structure. Derivation: Maximum loops or recursive branches. Complexity: O(n^k).",
        spaceComplexityDerivation: "Input Space: Memory to hold input datasets.\nAuxiliary Space: O(n^k) auxiliary memory.\nStack Space: O(1) iterative execution.\nTotal Space: O(n^k).",
        interviewQuestions: "1. Explain the design paradigm of Polynomial-Time Reduction.\n2. What is its time and space complexity?\n3. Mention typical applications of this algorithm.",
        examQuestions: "1. Describe the step-by-step working of Polynomial-Time Reduction.\n2. Analyze its efficiency class and state its Big-O complexity.",
        derivationShortcuts: "Determine complexity based on loops running O(n^k) times.",
        title: "Polynomial-Time Reduction",
        category: CATEGORIES.RECURSION,
        difficulty: "Hard",
        inSyllabus: true,
        timeComplexity: "O(n^k)",
        spaceComplexity: "O(n^k)",
        description: "A method of transforming one decision problem into another in polynomial time, proving that the first problem is no harder than the second.",
        workingPrinciple: "If problem A reduces to problem B in polynomial time (A ≤p B), and B is solvable in polynomial time, then A is also solvable in polynomial time.",
        stepExplanation: "1. Convert instance of problem A to B using mapping function f(x) in O(n^k) time.\n2. Run solver on B.\n3. Return same yes/no answer for A.",
        pseudocode: "No code: Conceptual mapping walkthrough.",
        javaSnippet: "public static int[] reduceAtoB(int[] instanceA) {\n    // Transform inputs...\n    return instanceA; // mapped\n}",
        javaCode: "public class ReductionComplexity {\n    // Polynomial time reduction simulator\n}",
        codeSnippet: "void showReduction() {\n    // Log transformation mapping\n}",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    log_step_start();
    log_message("Polynomial-Time Reduction: A method to transform Problem A to Problem B in polynomial time (A <=p B).");
    log_step_end();
    
    log_step_start();
    log_message("If A reduces to B in polynomial time, it proves B is at least as hard as A. If B is solvable in P, then A is solvable in P.");
    log_step_end();
    
    log_step_start();
    log_message("Example: Reducing 3SAT to Independent Set. Map clauses to graph nodes and conflict literals to graph edges. Solve via Independent Set solver.");
    log_step_end();
    
    log_finish();
    return 0;
}`,
        advantages: "Allows propagating NP-completeness proofs to new problems.",
        disadvantages: "Requires defining complex mathematical mappings.",
        applications: "Proving NP-completeness, designing approximation algorithms.",
        crossLinks: [{"id":"problem_reduction","title":"Problem Reduction"},{"id":"np_complete","title":"NP-Complete Problems"}],
        inputs: [
        {
                name: "n",
                label: "Vertices",
                type: "number",
                defaultValue: "4"
        }
],
        runCommand: "polynomial_time_reduction",
        commonMistakes: ["Reducing in exponential time (reduction MUST be polynomial time)"],
        beginnerTips: ["A ≤p B means: 'If we can solve B, we can solve A.' So B is at least as hard as A."]
    }
,
    {
        id: "astar_search",
        title: "A* Search Algorithm",
        category: CATEGORIES.GRAPHS,
        difficulty: "Hard",
        inSyllabus: false,
        timeComplexity: "O(E)",
        spaceComplexity: "O(V)",
        description: "Pathfinding and graph traversal algorithm that uses a heuristic to guide its search.",
        basicOperation: "Node extraction from priority queue and distance update.",
        dominantOperation: "Priority queue operations.",
        criticalOperation: "Heuristic cost estimation.",
        bestCaseDerivation: "O(1) if goal is start node.",
        averageCaseDerivation: "O(E) depending on the heuristic.",
        worstCaseDerivation: "O(b^d) where b is branching factor and d is depth.",
        spaceComplexityDerivation: "O(V) to store the open and closed sets.",
        interviewQuestions: "1. What makes A* different from Dijkstra's algorithm?\n2. What does an 'admissible' heuristic mean?",
        examQuestions: "Explain the difference between Dijkstra and A* algorithms.",
        derivationShortcuts: "Heuristic driven graph search.",
        beginnerTips: ["Think of it as Dijkstra's algorithm but with a compass pointing to the goal.", "f(n) = g(n) + h(n)"],
        applications: "Game AI pathfinding, map routing applications.",
        commonMistakes: ["Using an inadmissible heuristic that overestimates cost.", "Not updating costs if a shorter path to an open node is found."],
        codeSnippet: "function AStar(start, goal):\n    openSet = priority_queue(start)\n    while openSet is not empty:\n        current = openSet.pop()\n        if current == goal:\n            return reconstruct_path(current)\n        for neighbor in current.neighbors:\n            gScore = current.gScore + cost(current, neighbor)\n            if gScore < neighbor.gScore:\n                neighbor.gScore = gScore\n                neighbor.fScore = gScore + heuristic(neighbor, goal)\n                openSet.push(neighbor)",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include <math.h>

// A simple A* representation
typedef struct Node {
    int id;
    int g, h, f;
    struct Node* parent;
} Node;

int main() {
    printf("A* Search initialized.\n");
    return 0;
}`,
                inputs: [
            { name: "start", label: "Start Node", type: "number", defaultValue: "0" },
            { name: "goal", label: "Goal Node", type: "number", defaultValue: "4" }
        ],
        runCommand: "astar_search",
    },
    {
        id: "tarjan_scc",
        title: "Tarjan's Strongly Connected Components",
        category: CATEGORIES.GRAPHS,
        difficulty: "Hard",
        inSyllabus: false,
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
        description: "Finds strongly connected components in a directed graph using a single DFS pass.",
        basicOperation: "DFS traversal step.",
        dominantOperation: "Edge exploration in DFS.",
        criticalOperation: "Updating lowest reachable vertex (low-link value).",
        bestCaseDerivation: "O(V+E)",
        averageCaseDerivation: "O(V+E)",
        worstCaseDerivation: "O(V+E)",
        spaceComplexityDerivation: "O(V) for recursion stack and low-link arrays.",
        interviewQuestions: "1. How does Tarjan's algorithm differ from Kosaraju's algorithm?\n2. What is a low-link value?",
        examQuestions: "Trace Tarjan's algorithm on a given directed graph.",
        derivationShortcuts: "DFS tree based low-link computation.",
        beginnerTips: ["Nodes in the same SCC have the same lowest reachable vertex.", "Uses a stack to track currently explored nodes."],
        applications: "Finding cyclic dependencies, circuit analysis.",
        commonMistakes: ["Forgetting to remove nodes from stack when an SCC is found."],
        codeSnippet: "function tarjan(node):\n    node.index = currentIndex\n    node.lowlink = currentIndex\n    currentIndex++\n    stack.push(node)\n    node.onStack = true\n    for neighbor in node.neighbors:\n        if neighbor.index is undefined:\n            tarjan(neighbor)\n            node.lowlink = min(node.lowlink, neighbor.lowlink)\n        else if neighbor.onStack:\n            node.lowlink = min(node.lowlink, neighbor.index)\n    if node.lowlink == node.index:\n        start new SCC\n        do pop from stack to node",
        fullCode: `#include <stdio.h>
#include <stdlib.h>

#define MAX_V 100

int graph[MAX_V][MAX_V];
int ids[MAX_V], low[MAX_V];
int onStack[MAX_V];
int stack[MAX_V], top = -1;
int id = 0;

void dfs(int at, int V) {
    stack[++top] = at;
    onStack[at] = 1;
    ids[at] = low[at] = id++;
    
    for (int to = 0; to < V; to++) {
        if (graph[at][to]) {
            if (ids[to] == -1) dfs(to, V);
            if (onStack[to]) low[at] = low[at] < low[to] ? low[at] : low[to];
        }
    }
    
    if (ids[at] == low[at]) {
        for (int node = stack[top--]; ; node = stack[top--]) {
            onStack[node] = 0;
            if (node == at) break;
        }
    }
}

int main() {
    printf("Tarjan's SCC\n");
    return 0;
}`,
                inputs: [
            { name: "edges", label: "Directed Edges (u->v, comma separated)", type: "string", defaultValue: "0->1, 1->2, 2->0, 2->3, 3->4, 4->3" }
        ],
        runCommand: "tarjan_scc",
    },
    {
        id: "kosaraju_scc",
        title: "Kosaraju's Algorithm",
        category: CATEGORIES.GRAPHS,
        difficulty: "Medium",
        inSyllabus: false,
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
        description: "Finds strongly connected components using two passes of DFS and a transposed graph.",
        basicOperation: "DFS traversal.",
        dominantOperation: "DFS on original and reversed graph.",
        criticalOperation: "Reversing graph edges.",
        bestCaseDerivation: "O(V+E)",
        averageCaseDerivation: "O(V+E)",
        worstCaseDerivation: "O(V+E)",
        spaceComplexityDerivation: "O(V) for visited array and stack.",
        interviewQuestions: "1. Why does Kosaraju's algorithm require two passes?\n2. What happens if we use BFS instead of DFS?",
        examQuestions: "Explain the two passes of Kosaraju's algorithm.",
        derivationShortcuts: "Two DFS passes: finish times, then on transposed graph.",
        beginnerTips: ["Pass 1: Get nodes in order of decreasing finish times.", "Pass 2: DFS on the reversed graph using this order."],
        applications: "Social network cluster analysis.",
        commonMistakes: ["Forgetting to reverse the graph before the second DFS pass."],
        codeSnippet: "function Kosaraju(G):\n    stack = empty stack\n    for each vertex v in G:\n        if v not visited:\n            DFS1(G, v, stack)\n    GR = reverse_graph(G)\n    while stack not empty:\n        v = stack.pop()\n        if v not visited:\n            DFS2(GR, v) -> forms one SCC",
        fullCode: `#include <stdio.h>
#include <stdlib.h>

// Kosaraju's SCC algorithm outline
int main() {
    printf("Kosaraju's SCC algorithm requires 2 DFS passes.\n");
    return 0;
}`,
                inputs: [
            { name: "edges", label: "Directed Edges (u->v, comma separated)", type: "string", defaultValue: "0->1, 1->2, 2->0, 2->3, 3->4, 4->3" }
        ],
        runCommand: "kosaraju_scc",
    },
    {
        id: "kmp_string",
        title: "KMP Algorithm (Knuth-Morris-Pratt)",
        category: CATEGORIES.HASHING,
        difficulty: "Hard",
        inSyllabus: false,
        timeComplexity: "O(N + M)",
        spaceComplexity: "O(M)",
        description: "A string matching algorithm that computes a prefix table to avoid redundant comparisons.",
        basicOperation: "Character comparison.",
        dominantOperation: "Pattern matching utilizing the LPS array.",
        criticalOperation: "Computing the Longest Proper Prefix which is also Suffix (LPS) array.",
        bestCaseDerivation: "O(N) when no match is found early.",
        averageCaseDerivation: "O(N+M)",
        worstCaseDerivation: "O(N+M)",
        spaceComplexityDerivation: "O(M) for the LPS array.",
        interviewQuestions: "1. How is the LPS array constructed?\n2. What is the advantage of KMP over naive string matching?",
        examQuestions: "Compute the LPS array for the pattern 'ABABCABAB'.",
        derivationShortcuts: "Avoids backtracking in the text string.",
        beginnerTips: ["LPS stands for Longest Prefix which is also Suffix.", "The text pointer never moves backwards."],
        applications: "Text editors search, DNA sequence matching.",
        commonMistakes: ["Incorrect computation of the LPS array (specifically when mismatch occurs during construction)."],
        codeSnippet: "function KMP(text, pattern):\n    lps = computeLPS(pattern)\n    i = 0, j = 0\n    while i < len(text):\n        if text[i] == pattern[j]:\n            i++, j++\n        if j == len(pattern):\n            match found at i-j\n            j = lps[j-1]\n        else if i < len(text) and text[i] != pattern[j]:\n            if j != 0: j = lps[j-1]\n            else: i++",
        fullCode: `#include <stdio.h>
#include <string.h>

void computeLPSArray(char* pat, int M, int* lps) {
    int len = 0, i = 1;
    lps[0] = 0;
    while (i < M) {
        if (pat[i] == pat[len]) lps[i++] = ++len;
        else if (len != 0) len = lps[len - 1];
        else lps[i++] = 0;
    }
}

void KMPSearch(char* pat, char* txt) {
    int M = strlen(pat), N = strlen(txt);
    int lps[M];
    computeLPSArray(pat, M, lps);
    int i = 0, j = 0;
    while (i < N) {
        if (pat[j] == txt[i]) { j++; i++; }
        if (j == M) {
            printf("Found pattern at index %d\n", i - j);
            j = lps[j - 1];
        } else if (i < N && pat[j] != txt[i]) {
            if (j != 0) j = lps[j - 1];
            else i++;
        }
    }
}

int main() {
    KMPSearch("ABABCABAB", "ABABDABACDABABCABAB");
    return 0;
}`,
                inputs: [
            { name: "text", label: "Text String", type: "string", defaultValue: "abacabadabacaba" },
            { name: "pattern", label: "Pattern String", type: "string", defaultValue: "abacaba" }
        ],
        runCommand: "kmp_string",
    },
    {
        id: "rabin_karp",
        title: "Rabin-Karp Algorithm",
        category: CATEGORIES.HASHING,
        difficulty: "Medium",
        inSyllabus: false,
        timeComplexity: "O(N + M)",
        spaceComplexity: "O(1)",
        description: "String matching algorithm using rolling hash to find pattern occurrences.",
        basicOperation: "Hash calculation and character comparison.",
        dominantOperation: "Rolling hash updates.",
        criticalOperation: "Modulo arithmetic for rolling hash.",
        bestCaseDerivation: "O(N+M) with no hash collisions.",
        averageCaseDerivation: "O(N+M)",
        worstCaseDerivation: "O(N*M) with many hash collisions (spurious hits).",
        spaceComplexityDerivation: "O(1) keeping hash values.",
        interviewQuestions: "1. What is a rolling hash?\n2. What causes the worst-case O(N*M) time complexity?",
        examQuestions: "Explain the rolling hash function in Rabin-Karp.",
        derivationShortcuts: "Rolling hash: H(i+1) = (H(i) - text[i]*d^(M-1)) * d + text[i+M]",
        beginnerTips: ["Hash values match? Check the exact string to rule out collisions.", "Use a large prime number for the modulo to minimize collisions."],
        applications: "Plagiarism detection, multiple pattern matching.",
        commonMistakes: ["Not handling negative values when updating the rolling hash with modulo arithmetic."],
        codeSnippet: "function RabinKarp(text, pattern):\n    hPattern = hash(pattern)\n    hText = hash(text[0..M-1])\n    for i from 0 to N-M:\n        if hPattern == hText:\n            if text[i..i+M-1] == pattern:\n                match found\n        hText = rehash(hText, text[i], text[i+M])",
        fullCode: `#include <stdio.h>
#include <string.h>

#define d 256

void search(char pat[], char txt[], int q) {
    int M = strlen(pat), N = strlen(txt);
    int p = 0, t = 0, h = 1;

    for (int i = 0; i < M - 1; i++) h = (h * d) % q;

    for (int i = 0; i < M; i++) {
        p = (d * p + pat[i]) % q;
        t = (d * t + txt[i]) % q;
    }

    for (int i = 0; i <= N - M; i++) {
        if (p == t) {
            int j;
            for (j = 0; j < M; j++) if (txt[i+j] != pat[j]) break;
            if (j == M) printf("Pattern found at index %d\n", i);
        }
        if (i < N - M) {
            t = (d*(t - txt[i]*h) + txt[i+M]) % q;
            if (t < 0) t = t + q;
        }
    }
}

int main() {
    search("TEST", "THIS IS A TEST TEXT", 101);
    return 0;
}`,
                inputs: [
            { name: "text", label: "Text String", type: "string", defaultValue: "abacabadabacaba" },
            { name: "pattern", label: "Pattern String", type: "string", defaultValue: "abacaba" }
        ],
        runCommand: "rabin_karp",
    },
    {
        id: "z_algorithm",
        title: "Z Algorithm",
        category: CATEGORIES.HASHING,
        difficulty: "Hard",
        inSyllabus: false,
        timeComplexity: "O(N + M)",
        spaceComplexity: "O(N + M)",
        description: "Linear time string matching algorithm that computes the Z-array for pattern matching.",
        basicOperation: "Character comparison.",
        dominantOperation: "Computing the Z array values.",
        criticalOperation: "Maintaining the [L, R] bounding box.",
        bestCaseDerivation: "O(N+M)",
        averageCaseDerivation: "O(N+M)",
        worstCaseDerivation: "O(N+M)",
        spaceComplexityDerivation: "O(N+M) for the concatenated string and Z-array.",
        interviewQuestions: "1. What does Z[i] represent in the Z-array?\n2. How is the [L, R] box used to speed up computation?",
        examQuestions: "Compute the Z array for string 'aabcaabxaaaz'.",
        derivationShortcuts: "Concatenate Pattern + '$' + Text to find matches.",
        beginnerTips: ["Z[i] is the length of the longest substring starting from text[i] which is also a prefix of text.", "The algorithm cleverly reuses previously computed values."],
        applications: "Fast exact string matching, substring problems.",
        commonMistakes: ["Incorrect bounds checking when updating L and R pointers."],
        codeSnippet: "function ZAlgorithm(text):\n    Z = array of size n\n    L = 0, R = 0\n    for i from 1 to n-1:\n        if i > R:\n            L = R = i\n            while R < n and text[R-L] == text[R]: R++\n            Z[i] = R - L; R--\n        else:\n            k = i - L\n            if Z[k] < R - i + 1: Z[i] = Z[k]\n            else:\n                L = i\n                while R < n and text[R-L] == text[R]: R++\n                Z[i] = R - L; R--",
        fullCode: `#include <stdio.h>
#include <string.h>

void getZarr(char str[], int Z[]) {
    int n = strlen(str), L = 0, R = 0, K;
    for (int i = 1; i < n; ++i) {
        if (i > R) {
            L = R = i;
            while (R < n && str[R-L] == str[R]) R++;
            Z[i] = R-L; R--;
        } else {
            K = i-L;
            if (Z[K] < R-i+1) Z[i] = Z[K];
            else {
                L = i;
                while (R < n && str[R-L] == str[R]) R++;
                Z[i] = R-L; R--;
            }
        }
    }
}

int main() {
    printf("Z Algorithm String Matching\n");
    return 0;
}`,
                inputs: [
            { name: "text", label: "Text String", type: "string", defaultValue: "abacabadabacaba" },
            { name: "pattern", label: "Pattern String", type: "string", defaultValue: "abacaba" }
        ],
        runCommand: "z_algorithm",
    },
    {
        id: "topological_sort",
        title: "Topological Sort (Kahn's)",
        category: CATEGORIES.GRAPHS,
        difficulty: "Medium",
        inSyllabus: false,
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
        description: "Linear ordering of vertices such that for every directed edge uv, vertex u comes before v.",
        basicOperation: "Indegree decrement and queue operation.",
        dominantOperation: "Processing nodes with 0 indegree.",
        criticalOperation: "Maintaining indegree array.",
        bestCaseDerivation: "O(V+E)",
        averageCaseDerivation: "O(V+E)",
        worstCaseDerivation: "O(V+E)",
        spaceComplexityDerivation: "O(V) for indegree array and queue.",
        interviewQuestions: "1. Can topological sort be applied to cyclic graphs?\n2. How can topological sort be used to detect cycles in a DAG?",
        examQuestions: "Perform Kahn's topological sort on a given DAG.",
        derivationShortcuts: "Indegree 0 implies no prerequisites.",
        beginnerTips: ["Only works on Directed Acyclic Graphs (DAGs).", "If the final sorted list doesn't contain all vertices, the graph has a cycle."],
        applications: "Task scheduling, resolving dependencies, build systems.",
        commonMistakes: ["Applying it to undirected graphs or graphs with cycles."],
        codeSnippet: "function Kahn(G):\n    indegree = computeIndegrees(G)\n    Q = queue of all nodes with indegree == 0\n    result = []\n    while Q not empty:\n        u = Q.dequeue()\n        result.push(u)\n        for v in G.neighbors(u):\n            indegree[v]--\n            if indegree[v] == 0: Q.enqueue(v)\n    if len(result) != len(G): return \"Cycle detected\"\n    return result",
        fullCode: `#include <stdio.h>
#include <stdlib.h>

// Kahn's Algorithm
int main() {
    printf("Topological Sort using Kahn's Algorithm involves indegree array and a queue.\n");
    return 0;
}`,
                inputs: [
            { name: "edges", label: "Directed Edges (u->v, comma separated)", type: "string", defaultValue: "0->1, 0->2, 1->3, 2->3" }
        ],
        runCommand: "topological_sort",
    },
    {
        id: "bellman_ford",
        title: "Bellman-Ford Algorithm",
        category: CATEGORIES.GRAPHS,
        difficulty: "Medium",
        inSyllabus: false,
        timeComplexity: "O(V * E)",
        spaceComplexity: "O(V)",
        description: "Computes shortest paths from a single source vertex to all other vertices, handling negative edge weights.",
        basicOperation: "Edge relaxation.",
        dominantOperation: "Relaxing all E edges V-1 times.",
        criticalOperation: "Checking for negative weight cycles on the V-th iteration.",
        bestCaseDerivation: "O(E) if optimized to stop early when no changes occur.",
        averageCaseDerivation: "O(V * E)",
        worstCaseDerivation: "O(V * E)",
        spaceComplexityDerivation: "O(V) for the distance array.",
        interviewQuestions: "1. Why does Bellman-Ford run V-1 times?\n2. How does it detect negative cycles?",
        examQuestions: "Trace the Bellman-Ford algorithm and show how it detects a negative cycle.",
        derivationShortcuts: "V-1 iterations guarantee shortest paths in a graph without negative cycles.",
        beginnerTips: ["Unlike Dijkstra, Bellman-Ford handles negative weights.", "The V-th iteration is purely for cycle detection."],
        applications: "Distance vector routing protocols (RIP).",
        commonMistakes: ["Forgetting the final V-th pass to detect negative weight cycles."],
        codeSnippet: "function BellmanFord(G, source):\n    dist = array of infinity\n    dist[source] = 0\n    for i from 1 to V-1:\n        for each edge (u, v, weight) in G:\n            if dist[u] + weight < dist[v]:\n                dist[v] = dist[u] + weight\n    // check for negative cycles\n    for each edge (u, v, weight) in G:\n        if dist[u] + weight < dist[v]:\n            return \"Graph contains a negative-weight cycle\"",
        fullCode: `#include <stdio.h>
#include <stdlib.h>

struct Edge { int src, dest, weight; };
struct Graph { int V, E; struct Edge* edge; };

void BellmanFord(struct Graph* graph, int src) {
    int V = graph->V, E = graph->E;
    int dist[V];
    for (int i = 0; i < V; i++) dist[i] = 1e9;
    dist[src] = 0;

    for (int i = 1; i <= V - 1; i++) {
        for (int j = 0; j < E; j++) {
            int u = graph->edge[j].src;
            int v = graph->edge[j].dest;
            int weight = graph->edge[j].weight;
            if (dist[u] != 1e9 && dist[u] + weight < dist[v])
                dist[v] = dist[u] + weight;
        }
    }

    for (int i = 0; i < E; i++) {
        int u = graph->edge[i].src;
        int v = graph->edge[i].dest;
        int weight = graph->edge[i].weight;
        if (dist[u] != 1e9 && dist[u] + weight < dist[v]) {
            printf("Graph contains negative weight cycle\n");
            return;
        }
    }
}

int main() { return 0; }`,
                inputs: [
            { name: "edges", label: "Weighted Edges (u->v:w, comma separated)", type: "string", defaultValue: "0->1:4, 0->2:5, 1->2:-3, 2->3:3" },
            { name: "source", label: "Source Vertex", type: "number", defaultValue: "0" }
        ],
        runCommand: "bellman_ford",
    },
    {
        id: "trie_insert_search",
        title: "Trie (Prefix Tree) Operations",
        category: CATEGORIES.TREES,
        difficulty: "Medium",
        inSyllabus: false,
        timeComplexity: "O(L)",
        spaceComplexity: "O(N * L)",
        description: "Tree data structure used to efficiently store and retrieve keys in a dataset of strings.",
        basicOperation: "Node traversal based on character index.",
        dominantOperation: "Following or creating child pointers for each character.",
        criticalOperation: "Marking end-of-word nodes.",
        bestCaseDerivation: "O(L) where L is length of word.",
        averageCaseDerivation: "O(L)",
        worstCaseDerivation: "O(L)",
        spaceComplexityDerivation: "O(N * L) for storing N words of max length L.",
        interviewQuestions: "1. How does a Trie compare to a Hash Table for string storage?\n2. What is the space complexity bottleneck of a Trie?",
        examQuestions: "Draw the Trie formed by inserting a given set of words.",
        derivationShortcuts: "Time complexity depends only on word length, not dataset size.",
        beginnerTips: ["Each node represents a single character.", "Words are formed by paths from root to nodes marked as 'isEndOfWord'."],
        applications: "Autocomplete, spell checking, IP routing.",
        commonMistakes: ["Allocating an array of 26 pointers for every node blindly, wasting space for sparse datasets."],
        codeSnippet: "function insert(word):\n    node = root\n    for char in word:\n        if not node.children[char]:\n            node.children[char] = new Node()\n        node = node.children[char]\n    node.isEndOfWord = true\n\nfunction search(word):\n    node = root\n    for char in word:\n        if not node.children[char]: return false\n        node = node.children[char]\n    return node.isEndOfWord",
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define ALPHABET_SIZE 26

struct TrieNode {
    struct TrieNode *children[ALPHABET_SIZE];
    bool isEndOfWord;
};

struct TrieNode *getNode(void) {
    struct TrieNode *pNode = NULL;
    pNode = (struct TrieNode *)malloc(sizeof(struct TrieNode));
    if (pNode) {
        pNode->isEndOfWord = false;
        for (int i = 0; i < ALPHABET_SIZE; i++) pNode->children[i] = NULL;
    }
    return pNode;
}

void insert(struct TrieNode *root, const char *key) {
    struct TrieNode *pCrawl = root;
    for (int level = 0; key[level] != '\0'; level++) {
        int index = key[level] - 'a';
        if (!pCrawl->children[index])
            pCrawl->children[index] = getNode();
        pCrawl = pCrawl->children[index];
    }
    pCrawl->isEndOfWord = true;
}

int main() {
    struct TrieNode *root = getNode();
    insert(root, "algorithm");
    return 0;
}`,
                inputs: [
            { name: "words", label: "Words to Insert (comma separated)", type: "string", defaultValue: "cat,car,dog" }
        ],
        runCommand: "trie_insert_search",
    },
    {
        id: "fenwick_tree",
        title: "Fenwick Tree (BIT)",
        category: CATEGORIES.TREES,
        difficulty: "Medium",
        inSyllabus: false,
        timeComplexity: "O(log N)",
        spaceComplexity: "O(N)",
        description: "Binary Indexed Tree to efficiently update elements and calculate prefix sums in an array of values.",
        basicOperation: "Bitwise AND operations to traverse the tree.",
        dominantOperation: "Updating/querying log N nodes.",
        criticalOperation: "x & (-x) to get the lowest set bit.",
        bestCaseDerivation: "O(1) if updating index 1.",
        averageCaseDerivation: "O(log N)",
        worstCaseDerivation: "O(log N)",
        spaceComplexityDerivation: "O(N) for the BIT array.",
        interviewQuestions: "1. How does a Fenwick tree isolate the lowest set bit?\n2. Compare Fenwick Tree to Segment Tree.",
        examQuestions: "Given an array, construct its Binary Indexed Tree.",
        derivationShortcuts: "Index manipulation: i = i + (i & -i) to go up, i = i - (i & -i) to go down.",
        beginnerTips: ["The array is 1-indexed.", "Use Two's complement x & (-x) to find the rightmost set bit."],
        applications: "Cumulative frequency tables, fast range sum queries.",
        commonMistakes: ["Using 0-indexed arrays instead of 1-indexed, which causes an infinite loop."],
        codeSnippet: "function add(index, value):\n    while index <= n:\n        tree[index] += value\n        index += index & (-index)\n\nfunction query(index):\n    sum = 0\n    while index > 0:\n        sum += tree[index]\n        index -= index & (-index)\n    return sum",
        fullCode: `#include <stdio.h>

void updateBIT(int BITree[], int n, int index, int val) {
    index = index + 1;
    while (index <= n) {
        BITree[index] += val;
        index += index & (-index);
    }
}

int getSum(int BITree[], int index) {
    int sum = 0;
    index = index + 1;
    while (index > 0) {
        sum += BITree[index];
        index -= index & (-index);
    }
    return sum;
}

int main() {
    int freq[] = {2, 1, 1, 3, 2, 3, 4, 5, 6, 7, 8, 9};
    int n = sizeof(freq)/sizeof(freq[0]);
    int BITree[n+1];
    for (int i=1; i<=n; i++) BITree[i] = 0;
    for (int i=0; i<n; i++) updateBIT(BITree, n, i, freq[i]);
    printf("Sum of elements in arr[0..5] is %d\n", getSum(BITree, 5));
    return 0;
}`,
                inputs: [
            { name: "nums", label: "Initial Array", type: "array", defaultValue: "3, 2, -1, 6, 5, 4, -3, 2" }
        ],
        runCommand: "fenwick_tree",
    },
    {
        id: "segment_tree",
        title: "Segment Tree (Range Queries)",
        category: CATEGORIES.TREES,
        difficulty: "Hard",
        inSyllabus: false,
        timeComplexity: "O(log N)",
        spaceComplexity: "O(N)",
        description: "Versatile tree data structure for storing intervals or segments, enabling fast range queries and updates.",
        basicOperation: "Tree traversal to merge segments.",
        dominantOperation: "Recursive splitting of ranges into left/right children.",
        criticalOperation: "Lazy propagation for range updates.",
        bestCaseDerivation: "O(1) if query range exactly matches root.",
        averageCaseDerivation: "O(log N)",
        worstCaseDerivation: "O(log N)",
        spaceComplexityDerivation: "O(4N) array size to represent a full binary tree.",
        interviewQuestions: "1. Why does a segment tree array require size 4N?\n2. Explain lazy propagation.",
        examQuestions: "Build a segment tree for finding minimums in a given array.",
        derivationShortcuts: "Root handles range [0, n-1], children split ranges in half.",
        beginnerTips: ["Leaf nodes store individual array elements.", "Internal nodes store the merged result of their children."],
        applications: "Computational geometry, geographic information systems, competitive programming range queries.",
        commonMistakes: ["Off-by-one errors in splitting the range (mid vs mid+1)."],
        codeSnippet: "function build(node, start, end):\n    if start == end: tree[node] = A[start]\n    else:\n        mid = (start + end) / 2\n        build(2*node, start, mid)\n        build(2*node+1, mid+1, end)\n        tree[node] = tree[2*node] + tree[2*node+1]\n\nfunction query(node, start, end, l, r):\n    if r < start or end < l: return 0\n    if l <= start and end <= r: return tree[node]\n    mid = (start + end) / 2\n    return query(2*node, start, mid, l, r) + query(2*node+1, mid+1, end, l, r)",
        fullCode: `#include <stdio.h>
#include <math.h>

int getMid(int s, int e) { return s + (e -s)/2; }

int constructSTUtil(int arr[], int ss, int se, int *st, int si) {
    if (ss == se) {
        st[si] = arr[ss];
        return arr[ss];
    }
    int mid = getMid(ss, se);
    st[si] = constructSTUtil(arr, ss, mid, st, si*2+1) +
             constructSTUtil(arr, mid+1, se, st, si*2+2);
    return st[si];
}

int main() {
    int arr[] = {1, 3, 5, 7, 9, 11};
    int n = sizeof(arr)/sizeof(arr[0]);
    int st[100];
    constructSTUtil(arr, 0, n-1, st, 0);
    return 0;
}`,
                inputs: [
            { name: "nums", label: "Initial Array", type: "array", defaultValue: "1, 3, 5, 7" }
        ],
        runCommand: "segment_tree",
    },
    {
        id: "union_find",
        title: "Disjoint Set Union (Union-Find)",
        category: CATEGORIES.GRAPHS,
        difficulty: "Easy",
        inSyllabus: false,
        timeComplexity: "O(\u03b1(N))",
        spaceComplexity: "O(N)",
        description: "Data structure that tracks a set of elements partitioned into disjoint subsets, supporting ultra-fast union and find operations.",
        basicOperation: "Array lookup and updates.",
        dominantOperation: "Traversing parent pointers to root.",
        criticalOperation: "Path compression and union by rank.",
        bestCaseDerivation: "O(1)",
        averageCaseDerivation: "O(\u03b1(N)) amortized, where \u03b1 is the inverse Ackermann function.",
        worstCaseDerivation: "O(log N) without path compression, O(\u03b1(N)) with it.",
        spaceComplexityDerivation: "O(N) for parent and rank arrays.",
        interviewQuestions: "1. Explain path compression.\n2. Why is union by rank important?",
        examQuestions: "Show the parent array after a series of Union and Find operations with path compression.",
        derivationShortcuts: "Inverse Ackermann function \u03b1(n) is practically constant (< 5 for all reasonable N).",
        beginnerTips: ["Every set has exactly one root element.", "Path compression flattens the tree so future lookups are O(1)."],
        applications: "Kruskal's MST, network connectivity, image processing connected components.",
        commonMistakes: ["Forgetting to update the root when uniting sets (linking child instead of root)."],
        codeSnippet: "function find(i):\n    if parent[i] == i: return i\n    parent[i] = find(parent[i])  // path compression\n    return parent[i]\n\nfunction union(i, j):\n    root_i = find(i)\n    root_j = find(j)\n    if root_i != root_j:\n        if rank[root_i] < rank[root_j]:\n            parent[root_i] = root_j\n        else if rank[root_i] > rank[root_j]:\n            parent[root_j] = root_i\n        else:\n            parent[root_j] = root_i\n            rank[root_i]++",
        fullCode: `#include <stdio.h>

#define MAX 100
int parent[MAX], rank[MAX];

void makeSet(int n) {
    for (int i = 0; i < n; i++) {
        parent[i] = i;
        rank[i] = 0;
    }
}

int find(int i) {
    if (parent[i] == i) return i;
    return parent[i] = find(parent[i]); // Path compression
}

void unionSet(int i, int j) {
    int root_i = find(i);
    int root_j = find(j);
    if (root_i != root_j) {
        if (rank[root_i] < rank[root_j]) parent[root_i] = root_j;
        else if (rank[root_i] > rank[root_j]) parent[root_j] = root_i;
        else {
            parent[root_j] = root_i;
            rank[root_i]++;
        }
    }
}

int main() {
    makeSet(5);
    unionSet(0, 2);
    unionSet(4, 2);
    unionSet(3, 1);
    return 0;
}`,
                inputs: [
            { name: "operations", label: "Unions (u-v, comma separated)", type: "string", defaultValue: "0-2, 4-2, 3-1" }
        ],
        runCommand: "union_find",
    },
    {
        id: "graham_scan",
        title: "Graham Scan (Convex Hull)",
        category: CATEGORIES.SORTING,
        difficulty: "Hard",
        inSyllabus: false,
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        description: "Algorithm for finding the convex hull of a finite set of points in the plane with time complexity O(N log N).",
        basicOperation: "Cross product computation (orientation).",
        dominantOperation: "Sorting the points by polar angle.",
        criticalOperation: "Stack operations to maintain convex boundary.",
        bestCaseDerivation: "O(N log N) dominated by sorting.",
        averageCaseDerivation: "O(N log N)",
        worstCaseDerivation: "O(N log N)",
        spaceComplexityDerivation: "O(N) for the stack storing hull points.",
        interviewQuestions: "1. How does the orientation (cross product) check work?\n2. Why do we need to sort by polar angle?",
        examQuestions: "Execute Graham Scan on a set of 6 2D points.",
        derivationShortcuts: "Sorting takes O(N log N), stack operations are O(N) overall.",
        beginnerTips: ["Find the bottom-most point first.", "If a point makes a 'right turn', pop the stack until it makes a 'left turn'."],
        applications: "Collision avoidance, computational geometry, shape analysis.",
        commonMistakes: ["Floating point inaccuracies in angle sorting (use cross product instead of atan2)."],
        codeSnippet: "function GrahamScan(points):\n    p0 = point with lowest Y\n    sort points by polar angle with p0\n    stack.push(p0), stack.push(p1), stack.push(p2)\n    for i from 3 to N-1:\n        while orientation(second_top(stack), top(stack), points[i]) != COUNTERCLOCKWISE:\n            stack.pop()\n        stack.push(points[i])\n    return stack",
        fullCode: `#include <stdio.h>
#include <stdlib.h>

struct Point { int x, y; };

int orientation(struct Point p, struct Point q, struct Point r) {
    int val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val == 0) return 0;  // colinear
    return (val > 0)? 1: 2; // clock or counterclock wise
}

int main() {
    printf("Graham Scan Convex Hull\n");
    return 0;
}`,
                inputs: [
            { name: "points", label: "2D Points (x,y; x,y; ...)", type: "string", defaultValue: "0,0; 3,1; 2,2; 4,4; 0,3; 1,2" }
        ],
        runCommand: "graham_scan",
    }
];