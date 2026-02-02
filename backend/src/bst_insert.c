#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

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

Node* insert(Node* root, int data) {
    log_step_start("INSERT_BST");
    
    if (root == NULL) {
        log_message("Inserting %d as new node", data);
        Node* newNode = createNode(data);
        log_step_end("INSERT_BST");
        return newNode;
    }
    
    if (data < root->data) {
        log_message("%d < %d, going left", data, root->data);
        root->left = insert(root->left, data);
    } else if (data > root->data) {
        log_message("%d > %d, going right", data, root->data);
        root->right = insert(root->right, data);
    } else {
        log_message("%d already exists, ignoring", data);
    }
    
    log_step_end("INSERT_BST");
    return root;
}

void inorderTraversal(Node* root) {
    if (root != NULL) {
        inorderTraversal(root->left);
        log_message("Node: %d", root->data);
        inorderTraversal(root->right);
    }
}

void displayTree(Node* root) {
    log_step_start("DISPLAY_TREE");
    log_message("Inorder Traversal:");
    inorderTraversal(root);
    log_step_end("DISPLAY_TREE");
}

int main() {
    log_init();
    
    log_message("=== BINARY SEARCH TREE - INSERT ===\n");
    
    Node* root = NULL;
    
    int values[] = {50, 30, 70, 20, 40, 60, 80};
    int n = sizeof(values) / sizeof(values[0]);
    
    log_message("Inserting values into BST:");
    for (int i = 0; i < n; i++) {
        log_message("\n--- Inserting %d ---", values[i]);
        root = insert(root, values[i]);
    }
    
    log_message("\n--- Final BST ---");
    displayTree(root);
    
    return 0;
}
