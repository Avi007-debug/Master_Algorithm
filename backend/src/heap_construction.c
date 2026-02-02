#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void heapifyDown(int arr[], int n, int i, int isMaxHeap) {
    int target = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    log_step_start("HEAPIFY_DOWN");
    log_message("Heapifying at index %d (value: %d)", i, arr[i]);
    
    if (isMaxHeap) {
        if (left < n && arr[left] > arr[target]) {
            target = left;
        }
        if (right < n && arr[right] > arr[target]) {
            target = right;
        }
    } else {
        if (left < n && arr[left] < arr[target]) {
            target = left;
        }
        if (right < n && arr[right] < arr[target]) {
            target = right;
        }
    }
    
    if (target != i) {
        log_message("Swapping %d (index %d) with %d (index %d)", 
                   arr[i], i, arr[target], target);
        swap(&arr[i], &arr[target]);
        
        // Show array state
        char arrayStr[256] = "[";
        for (int k = 0; k < n; k++) {
            char temp[20];
            sprintf(temp, "%d", arr[k]);
            strcat(arrayStr, temp);
            if (k < n - 1) strcat(arrayStr, ", ");
        }
        strcat(arrayStr, "]");
        log_message("Array: %s", arrayStr);
        
        log_step_end("HEAPIFY_DOWN");
        heapifyDown(arr, n, target, isMaxHeap);
    } else {
        log_message("Node %d is in correct position", arr[i]);
        log_step_end("HEAPIFY_DOWN");
    }
}

void buildHeap(int arr[], int n, int isMaxHeap) {
    log_step_start("BUILD_HEAP");
    log_message("Building %s", isMaxHeap ? "MAX HEAP" : "MIN HEAP");
    
    // Start from last non-leaf node
    for (int i = n / 2 - 1; i >= 0; i--) {
        log_message("\n--- Processing node at index %d ---", i);
        heapifyDown(arr, n, i, isMaxHeap);
    }
    
    log_message("\nHeap construction complete!");
    log_step_end("BUILD_HEAP");
}

void insertHeap(int arr[], int* n, int value, int isMaxHeap) {
    log_step_start("INSERT_HEAP");
    
    (*n)++;
    int i = *n - 1;
    arr[i] = value;
    
    log_message("Inserted %d at index %d", value, i);
    
    // Heapify up
    while (i > 0) {
        int parent = (i - 1) / 2;
        
        int shouldSwap = isMaxHeap ? (arr[i] > arr[parent]) : (arr[i] < arr[parent]);
        
        if (shouldSwap) {
            log_message("Swapping with parent: %d <-> %d", arr[i], arr[parent]);
            swap(&arr[i], &arr[parent]);
            i = parent;
        } else {
            break;
        }
    }
    
    log_message("Insert complete");
    log_step_end("INSERT_HEAP");
}

int extractRoot(int arr[], int* n, int isMaxHeap) {
    log_step_start("EXTRACT_ROOT");
    
    if (*n <= 0) {
        log_message("Heap is empty");
        log_step_end("EXTRACT_ROOT");
        return -1;
    }
    
    int root = arr[0];
    log_message("Extracting root: %d", root);
    
    arr[0] = arr[*n - 1];
    (*n)--;
    
    log_message("Replaced root with last element: %d", arr[0]);
    
    if (*n > 0) {
        heapifyDown(arr, *n, 0, isMaxHeap);
    }
    
    log_step_end("EXTRACT_ROOT");
    return root;
}

void displayHeap(int arr[], int n, const char* label) {
    log_step_start("DISPLAY_HEAP");
    
    log_message("%s:", label);
    char heapStr[256] = "[";
    for (int i = 0; i < n; i++) {
        char temp[20];
        sprintf(temp, "%d", arr[i]);
        strcat(heapStr, temp);
        if (i < n - 1) strcat(heapStr, ", ");
    }
    strcat(heapStr, "]");
    log_message("%s", heapStr);
    
    log_step_end("DISPLAY_HEAP");
}

int main() {
    log_init();
    
    int arr[] = {4, 10, 3, 5, 1, 15, 20};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    log_message("=== HEAP CONSTRUCTION ===\n");
    log_message("Original array: [4, 10, 3, 5, 1, 15, 20]\n");
    
    // Build Max Heap
    log_message("--- Building MAX HEAP ---");
    int maxHeap[20];
    for (int i = 0; i < n; i++) maxHeap[i] = arr[i];
    buildHeap(maxHeap, n, 1);
    displayHeap(maxHeap, n, "Max Heap");
    
    // Build Min Heap
    log_message("\n--- Building MIN HEAP ---");
    int minHeap[20];
    for (int i = 0; i < n; i++) minHeap[i] = arr[i];
    buildHeap(minHeap, n, 0);
    displayHeap(minHeap, n, "Min Heap");
    
    // Test Insert
    log_message("\n--- Testing INSERT (Max Heap) ---");
    int heapSize = n;
    insertHeap(maxHeap, &heapSize, 25, 1);
    displayHeap(maxHeap, heapSize, "After inserting 25");
    
    // Test Extract
    log_message("\n--- Testing EXTRACT (Max Heap) ---");
    int extracted = extractRoot(maxHeap, &heapSize, 1);
    log_message("Extracted: %d", extracted);
    displayHeap(maxHeap, heapSize, "After extraction");
    
    return 0;
}
