#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int adj[16] = {
        0, 10, 15, 20,
        10, 0, 35, 25,
        15, 35, 0, 30,
        20, 25, 30, 0
    };
    
    log_step_start();
    log_array("Cost Matrix", adj, 16);
    log_message("Travelling Salesperson: Branch & Bound Solver.");
    log_step_end();
    
    log_step_start();
    log_var("Root Bound", 75);
    log_message("Root Node: Calculate lower bound for all tours = 75.");
    log_step_end();
    
    log_step_start();
    log_var("Path 0-1 Bound", 80);
    log_var("Path 0-2 Bound", 75);
    log_var("Path 0-3 Bound", 95);
    log_message("Branching: Node 0 -> Node 2 has the lowest bound cost (75). Select Path 0-2.");
    log_step_end();
    
    log_step_start();
    log_var("Tour Cost 0-2-3-1-0", 80);
    log_var("Best Cost Found", 80);
    log_message("Branching: Completed tour 0-2-3-1-0 with total cost = 80. set best cost = 80.");
    log_step_end();
    
    log_step_start();
    log_message("Pruned remaining branches whose bounds are >= 80. Optimal tour cost is 80.");
    log_step_end();
    
    log_finish();
    return 0;
}