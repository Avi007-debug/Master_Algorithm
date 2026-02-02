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

int hash1(int key) {
    return key % TABLE_SIZE;
}

int hash2(int key) {
    // Second hash function: must never return 0
    return 7 - (key % 7);
}

void initHashTable(HashTable* ht) {
    for (int i = 0; i < TABLE_SIZE; i++) {
        ht->keys[i] = EMPTY;
        ht->values[i] = EMPTY;
    }
}

void insert(HashTable* ht, int key, int value) {
    log_step_start();
    log_message("DOUBLE_HASH_INSERT");
    
    int h1 = hash1(key);
    int h2 = hash2(key);
    int index = h1;
    int i = 0;
    char msg[256];
    
    sprintf(msg, "Inserting key=%d, value=%d", key, value);
    log_message(msg);
    sprintf(msg, "hash1(%d) = %d", key, h1);
    log_message(msg);
    sprintf(msg, "hash2(%d) = %d", key, h2);
    log_message(msg);
    
    while (ht->keys[index] != EMPTY && ht->keys[index] != DELETED && i < TABLE_SIZE) {
        if (ht->keys[index] == key) {
            log_message("Key already exists, updating value");
            ht->values[index] = value;
            log_step_end();
            log_message("DOUBLE_HASH_INSERT");
            return;
        }
        
        i++;
        sprintf(msg, "Collision at index %d, double hashing with i=%d", index, i);
        log_message(msg);
        index = (h1 + i * h2) % TABLE_SIZE;
        sprintf(msg, "New index: (%d + %d*%d) %% %d = %d", h1, i, h2, TABLE_SIZE, index);
        log_message(msg);
    }
    
    if (i >= TABLE_SIZE) {
        log_message("Table is full!");
        log_step_end();
        log_message("DOUBLE_HASH_INSERT");
        return;
    }
    
    ht->keys[index] = key;
    ht->values[index] = value;
    sprintf(msg, "Inserted at index %d after %d probes", index, i);
    log_message(msg);
    
    log_step_end();
    log_message("DOUBLE_HASH_INSERT");
}

int search(HashTable* ht, int key) {
    log_step_start();
    log_message("DOUBLE_HASH_SEARCH");
    
    int h1 = hash1(key);
    int h2 = hash2(key);
    int index = h1;
    int i = 0;
    
    char msg[256];
    sprintf(msg, "Searching for key=%d", key);
    log_message(msg);
    sprintf(msg, "hash1(%d) = %d, hash2(%d) = %d", key, h1, key, h2);
    log_message(msg);
    
    while (ht->keys[index] != EMPTY && i < TABLE_SIZE) {
        if (ht->keys[index] == key) {
            sprintf(msg, "Found after %d probes: value=%d", i + 1, ht->values[index]);
            log_message(msg);
            log_step_end();
            log_message("DOUBLE_HASH_SEARCH");
            return ht->values[index];
        }
        
        i++;
        sprintf(msg, "Probe %d: checking index %d", i, index);
        log_message(msg);
        index = (h1 + i * h2) % TABLE_SIZE;
    }
    
    sprintf(msg, "Key not found after %d probes", i);
    log_message(msg);
    log_step_end();
    log_message("DOUBLE_HASH_SEARCH");
    return -1;
}

void display(HashTable* ht) {
    log_step_start();
    log_message("HASH_DISPLAY");
    
    log_message("\nHash Table (Closed Hashing - Double Hashing):");
    
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
    log_message("=== CLOSED HASHING - DOUBLE HASHING ===\n");
    log_message("Formula: h(k, i) = (h1(k) + i*h2(k)) mod TableSize");
    char msg[256];
    sprintf(msg, "h1(k) = k mod %d", TABLE_SIZE);
    log_message(msg);
    log_message("h2(k) = 7 - (k mod 7)\n");
    log_step_end();
    
    HashTable ht;
    initHashTable(&ht);
    
    int keys[] = {15, 25, 35, 5, 45, 12};
    int values[] = {100, 200, 300, 400, 500, 600};
    int n = sizeof(keys) / sizeof(keys[0]);
    
    log_message("--- Inserting Elements ---");
    for (int i = 0; i < n; i++) {
        insert(&ht, keys[i], values[i]);
    }
    
    display(&ht);
    
    log_message("\n--- Searching ---");
    search(&ht, 35);
    search(&ht, 100);
    
    log_step_start();
    log_message("\n--- Collision Resolution Comparison ---");
    log_message("Linear:    h(k,i) = (h(k) + i) - Primary clustering");
    log_message("Quadratic: h(k,i) = (h(k) + i²) - Secondary clustering");
    log_message("Double:    h(k,i) = (h1(k) + i*h2(k)) - Minimal clustering!");
    log_step_end();
    
    log_finish();
    return 0;
}
