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
    log_step_start();
    log_message("RIGHT_ROTATE");
    char msg[256];
    sprintf(msg, "Right rotating at node %d", y->data);
    log_message(msg);
    
    Node* x = y->left;
    Node* T2 = x->right;
    
    // Perform rotation
    x->right = y;
    y->left = T2;
    
    // Update heights
    y->height = max(height(y->left), height(y->right)) + 1;
    x->height = max(height(x->left), height(x->right)) + 1;
    
    sprintf(msg, "New root after rotation: %d", x->data);
    log_message(msg);
    log_step_end();
    
    return x;
}

Node* leftRotate(Node* x) {
    log_step_start();
    log_message("LEFT_ROTATE");
    char msg[256];
    sprintf(msg, "Left rotating at node %d", x->data);
    log_message(msg);
    
    Node* y = x->right;
    Node* T2 = y->left;
    
    // Perform rotation
    y->left = x;
    x->right = T2;
    
    // Update heights
    x->height = max(height(x->left), height(x->right)) + 1;
    y->height = max(height(y->left), height(y->right)) + 1;
    
    sprintf(msg, "New root after rotation: %d", y->data);
    log_message(msg);
    log_step_end();
    
    return y;
}

Node* insert(Node* node, int data) {
    log_step_start();
    log_message("AVL_INSERT");
    
    // Normal BST insertion
    if (node == NULL) {
        char msg[256];
        sprintf(msg, "Inserting new node: %d", data);
        log_message(msg);
        log_step_end();
        return createNode(data);
    }
    
    if (data < node->data) {
        char msg[256];
        sprintf(msg, "%d < %d, going left", data, node->data);
        log_message(msg);
        node->left = insert(node->left, data);
    } else if (data > node->data) {
        char msg[256];
        sprintf(msg, "%d > %d, going right", data, node->data);
        log_message(msg);
        node->right = insert(node->right, data);
    } else {
        char msg[256];
        sprintf(msg, "%d already exists", data);
        log_message(msg);
        log_step_end();
        return node;
    }
    
    // Update height
    node->height = 1 + max(height(node->left), height(node->right));
    
    // Get balance factor
    int balance = getBalance(node);
    char msg[256];
    sprintf(msg, "Node %d: height=%d, balance=%d", node->data, node->height, balance);
    log_message(msg);
    
    // Left Left Case
    if (balance > 1 && data < node->left->data) {
        sprintf(msg, "LL Case detected at node %d", node->data);
        log_message(msg);
        log_step_end();
        return rightRotate(node);
    }
    
    // Right Right Case
    if (balance < -1 && data > node->right->data) {
        sprintf(msg, "RR Case detected at node %d", node->data);
        log_message(msg);
        log_step_end();
        return leftRotate(node);
    }
    
    // Left Right Case
    if (balance > 1 && data > node->left->data) {
        sprintf(msg, "LR Case detected at node %d", node->data);
        log_message(msg);
        node->left = leftRotate(node->left);
        log_step_end();
        return rightRotate(node);
    }
    
    // Right Left Case
    if (balance < -1 && data < node->right->data) {
        sprintf(msg, "RL Case detected at node %d", node->data);
        log_message(msg);
        node->right = rightRotate(node->right);
        log_step_end();
        return leftRotate(node);
    }
    
    sprintf(msg, "Node %d is balanced", node->data);
    log_message(msg);
    log_step_end();
    return node;
}

void inorderTraversal(Node* root) {
    if (root != NULL) {
        inorderTraversal(root->left);
        char msg[256];
        sprintf(msg, "Node: %d (height: %d, balance: %d)", 
                   root->data, root->height, getBalance(root));
        log_message(msg);
        inorderTraversal(root->right);
    }
}

void displayTree(Node* root) {
    log_step_start();
    log_message("DISPLAY_AVL");
    log_message("AVL Tree (Inorder):");
    inorderTraversal(root);
    log_step_end();
}

int main() {
    log_init();
    
    log_step_start();
    log_message("=== AVL TREE (SELF-BALANCING) ===\n");
    log_step_end();
    
    Node* root = NULL;
    
    int values[] = {10, 20, 30, 40, 50, 25};
    int n = sizeof(values) / sizeof(values[0]);
    
    for (int i = 0; i < n; i++) {
        char msg[256];
        log_step_start();
        sprintf(msg, "\n--- Inserting %d ---", values[i]);
        log_message(msg);
        log_step_end();
        root = insert(root, values[i]);
    }
    
    log_step_start();
    log_message("\n--- Final AVL Tree ---");
    log_step_end();
    displayTree(root);
    
    log_finish();
    return 0;
}
