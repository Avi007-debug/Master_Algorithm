#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

#define V 5

int graph[V][V] = {
    {0, 1, 0, 0, 0},
    {0, 0, 1, 0, 0},
    {1, 0, 0, 1, 0},
    {0, 0, 0, 0, 1},
    {0, 0, 0, 1, 0}
};

int transpose[V][V];
int visited[V];
int finishStack[V];
int stackSize = 0;
int scc[V];
int currentScc = 0;

void dfs1(int u) {
    visited[u] = 1;
    log_step_start();
    log_array("Visited Pass 1", visited, V);
    log_highlight("Visited Pass 1", u);
    char msg[128];
    sprintf(msg, "Pass 1 DFS: visited node %d", u);
    log_message(msg);
    log_step_end();
    
    for (int v = 0; v < V; v++) {
        if (graph[u][v] && !visited[v]) {
            dfs1(v);
        }
    }
    
    finishStack[stackSize++] = u;
    
    log_step_start();
    log_array("Finish Stack", finishStack, stackSize);
    sprintf(msg, "Finished node %d, pushed to Stack", u);
    log_message(msg);
    log_step_end();
}

void dfs2(int u) {
    visited[u] = 1;
    scc[u] = currentScc;
    
    log_step_start();
    log_array("Visited Pass 2", visited, V);
    log_array("SCC Groupings", scc, V);
    log_highlight("SCC Groupings", u);
    char msg[128];
    sprintf(msg, "Pass 2 DFS: visiting node %d, assigned to SCC #%d", u, currentScc);
    log_message(msg);
    log_step_end();
    
    for (int v = 0; v < V; v++) {
        if (transpose[u][v] && !visited[v]) {
            dfs2(v);
        }
    }
}

int main(int argc, char* argv[]) {
    log_init();
    
    for (int i = 0; i < V; i++) {
        visited[i] = 0;
        finishStack[i] = -1;
        scc[i] = -1;
    }
    
    log_step_start();
    log_array("Visited Pass 1", visited, V);
    log_message("Kosaraju SCC: Start DFS Pass 1 to find finishing order");
    log_step_end();
    
    for (int i = 0; i < V; i++) {
        if (!visited[i]) {
            dfs1(i);
        }
    }
    
    // Transpose graph
    log_step_start();
    log_message("Transposing graph...");
    log_step_end();
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            transpose[i][j] = graph[j][i];
        }
    }
    
    // Reset visited
    for (int i = 0; i < V; i++) visited[i] = 0;
    
    log_step_start();
    log_array("Visited Pass 2", visited, V);
    log_message("Start DFS Pass 2 on Transposed Graph in stack order");
    log_step_end();
    
    for (int i = stackSize - 1; i >= 0; i--) {
        int u = finishStack[i];
        if (!visited[u]) {
            currentScc++;
            dfs2(u);
        }
    }
    
    log_step_start();
    log_array("SCC Groupings", scc, V);
    log_message("Kosaraju's SCC completed!");
    log_step_end();
    
    log_finish();
    return 0;
}
