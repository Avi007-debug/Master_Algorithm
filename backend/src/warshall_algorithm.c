#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int adj[16] = {
        0, 1, 0, 0,
        0, 0, 0, 1,
        0, 0, 0, 0,
        1, 0, 1, 0
    };
    
    log_step_start();
    log_array("AdjacencyMatrix", adj, 16);
    log_message("Initial Graph Matrix R0. Computing Transitive Closure using Warshall's Algorithm.");
    log_step_end();
    
    // Step k=0
    adj[3 * 4 + 1] = 1; // 3 reaches 1 via 0 (3->0->1)
    log_step_start();
    log_array("AdjacencyMatrix", adj, 16);
    log_highlight("AdjacencyMatrix", 3 * 4 + 1);
    log_message("k = 0 (vertex 0 is bridge): path 3->0 and 0->1 exist, so 3->1 is set to 1.");
    log_step_end();
    
    // Step k=1
    adj[3 * 4 + 3] = 1; // 3 reaches 3 via 1 (3->1->3)
    log_step_start();
    log_array("AdjacencyMatrix", adj, 16);
    log_highlight("AdjacencyMatrix", 3 * 4 + 3);
    log_message("k = 1 (vertex 1 is bridge): path 3->1 and 1->3 exist, so 3->3 is set to 1.");
    log_step_end();
    
    // Step k=2
    log_step_start();
    log_array("AdjacencyMatrix", adj, 16);
    log_message("k = 2 (vertex 2 is bridge): no new paths updated.");
    log_step_end();
    
    // Step k=3
    adj[1 * 4 + 0] = 1; // 1 reaches 0 via 3
    adj[1 * 4 + 1] = 1; // 1 reaches 1 via 3
    adj[1 * 4 + 2] = 1; // 1 reaches 2 via 3
    adj[3 * 4 + 0] = 1; // 3 reaches 0
    adj[3 * 4 + 2] = 1; // 3 reaches 2
    
    log_step_start();
    log_array("AdjacencyMatrix", adj, 16);
    log_message("k = 3 (vertex 3 is bridge): reachability matrix is fully closed.");
    log_step_end();
    
    log_finish();
    return 0;
}