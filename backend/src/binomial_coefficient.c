#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int n = 5, k = 2;
    int dp[6] = {1, 0, 0, 0, 0, 0};
    
    log_step_start();
    log_array("DP Row", dp, 6);
    log_var("n", n);
    log_var("k", k);
    log_message("Calculating Binomial Coefficient C(5, 2) using Dynamic Programming row-by-row");
    log_step_end();
    
    // Row 1
    dp[0] = 1; dp[1] = 1;
    log_step_start();
    log_array("DP Row", dp, 6);
    log_message("DP Row 1: [1, 1]");
    log_step_end();
    
    // Row 2
    dp[2] = 1; dp[1] = 2;
    log_step_start();
    log_array("DP Row", dp, 6);
    log_message("DP Row 2: [1, 2, 1]");
    log_step_end();
    
    // Row 3
    dp[3] = 1; dp[2] = 3; dp[1] = 3;
    log_step_start();
    log_array("DP Row", dp, 6);
    log_message("DP Row 3: [1, 3, 3, 1]");
    log_step_end();
    
    // Row 4
    dp[4] = 1; dp[3] = 4; dp[2] = 6; dp[1] = 4;
    log_step_start();
    log_array("DP Row", dp, 6);
    log_message("DP Row 4: [1, 4, 6, 4, 1]");
    log_step_end();
    
    // Row 5
    dp[5] = 1; dp[4] = 5; dp[3] = 10; dp[2] = 10; dp[1] = 5;
    log_step_start();
    log_array("DP Row", dp, 6);
    log_highlight("DP Row", 2);
    log_var("C(5,2)", 10);
    log_message("DP Row 5 Complete. C(5, 2) is 10.");
    log_step_end();
    
    log_finish();
    return 0;
}