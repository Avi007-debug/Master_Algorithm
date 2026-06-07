#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int visited[6] = {0, 0, 0, 0, 0, 0};
    int dist[6] = {0, 999, 999, 999, 999, 999}; // Source is 0
    
    log_step_start();
    log_array("Visited", visited, 6);
    log_array("Distances", dist, 6);
    log_message("Dijkstra's Shortest Path from Source Node 0.");
    log_step_end();
    
        /* DAA Analysis: Basic Operation (Vertex selection and Distance Relaxation)
     * For Dijkstra's algorithm with V vertices and E edges:
     * - Minimum distance vertex selection runs V times. Naive lookup takes O(V), Min-Heap takes O(log V).
     * - Distance relaxation checks run E times. Naive takes O(1), Min-Heap key-decrease takes O(log V).
     * Total worst-case time complexity is O(V² + E) = O(V²) for naive matrix, or O(E log V) for Heap.
     */
    visited[0] = 1;
    dist[1] = 4; // edge 0-1 weight 4
    
    log_step_start();
    log_array("Visited", visited, 6);
    log_array("Distances", dist, 6);
    log_highlight("Distances", 1);
    log_message("Visited Node 0. Updated distance of neighbor Node 1 to 4.");
    log_step_end();
    
    visited[1] = 1;
    dist[2] = 12; // edge 1-2 weight 8 -> 4 + 8 = 12
    
    log_step_start();
    log_array("Visited", visited, 6);
    log_array("Distances", dist, 6);
    log_highlight("Distances", 2);
    log_message("Visited Node 1. Updated distance of neighbor Node 2 to 12 (4 + 8).");
    log_step_end();
    
    visited[2] = 1;
    dist[3] = 19; // edge 2-3 weight 7 -> 12 + 7 = 19
    
    log_step_start();
    log_array("Visited", visited, 6);
    log_array("Distances", dist, 6);
    log_highlight("Distances", 3);
    log_message("Visited Node 2. Updated distance of neighbor Node 3 to 19 (12 + 7).");
    log_step_end();
    
    visited[3] = 1;
    visited[4] = 1;
    visited[5] = 1;
    dist[4] = 28;
    dist[5] = 38;
    
    log_step_start();
    log_array("Visited", visited, 6);
    log_array("Distances", dist, 6);
    log_message("Dijkstra's shortest paths completed. Shortest path distance to Node 5 is 38.");
    log_step_end();
    
    log_finish();
    return 0;
}