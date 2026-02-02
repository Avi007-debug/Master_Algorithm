#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

#define MAX_NODES 100

typedef struct Node {
    int data;
    struct Node* left;
    struct Node* right;
} Node;

Node* createNode(int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}

// Serialize tree to array (level-order with -999 for nulls)
void serializeTree(Node* root, int* arr, int index, int maxSize) {
    if (index >= maxSize) return;
    
    if (root == NULL) {
        arr[index] = -999;
        return;
    }
    
    arr[index] = root->data;
    serializeTree(root->left, arr, 2*index + 1, maxSize);
    serializeTree(root->right, arr, 2*index + 2, maxSize);
}

// Calculate actual size needed for visualization
int calculateTreeSize(Node* root, int index) {
    if (root == NULL) return index;
    int maxIdx = index;
    int leftMax = calculateTreeSize(root->left, 2*index + 1);
    int rightMax = calculateTreeSize(root->right, 2*index + 2);
    if (leftMax > maxIdx) maxIdx = leftMax;
    if (rightMax > maxIdx) maxIdx = rightMax;
    return maxIdx;
}

void logTreeState(Node* root, const char* message) {
    int tree_array[MAX_NODES];
    for(int i = 0; i < MAX_NODES; i++) tree_array[i] = -999;
    
    serializeTree(root, tree_array, 0, MAX_NODES);
    int size = root ? calculateTreeSize(root, 0) + 1 : 0;
    if (size > MAX_NODES) size = MAX_NODES;
    
    log_step_start();
    if (size > 0) {
        log_array("TreeStructure", tree_array, size);
    }
    log_message(message);
    log_step_end();
}

Node* insert(Node* root, int data) {
    if (root == NULL) {
        return createNode(data);
    }

    if (data < root->data) {
        root->left = insert(root->left, data);
    } else if (data > root->data) {
        root->right = insert(root->right, data);
    }

    return root;
}

int main(int argc, char* argv[]) {
    log_init();
    
    // Parse input values
    int values[MAX_NODES];
    int n = 0;
    
    if (argc > 1) {
        if (argc > 2) {
            // Multiple arguments
            for (int i = 1; i < argc && n < MAX_NODES; i++) {
                values[n++] = atoi(argv[i]);
            }
        } else {
            // Comma-separated string
            char* token = strtok(argv[1], ", ");
            while (token != NULL && n < MAX_NODES) {
                values[n++] = atoi(token);
                token = strtok(NULL, ", ");
            }
        }
    } else {
        // Default values
        int defaults[] = {50, 30, 70, 20, 40, 60, 80};
        n = 7;
        for(int i = 0; i < n; i++) values[i] = defaults[i];
    }
    
    logTreeState(NULL, "Starting with empty BST");
    
    Node* root = NULL;
    
    for (int i = 0; i < n; i++) {
        char msg[256];
        sprintf(msg, "Inserting %d into BST", values[i]);
        logTreeState(root, msg);
        
        root = insert(root, values[i]);
        
        sprintf(msg, "✓ Inserted %d successfully", values[i]);
        logTreeState(root, msg);
    }
    
    logTreeState(root, "Final BST - All insertions complete!");
    
    log_finish();
    return 0;
}
