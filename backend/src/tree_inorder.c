#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

// Inorder Traversal: Left -> Root -> Right
// For BST, this gives sorted order

typedef struct Node {
    int data;
    struct Node* left;
    struct Node* right;
} Node;

Node* createNode(int data) {
    Node* node = (Node*)malloc(sizeof(Node));
    node->data = data;
    node->left = NULL;
    node->right = NULL;
    return node;
}

void inorderTraversal(Node* root, int* tree, int size) {
    if (root == NULL) return;
    
    log_step_start();
    log_array("TreeStructure", tree, size);
    char msg[128];
    sprintf(msg, "Visit Left subtree of %d", root->data);
    log_message(msg);
    log_step_end();
    
    // Left
    inorderTraversal(root->left, tree, size);
    
    // Root
    log_step_start();
    log_array("TreeStructure", tree, size);
    sprintf(msg, "Process node: %d", root->data);
    log_message(msg);
    log_step_end();
    
    log_step_start();
    log_array("TreeStructure", tree, size);
    sprintf(msg, "Visit Right subtree of %d", root->data);
    log_message(msg);
    log_step_end();
    
    // Right
    inorderTraversal(root->right, tree, size);
}

int main(int argc, char* argv[]) {
    log_init();
    
    // Create sample BST:
    //       4
    //     /   \
    //    2     6
    //   / \   / \
    //  1   3 5   7
    
    int tree[] = {4, 2, 6, 1, 3, 5, 7};
    int n = 7;
    
    Node* root = createNode(4);
    root->left = createNode(2);
    root->right = createNode(6);
    root->left->left = createNode(1);
    root->left->right = createNode(3);
    root->right->left = createNode(5);
    root->right->right = createNode(7);
    
    log_step_start();
    log_array("TreeStructure", tree, n);
    log_message("Inorder Traversal: Left -> Root -> Right");
    log_message("For BST, gives sorted order: 1, 2, 3, 4, 5, 6, 7");
    log_step_end();
    
    inorderTraversal(root, tree, n);
    
    log_step_start();
    log_array("TreeStructure", tree, n);
    log_message("Inorder traversal complete!");
    log_step_end();
    
    log_finish();
    return 0;
}
