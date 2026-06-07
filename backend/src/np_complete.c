#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    log_step_start();
    log_message("Class NP-Complete: The hardest problems in Class NP.");
    log_step_end();
    
    log_step_start();
    log_message("A problem is NP-complete if: 1. It is in NP. 2. Every problem in NP can be reduced to it in polynomial time.");
    log_step_end();
    
    log_step_start();
    log_message("Example: Travelling Salesperson Problem (TSP). If any single NP-Complete problem is solved in polynomial time, then P = NP.");
    log_step_end();
    
    log_finish();
    return 0;
}