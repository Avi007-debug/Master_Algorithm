#include <stdio.h>
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
}