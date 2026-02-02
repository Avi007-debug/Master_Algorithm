#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

#define ORDER 3  // Minimum degree (minimum children = ORDER, max = 2*ORDER)

typedef struct BPlusNode {
    int* keys;
    struct BPlusNode** children;
    struct BPlusNode* next; // For leaf nodes
    int numKeys;
    int isLeaf;
} BPlusNode;

BPlusNode* createNode(int isLeaf) {
    BPlusNode* node = (BPlusNode*)malloc(sizeof(BPlusNode));
    node->keys = (int*)malloc(sizeof(int) * (2 * ORDER - 1));
    node->children = (BPlusNode**)malloc(sizeof(BPlusNode*) * (2 * ORDER));
    node->numKeys = 0;
    node->isLeaf = isLeaf;
    node->next = NULL;
    
    for (int i = 0; i < 2 * ORDER; i++) {
        node->children[i] = NULL;
    }
    
    return node;
}

void insertNonFull(BPlusNode* node, int key) {
    int i = node->numKeys - 1;
    
    if (node->isLeaf) {
        // Insert key in sorted order
        while (i >= 0 && node->keys[i] > key) {
            node->keys[i + 1] = node->keys[i];
            i--;
        }
        node->keys[i + 1] = key;
        node->numKeys++;
        
        log_message("Inserted %d in leaf node", key);
    } else {
        // Find child to insert
        while (i >= 0 && node->keys[i] > key) {
            i--;
        }
        i++;
        
        insertNonFull(node->children[i], key);
    }
}

BPlusNode* insert(BPlusNode* root, int key) {
    log_step_start("BPLUS_INSERT");
    log_message("Inserting key: %d", key);
    
    if (root == NULL) {
        root = createNode(1);
        root->keys[0] = key;
        root->numKeys = 1;
        log_message("Created root with key %d", key);
        log_step_end("BPLUS_INSERT");
        return root;
    }
    
    // If root is not full, insert
    if (root->numKeys < 2 * ORDER - 1) {
        insertNonFull(root, key);
    } else {
        log_message("Root is full, would split here (simplified implementation)");
    }
    
    log_step_end("BPLUS_INSERT");
    return root;
}

void search(BPlusNode* root, int key) {
    log_step_start("BPLUS_SEARCH");
    log_message("Searching for key: %d", key);
    
    if (root == NULL) {
        log_message("Tree is empty");
        log_step_end("BPLUS_SEARCH");
        return;
    }
    
    BPlusNode* current = root;
    
    while (current != NULL) {
        int i = 0;
        
        // Find position
        while (i < current->numKeys && key > current->keys[i]) {
            i++;
        }
        
        // Check if key found
        if (i < current->numKeys && key == current->keys[i]) {
            if (current->isLeaf) {
                log_message("Key %d FOUND in leaf node", key);
                log_step_end("BPLUS_SEARCH");
                return;
            }
        }
        
        // If leaf, key not found
        if (current->isLeaf) {
            log_message("Key %d NOT FOUND", key);
            log_step_end("BPLUS_SEARCH");
            return;
        }
        
        // Go to appropriate child
        log_message("Moving to child at index %d", i);
        current = current->children[i];
    }
    
    log_step_end("BPLUS_SEARCH");
}

void displayNode(BPlusNode* node, int level) {
    if (node == NULL) return;
    
    char keys[256] = "[";
    for (int i = 0; i < node->numKeys; i++) {
        char temp[20];
        sprintf(temp, "%d", node->keys[i]);
        strcat(keys, temp);
        if (i < node->numKeys - 1) strcat(keys, ", ");
    }
    strcat(keys, "]");
    
    log_message("Level %d (%s): %s", level, node->isLeaf ? "leaf" : "internal", keys);
    
    if (!node->isLeaf) {
        for (int i = 0; i <= node->numKeys; i++) {
            if (node->children[i] != NULL) {
                displayNode(node->children[i], level + 1);
            }
        }
    }
}

void display(BPlusNode* root) {
    log_step_start("BPLUS_DISPLAY");
    log_message("B+ Tree structure:");
    displayNode(root, 0);
    log_step_end("BPLUS_DISPLAY");
}

int main() {
    log_init();
    
    log_message("=== B+ TREE (SIMPLIFIED) ===\n");
    log_message("Note: This is a simplified B+ Tree for demonstration\n");
    
    BPlusNode* root = NULL;
    
    int values[] = {10, 20, 5, 6, 12, 30, 7, 17};
    int n = sizeof(values) / sizeof(values[0]);
    
    for (int i = 0; i < n; i++) {
        log_message("\n--- Inserting %d ---", values[i]);
        root = insert(root, values[i]);
    }
    
    log_message("\n--- Tree Structure ---");
    display(root);
    
    log_message("\n--- Searching ---");
    search(root, 12);
    search(root, 15);
    
    return 0;
}
