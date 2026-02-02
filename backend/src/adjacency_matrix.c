#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

#define MAX_VERTICES 10

void displayAdjacencyMatrix(int graph[][MAX_VERTICES], int vertices) {
    log_step_start();
    log_message("DISPLAY_ADJ_MATRIX");
    
    log_message("\nAdjacency Matrix Representation:");
    
    // Header
    char header[256] = "   ";
    for (int i = 0; i < vertices; i++) {
        char temp[10];
        sprintf(temp, "%2d ", i);
        strcat(header, temp);
    }
    log_message(header);
    log_message("  ---");
    
    // Matrix rows
    for (int i = 0; i < vertices; i++) {
        char row[256];
        sprintf(row, "%2d| ", i);
        
        for (int j = 0; j < vertices; j++) {
            char temp[10];
            sprintf(temp, "%2d ", graph[i][j]);
            strcat(row, temp);
        }
        log_message(row);
    }
    
    log_step_end();
    log_message("DISPLAY_ADJ_MATRIX");
}

void addEdge(int graph[][MAX_VERTICES], int src, int dest, int isDirected, int weight) {
    log_step_start();
    log_message("ADD_EDGE");
    
    graph[src][dest] = weight;
    char msg[256];
    sprintf(msg, "Added edge: %d -> %d (weight: %d)", src, dest, weight);
    log_message(msg);
    
    if (!isDirected) {
        graph[dest][src] = weight;
        sprintf(msg, "Added reverse edge: %d -> %d (undirected)", dest, src);
        log_message(msg);
    }
    
    log_step_end();
    log_message("ADD_EDGE");
}

void analyzeMatrix(int graph[][MAX_VERTICES], int vertices) {
    log_step_start();
    log_message("ANALYZE_MATRIX");
    
    log_message("\nGraph Analysis:");
    
    for (int i = 0; i < vertices; i++) {
        int outDegree = 0;
        int inDegree = 0;
        
        for (int j = 0; j < vertices; j++) {
            if (graph[i][j] != 0) outDegree++;
            if (graph[j][i] != 0) inDegree++;
        }
        
        char msg[256];
        sprintf(msg, "Vertex %d: Out-degree=%d, In-degree=%d", i, outDegree, inDegree);
        log_message(msg);
    }
    
    log_step_end();
    log_message("ANALYZE_MATRIX");
}

int main() {
    log_init();
    
    log_step_start();
    log_message("=== ADJACENCY MATRIX REPRESENTATION ===\n");
    log_step_end();
    
    int vertices = 5;
    int graph[MAX_VERTICES][MAX_VERTICES] = {0};
    
    // Initialize all to 0
    for (int i = 0; i < MAX_VERTICES; i++) {
        for (int j = 0; j < MAX_VERTICES; j++) {
            graph[i][j] = 0;
        }
    }
    
    char msg[256];
    sprintf(msg, "Creating directed weighted graph with %d vertices\n", vertices);
    log_message(msg);
    
    // Add edges
    addEdge(graph, 0, 1, 1, 5);
    addEdge(graph, 0, 2, 1, 3);
    addEdge(graph, 1, 2, 1, 2);
    addEdge(graph, 1, 3, 1, 6);
    addEdge(graph, 2, 3, 1, 7);
    addEdge(graph, 3, 4, 1, 1);
    addEdge(graph, 4, 0, 1, 4);
    
    displayAdjacencyMatrix(graph, vertices);
    analyzeMatrix(graph, vertices);
    
    // Space complexity analysis
    log_step_start();
    log_message("\n--- Space Complexity Analysis ---");
    int totalCells = vertices * vertices;
    int usedCells = 0;
    
    for (int i = 0; i < vertices; i++) {
        for (int j = 0; j < vertices; j++) {
            if (graph[i][j] != 0) usedCells++;
        }
    }
    
    sprintf(msg, "Total cells: %d", totalCells);
    log_message(msg);
    sprintf(msg, "Used cells: %d", usedCells);
    log_message(msg);
    sprintf(msg, "Space efficiency: %.1f%%", (usedCells * 100.0) / totalCells);
    log_message(msg);
    log_message("Space Complexity: O(V²) where V = number of vertices");
    log_step_end();
    
    return 0;
}
