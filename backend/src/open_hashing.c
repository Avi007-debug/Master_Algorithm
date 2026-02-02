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
    log_step_start("HASH_INSERT");
    
    int index = hashFunction(key);
    log_message("Inserting key=%d, value=%d", key, value);
    log_message("Hash function: %d %% %d = %d", key, TABLE_SIZE, index);
    
    Node* newNode = createNode(key, value);
    
    // Insert at beginning of chain
    if (ht->buckets[index] == NULL) {
        ht->buckets[index] = newNode;
        log_message("Created new chain at index %d", index);
    } else {
        log_message("Collision! Chaining at index %d", index);
        newNode->next = ht->buckets[index];
        ht->buckets[index] = newNode;
    }
    
    log_step_end("HASH_INSERT");
}

int search(HashTable* ht, int key) {
    log_step_start("HASH_SEARCH");
    
    int index = hashFunction(key);
    log_message("Searching for key=%d", key);
    log_message("Hash index: %d", index);
    
    Node* current = ht->buckets[index];
    int chainLength = 0;
    
    while (current != NULL) {
        chainLength++;
        if (current->key == key) {
            log_message("Found after %d comparisons: value=%d", chainLength, current->value);
            log_step_end("HASH_SEARCH");
            return current->value;
        }
        current = current->next;
    }
    
    log_message("Key not found (chain length was %d)", chainLength);
    log_step_end("HASH_SEARCH");
    return -1;
}

void deleteKey(HashTable* ht, int key) {
    log_step_start("HASH_DELETE");
    
    int index = hashFunction(key);
    log_message("Deleting key=%d from index %d", key, index);
    
    Node* current = ht->buckets[index];
    Node* prev = NULL;
    
    while (current != NULL) {
        if (current->key == key) {
            if (prev == NULL) {
                ht->buckets[index] = current->next;
            } else {
                prev->next = current->next;
            }
            log_message("Deleted key=%d", key);
            free(current);
            log_step_end("HASH_DELETE");
            return;
        }
        prev = current;
        current = current->next;
    }
    
    log_message("Key %d not found", key);
    log_step_end("HASH_DELETE");
}

void display(HashTable* ht) {
    log_step_start("HASH_DISPLAY");
    
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
        
        log_message("%s", chain);
    }
    
    log_step_end("HASH_DISPLAY");
}

void analyzeLoadFactor(HashTable* ht) {
    log_step_start("ANALYZE_LOAD");
    
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
    log_message("Table size: %d", TABLE_SIZE);
    log_message("Total elements: %d", totalElements);
    log_message("Non-empty buckets: %d", nonEmptyBuckets);
    log_message("Max chain length: %d", maxChainLength);
    log_message("Load factor: %.2f", loadFactor);
    
    log_step_end("ANALYZE_LOAD");
}

int main() {
    log_init();
    
    log_message("=== OPEN HASHING (CHAINING) ===\n");
    
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
    
    return 0;
}
