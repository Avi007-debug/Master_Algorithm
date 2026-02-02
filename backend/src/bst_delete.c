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

Node* findMin(Node* root) {
    while (root->left != NULL) {
        root = root->left;
    }
    return root;
}

Node* deleteNode(Node* root, int data) {
    log_step_start("DELETE_BST");
    
    if (root == NULL) {
        log_message("Value %d not found", data);
        log_step_end("DELETE_BST");
        return root;
    }
    
    if (data < root->data) {
        log_message("%d < %d, going left", data, root->data);
        root->left = deleteNode(root->left, data);
    } else if (data > root->data) {
        log_message("%d > %d, going right", data, root->data);
        root->right = deleteNode(root->right, data);
    } else {
        log_message("Found node to delete: %d", data);
        
        // Case 1: Leaf node (no children)
        if (root->left == NULL && root->right == NULL) {
            log_message("Case: Leaf node - simply deleting");
            free(root);
            log_step_end("DELETE_BST");
            return NULL;
        }
        // Case 2: One child (right)
        else if (root->left == NULL) {
            log_message("Case: One child (right) - replacing with right child");
            Node* temp = root->right;
            free(root);
            log_step_end("DELETE_BST");
            return temp;
        }
        // Case 2: One child (left)
        else if (root->right == NULL) {
            log_message("Case: One child (left) - replacing with left child");
            Node* temp = root->left;
            free(root);
            log_step_end("DELETE_BST");
            return temp;
        }
        // Case 3: Two children
        else {
            log_message("Case: Two children - finding inorder successor");
            Node* temp = findMin(root->right);
            log_message("Inorder successor: %d", temp->data);
            root->data = temp->data;
            log_message("Replaced %d with %d", data, temp->data);
            log_message("Now deleting successor from right subtree");
            root->right = deleteNode(root->right, temp->data);
        }
    }
    
    log_step_end("DELETE_BST");
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
    if (root == NULL) {
        log_message("Tree is empty");
    } else {
        log_message("Inorder Traversal:");
        inorderTraversal(root);
    }
    log_step_end("DISPLAY_TREE");
}

int main() {
    log_init();
    
    log_message("=== BINARY SEARCH TREE - DELETE ===\n");
    
    Node* root = NULL;
    int values[] = {50, 30, 70, 20, 40, 60, 80};
    int n = sizeof(values) / sizeof(values[0]);
    
    log_message("Building BST:");
    for (int i = 0; i < n; i++) {
        root = insert(root, values[i]);
    }
    displayTree(root);
    
    // Test deletions
    log_message("\n--- Deleting leaf node 20 ---");
    root = deleteNode(root, 20);
    displayTree(root);
    
    log_message("\n--- Deleting node with one child: 30 ---");
    root = deleteNode(root, 30);
    displayTree(root);
    
    log_message("\n--- Deleting node with two children: 50 ---");
    root = deleteNode(root, 50);
    displayTree(root);
    
    return 0;
}
