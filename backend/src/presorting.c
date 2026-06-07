#include <stdio.h>
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
}