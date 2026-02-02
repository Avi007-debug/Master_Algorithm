#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

typedef struct Node {
    int data;
    struct Node* left;
    struct Node* right;
    int isThreaded; // 1 if right pointer is thread
} Node;

Node* createNode(int data) {
    Node* node = (Node*)malloc(sizeof(Node));
    node->data = data;
    node->left = NULL;
    node->right = NULL;
    node->isThreaded = 0;
    return node;
}

Node* leftmost(Node* node) {
    if (node == NULL) return NULL;
    
    while (node->left != NULL) {
        node = node->left;
    }
    return node;
}

Node* insert(Node* root, int data) {
    log_step_start();
    log_message("TBT_INSERT");
    
    if (root == NULL) {
        char msg[256];
        sprintf(msg, "Created new node: %d", data);
        log_message(msg);
        log_step_end();
    log_message("TBT_INSERT");
        return createNode(data);
    }
    
    Node* parent = NULL;
    Node* current = root;
    
    // Find insertion point
    while (current != NULL) {
        parent = current;
        
        if (data < current->data) {
            if (current->left == NULL) {
                break;
            }
            current = current->left;
        } else if (data > current->data) {
            if (current->isThreaded || current->right == NULL) {
                break;
            }
            current = current->right;
        } else {
            char msg[256];
            sprintf(msg, "Value %d already exists", data);
            log_message(msg);
            log_step_end();
    log_message("TBT_INSERT");
            return root;
        }
    }
    
    Node* newNode = createNode(data);
    char msg[256];
    
    if (data < parent->data) {
        sprintf(msg, "Inserting %d as left child of %d", data, parent->data);
        log_message(msg);
        parent->left = newNode;
        newNode->isThreaded = 1;
        newNode->right = parent; // Thread to inorder successor
        sprintf(msg, "Threaded right pointer to %d", parent->data);
        log_message(msg);
    } else {
        sprintf(msg, "Inserting %d as right child of %d", data, parent->data);
        log_message(msg);
        newNode->isThreaded = 1;
        newNode->right = parent->right; // Copy parent's thread
        parent->right = newNode;
        parent->isThreaded = 0; // Parent now has real right child
        sprintf(msg, "Inherited thread from %d", parent->data);
        log_message(msg);
    }
    
    log_step_end();
    log_message("TBT_INSERT");
    return root;
}

void inorderTraversal(Node* root) {
    log_step_start();
    log_message("TBT_INORDER");
    log_message("Inorder Traversal (using threads):");
    
    Node* current = leftmost(root);
    
    while (current != NULL) {
        char msg[256];
        sprintf(msg, "Visit: %d (threaded: %s)", 
                   current->data, current->isThreaded ? "yes" : "no");
        log_message(msg);
        
        // If threaded, follow thread
        if (current->isThreaded) {
            current = current->right;
        } else {
            // Go to leftmost of right subtree
            current = leftmost(current->right);
        }
    }
    
    log_step_end();
    log_message("TBT_INORDER");
}

int main() {
    log_init();
    
    log_step_start();
    log_message("=== THREADED BINARY TREE ===\n");
    log_step_end();
    
    Node* root = NULL;
    
    int values[] = {20, 10, 30, 5, 15, 25, 35};
    int n = sizeof(values) / sizeof(values[0]);
    
    log_step_start();
    log_message("--- Building Threaded Binary Tree ---");
    log_step_end();
    for (int i = 0; i < n; i++) {
        char msg[256];
        log_step_start();
        sprintf(msg, "\nInserting %d:", values[i]);
        log_message(msg);
        log_step_end();
        root = insert(root, values[i]);
    }
    
    log_step_start();
    log_message("\n--- Traversing Tree ---");
    log_step_end();
    inorderTraversal(root);
    
    log_finish();
    return 0;
}
