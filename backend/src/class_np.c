#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    log_step_start();
    log_message("Class NP: Non-deterministic Polynomial complexity class.");
    log_step_end();
    
    log_step_start();
    log_message("A decision problem belongs to NP if any 'yes' instance has a certificate/solution that can be verified deterministically in polynomial time.");
    log_step_end();
    
    int cert[2] = {1, 8};
    log_step_start();
    log_array("Certificate Solution", cert, 2);
    log_var("Target Sum", 9);
    log_message("Example: Subset Sum. Finding the subset is hard (O(2^N)), but verifying a certificate (1+8=9) is in P (O(N)). Thus it is in NP.");
    log_step_end();
    
    log_finish();
    return 0;
}