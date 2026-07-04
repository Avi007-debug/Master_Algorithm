#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

#define V 5

int parent[V];
int rank[V];

void makeSet() {
    for (int i = 0; i < V; i++) {
        parent[i] = i;
        rank[i] = 0;
    }
}

int find(int i) {
    log_step_start();
    log_array("Parent", parent, V);
    log_highlight("Parent", i);
    char msg[128];
    sprintf(msg, "Find root of node %d. Current parent: %d", i, parent[i]);
    log_message(msg);
    log_step_end();
    
    if (parent[i] == i)
        return i;
        
    int root = find(parent[i]);
    
    if (parent[i] != root) {
        parent[i] = root; // Path compression
        log_step_start();
        log_array("Parent", parent, V);
        log_highlight("Parent", i);
        sprintf(msg, "Path Compression: parent of %d set directly to root %d", i, root);
        log_message(msg);
        log_step_end();
    }
    
    return root;
}

void unionSets(int i, int j) {
    log_step_start();
    char msg[128];
    sprintf(msg, "Union sets containing node %d and node %d", i, j);
    log_message(msg);
    log_step_end();
    
    int root_i = find(i);
    int root_j = find(j);
    
    if (root_i != root_j) {
        log_step_start();
        log_array("Parent", parent, V);
        log_array("Rank", rank, V);
        sprintf(msg, "Roots are different. Root(%d) = %d (rank %d), Root(%d) = %d (rank %d)", i, root_i, rank[root_i], j, root_j, rank[root_j]);
        log_message(msg);
        log_step_end();
        
        if (rank[root_i] < rank[root_j]) {
            parent[root_i] = root_j;
        } else if (rank[root_i] > rank[root_j]) {
            parent[root_j] = root_i;
        } else {
            parent[root_j] = root_i;
            rank[root_i]++;
        }
        
        log_step_start();
        log_array("Parent", parent, V);
        log_array("Rank", rank, V);
        sprintf(msg, "Merged! Node %d is now parent of node %d", parent[root_j], root_j);
        log_message(msg);
        log_step_end();
    } else {
        log_step_start();
        sprintf(msg, "Nodes %d and %d are already in the same set", i, j);
        log_message(msg);
        log_step_end();
    }
}

int main(int argc, char* argv[]) {
    log_init();
    
    makeSet();
    
    log_step_start();
    log_array("Parent", parent, V);
    log_array("Rank", rank, V);
    log_message("Initialize Disjoint Set Union (DSU / Union-Find)");
    log_step_end();
    
    unionSets(0, 2);
    unionSets(4, 2);
    unionSets(3, 1);
    unionSets(0, 4); // should report already same
    unionSets(3, 4); // merge the two components
    
    log_finish();
    return 0;
}
