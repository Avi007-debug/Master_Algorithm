#include <stdio.h>
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
}