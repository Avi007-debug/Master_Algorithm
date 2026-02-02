#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

// Preorder Traversal: Root -> Left -> Right
// Used for creating copy of tree, prefix expression

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

void preorderTraversal(Node* root, int* tree, int size) {
    if (root == NULL) return;
    
    // Root
    log_step_start();
    log_array("TreeStructure", tree, size);
    char msg[128];
    sprintf(msg, "Process node: %d", root->data);
    log_message(msg);
    log_step_end();
    
    log_step_start();
    log_array("TreeStructure", tree, size);
    sprintf(msg, "Visit Left subtree of %d", root->data);
    log_message(msg);
    log_step_end();
    
    // Left
    preorderTraversal(root->left, tree, size);
    
    log_step_start();
    log_array("TreeStructure", tree, size);
    sprintf(msg, "Visit Right subtree of %d", root->data);
    log_message(msg);
    log_step_end();
    
    // Right
    preorderTraversal(root->right, tree, size);
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
    log_message("Preorder Traversal: Root -> Left -> Right");
    log_message("Order: 4, 2, 1, 3, 6, 5, 7");
    log_step_end();
    
    preorderTraversal(root, tree, n);
    
    log_step_start();
    log_array("TreeStructure", tree, n);
    log_message("Preorder traversal complete!");
    log_step_end();
    
    log_finish();
    return 0;
}
