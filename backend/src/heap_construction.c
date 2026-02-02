#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

#define MAX_SIZE 100

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void logHeapState(int arr[], int n, const char* message) {
    // Heap can be visualized as a tree using array indices
    // Parent at i, children at 2i+1 and 2i+2
    int tree_array[MAX_SIZE];
    for(int i = 0; i < MAX_SIZE; i++) tree_array[i] = -999;
    
    // Copy heap values to tree array
    for(int i = 0; i < n; i++) {
        tree_array[i] = arr[i];
    }
    
    log_step_start();
    log_array("HeapStructure", tree_array, n);
    log_array("HeapArray", arr, n);
    log_message(message);
    log_step_end();
}

void heapifyDown(int arr[], int n, int i, int isMaxHeap) {
    int target = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
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
        sprintf(msg, "Heapifying: Swap %d (index %d) ↔ %d (index %d)", 
                arr[i], i, arr[target], target);
        logHeapState(arr, n, msg);
        
        swap(&arr[i], &arr[target]);
        heapifyDown(arr, n, target, isMaxHeap);
    }
}

void buildHeap(int arr[], int n, int isMaxHeap) {
    char msg[256];
    sprintf(msg, "Building %s from array", isMaxHeap ? "MAX HEAP" : "MIN HEAP");
    logHeapState(arr, n, msg);
    
    // Start from last non-leaf node and heapify down
    for (int i = n / 2 - 1; i >= 0; i--) {
        sprintf(msg, "Processing node %d (value: %d)", i, arr[i]);
        logHeapState(arr, n, msg);
        heapifyDown(arr, n, i, isMaxHeap);
    }
    
    sprintf(msg, "%s construction complete!", isMaxHeap ? "MAX HEAP" : "MIN HEAP");
    logHeapState(arr, n, msg);
}

void insertHeap(int arr[], int* n, int value, int isMaxHeap) {
    (*n)++;
    int i = *n - 1;
    arr[i] = value;
    
    char msg[256];
    sprintf(msg, "Inserting %d at position %d", value, i);
    logHeapState(arr, *n, msg);
    
    // Heapify up
    while (i > 0) {
        int parent = (i - 1) / 2;
        int shouldSwap = isMaxHeap ? (arr[i] > arr[parent]) : (arr[i] < arr[parent]);
        
        if (shouldSwap) {
            sprintf(msg, "Bubble up: Swap %d ↔ %d (parent)", arr[i], arr[parent]);
            swap(&arr[i], &arr[parent]);
            logHeapState(arr, *n, msg);
            i = parent;
        } else {
            break;
        }
    }
    
    sprintf(msg, "✓ Inserted %d successfully", value);
    logHeapState(arr, *n, msg);
}

int extractRoot(int arr[], int* n, int isMaxHeap) {
    if (*n <= 0) {
        return -1;
    }
    
    int root = arr[0];
    char msg[256];
    sprintf(msg, "Extracting root: %d", root);
    logHeapState(arr, *n, msg);
    
    arr[0] = arr[*n - 1];
    (*n)--;
    
    sprintf(msg, "Replaced root with last element: %d", arr[0]);
    logHeapState(arr, *n, msg);
    
    if (*n > 0) {
        heapifyDown(arr, *n, 0, isMaxHeap);
    }
    
    sprintf(msg, "✓ Extracted %d successfully", root);
    logHeapState(arr, *n, msg);
    
    return root;
}

int main(int argc, char* argv[]) {
    log_init();
    
    // Parse input
    int arr[MAX_SIZE];
    int n = 0;
    
    if (argc > 1) {
        if (argc > 2) {
            for (int i = 1; i < argc && n < MAX_SIZE; i++) {
                arr[n++] = atoi(argv[i]);
            }
        } else {
            char* token = strtok(argv[1], ", ");
            while (token && n < MAX_SIZE) {
                arr[n++] = atoi(token);
                token = strtok(NULL, ", ");
            }
        }
    } else {
        int defaults[] = {4, 10, 3, 5, 1, 15, 20};
        n = 7;
        for(int i = 0; i < n; i++) arr[i] = defaults[i];
    }
    
    logHeapState(arr, n, "Original array before heap construction");
    
    // Build Max Heap by default
    buildHeap(arr, n, 1);
    
    logHeapState(arr, n, "Final heap structure");
    
    log_finish();
    return 0;
}
