#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

#define V 5

int main(int argc, char* argv[]) {
    log_init();
    
    // Simple adjacency matrix representing distance weights
    int graph[V][V] = {
        {0, 4, 3, 0, 0}, // 0 connects to 1 (cost 4), 2 (cost 3)
        {4, 0, 1, 2, 0}, // 1 connects to 2 (cost 1), 3 (cost 2)
        {3, 1, 0, 0, 6}, // 2 connects to 4 (cost 6)
        {0, 2, 0, 0, 2}, // 3 connects to 4 (cost 2)
        {0, 0, 6, 2, 0}  // 4 (Goal)
    };
    
    // Heuristics (Straight-line distance to goal node 4)
    int h[V] = {7, 4, 5, 2, 0};
    int g[V] = {0, 999, 999, 999, 999};
    int f[V] = {7, 999, 999, 999, 999};
    int visited[V] = {0};
    int parent[V] = {-1, -1, -1, -1, -1};
    
    log_step_start();
    log_array("Heuristics", h, V);
    log_array("G-Scores", g, V);
    log_array("F-Scores", f, V);
    log_message("Initialize A* Search from Node 0 to Node 4");
    log_step_end();
    
    g[0] = 0;
    f[0] = h[0];
    
    while (1) {
        // Find open node with minimum f score
        int current = -1;
        int min_f = 999;
        for (int i = 0; i < V; i++) {
            if (!visited[i] && f[i] < min_f) {
                min_f = f[i];
                current = i;
            }
        }
        
        if (current == -1 || current == 4) {
            break; // Goal reached or no path
        }
        
        visited[current] = 1;
        
        log_step_start();
        log_array("Visited", visited, V);
        log_array("F-Scores", f, V);
        log_highlight("Visited", current);
        char msg[128];
        sprintf(msg, "Exploring Node %d (f = %d, g = %d, h = %d)", current, f[current], g[current], h[current]);
        log_message(msg);
        log_step_end();
        
        for (int neighbor = 0; neighbor < V; neighbor++) {
            if (graph[current][neighbor] > 0 && !visited[neighbor]) {
                int tentative_g = g[current] + graph[current][neighbor];
                if (tentative_g < g[neighbor]) {
                    parent[neighbor] = current;
                    g[neighbor] = tentative_g;
                    f[neighbor] = g[neighbor] + h[neighbor];
                    
                    log_step_start();
                    log_array("G-Scores", g, V);
                    log_array("F-Scores", f, V);
                    log_highlight("G-Scores", neighbor);
                    sprintf(msg, "Updating neighbor %d: g = %d, f = %d", neighbor, g[neighbor], f[neighbor]);
                    log_message(msg);
                    log_step_end();
                }
            }
        }
    }
    
    if (visited[4] || g[4] != 999) {
        log_step_start();
        log_array("Visited", visited, V);
        log_message("Goal Node 4 reached successfully!");
        log_step_end();
    } else {
        log_step_start();
        log_array("Visited", visited, V);
        log_message("Path to Goal Node 4 not found.");
        log_step_end();
    }
    
    log_finish();
    return 0;
}
