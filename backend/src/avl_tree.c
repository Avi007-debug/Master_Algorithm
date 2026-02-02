#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

typedef struct Node {
    int data;
    int height;
    struct Node* left;
    struct Node* right;
} Node;

int max(int a, int b) {
    return (a > b) ? a : b;
}

int height(Node* node) {
    return (node == NULL) ? 0 : node->height;
}

int getBalance(Node* node) {
    return (node == NULL) ? 0 : height(node->left) - height(node->right);
}

Node* createNode(int data) {
    Node* node = (Node*)malloc(sizeof(Node));
    node->data = data;
    node->left = NULL;
    node->right = NULL;
    node->height = 1;
    return node;
}

Node* rightRotate(Node* y) {
    log_step_start("RIGHT_ROTATE");
    log_message("Right rotating at node %d", y->data);
    
    Node* x = y->left;
    Node* T2 = x->right;
    
    // Perform rotation
    x->right = y;
    y->left = T2;
    
    // Update heights
    y->height = max(height(y->left), height(y->right)) + 1;
    x->height = max(height(x->left), height(x->right)) + 1;
    
    log_message("New root after rotation: %d", x->data);
    log_step_end("RIGHT_ROTATE");
    
    return x;
}

Node* leftRotate(Node* x) {
    log_step_start("LEFT_ROTATE");
    log_message("Left rotating at node %d", x->data);
    
    Node* y = x->right;
    Node* T2 = y->left;
    
    // Perform rotation
    y->left = x;
    x->right = T2;
    
    // Update heights
    x->height = max(height(x->left), height(x->right)) + 1;
    y->height = max(height(y->left), height(y->right)) + 1;
    
    log_message("New root after rotation: %d", y->data);
    log_step_end("LEFT_ROTATE");
    
    return y;
}

Node* insert(Node* node, int data) {
    log_step_start("AVL_INSERT");
    
    // Normal BST insertion
    if (node == NULL) {
        log_message("Inserting new node: %d", data);
        log_step_end("AVL_INSERT");
        return createNode(data);
    }
    
    if (data < node->data) {
        log_message("%d < %d, going left", data, node->data);
        node->left = insert(node->left, data);
    } else if (data > node->data) {
        log_message("%d > %d, going right", data, node->data);
        node->right = insert(node->right, data);
    } else {
        log_message("%d already exists", data);
        log_step_end("AVL_INSERT");
        return node;
    }
    
    // Update height
    node->height = 1 + max(height(node->left), height(node->right));
    
    // Get balance factor
    int balance = getBalance(node);
    log_message("Node %d: height=%d, balance=%d", node->data, node->height, balance);
    
    // Left Left Case
    if (balance > 1 && data < node->left->data) {
        log_message("LL Case detected at node %d", node->data);
        log_step_end("AVL_INSERT");
        return rightRotate(node);
    }
    
    // Right Right Case
    if (balance < -1 && data > node->right->data) {
        log_message("RR Case detected at node %d", node->data);
        log_step_end("AVL_INSERT");
        return leftRotate(node);
    }
    
    // Left Right Case
    if (balance > 1 && data > node->left->data) {
        log_message("LR Case detected at node %d", node->data);
        node->left = leftRotate(node->left);
        log_step_end("AVL_INSERT");
        return rightRotate(node);
    }
    
    // Right Left Case
    if (balance < -1 && data < node->right->data) {
        log_message("RL Case detected at node %d", node->data);
        node->right = rightRotate(node->right);
        log_step_end("AVL_INSERT");
        return leftRotate(node);
    }
    
    log_message("Node %d is balanced", node->data);
    log_step_end("AVL_INSERT");
    return node;
}

void inorderTraversal(Node* root) {
    if (root != NULL) {
        inorderTraversal(root->left);
        log_message("Node: %d (height: %d, balance: %d)", 
                   root->data, root->height, getBalance(root));
        inorderTraversal(root->right);
    }
}

void displayTree(Node* root) {
    log_step_start("DISPLAY_AVL");
    log_message("AVL Tree (Inorder):");
    inorderTraversal(root);
    log_step_end("DISPLAY_AVL");
}

int main() {
    log_init();
    
    log_message("=== AVL TREE (SELF-BALANCING) ===\n");
    
    Node* root = NULL;
    
    int values[] = {10, 20, 30, 40, 50, 25};
    int n = sizeof(values) / sizeof(values[0]);
    
    for (int i = 0; i < n; i++) {
        log_message("\n--- Inserting %d ---", values[i]);
        root = insert(root, values[i]);
    }
    
    log_message("\n--- Final AVL Tree ---");
    displayTree(root);
    
    return 0;
}
