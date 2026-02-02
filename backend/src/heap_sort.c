#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    if (largest != i) {
        log_message("Heapify: Swapping %d <-> %d", arr[i], arr[largest]);
        swap(&arr[i], &arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    log_step_start("HEAP_SORT");
    
    // Build max heap
    log_step_start("BUILD_MAX_HEAP");
    log_message("Building max heap from array");
    
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    char heapStr[256] = "[";
    for (int k = 0; k < n; k++) {
        char temp[20];
        sprintf(temp, "%d", arr[k]);
        strcat(heapStr, temp);
        if (k < n - 1) strcat(heapStr, ", ");
    }
    strcat(heapStr, "]");
    log_message("Max heap built: %s", heapStr);
    log_step_end("BUILD_MAX_HEAP");
    
    // Extract elements one by one
    log_step_start("EXTRACT_SORT");
    log_message("Extracting elements from heap to sort");
    
    for (int i = n - 1; i > 0; i--) {
        log_step_start("EXTRACT_STEP");
        log_message("Moving root %d to position %d", arr[0], i);
        
        swap(&arr[0], &arr[i]);
        
        char currentStr[256] = "[";
        for (int k = 0; k < n; k++) {
            char temp[20];
            sprintf(temp, "%d", arr[k]);
            strcat(currentStr, temp);
            if (k < n - 1) strcat(currentStr, ", ");
        }
        strcat(currentStr, "]");
        log_message("Array state: %s", currentStr);
        
        log_message("Heapifying reduced heap (size %d)", i);
        heapify(arr, i, 0);
        
        log_step_end("EXTRACT_STEP");
    }
    
    log_step_end("EXTRACT_SORT");
    log_message("Heap sort complete!");
    log_step_end("HEAP_SORT");
}

void displayArray(int arr[], int n, const char* label) {
    log_step_start("DISPLAY_ARRAY");
    
    char arrayStr[256] = "[";
    for (int i = 0; i < n; i++) {
        char temp[20];
        sprintf(temp, "%d", arr[i]);
        strcat(arrayStr, temp);
        if (i < n - 1) strcat(arrayStr, ", ");
    }
    strcat(arrayStr, "]");
    
    log_message("%s: %s", label, arrayStr);
    log_step_end("DISPLAY_ARRAY");
}

int main(int argc, char* argv[]) {
    log_init();
    
    int arr[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    log_message("=== HEAP SORT ===\n");
    
    displayArray(arr, n, "Original Array");
    
    log_message("\n--- Sorting ---");
    heapSort(arr, n);
    
    log_message("\n--- Result ---");
    displayArray(arr, n, "Sorted Array");
    
    return 0;
}
