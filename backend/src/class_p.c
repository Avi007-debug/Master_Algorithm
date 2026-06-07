#include <stdio.h>
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
}