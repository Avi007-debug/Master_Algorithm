#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int inDegree[4] = {0, 1, 1, 2}; // 0->1, 0->2, 1->3, 2->3
    int queue[4] = {0, -1, -1, -1};
    int order[4] = {-1, -1, -1, -1};
    
    log_step_start();
    log_array("In-Degrees", inDegree, 4);
    log_array("Queue", queue, 1);
    log_message("Initial DAG: 0->1, 0->2, 1->3, 2->3. Queue initialized with source node 0 (in-degree=0).");
    log_step_end();
    
    order[0] = 0;
    inDegree[1] = 0;
    inDegree[2] = 0;
    queue[0] = 1;
    queue[1] = 2;
    
    log_step_start();
    log_array("In-Degrees", inDegree, 4);
    log_array("Queue", queue, 2);
    log_array("Topo Order", order, 1);
    log_message("Processed Node 0. Decremented in-degrees of Node 1 and 2 to 0, and added them to queue.");
    log_step_end();
    
    order[1] = 1;
    inDegree[3] = 1;
    queue[0] = 2;
    
    log_step_start();
    log_array("In-Degrees", inDegree, 4);
    log_array("Queue", queue, 1);
    log_array("Topo Order", order, 2);
    log_message("Processed Node 1. Decremented in-degree of Node 3 to 1.");
    log_step_end();
    
    order[2] = 2;
    inDegree[3] = 0;
    queue[0] = 3;
    
    log_step_start();
    log_array("In-Degrees", inDegree, 4);
    log_array("Queue", queue, 1);
    log_array("Topo Order", order, 3);
    log_message("Processed Node 2. Decremented in-degree of Node 3 to 0 and added Node 3 to queue.");
    log_step_end();
    
    order[3] = 3;
    
    log_step_start();
    log_array("Topo Order", order, 4);
    log_message("Processed Node 3. Queue empty. Topological sort complete: 0, 1, 2, 3.");
    log_step_end();
    
    log_finish();
    return 0;
}