#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

#define TABLE_SIZE 10

typedef struct Node {
    int key;
    int value;
    struct Node* next;
} Node;

typedef struct {
    Node* buckets[TABLE_SIZE];
} HashTable;

int hashFunction(int key) {
    return key % TABLE_SIZE;
}

Node* createNode(int key, int value) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->key = key;
    newNode->value = value;
    newNode->next = NULL;
    return newNode;
}

void initHashTable(HashTable* ht) {
    for (int i = 0; i < TABLE_SIZE; i++) {
        ht->buckets[i] = NULL;
    }
}

void insert(HashTable* ht, int key, int value) {
    log_step_start();
    log_message("HASH_INSERT");
    
    int index = hashFunction(key);
    char msg[256];
    sprintf(msg, "Inserting key=%d, value=%d", key, value);
    log_message(msg);
    sprintf(msg, "Hash function: %d %% %d = %d", key, TABLE_SIZE, index);
    log_message(msg);
    
    Node* newNode = createNode(key, value);
    
    // Insert at beginning of chain
    if (ht->buckets[index] == NULL) {
        ht->buckets[index] = newNode;
        sprintf(msg, "Created new chain at index %d", index);
        log_message(msg);
    } else {
        sprintf(msg, "Collision! Chaining at index %d", index);
        log_message(msg);
        newNode->next = ht->buckets[index];
        ht->buckets[index] = newNode;
    }
    
    log_step_end();
    log_message("HASH_INSERT");
}

int search(HashTable* ht, int key) {
    log_step_start();
    log_message("HASH_SEARCH");
    
    int index = hashFunction(key);
    char msg[256];
    sprintf(msg, "Searching for key=%d", key);
    log_message(msg);
    sprintf(msg, "Hash index: %d", index);
    log_message(msg);
    
    Node* current = ht->buckets[index];
    int chainLength = 0;
    
    while (current != NULL) {
        chainLength++;
        if (current->key == key) {
            sprintf(msg, "Found after %d comparisons: value=%d", chainLength, current->value);
            log_message(msg);
            log_step_end();
            log_message("HASH_SEARCH");
            return current->value;
        }
        current = current->next;
    }
    
    sprintf(msg, "Key not found (chain length was %d)", chainLength);
    log_message(msg);
    log_step_end();
    log_message("HASH_SEARCH");
    return -1;
}

void deleteKey(HashTable* ht, int key) {
    log_step_start();
    log_message("HASH_DELETE");
    
    int index = hashFunction(key);
    char msg[256];
    sprintf(msg, "Deleting key=%d from index %d", key, index);
    log_message(msg);
    
    Node* current = ht->buckets[index];
    Node* prev = NULL;
    
    while (current != NULL) {
        if (current->key == key) {
            if (prev == NULL) {
                ht->buckets[index] = current->next;
            } else {
                prev->next = current->next;
            }
            sprintf(msg, "Deleted key=%d", key);
            log_message(msg);
            free(current);
            log_step_end();
            log_message("HASH_DELETE");
            return;
        }
        prev = current;
        current = current->next;
    }
    
    sprintf(msg, "Key %d not found", key);
    log_message(msg);
    log_step_end();
    log_message("HASH_DELETE");
}

void display(HashTable* ht) {
    log_step_start();
    log_message("HASH_DISPLAY");
    
    log_message("\nHash Table (Open Hashing - Chaining):");
    
    for (int i = 0; i < TABLE_SIZE; i++) {
        char chain[512];
        sprintf(chain, "[%d]: ", i);
        
        Node* current = ht->buckets[i];
        
        if (current == NULL) {
            strcat(chain, "(empty)");
        } else {
            while (current != NULL) {
                char entry[50];
                sprintf(entry, "(%d:%d) -> ", current->key, current->value);
                strcat(chain, entry);
                current = current->next;
            }
            strcat(chain, "NULL");
        }
        
        log_message(chain);
    }
    
    log_step_end();
    log_message("HASH_DISPLAY");
}

void analyzeLoadFactor(HashTable* ht) {
    log_step_start();
    log_message("ANALYZE_LOAD");
    
    int totalElements = 0;
    int nonEmptyBuckets = 0;
    int maxChainLength = 0;
    
    for (int i = 0; i < TABLE_SIZE; i++) {
        int chainLength = 0;
        Node* current = ht->buckets[i];
        
        while (current != NULL) {
            chainLength++;
            totalElements++;
            current = current->next;
        }
        
        if (chainLength > 0) nonEmptyBuckets++;
        if (chainLength > maxChainLength) maxChainLength = chainLength;
    }
    
    float loadFactor = (float)totalElements / TABLE_SIZE;
    
    log_message("\n--- Hash Table Statistics ---");
    char msg[256];
    sprintf(msg, "Table size: %d", TABLE_SIZE);
    log_message(msg);
    sprintf(msg, "Total elements: %d", totalElements);
    log_message(msg);
    sprintf(msg, "Non-empty buckets: %d", nonEmptyBuckets);
    log_message(msg);
    sprintf(msg, "Max chain length: %d", maxChainLength);
    log_message(msg);
    sprintf(msg, "Load factor: %.2f", loadFactor);
    log_message(msg);
    
    log_step_end();
    log_message("ANALYZE_LOAD");
}

int main() {
    log_init();
    
    log_step_start();
    log_message("=== OPEN HASHING (CHAINING) ===\n");
    log_step_end();
    
    HashTable ht;
    initHashTable(&ht);
    
    // Insert elements
    int keys[] = {15, 25, 35, 5, 45, 12, 22};
    int values[] = {100, 200, 300, 400, 500, 600, 700};
    int n = sizeof(keys) / sizeof(keys[0]);
    
    log_message("--- Inserting Elements ---");
    for (int i = 0; i < n; i++) {
        insert(&ht, keys[i], values[i]);
    }
    
    display(&ht);
    
    log_message("\n--- Searching ---");
    search(&ht, 25);
    search(&ht, 100);
    
    log_message("\n--- Deleting ---");
    deleteKey(&ht, 35);
    display(&ht);
    
    analyzeLoadFactor(&ht);
    
    log_finish();
    return 0;
}
