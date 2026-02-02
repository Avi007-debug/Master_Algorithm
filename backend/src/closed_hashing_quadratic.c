#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

#define TABLE_SIZE 10
#define EMPTY -1
#define DELETED -2

typedef struct {
    int keys[TABLE_SIZE];
    int values[TABLE_SIZE];
} HashTable;

int hashFunction(int key) {
    return key % TABLE_SIZE;
}

void initHashTable(HashTable* ht) {
    for (int i = 0; i < TABLE_SIZE; i++) {
        ht->keys[i] = EMPTY;
        ht->values[i] = EMPTY;
    }
}

void insert(HashTable* ht, int key, int value) {
    log_step_start("QUADRATIC_PROBE_INSERT");
    
    int index = hashFunction(key);
    int originalIndex = index;
    int i = 0;
    
    log_message("Inserting key=%d, value=%d", key, value);
    log_message("Hash function: %d %% %d = %d", key, TABLE_SIZE, index);
    
    while (ht->keys[index] != EMPTY && ht->keys[index] != DELETED && i < TABLE_SIZE) {
        if (ht->keys[index] == key) {
            log_message("Key already exists, updating value");
            ht->values[index] = value;
            log_step_end("QUADRATIC_PROBE_INSERT");
            return;
        }
        
        i++;
        log_message("Collision at index %d, quadratic probe i=%d", index, i);
        index = (originalIndex + i * i) % TABLE_SIZE;
        log_message("New index: (%d + %d²) %% %d = %d", originalIndex, i, TABLE_SIZE, index);
    }
    
    if (i >= TABLE_SIZE) {
        log_message("Table is full or probing failed!");
        log_step_end("QUADRATIC_PROBE_INSERT");
        return;
    }
    
    ht->keys[index] = key;
    ht->values[index] = value;
    log_message("Inserted at index %d after %d probes", index, i);
    
    log_step_end("QUADRATIC_PROBE_INSERT");
}

int search(HashTable* ht, int key) {
    log_step_start("QUADRATIC_PROBE_SEARCH");
    
    int index = hashFunction(key);
    int originalIndex = index;
    int i = 0;
    
    log_message("Searching for key=%d", key);
    log_message("Starting at index: %d", index);
    
    while (ht->keys[index] != EMPTY && i < TABLE_SIZE) {
        if (ht->keys[index] == key) {
            log_message("Found after %d probes: value=%d", i + 1, ht->values[index]);
            log_step_end("QUADRATIC_PROBE_SEARCH");
            return ht->values[index];
        }
        
        i++;
        log_message("Probe %d: checking index %d", i, index);
        index = (originalIndex + i * i) % TABLE_SIZE;
    }
    
    log_message("Key not found after %d probes", i);
    log_step_end("QUADRATIC_PROBE_SEARCH");
    return -1;
}

void display(HashTable* ht) {
    log_step_start("HASH_DISPLAY");
    
    log_message("\nHash Table (Closed Hashing - Quadratic Probing):");
    
    for (int i = 0; i < TABLE_SIZE; i++) {
        if (ht->keys[i] == EMPTY) {
            log_message("[%d]: (empty)", i);
        } else if (ht->keys[i] == DELETED) {
            log_message("[%d]: (deleted)", i);
        } else {
            log_message("[%d]: key=%d, value=%d", i, ht->keys[i], ht->values[i]);
        }
    }
    
    log_step_end("HASH_DISPLAY");
}

int main() {
    log_init();
    
    log_message("=== CLOSED HASHING - QUADRATIC PROBING ===\n");
    log_message("Formula: h(k, i) = (h(k) + i²) mod TableSize\n");
    
    HashTable ht;
    initHashTable(&ht);
    
    int keys[] = {15, 25, 35, 5, 45};
    int values[] = {100, 200, 300, 400, 500};
    int n = sizeof(keys) / sizeof(keys[0]);
    
    log_message("--- Inserting Elements ---");
    for (int i = 0; i < n; i++) {
        insert(&ht, keys[i], values[i]);
    }
    
    display(&ht);
    
    log_message("\n--- Searching ---");
    search(&ht, 35);
    search(&ht, 100);
    
    log_message("\n--- Comparison with Linear Probing ---");
    log_message("Linear: h(k,i) = (h(k) + i) mod m - can cause clustering");
    log_message("Quadratic: h(k,i) = (h(k) + i²) mod m - reduces clustering");
    
    return 0;
}
