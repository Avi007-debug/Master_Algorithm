#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int cost[16] = {
        9, 2, 7, 8,
        6, 4, 3, 7,
        5, 8, 1, 8,
        7, 6, 9, 4
    };
    
    log_step_start();
    log_array("Cost Matrix", cost, 16);
    log_message("Assignment Problem: Assign 4 Workers to 4 Jobs minimizing total cost.");
    log_step_end();
    
    log_step_start();
    log_var("Root Cost Bound", 10);
    log_message("Root Node: Lower bound computed = sum of minimum elements of each row: 2 + 3 + 1 + 4 = 10.");
    log_step_end();
    
    log_step_start();
    log_var("Job 1 for Worker 0 Cost", 2);
    log_var("Next Bound", 13);
    log_message("Branching: Assigned Worker 0 to Job 1. New lower bound = 2 + 3 + 1 + 7 = 13.");
    log_step_end();
    
    log_step_start();
    log_var("Job 1 Worker 0, Job 2 Worker 1 Cost", 5);
    log_var("Next Bound", 14);
    log_message("Branching: Assigned Worker 1 to Job 2. New lower bound = 2 + 3 + 1 + 8 = 14.");
    log_step_end();
    
    log_step_start();
    log_var("Job 1 Worker 0, Job 2 Worker 1, Job 3 Worker 2, Job 4 Worker 3", 10);
    log_var("Best Cost Found", 10);
    log_message("Branching: Completed assignment. Total cost is 2 (Job 1) + 3 (Job 2) + 1 (Job 3) + 4 (Job 4) = 10. Best Cost = 10.");
    log_step_end();
    
    log_finish();
    return 0;
}