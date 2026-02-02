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
    log_step_start();
    log_message("LINEAR_PROBE_INSERT");
    
    int index = hashFunction(key);
    int originalIndex = index;
    int probeCount = 0;
    char msg[256];
    
    sprintf(msg, "Inserting key=%d, value=%d", key, value);
    log_message(msg);
    sprintf(msg, "Hash function: %d %% %d = %d", key, TABLE_SIZE, index);
    log_message(msg);
    
    while (ht->keys[index] != EMPTY && ht->keys[index] != DELETED) {
        if (ht->keys[index] == key) {
            log_message("Key already exists, updating value");
            ht->values[index] = value;
            log_step_end();
    log_message("LINEAR_PROBE_INSERT");
            return;
        }
        
        probeCount++;
        sprintf(msg, "Collision at index %d, probing...", index);
        log_message(msg);
        index = (index + 1) % TABLE_SIZE;
        
        if (index == originalIndex) {
            log_message("Table is full!");
            log_step_end();
    log_message("LINEAR_PROBE_INSERT");
            return;
        }
    }
    
    ht->keys[index] = key;
    ht->values[index] = value;
    sprintf(msg, "Inserted at index %d after %d probes", index, probeCount);
    log_message(msg);
    
    log_step_end();
    log_message("LINEAR_PROBE_INSERT");
}

int search(HashTable* ht, int key) {
    log_step_start();
    log_message("LINEAR_PROBE_SEARCH");
    
    int index = hashFunction(key);
    int originalIndex = index;
    int probeCount = 0;
    char msg[256];
    
    sprintf(msg, "Searching for key=%d", key);
    log_message(msg);
    sprintf(msg, "Starting at index: %d", index);
    log_message(msg);
    
    while (ht->keys[index] != EMPTY) {
        probeCount++;
        
        if (ht->keys[index] == key) {
            sprintf(msg, "Found after %d probes: value=%d", probeCount, ht->values[index]);
            log_message(msg);
            log_step_end();
    log_message("LINEAR_PROBE_SEARCH");
            return ht->values[index];
        }
        
        sprintf(msg, "Probe %d: index %d (key=%d) - not a match", probeCount, index, ht->keys[index]);
        log_message(msg);
        index = (index + 1) % TABLE_SIZE;
        
        if (index == originalIndex) {
            break;
        }
    }
    
    sprintf(msg, "Key not found after %d probes", probeCount);
    log_message(msg);
    log_step_end();
    log_message("LINEAR_PROBE_SEARCH");
    return -1;
}

void deleteKey(HashTable* ht, int key) {
    log_step_start();
    log_message("LINEAR_PROBE_DELETE");
    
    int index = hashFunction(key);
    int originalIndex = index;
    char msg[256];
    
    sprintf(msg, "Deleting key=%d", key);
    log_message(msg);
    
    while (ht->keys[index] != EMPTY) {
        if (ht->keys[index] == key) {
            ht->keys[index] = DELETED;
            ht->values[index] = DELETED;
            sprintf(msg, "Deleted key=%d at index %d (marked as DELETED)", key, index);
            log_message(msg);
            log_step_end();
    log_message("LINEAR_PROBE_DELETE");
            return;
        }
        
        index = (index + 1) % TABLE_SIZE;
        
        if (index == originalIndex) {
            break;
        }
    }
    
    sprintf(msg, "Key %d not found", key);
    log_message(msg);
    log_step_end();
    log_message("LINEAR_PROBE_DELETE");
}

void display(HashTable* ht) {
    log_step_start();
    log_message("HASH_DISPLAY");
    
    log_message("\nHash Table (Closed Hashing - Linear Probing):");
    char msg[256];
    
    for (int i = 0; i < TABLE_SIZE; i++) {
        if (ht->keys[i] == EMPTY) {
            sprintf(msg, "[%d]: (empty)", i);
            log_message(msg);
        } else if (ht->keys[i] == DELETED) {
            sprintf(msg, "[%d]: (deleted)", i);
            log_message(msg);
        } else {
            sprintf(msg, "[%d]: key=%d, value=%d", i, ht->keys[i], ht->values[i]);
            log_message(msg);
        }
    }
    
    log_step_end();
    log_message("HASH_DISPLAY");
}

int main() {
    log_init();
    
    log_step_start();
    log_message("=== CLOSED HASHING - LINEAR PROBING ===\n");
    log_step_end();
    
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
    
    log_message("\n--- Deleting ---");
    deleteKey(&ht, 25);
    display(&ht);
    
    log_message("\n--- Inserting after deletion ---");
    insert(&ht, 55, 600);
    display(&ht);
    
    log_finish();
    return 0;
}
