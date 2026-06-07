#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int weights[3] = {10, 20, 30};
    int values[3] = {60, 100, 120};
    int capacity = 50;
    
    int dp[6] = {0, 0, 0, 0, 0, 0}; // 10, 20, 30, 40, 50
    
    log_step_start();
    log_array("DP Row (Capacity 0-50)", dp, 6);
    log_message("Initial state: Capacity columns initialized to 0");
    log_step_end();
    
    // Item 1 (wt=10, val=60)
    for(int w=5; w>=1; w--) {
        dp[w] = 60;
    }
    log_step_start();
    log_array("DP Row (Capacity 0-50)", dp, 6);
    log_message("Processed Item 1 (wt=10, val=60). Bag can hold item for capacity >= 10.");
    log_step_end();
    
    // Item 2 (wt=20, val=100)
    dp[2] = 100; // 20
    dp[3] = 160; // 30 (10+20)
    dp[4] = 160; // 40
    dp[5] = 160; // 50
    log_step_start();
    log_array("DP Row (Capacity 0-50)", dp, 6);
    log_message("Processed Item 2 (wt=20, val=100). Capacity 30 now holds both items (value=160).");
    log_step_end();
    
    // Item 3 (wt=30, val=120)
    dp[3] = 120; // 30
    dp[4] = 180; // 40 (10+30)
    dp[5] = 220; // 50 (20+30)
    
    log_step_start();
    log_array("DP Row (Capacity 0-50)", dp, 6);
    log_highlight("DP Row (Capacity 0-50)", 5);
    log_var("Max Value", 220);
    log_message("Processed Item 3 (wt=30, val=120). Max profit is 220 (Item 2 + Item 3).");
    log_step_end();
    
    log_finish();
    return 0;
}