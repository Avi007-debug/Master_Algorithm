#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

#define MAX_VERTICES 10

// Depth-First Search (DFS) for Graph Traversal
// Uses stack (recursion stack) to explore as deep as possible before backtracking

void DFS(int graph[MAX_VERTICES][MAX_VERTICES], int visited[MAX_VERTICES], 
         int vertex, int n) {
    
    // Mark current vertex as visited
    visited[vertex] = 1;
    
    log_step_start();
    log_array("Visited", visited, n);
    char msg[128];
    sprintf(msg, "Visit vertex %d", vertex);
    log_message(msg);
    log_step_end();
    
    // Explore all adjacent vertices
    for (int i = 0; i < n; i++) {
        if (graph[vertex][i] == 1 && !visited[i]) {
            log_step_start();
            log_array("Visited", visited, n);
            sprintf(msg, "Vertex %d has unvisited neighbor %d", vertex, i);
            log_message(msg);
            sprintf(msg, "Recursively explore from %d", i);
            log_message(msg);
            log_step_end();
            
            DFS(graph, visited, i, n);
            
            log_step_start();
            log_array("Visited", visited, n);
            sprintf(msg, "Backtrack to vertex %d", vertex);
            log_message(msg);
            log_step_end();
        }
    }
}

int main(int argc, char* argv[]) {
    log_init();
    
    // Sample graph (Adjacency Matrix)
    // Graph:
    //     0 --- 1
    //     |     |
    //     2 --- 3
    //       \   |
    //         \ |
    //           4
    
    int n = 5; // Number of vertices
    int graph[MAX_VERTICES][MAX_VERTICES] = {
        {0, 1, 1, 0, 0},
        {1, 0, 0, 1, 0},
        {1, 0, 0, 1, 1},
        {0, 1, 1, 0, 1},
        {0, 0, 1, 1, 0}
    };
    
    int visited[MAX_VERTICES] = {0};
    
    log_step_start();
    log_array("Visited", visited, n);
    log_message("Depth-First Search (DFS) - Stack-based traversal");
    log_message("Start from vertex 0");
    log_message("Visit as deep as possible before backtracking");
    log_step_end();
    
    DFS(graph, visited, 0, n);
    
    log_step_start();
    log_array("Visited", visited, n);
    log_message("DFS traversal complete!");
    log_message("All reachable vertices visited");
    log_step_end();
    
    log_finish();
    return 0;
}
