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

int ids[V];
int low[V];
int onStack[V];
int stack[V];
int stackTop = -1;
int idCounter = 0;
int sccCount = 0;

void dfs(int u) {
    ids[u] = low[u] = idCounter++;
    stack[++stackTop] = u;
    onStack[u] = 1;
    
    log_step_start();
    log_array("IDs", ids, V);
    log_array("Low-Links", low, V);
    log_array("On-Stack", onStack, V);
    log_highlight("IDs", u);
    char msg[128];
    sprintf(msg, "DFS visiting node %d. ID: %d, Low-link: %d", u, ids[u], low[u]);
    log_message(msg);
    log_step_end();
    
    for (int v = 0; v < V; v++) {
        if (graph[u][v]) {
            if (ids[v] == -1) {
                log_step_start();
                log_array("IDs", ids, V);
                sprintf(msg, "Edge %d -> %d: %d is unvisited. Recurse.", u, v, v);
                log_message(msg);
                log_step_end();
                
                dfs(v);
                
                low[u] = (low[u] < low[v]) ? low[u] : low[v];
                
                log_step_start();
                log_array("Low-Links", low, V);
                log_highlight("Low-Links", u);
                sprintf(msg, "Returned from %d. Low-link of %d updated to %d", v, u, low[u]);
                log_message(msg);
                log_step_end();
            } else if (onStack[v]) {
                low[u] = (low[u] < ids[v]) ? low[u] : ids[v];
                
                log_step_start();
                log_array("Low-Links", low, V);
                log_highlight("Low-Links", u);
                sprintf(msg, "Edge %d -> %d: %d is on stack. Low-link of %d updated to %d", u, v, v, u, low[u]);
                log_message(msg);
                log_step_end();
            }
        }
    }
    
    if (low[u] == ids[u]) {
        sccCount++;
        log_step_start();
        log_array("On-Stack", onStack, V);
        sprintf(msg, "SCC #%d found! Pop nodes from stack until %d:", sccCount, u);
        log_message(msg);
        log_step_end();
        
        while (1) {
            int node = stack[stackTop--];
            onStack[node] = 0;
            
            log_step_start();
            log_array("On-Stack", onStack, V);
            log_highlight("On-Stack", node);
            sprintf(msg, "Popped node %d from stack", node);
            log_message(msg);
            log_step_end();
            
            if (node == u) break;
        }
    }
}

int main(int argc, char* argv[]) {
    log_init();
    
    for (int i = 0; i < V; i++) {
        ids[i] = -1;
        low[i] = -1;
        onStack[i] = 0;
    }
    
    log_step_start();
    log_array("IDs", ids, V);
    log_message("Initialize Tarjan's SCC algorithm");
    log_step_end();
    
    for (int i = 0; i < V; i++) {
        if (ids[i] == -1) {
            dfs(i);
        }
    }
    
    log_step_start();
    log_array("IDs", ids, V);
    log_array("Low-Links", low, V);
    log_message("Tarjan's SCC complete!");
    log_step_end();
    
    log_finish();
    return 0;
}
