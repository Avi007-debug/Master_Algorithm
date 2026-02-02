#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

// Postorder Traversal: Left -> Right -> Root
// Used for deleting tree, postfix expression evaluation

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

void postorderTraversal(Node* root, int* tree, int size) {
    if (root == NULL) return;
    
    log_step_start();
    log_array("TreeStructure", tree, size);
    char msg[128];
    sprintf(msg, "Visit Left subtree of %d", root->data);
    log_message(msg);
    log_step_end();
    
    // Left
    postorderTraversal(root->left, tree, size);
    
    log_step_start();
    log_array("TreeStructure", tree, size);
    sprintf(msg, "Visit Right subtree of %d", root->data);
    log_message(msg);
    log_step_end();
    
    // Right
    postorderTraversal(root->right, tree, size);
    
    // Root
    log_step_start();
    log_array("TreeStructure", tree, size);
    sprintf(msg, "Process node: %d", root->data);
    log_message(msg);
    log_step_end();
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
    log_message("Postorder Traversal: Left -> Right -> Root");
    log_message("Order: 1, 3, 2, 5, 7, 6, 4");
    log_step_end();
    
    postorderTraversal(root, tree, n);
    
    log_step_start();
    log_array("TreeStructure", tree, n);
    log_message("Postorder traversal complete!");
    log_step_end();
    
    log_finish();
    return 0;
}
