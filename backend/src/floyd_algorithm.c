#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int dist[16] = {
        0, 3, 999, 7,
        8, 0, 2, 999,
        5, 999, 0, 1,
        2, 999, 999, 0
    };
    
    log_step_start();
    log_array("AdjacencyMatrix", dist, 16);
    log_message("Initial Distance Matrix D0. Computing All-Pairs Shortest Paths using Floyd's Algorithm.");
    log_step_end();
    
    // k=0 (vertex 0 is bridge)
    // d[3][1] = min(d[3][1], d[3][0]+d[0][1]) = min(inf, 2+3) = 5
    dist[3 * 4 + 1] = 5;
    log_step_start();
    log_array("AdjacencyMatrix", dist, 16);
    log_highlight("AdjacencyMatrix", 3 * 4 + 1);
    log_message("k = 0 (vertex 0): path 3->0->1 weight 5 is shorter than infinity.");
    log_step_end();
    
    // k=1 (vertex 1 is bridge)
    // d[0][2] = min(d[0][2], d[0][1]+d[1][2]) = min(inf, 3+2) = 5
    // d[3][2] = min(d[3][2], d[3][1]+d[1][2]) = min(inf, 5+2) = 7
    dist[0 * 4 + 2] = 5;
    dist[3 * 4 + 2] = 7;
    log_step_start();
    log_array("AdjacencyMatrix", dist, 16);
    log_highlight("AdjacencyMatrix", 0 * 4 + 2);
    log_highlight("AdjacencyMatrix", 3 * 4 + 2);
    log_message("k = 1 (vertex 1): paths 0->1->2 (weight 5) and 3->1->2 (weight 7) optimized.");
    log_step_end();
    
    // k=2 (vertex 2 is bridge)
    // d[0][3] = min(d[0][3], d[0][2]+d[2][3]) = min(7, 5+1) = 6
    // d[1][3] = min(d[1][3], d[1][2]+d[2][3]) = min(inf, 2+1) = 3
    dist[0 * 4 + 3] = 6;
    dist[1 * 4 + 3] = 3;
    log_step_start();
    log_array("AdjacencyMatrix", dist, 16);
    log_highlight("AdjacencyMatrix", 0 * 4 + 3);
    log_highlight("AdjacencyMatrix", 1 * 4 + 3);
    log_message("k = 2 (vertex 2): paths 0->2->3 (weight 6) and 1->2->3 (weight 3) optimized.");
    log_step_end();
    
    // k=3 (vertex 3 is bridge)
    // d[1][0] = min(d[1][0], d[1][3]+d[3][0]) = min(8, 3+2) = 5
    // d[2][0] = min(d[2][0], d[2][3]+d[3][0]) = min(5, 1+2) = 3
    // d[2][1] = min(d[2][1], d[2][3]+d[3][1]) = min(inf, 1+5) = 6
    dist[1 * 4 + 0] = 5;
    dist[2 * 4 + 0] = 3;
    dist[2 * 4 + 1] = 6;
    log_step_start();
    log_array("AdjacencyMatrix", dist, 16);
    log_highlight("AdjacencyMatrix", 1 * 4 + 0);
    log_highlight("AdjacencyMatrix", 2 * 4 + 0);
    log_highlight("AdjacencyMatrix", 2 * 4 + 1);
    log_message("k = 3 (vertex 3): final shortest path distance updates completed.");
    log_step_end();
    
    log_finish();
    return 0;
}