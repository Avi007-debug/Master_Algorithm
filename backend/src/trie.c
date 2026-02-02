#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

#define MAX_CHILDREN 256

typedef struct TrieNode {
    struct TrieNode* children[MAX_CHILDREN];
    int isEndOfWord;
} TrieNode;

TrieNode* createNode() {
    TrieNode* node = (TrieNode*)malloc(sizeof(TrieNode));
    node->isEndOfWord = 0;
    
    for (int i = 0; i < MAX_CHILDREN; i++) {
        node->children[i] = NULL;
    }
    
    return node;
}

void insert(TrieNode* root, const char* word) {
    log_step_start();
    log_message("TRIE_INSERT");
    char msg[256];
    sprintf(msg, "Inserting word: '%s'", word);
    log_message(msg);
    
    TrieNode* current = root;
    
    for (int i = 0; word[i] != '\0'; i++) {
        int index = (int)word[i];
        
        if (current->children[index] == NULL) {
            current->children[index] = createNode();
            sprintf(msg, "Created new node for character '%c'", word[i]);
            log_message(msg);
        } else {
            sprintf(msg, "Node exists for character '%c'", word[i]);
            log_message(msg);
        }
        
        current = current->children[index];
    }
    
    current->isEndOfWord = 1;
    log_message("Marked end of word");
    log_step_end();
}

int search(TrieNode* root, const char* word) {
    log_step_start();
    log_message("TRIE_SEARCH");
    char msg[256];
    sprintf(msg, "Searching for word: '%s'", word);
    log_message(msg);
    
    TrieNode* current = root;
    
    for (int i = 0; word[i] != '\0'; i++) {
        int index = (int)word[i];
        
        if (current->children[index] == NULL) {
            sprintf(msg, "Character '%c' not found - word doesn't exist", word[i]);
            log_message(msg);
            log_step_end();
            return 0;
        }
        
        sprintf(msg, "Found character '%c'", word[i]);
        log_message(msg);
        current = current->children[index];
    }
    
    int found = (current != NULL && current->isEndOfWord);
    sprintf(msg, "Search result: %s", found ? "FOUND" : "NOT FOUND");
    log_message(msg);
    log_step_end();
    
    return found;
}

int startsWith(TrieNode* root, const char* prefix) {
    log_step_start();
    log_message("TRIE_STARTS_WITH");
    char msg[256];
    sprintf(msg, "Checking prefix: '%s'", prefix);
    log_message(msg);
    
    TrieNode* current = root;
    
    for (int i = 0; prefix[i] != '\0'; i++) {
        int index = (int)prefix[i];
        
        if (current->children[index] == NULL) {
            log_message("Prefix not found");
            log_step_end();
            return 0;
        }
        
        current = current->children[index];
    }
    
    log_message("Prefix exists");
    log_step_end();
    return 1;
}

int main() {
    log_init();
    
    log_step_start();
    log_message("=== TRIE DATA STRUCTURE ===\n");
    log_step_end();
    
    TrieNode* root = createNode();
    
    log_step_start();
    log_message("--- Inserting Words ---");
    log_step_end();
    insert(root, "hello");
    insert(root, "world");
    insert(root, "help");
    insert(root, "heap");
    
    log_step_start();
    log_message("\n--- Searching Words ---");
    log_step_end();
    search(root, "hello");
    search(root, "help");
    search(root, "hell");
    search(root, "world");
    
    log_step_start();
    log_message("\n--- Checking Prefixes ---");
    log_step_end();
    startsWith(root, "hel");
    startsWith(root, "wor");
    startsWith(root, "xyz");
    
    log_finish();
    return 0;
}
