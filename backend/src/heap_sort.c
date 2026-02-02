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
        char msg[256];
        sprintf(msg, "Heapify: Swapping %d <-> %d", arr[i], arr[largest]);
        log_message(msg);
        swap(&arr[i], &arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    // Build max heap
    log_step_start();
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
    char msg[512];
    sprintf(msg, "Max heap built: %s", heapStr);
    log_message(msg);
    log_step_end();
    
    // Extract elements one by one
    log_step_start();
    log_message("Extracting elements from heap to sort");
    log_step_end();
    
    for (int i = n - 1; i > 0; i--) {
        log_step_start();
        char msg2[256];
        sprintf(msg2, "Moving root %d to position %d", arr[0], i);
        log_message(msg2);
        
        swap(&arr[0], &arr[i]);
        
        char currentStr[256] = "[";
        for (int k = 0; k < n; k++) {
            char temp[20];
            sprintf(temp, "%d", arr[k]);
            strcat(currentStr, temp);
            if (k < n - 1) strcat(currentStr, ", ");
        }
        strcat(currentStr, "]");
        sprintf(msg2, "Array state: %s", currentStr);
        log_message(msg2);
        
        sprintf(msg2, "Heapifying reduced heap (size %d)", i);
        log_message(msg2);
        heapify(arr, i, 0);
        
        log_step_end();
    }
    
    log_step_start();
    log_message("Heap sort complete!");
    log_step_end();
}

void displayArray(int arr[], int n, const char* label) {
    log_step_start();
    
    char arrayStr[256] = "[";
    for (int i = 0; i < n; i++) {
        char temp[20];
        sprintf(temp, "%d", arr[i]);
        strcat(arrayStr, temp);
        if (i < n - 1) strcat(arrayStr, ", ");
    }
    strcat(arrayStr, "]");
    
    char msg[512];
    sprintf(msg, "%s: %s", label, arrayStr);
    log_message(msg);
    log_step_end();
}

int main(int argc, char* argv[]) {
    log_init();
    
    int arr[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    log_step_start();
    log_message("=== HEAP SORT ===\n");
    log_step_end();
    
    displayArray(arr, n, "Original Array");
    
    log_step_start();
    log_message("\\n--- Sorting ---");
    log_step_end();
    heapSort(arr, n);
    
    log_step_start();
    log_message("\\n--- Result ---");
    log_step_end();
    displayArray(arr, n, "Sorted Array");
    
    log_finish();
    return 0;
}
