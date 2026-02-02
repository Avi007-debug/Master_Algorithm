#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

typedef struct Node {
    int data;
    struct Node* left;
    struct Node* right;
    struct Node* parent;
} Node;

Node* createNode(int data) {
    Node* node = (Node*)malloc(sizeof(Node));
    node->data = data;
    node->left = NULL;
    node->right = NULL;
    node->parent = NULL;
    return node;
}

Node* rightRotate(Node* node) {
    log_message("Right rotation (Zig) at node %d", node->data);
    Node* leftChild = node->left;
    node->left = leftChild->right;
    
    if (leftChild->right != NULL) {
        leftChild->right->parent = node;
    }
    
    leftChild->right = node;
    leftChild->parent = node->parent;
    node->parent = leftChild;
    
    return leftChild;
}

Node* leftRotate(Node* node) {
    log_message("Left rotation (Zig) at node %d", node->data);
    Node* rightChild = node->right;
    node->right = rightChild->left;
    
    if (rightChild->left != NULL) {
        rightChild->left->parent = node;
    }
    
    rightChild->left = node;
    rightChild->parent = node->parent;
    node->parent = rightChild;
    
    return rightChild;
}

Node* splay(Node* root, int key) {
    log_step_start("SPLAY");
    log_message("Splaying key %d to root", key);
    
    if (root == NULL || root->data == key) {
        if (root != NULL) {
            log_message("Key %d is already root", key);
        }
        log_step_end("SPLAY");
        return root;
    }
    
    // Key lies in left subtree
    if (key < root->data) {
        if (root->left == NULL) {
            log_message("Key %d not found", key);
            log_step_end("SPLAY");
            return root;
        }
        
        // Zig-Zig (Left Left)
        if (key < root->left->data) {
            log_message("Zig-Zig (LL) case");
            root->left->left = splay(root->left->left, key);
            root = rightRotate(root);
        }
        // Zig-Zag (Left Right)
        else if (key > root->left->data) {
            log_message("Zig-Zag (LR) case");
            root->left->right = splay(root->left->right, key);
            if (root->left->right != NULL) {
                root->left = leftRotate(root->left);
            }
        }
        
        log_step_end("SPLAY");
        return (root->left == NULL) ? root : rightRotate(root);
    }
    // Key lies in right subtree
    else {
        if (root->right == NULL) {
            log_message("Key %d not found", key);
            log_step_end("SPLAY");
            return root;
        }
        
        // Zig-Zag (Right Left)
        if (key < root->right->data) {
            log_message("Zig-Zag (RL) case");
            root->right->left = splay(root->right->left, key);
            if (root->right->left != NULL) {
                root->right = rightRotate(root->right);
            }
        }
        // Zig-Zig (Right Right)
        else if (key > root->right->data) {
            log_message("Zig-Zig (RR) case");
            root->right->right = splay(root->right->right, key);
            root = leftRotate(root);
        }
        
        log_step_end("SPLAY");
        return (root->right == NULL) ? root : leftRotate(root);
    }
}

Node* insert(Node* root, int key) {
    log_step_start("SPLAY_INSERT");
    log_message("Inserting key: %d", key);
    
    if (root == NULL) {
        log_message("Created root node: %d", key);
        log_step_end("SPLAY_INSERT");
        return createNode(key);
    }
    
    // Splay the tree to bring closest node to root
    root = splay(root, key);
    
    if (root->data == key) {
        log_message("Key %d already exists", key);
        log_step_end("SPLAY_INSERT");
        return root;
    }
    
    Node* newNode = createNode(key);
    
    if (key < root->data) {
        newNode->right = root;
        newNode->left = root->left;
        root->left = NULL;
        if (newNode->left != NULL) {
            newNode->left->parent = newNode;
        }
        root->parent = newNode;
    } else {
        newNode->left = root;
        newNode->right = root->right;
        root->right = NULL;
        if (newNode->right != NULL) {
            newNode->right->parent = newNode;
        }
        root->parent = newNode;
    }
    
    log_message("Inserted %d as new root", key);
    log_step_end("SPLAY_INSERT");
    return newNode;
}

void inorder(Node* root) {
    if (root != NULL) {
        inorder(root->left);
        log_message("Node: %d", root->data);
        inorder(root->right);
    }
}

void display(Node* root) {
    log_step_start("DISPLAY_SPLAY");
    log_message("Splay Tree (Inorder):");
    inorder(root);
    log_message("Current root: %d", root ? root->data : -1);
    log_step_end("DISPLAY_SPLAY");
}

int main() {
    log_init();
    
    log_message("=== SPLAY TREE ===\n");
    
    Node* root = NULL;
    
    int values[] = {10, 20, 30, 40, 50};
    int n = sizeof(values) / sizeof(values[0]);
    
    for (int i = 0; i < n; i++) {
        log_message("\n--- Inserting %d ---", values[i]);
        root = insert(root, values[i]);
    }
    
    log_message("\n--- Tree After Insertions ---");
    display(root);
    
    log_message("\n--- Searching for 20 (will splay to root) ---");
    root = splay(root, 20);
    display(root);
    
    return 0;
}
