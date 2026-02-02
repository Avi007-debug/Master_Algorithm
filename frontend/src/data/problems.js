export const CATEGORIES = {
    ARRAYS: "Arrays & Hashing",
    SORTING: "Sorting",
    TWO_POINTERS: "Two Pointers",
    SLIDING_WINDOW: "Sliding Window",
    STACK: "Stack",
    STACKS: "Stack",
    QUEUES: "Queue",
    BINARY_SEARCH: "Binary Search",
    LINKED_LIST: "Linked List",
    LINKED_LISTS: "Linked List",
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
        title: 'Merge Sort',
        category: CATEGORIES.SORTING,
        difficulty: 'Medium',
        inSyllabus: false, // Tree Sort (Unit-IV) is different from Merge Sort
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
        inputs: [
            { name: "nums", label: "Array to Sort", type: "array", defaultValue: "12, 11, 13, 5, 6, 7" }
        ],
        runCommand: 'merge_sort'
    },
    {
        id: 'quick_sort',
        title: 'Quick Sort',
        category: CATEGORIES.SORTING,
        difficulty: 'Medium',
        inSyllabus: false, // Tree Sort (Unit-IV) is different from Quick Sort
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
        inputs: [
            { name: "nums", label: "Array to Sort", type: "array", defaultValue: "10, 7, 8, 9, 1, 5" }
        ],
        runCommand: 'quick_sort'
    },
    {
        id: 'randomized_quick_sort',
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
        inputs: [
            { name: "nums", label: "Array to Sort", type: "array", defaultValue: "10, 7, 8, 9, 1, 5" }
        ],
        runCommand: 'randomized_quick_sort'
    },
    {
        id: 'counting_sort',
        inSyllabus: false, // Not in syllabus
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
        inputs: [
            { name: "nums", label: "Array to Sort", type: "array", defaultValue: "4, 2, 2, 8, 3, 3, 1" }
        ],
        runCommand: 'counting_sort'
    },
    {
        id: 'radix_sort',
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
        inputs: [
            { name: "nums", label: "Array to Sort", type: "array", defaultValue: "170, 45, 75, 90, 802, 24, 2, 66" }
        ],
        runCommand: 'radix_sort'
    },
    {
        id: "binary_search",
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
        inputs: [
            { name: "target", label: "Search Target", type: "number", defaultValue: "5" },
            { name: "tree", label: "BST (level-order)", type: "array", defaultValue: "4, 2, 6, 1, 3, 5, 7" }
        ],
        runCommand: 'bst_search'
    },
    {
        id: "binary_tree_level_order",
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
        inSyllabus: false, // Backtracking not in syllabus
        id: "n_queens",
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
        inputs: [
            { name: "nums", label: "Push Elements", type: "array", defaultValue: "1, 2, 3, 4" }
        ],
        runCommand: 'stack_ll'
    },
    {
        id: 'queue_ll',
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
        inputs: [
            { name: "nums", label: "Enqueue Elements", type: "array", defaultValue: "1, 2, 3, 4" }
        ],
        runCommand: 'queue_ll'
    },
    {
        id: 'doubly_linked_list',
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
        inputs: [
            { name: "nums", label: "List Elements", type: "array", defaultValue: "10, 20, 30, 40" }
        ],
        runCommand: 'doubly_linked_list'
    },
    {
        id: 'deque_ll',
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
        inputs: [
            { name: "nums", label: "Elements", type: "array", defaultValue: "5, 10, 15, 20" }
        ],
        runCommand: 'deque_ll'
    },
    {
        id: 'factorial',
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
        inputs: [
            { name: "n", label: "N", type: "number", defaultValue: "5" }
        ],
        runCommand: 'factorial'
    },
    {
        id: 'recursion_fib',
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
        inputs: [
            { name: "n", label: "N", type: "number", defaultValue: "6" }
        ],
        runCommand: 'recursion_fib'
    },
    {
        id: 'towers_of_hanoi',
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
        inputs: [
            { name: "n", label: "Number of Disks", type: "number", defaultValue: "3" }
        ],
        runCommand: 'towers_of_hanoi'
    },
    {
        id: 'tree_inorder',
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
        inputs: [
            { name: "tree", label: "Tree (level-order)", type: "array", defaultValue: "4, 2, 6, 1, 3, 5, 7" }
        ],
        runCommand: 'tree_inorder'
    },
    {
        id: 'tree_preorder',
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
        inputs: [
            { name: "tree", label: "Tree (level-order)", type: "array", defaultValue: "4, 2, 6, 1, 3, 5, 7" }
        ],
        runCommand: 'tree_preorder'
    },
    {
        id: 'tree_postorder',
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
        inputs: [
            { name: "tree", label: "Tree (level-order)", type: "array", defaultValue: "4, 2, 6, 1, 3, 5, 7" }
        ],
        runCommand: 'tree_postorder'
    },
    {
        id: 'dfs_graph',
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
        inputs: [
            { name: "start", label: "Start Vertex", type: "number", defaultValue: "0" }
        ],
        runCommand: 'dfs_graph'
    },
    {
        id: 'circular_queue',
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
        inputs: [
            { name: "operations", label: "Operations (E10,E20,D,E30)", type: "string", defaultValue: "E10,E20,E30,D,D,E40,E50" }
        ],
        runCommand: 'circular_queue'
    },
    
    // === UNIT-I: STACK ALGORITHMS ===
    {
        id: "infix_to_postfix",
        inSyllabus: true,
        title: "Infix to Postfix Conversion",
        category: CATEGORIES.STACKS,
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
        inSyllabus: true,
        title: "Infix to Prefix Conversion",
        category: CATEGORIES.STACKS,
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
        inputs: [
            { name: "expression", label: "Infix Expression", type: "string", defaultValue: "A+B*C-D/E" }
        ],
        runCommand: 'infix_to_prefix'
    },
    {
        id: "postfix_evaluation",
        inSyllabus: true,
        title: "Postfix Expression Evaluation",
        category: CATEGORIES.STACKS,
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
        inputs: [
            { name: "expression", label: "Postfix Expression", type: "string", defaultValue: "53+82-*" }
        ],
        runCommand: 'postfix_evaluation'
    },
    
    // === UNIT-II: QUEUE APPLICATIONS ===
    {
        id: "message_queue",
        inSyllabus: true,
        title: "Message Queue Application",
        category: CATEGORIES.QUEUES,
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
        inputs: [
            { name: "operations", label: "Operations (auto)", type: "string", defaultValue: "auto" }
        ],
        runCommand: 'message_queue'
    },
    
    // === UNIT-II: LINKED LISTS ===
    {
        id: "singly_linked_list_complete",
        inSyllabus: true,
        title: "Singly Linked List (Complete)",
        category: CATEGORIES.LINKED_LISTS,
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
        inputs: [
            { name: "operations", label: "Operations (auto)", type: "string", defaultValue: "auto" }
        ],
        runCommand: 'singly_linked_list_complete'
    },
    
    // === UNIT-III: CIRCULAR LISTS ===
    {
        id: "circular_sll",
        inSyllabus: true,
        title: "Circular Singly Linked List",
        category: CATEGORIES.LINKED_LISTS,
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
        inputs: [
            { name: "values", label: "Values (comma-separated)", type: "string", defaultValue: "10,20,30,40" }
        ],
        runCommand: 'circular_sll'
    },
    {
        id: "circular_dll",
        inSyllabus: true,
        title: "Circular Doubly Linked List",
        category: CATEGORIES.LINKED_LISTS,
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
        inputs: [
            { name: "values", label: "Values (comma-separated)", type: "string", defaultValue: "10,20,30,40" }
        ],
        runCommand: 'circular_dll'
    },
    
    // === UNIT-III: APPLICATIONS ===
    {
        id: "polynomial_multiplication",
        inSyllabus: true,
        title: "Polynomial Multiplication",
        category: CATEGORIES.LINKED_LISTS,
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
        inputs: [
            { name: "poly1", label: "Polynomial 1 (auto)", type: "string", defaultValue: "3x^2+5x+2" },
            { name: "poly2", label: "Polynomial 2 (auto)", type: "string", defaultValue: "4x+1" }
        ],
        runCommand: 'polynomial_multiplication'
    },
    {
        id: "long_integer_addition",
        inSyllabus: true,
        title: "Addition of Long Integers",
        category: CATEGORIES.LINKED_LISTS,
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
        inputs: [
            { name: "num1", label: "Number 1", type: "string", defaultValue: "123456789" },
            { name: "num2", label: "Number 2", type: "string", defaultValue: "987654321" }
        ],
        runCommand: 'long_integer_addition'
    },
    
    // === UNIT-IV: BST OPERATIONS ===
    {
        id: "bst_insert",
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
        inputs: [
            { name: "delete_key", label: "Key to delete", type: "number", defaultValue: "50" }
        ],
        runCommand: 'bst_delete'
    },
    {
        id: "expression_tree",
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
        inputs: [
            { name: "postfix", label: "Postfix Expression", type: "string", defaultValue: "ab+cd-*" }
        ],
        runCommand: 'expression_tree'
    },
    
    // === UNIT-IV: HEAP OPERATIONS ===
    {
        id: "heap_construction",
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
        inputs: [
            { name: "array", label: "Array to heapify", type: "string", defaultValue: "4,10,3,5,1,15,20" }
        ],
        runCommand: 'heap_construction'
    },
    {
        id: "heap_sort",
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
        inputs: [
            { name: "array", label: "Array to sort", type: "string", defaultValue: "12,11,13,5,6,7" }
        ],
        runCommand: 'heap_sort'
    },
    {
        id: "priority_queue",
        inSyllabus: true,
        title: "Priority Queue (Heap)",
        category: CATEGORIES.QUEUES,
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
        inputs: [
            { name: "operations", label: "Operations (auto)", type: "string", defaultValue: "auto" }
        ],
        runCommand: 'priority_queue'
    },
    
    // === UNIT-V: ADVANCED TREES ===
    {
        id: "avl_tree",
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
        inputs: [
            { name: "values", label: "Values to insert", type: "string", defaultValue: "10,20,30,40,50,25" }
        ],
        runCommand: 'avl_tree'
    },
    {
        id: "trie",
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
        inputs: [
            { name: "words", label: "Words (auto)", type: "string", defaultValue: "hello,world,help,heap" }
        ],
        runCommand: 'trie'
    },
    {
        id: "threaded_binary_tree",
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
        inputs: [
            { name: "values", label: "Values (auto)", type: "string", defaultValue: "20,10,30,5,15,25,35" }
        ],
        runCommand: 'threaded_binary_tree'
    },
    {
        id: "b_plus_tree",
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
        inputs: [
            { name: "values", label: "Values (auto)", type: "string", defaultValue: "10,20,5,6,12,30" }
        ],
        runCommand: 'b_plus_tree'
    },
    {
        id: "splay_tree",
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
        inputs: [
            { name: "values", label: "Values (auto)", type: "string", defaultValue: "10,20,30,40,50" }
        ],
        runCommand: 'splay_tree'
    },
    
    // === UNIT-V: GRAPH REPRESENTATIONS ===
    {
        id: "adjacency_matrix",
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
        inputs: [
            { name: "vertices", label: "Vertices (auto)", type: "number", defaultValue: "5" }
        ],
        runCommand: 'adjacency_matrix'
    },
    {
        id: "adjacency_list",
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
        inputs: [
            { name: "vertices", label: "Vertices (auto)", type: "number", defaultValue: "5" }
        ],
        runCommand: 'adjacency_list'
    },
    
    // === UNIT-V: HASHING ===
    {
        id: "open_hashing",
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
        inputs: [
            { name: "keys", label: "Keys (auto)", type: "string", defaultValue: "15,25,35,5,45" }
        ],
        runCommand: 'open_hashing'
    },
    {
        id: "closed_hashing_linear",
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
        inputs: [
            { name: "keys", label: "Keys (auto)", type: "string", defaultValue: "15,25,35,5,45" }
        ],
        runCommand: 'closed_hashing_linear'
    },
    {
        id: "closed_hashing_quadratic",
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
        inputs: [
            { name: "keys", label: "Keys (auto)", type: "string", defaultValue: "15,25,35,5,45" }
        ],
        runCommand: 'closed_hashing_quadratic'
    },
    {
        id: "closed_hashing_double",
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
        inputs: [
            { name: "keys", label: "Keys (auto)", type: "string", defaultValue: "15,25,35,5,45,12" }
        ],
        runCommand: 'closed_hashing_double'
    }
];

