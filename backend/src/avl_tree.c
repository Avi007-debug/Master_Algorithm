#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

#define MAX_NODES 500

typedef struct Node {
    int data;
    int height;
    struct Node* left;
    struct Node* right;
} Node;

// Forward declarations
void logTreeState(Node* root, const char* message);
void serializeTree(Node* root, int* arr, int index, int maxSize);
int calculateTreeSize(Node* root, int index);

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
    char msg[256];
    sprintf(msg, "RIGHT ROTATION at node %d (balance factor > 1)", y->data);
    logTreeState(y, msg);
    
    Node* x = y->left;
    Node* T2 = x->right;
    
    x->right = y;
    y->left = T2;
    
    y->height = max(height(y->left), height(y->right)) + 1;
    x->height = max(height(x->left), height(x->right)) + 1;
    
    sprintf(msg, "✓ Rotation complete - New root: %d", x->data);
    logTreeState(x, msg);
    
    return x;
}

Node* leftRotate(Node* x) {
    char msg[256];
    sprintf(msg, "LEFT ROTATION at node %d (balance factor < -1)", x->data);
    logTreeState(x, msg);
    
    Node* y = x->right;
    Node* T2 = y->left;
    
    y->left = x;
    x->right = T2;
    
    x->height = max(height(x->left), height(x->right)) + 1;
    y->height = max(height(y->left), height(y->right)) + 1;
    
    sprintf(msg, "✓ Rotation complete - New root: %d", y->data);
    logTreeState(y, msg);
    
    return y;
}

Node* insert(Node* node, int data) {
    char msg[256];

    // Normal BST insertion
    if (node == NULL) {
        sprintf(msg, "Inserting new node: %d", data);
        // log_message(msg);
        return createNode(data);
    }
    
    if (data < node->data) {
        sprintf(msg, "%d < %d, going left", data, node->data);
        // log_message(msg);
        node->left = insert(node->left, data);
    } else if (data > node->data) {
        sprintf(msg, "%d > %d, going right", data, node->data);
        // log_message(msg);
        node->right = insert(node->right, data);
    } else {
        sprintf(msg, "%d already exists", data);
        // log_message(msg);
        return node;
    }
    
    // Update height
    node->height = 1 + max(height(node->left), height(node->right));
    
    // Get balance factor
    int balance = getBalance(node);
    sprintf(msg, "Node %d: height=%d, balance=%d", node->data, node->height, balance);
    // log_message(msg);
    
    // Left Left Case
    if (balance > 1 && data < node->left->data) {
        sprintf(msg, "LL Case detected at node %d", node->data);
        // log_message(msg);
        return rightRotate(node);
    }
    
    // Right Right Case
    if (balance < -1 && data > node->right->data) {
        sprintf(msg, "RR Case detected at node %d", node->data);
        // log_message(msg);
        return leftRotate(node);
    }
    
    // Left Right Case
    if (balance > 1 && data > node->left->data) {
        sprintf(msg, "LR Case detected at node %d", node->data);
        // log_message(msg);
        node->left = leftRotate(node->left);
        return rightRotate(node);
    }
    
    // Right Left Case
    if (balance < -1 && data < node->right->data) {
        sprintf(msg, "RL Case detected at node %d", node->data);
        // log_message(msg);
        node->right = rightRotate(node->right);
        return leftRotate(node);
    }
    
    sprintf(msg, "Node %d is balanced", node->data);
    // log_message(msg);
    return node;
}

void serializeTree(Node* root, int* arr, int index, int maxSize) {
    if (index >= maxSize) return;
    if (root == NULL) {
        arr[index] = -999;
        return;
    }
    arr[index] = root->data;
    serializeTree(root->left, arr, 2*index + 1, maxSize);
    serializeTree(root->right, arr, 2*index + 2, maxSize);
}

int calculateTreeSize(Node* root, int index) {
    if (root == NULL) return index;
    int maxIdx = index;
    int leftMax = calculateTreeSize(root->left, 2*index + 1);
    int rightMax = calculateTreeSize(root->right, 2*index + 2);
    if (leftMax > maxIdx) maxIdx = leftMax;
    if (rightMax > maxIdx) maxIdx = rightMax;
    return maxIdx;
}

void logTreeState(Node* root, const char* message) {
    int tree_array[MAX_NODES];
    for(int i = 0; i < MAX_NODES; i++) tree_array[i] = -999;
    
    serializeTree(root, tree_array, 0, MAX_NODES);
    int size = root ? calculateTreeSize(root, 0) + 1 : 0;
    if (size > MAX_NODES) size = MAX_NODES;
    
    log_step_start();
    if (size > 0) {
        log_array("TreeStructure", tree_array, size);
    }
    log_message(message);
    log_step_end();
}

void inorderTraversal(Node* root) {
    if (root != NULL) {
        inorderTraversal(root->left);
        inorderTraversal(root->right);
    }
}

int main(int argc, char* argv[]) {
    log_init();
    
    // Parse input
    int values[MAX_NODES];
    int n = 0;
    
    if (argc > 1) {
        if (argc > 2) {
            for (int i = 1; i < argc && n < MAX_NODES; i++) {
                values[n++] = atoi(argv[i]);
            }
        } else {
            char* token = strtok(argv[1], ", ");
            while (token && n < MAX_NODES) {
                values[n++] = atoi(token);
                token = strtok(NULL, ", ");
            }
        }
    } else {
        int defaults[] = {10, 20, 30, 40, 50, 25};
        n = 6;
        for(int i = 0; i < n; i++) values[i] = defaults[i];
    }
    
    // Validate input size
    if (n > 20) {
        log_step_start();
        log_message("❌ Error: Too many values! Maximum 20 values allowed for clear visualization");
        log_step_end();
        log_finish();
        return 1;
    }
    
    logTreeState(NULL, "Starting with empty AVL tree");
    
    Node* root = NULL;
    
    for (int i = 0; i < n; i++) {
        char msg[256];
        sprintf(msg, "Inserting %d into AVL tree", values[i]);
        logTreeState(root, msg);
        
        root = insert(root, values[i]);
        
        sprintf(msg, "✓ Inserted %d - Tree remains balanced", values[i]);
        logTreeState(root, msg);
    }
    
    logTreeState(root, "Final AVL tree - All nodes balanced!");
    
    log_finish();
    return 0;
}