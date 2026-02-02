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
    log_step_start();
    log_message("INSERT_BST");
    
    if (root == NULL) {
        char msg[256];
        sprintf(msg, "Inserting %d as new node", data);
        log_message(msg);
        Node* newNode = createNode(data);
        log_step_end();
    log_message("INSERT_BST");
        return newNode;
    }
    
    if (data < root->data) {
        char msg[256];
        sprintf(msg, "%d < %d, going left", data, root->data);
        log_message(msg);
        root->left = insert(root->left, data);
    } else if (data > root->data) {
        char msg[256];
        sprintf(msg, "%d > %d, going right", data, root->data);
        log_message(msg);
        root->right = insert(root->right, data);
    } else {
        char msg[256];
        sprintf(msg, "%d already exists, ignoring", data);
        log_message(msg);
    }
    
    log_step_end();
    log_message("INSERT_BST");
    return root;
}

void inorderTraversal(Node* root) {
    if (root != NULL) {
        inorderTraversal(root->left);
        char msg[256];
        sprintf(msg, "Node: %d", root->data);
        log_message(msg);
        inorderTraversal(root->right);
    }
}

void displayTree(Node* root) {
    log_step_start();
    log_message("DISPLAY_TREE");
    log_message("Inorder Traversal:");
    inorderTraversal(root);
    log_step_end();
    log_message("DISPLAY_TREE");
}

int main() {
    log_init();
    
    log_step_start();
    log_message("=== BINARY SEARCH TREE - INSERT ===\n");
    log_step_end();
    
    Node* root = NULL;
    
    int values[] = {50, 30, 70, 20, 40, 60, 80};
    int n = sizeof(values) / sizeof(values[0]);
    
    log_step_start();
    log_message("Inserting values into BST:");
    log_step_end();
    for (int i = 0; i < n; i++) {
        char msg[256];
        log_step_start();
        sprintf(msg, "\n--- Inserting %d ---", values[i]);
        log_message(msg);
        log_step_end();
        root = insert(root, values[i]);
    }
    
    log_step_start();
    log_message("\n--- Final BST ---");
    log_step_end();
    displayTree(root);
    
    log_finish();
    return 0;
}
