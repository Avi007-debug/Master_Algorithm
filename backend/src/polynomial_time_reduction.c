#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    log_step_start();
    log_message("Polynomial-Time Reduction: A method to transform Problem A to Problem B in polynomial time (A <=p B).");
    log_step_end();
    
    log_step_start();
    log_message("If A reduces to B in polynomial time, it proves B is at least as hard as A. If B is solvable in P, then A is solvable in P.");
    log_step_end();
    
    log_step_start();
    log_message("Example: Reducing 3SAT to Independent Set. Map clauses to graph nodes and conflict literals to graph edges. Solve via Independent Set solver.");
    log_step_end();
    
    log_finish();
    return 0;
}