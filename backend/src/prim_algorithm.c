#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int mstSet[5] = {0, 0, 0, 0, 0};
    int keys[5] = {0, 999, 999, 999, 999}; // start node 0 key = 0
    int parent[5] = {-1, -1, -1, -1, -1};
    
    log_step_start();
    log_array("MST Set", mstSet, 5);
    log_array("Node Keys", keys, 5);
    log_message("Prim's Minimum Spanning Tree: Start at Node 0.");
    log_step_end();
    
        /* DAA Analysis: Basic Operation (Vertex selection and Key Relaxation)
     * For Prim's algorithm with V vertices and E edges:
     * - Min key vertex selection runs V times. Naive lookup takes O(V), Min-Heap takes O(log V).
     * - Adjacent key updates (relaxation checks) run E times.
     * Total worst-case time complexity is O(V²) for adjacency matrix, or O(E log V) for Min-Heap.
     */
    mstSet[0] = 1;
    keys[1] = 2; // edge 0-1 weight 2
    keys[3] = 6; // edge 0-3 weight 6
    parent[1] = 0;
    parent[3] = 0;
    
    log_step_start();
    log_array("MST Set", mstSet, 5);
    log_array("Node Keys", keys, 5);
    log_highlight("Node Keys", 1);
    log_message("Added Node 0 to MST. Updated adjacent keys: Node 1 key = 2, Node 3 key = 6.");
    log_step_end();
    
    mstSet[1] = 1;
    keys[2] = 3; // edge 1-2 weight 3
    keys[4] = 5; // edge 1-4 weight 5
    parent[2] = 1;
    parent[4] = 1;
    
    log_step_start();
    log_array("MST Set", mstSet, 5);
    log_array("Node Keys", keys, 5);
    log_highlight("Node Keys", 2);
    log_message("Added Node 1 to MST (cheapest edge). Updated adjacent keys: Node 2 key = 3, Node 4 key = 5.");
    log_step_end();
    
    mstSet[2] = 1;
    keys[4] = 5; // edge 2-4 weight 7 (ignored, 5 is cheaper)
    parent[2] = 1;
    
    log_step_start();
    log_array("MST Set", mstSet, 5);
    log_array("Node Keys", keys, 5);
    log_highlight("Node Keys", 4);
    log_message("Added Node 2 to MST. Checked edge 2-4 (weight 7), ignored since current key (5) is cheaper.");
    log_step_end();
    
    mstSet[4] = 1;
    mstSet[3] = 1;
    
    log_step_start();
    log_array("MST Set", mstSet, 5);
    log_message("Prim's algorithm finished. Minimum Spanning Tree constructed successfully!");
    log_step_end();
    
    log_finish();
    return 0;
}