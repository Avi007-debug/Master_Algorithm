#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

typedef struct Node {
    int vertex;
    int weight;
    struct Node* next;
} Node;

typedef struct {
    Node* head;
} AdjList;

Node* createNode(int vertex, int weight) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->vertex = vertex;
    newNode->weight = weight;
    newNode->next = NULL;
    return newNode;
}

void addEdge(AdjList adjList[], int src, int dest, int weight, int isDirected) {
    log_step_start();
    log_message("ADD_EDGE");
    
    // Add edge from src to dest
    Node* newNode = createNode(dest, weight);
    newNode->next = adjList[src].head;
    adjList[src].head = newNode;
    
    char msg[256];
    sprintf(msg, "Added edge: %d -> %d (weight: %d)", src, dest, weight);
    log_message(msg);
    
    // If undirected, add reverse edge
    if (!isDirected) {
        newNode = createNode(src, weight);
        newNode->next = adjList[dest].head;
        adjList[dest].head = newNode;
        char msg[256];
        sprintf(msg, "Added reverse edge: %d -> %d (undirected)", dest, src);
        log_message(msg);
    }
    
    log_step_end();
    log_message("ADD_EDGE");
}

void displayAdjacencyList(AdjList adjList[], int vertices) {
    log_step_start();
    log_message("DISPLAY_ADJ_LIST");
    
    log_message("\nAdjacency List Representation:");
    
    for (int i = 0; i < vertices; i++) {
        char listStr[512];
        sprintf(listStr, "Vertex %d: ", i);
        
        Node* temp = adjList[i].head;
        
        if (temp == NULL) {
            strcat(listStr, "(empty)");
        } else {
            while (temp != NULL) {
                char edge[50];
                sprintf(edge, "-> %d(w:%d) ", temp->vertex, temp->weight);
                strcat(listStr, edge);
                temp = temp->next;
            }
        }
        
        char msg[256];
        sprintf(msg, "%s", listStr);
        log_message(msg);
    }
    
    log_step_end();
    log_message("DISPLAY_ADJ_LIST");
}

void analyzeList(AdjList adjList[], int vertices) {
    log_step_start();
    log_message("ANALYZE_LIST");
    
    log_message("\nGraph Analysis:");
    
    int totalEdges = 0;
    
    for (int i = 0; i < vertices; i++) {
        int degree = 0;
        Node* temp = adjList[i].head;
        
        while (temp != NULL) {
            degree++;
            totalEdges++;
            temp = temp->next;
        }
        
        char msg[256];
        sprintf(msg, "Vertex %d: Degree = %d", i, degree);
        log_message(msg);
    }
    
    char msg[256];
    sprintf(msg, "\nTotal edge entries: %d", totalEdges);
    log_message(msg);
    log_message("Space Complexity: O(V + E) where V=vertices, E=edges");
    
    log_step_end();
    log_message("ANALYZE_LIST");
}

int main() {
    log_init();
    
    log_step_start();
    log_message("=== ADJACENCY LIST REPRESENTATION ===\n");
    log_step_end();
    
    int vertices = 5;
    AdjList* adjList = (AdjList*)malloc(sizeof(AdjList) * vertices);
    
    // Initialize
    for (int i = 0; i < vertices; i++) {
        adjList[i].head = NULL;
    }
    
    char msg[256];
    sprintf(msg, "Creating directed weighted graph with %d vertices\n", vertices);
    log_message(msg);
    
    // Add same edges as adjacency matrix example
    addEdge(adjList, 0, 1, 5, 1);
    addEdge(adjList, 0, 2, 3, 1);
    addEdge(adjList, 1, 2, 2, 1);
    addEdge(adjList, 1, 3, 6, 1);
    addEdge(adjList, 2, 3, 7, 1);
    addEdge(adjList, 3, 4, 1, 1);
    addEdge(adjList, 4, 0, 4, 1);
    
    displayAdjacencyList(adjList, vertices);
    analyzeList(adjList, vertices);
    
    log_step_start();
    log_message("\n--- Comparison with Adjacency Matrix ---");
    log_message("Matrix: O(V²) space - Good for dense graphs");
    log_message("List:   O(V+E) space - Good for sparse graphs");
    log_message("Matrix: O(1) edge lookup");
    log_message("List:   O(degree) edge lookup");
    log_step_end();
    
    log_finish();
    return 0;
}
