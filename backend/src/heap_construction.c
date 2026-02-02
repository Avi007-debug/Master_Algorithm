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
    
    log_step_start();
    log_message("HEAPIFY_DOWN");
    char msg[256];
    sprintf(msg, "Heapifying at index %d (value: %d)", i, arr[i]);
    log_message(msg);
    
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
        char msg[256];
        sprintf(msg, "Swapping %d (index %d) with %d (index %d)", 
                   arr[i], i, arr[target], target);
        log_message(msg);
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
        log_message(arrayStr);
        
        log_step_end();
        log_message("HEAPIFY_DOWN");
        heapifyDown(arr, n, target, isMaxHeap);
    } else {
        char msg[256];
        sprintf(msg, "Node %d is in correct position", arr[i]);
        log_message(msg);
        log_step_end();
        log_message("HEAPIFY_DOWN");
    }
}

void buildHeap(int arr[], int n, int isMaxHeap) {
    log_step_start();
    log_message("BUILD_HEAP");
    char msg[256];
    sprintf(msg, "Building %s", isMaxHeap ? "MAX HEAP" : "MIN HEAP");
    log_message(msg);
    
    // Start from last non-leaf node
    for (int i = n / 2 - 1; i >= 0; i--) {
        sprintf(msg, "\n--- Processing node at index %d ---", i);
        log_message(msg);
        heapifyDown(arr, n, i, isMaxHeap);
    }
    
    log_message("\nHeap construction complete!");
    log_step_end();
    log_message("BUILD_HEAP");
}

void insertHeap(int arr[], int* n, int value, int isMaxHeap) {
    log_step_start();
    log_message("INSERT_HEAP");
    
    (*n)++;
    int i = *n - 1;
    arr[i] = value;
    
    char msg[256];
    sprintf(msg, "Inserted %d at index %d", value, i);
    log_message(msg);
    
    // Heapify up
    while (i > 0) {
        int parent = (i - 1) / 2;
        
        int shouldSwap = isMaxHeap ? (arr[i] > arr[parent]) : (arr[i] < arr[parent]);
        
        if (shouldSwap) {
            sprintf(msg, "Swapping with parent: %d <-> %d", arr[i], arr[parent]);
            log_message(msg);
            swap(&arr[i], &arr[parent]);
            i = parent;
        } else {
            break;
        }
    }
    
    log_message("Insert complete");
    log_step_end();
    log_message("INSERT_HEAP");
}

int extractRoot(int arr[], int* n, int isMaxHeap) {
    log_step_start();
    log_message("EXTRACT_ROOT");
    
    if (*n <= 0) {
        log_message("Heap is empty");
        log_step_end();
        log_message("EXTRACT_ROOT");
        return -1;
    }
    
    int root = arr[0];
    char msg[256];
    sprintf(msg, "Extracting root: %d", root);
    log_message(msg);
    
    arr[0] = arr[*n - 1];
    (*n)--;
    
    sprintf(msg, "Replaced root with last element: %d", arr[0]);
    log_message(msg);
    
    if (*n > 0) {
        heapifyDown(arr, *n, 0, isMaxHeap);
    }
    
    log_step_end();
    log_message("EXTRACT_ROOT");
    return root;
}

void displayHeap(int arr[], int n, const char* label) {
    log_step_start();
    log_message("DISPLAY_HEAP");
    
    char msg[256];
    sprintf(msg, "%s:", label);
    log_message(msg);
    char heapStr[256] = "[";
    for (int i = 0; i < n; i++) {
        char temp[20];
        sprintf(temp, "%d", arr[i]);
        strcat(heapStr, temp);
        if (i < n - 1) strcat(heapStr, ", ");
    }
    strcat(heapStr, "]");
    log_message(heapStr);
    
    log_step_end();
    log_message("DISPLAY_HEAP");
}

int main() {
    log_init();
    
    int arr[] = {4, 10, 3, 5, 1, 15, 20};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    log_step_start();
    log_message("=== HEAP CONSTRUCTION ===\n");
    log_message("Original array: [4, 10, 3, 5, 1, 15, 20]\n");
    log_step_end();
    
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
    char msg[256];
    sprintf(msg, "Extracted: %d", extracted);
    log_message(msg);
    displayHeap(maxHeap, heapSize, "After extraction");
    
    return 0;
}
