#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

#define MAX_NODES 100

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

Node* findMin(Node* root) {
    while (root->left != NULL) {
        root = root->left;
    }
    return root;
}

Node* deleteNode(Node* root, int data) {
    if (root == NULL) {
        return root;
    }
    
    if (data < root->data) {
        root->left = deleteNode(root->left, data);
    } else if (data > root->data) {
        root->right = deleteNode(root->right, data);
    } else {
        // Node found - handle 3 cases
        if (root->left == NULL && root->right == NULL) {
            // Case 1: Leaf node
            free(root);
            return NULL;
        } else if (root->left == NULL) {
            // Case 2: One child (right)
            Node* temp = root->right;
            free(root);
            return temp;
        } else if (root->right == NULL) {
            // Case 2: One child (left)
            Node* temp = root->left;
            free(root);
            return temp;
        } else {
            // Case 3: Two children - find inorder successor
            Node* temp = findMin(root->right);
            root->data = temp->data;
            root->right = deleteNode(root->right, temp->data);
        }
    }
    
    return root;
}

int main(int argc, char* argv[]) {
    log_init();
    
    // Parse initial values and values to delete
    int values[MAX_NODES];
    int deleteVals[MAX_NODES];
    int n = 0, delCount = 0;
    
    if (argc > 1) {
        if (argc > 2) {
            // First half: values to insert, second half: values to delete
            int mid = (argc - 1) / 2;
            for (int i = 1; i <= mid && n < MAX_NODES; i++) {
                values[n++] = atoi(argv[i]);
            }
            for (int i = mid + 1; i < argc && delCount < MAX_NODES; i++) {
                deleteVals[delCount++] = atoi(argv[i]);
            }
        } else {
            // Single comma-separated: "50,30,70,20,40,60,80|20,30,50"
            char input[1024];
            strncpy(input, argv[1], 1023);
            char* insertPart = strtok(input, "|");
            char* deletePart = strtok(NULL, "|");
            
            if (insertPart) {
                char* token = strtok(insertPart, ", ");
                while (token && n < MAX_NODES) {
                    values[n++] = atoi(token);
                    token = strtok(NULL, ", ");
                }
            }
            
            if (deletePart) {
                char* token = strtok(deletePart, ", ");
                while (token && delCount < MAX_NODES) {
                    deleteVals[delCount++] = atoi(token);
                    token = strtok(NULL, ", ");
                }
            }
        }
    }
    
    // Default values if no input
    if (n == 0) {
        int defaults[] = {50, 30, 70, 20, 40, 60, 80};
        n = 7;
        for(int i = 0; i < n; i++) values[i] = defaults[i];
    }
    if (delCount == 0) {
        int delDefaults[] = {20, 30, 50};
        delCount = 3;
        for(int i = 0; i < delCount; i++) deleteVals[i] = delDefaults[i];
    }
    
    logTreeState(NULL, "Building BST...");
    
    Node* root = NULL;
    for (int i = 0; i < n; i++) {
        root = insert(root, values[i]);
    }
    
    logTreeState(root, "Initial BST constructed");
    
    // Perform deletions
    for (int i = 0; i < delCount; i++) {
        char msg[256];
        sprintf(msg, "Deleting %d from BST", deleteVals[i]);
        logTreeState(root, msg);
        
        root = deleteNode(root, deleteVals[i]);
        
        sprintf(msg, "✓ Deleted %d successfully", deleteVals[i]);
        logTreeState(root, msg);
    }
    
    logTreeState(root, "Final BST after all deletions");
    
    log_finish();
    return 0;
}
