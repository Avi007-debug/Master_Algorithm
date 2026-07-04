#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

#define V 4
#define E 4

struct Edge {
    int src, dest, weight;
};

int main(int argc, char* argv[]) {
    log_init();
    
    struct Edge edges[E] = {
        {0, 1, 4},
        {0, 2, 5},
        {1, 2, -3},
        {2, 3, 3}
    };
    
    int dist[V];
    for (int i = 0; i < V; i++) dist[i] = 999;
    dist[0] = 0;
    
    log_step_start();
    log_array("Distance", dist, V);
    log_message("Initialize Bellman-Ford: Source distance set to 0, others to INF (999)");
    log_step_end();
    
    for (int i = 1; i <= V - 1; i++) {
        log_step_start();
        log_array("Distance", dist, V);
        char msg[128];
        sprintf(msg, "Start Iteration %d (relax all edges)", i);
        log_message(msg);
        log_step_end();
        
        for (int j = 0; j < E; j++) {
            int u = edges[j].src;
            int v = edges[j].dest;
            int w = edges[j].weight;
            
            log_step_start();
            log_array("Distance", dist, V);
            log_highlight("Distance", u);
            log_highlight("Distance", v);
            char msg2[128];
            sprintf(msg2, "Check edge %d -> %d (weight %d). dist[%d] = %d, dist[%d] = %d", u, v, w, u, dist[u], v, dist[v]);
            log_message(msg2);
            log_step_end();
            
            if (dist[u] != 999 && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                log_step_start();
                log_array("Distance", dist, V);
                log_highlight("Distance", v);
                sprintf(msg2, "Relaxed edge! Updated dist[%d] to %d", v, dist[v]);
                log_message(msg2);
                log_step_end();
            }
        }
    }
    
    // Check for negative weight cycles
    for (int j = 0; j < E; j++) {
        int u = edges[j].src;
        int v = edges[j].dest;
        int w = edges[j].weight;
        if (dist[u] != 999 && dist[u] + w < dist[v]) {
            log_step_start();
            log_message("Warning: Graph contains a negative weight cycle!");
            log_step_end();
            log_finish();
            return 0;
        }
    }
    
    log_step_start();
    log_array("Distance", dist, V);
    log_message("Bellman-Ford complete. No negative weight cycle detected.");
    log_step_end();
    
    log_finish();
    return 0;
}
