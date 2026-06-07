#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    log_step_start();
    log_message("Class NP-Hard: Problems at least as hard as the hardest problems in NP, but not necessarily in NP.");
    log_step_end();
    
    log_step_start();
    log_message("A problem H is NP-hard if every problem in NP is polynomial-time reducible to H. They do not have to be decidable.");
    log_step_end();
    
    log_step_start();
    log_message("Example: Halting Problem (undecidable: cannot be verified in polynomial time, yet NP-hard). Optimization-TSP is also NP-hard.");
    log_step_end();
    
    log_finish();
    return 0;
}