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
    log_step_start("TRIE_INSERT");
    log_message("Inserting word: '%s'", word);
    
    TrieNode* current = root;
    
    for (int i = 0; word[i] != '\0'; i++) {
        int index = (int)word[i];
        
        if (current->children[index] == NULL) {
            current->children[index] = createNode();
            log_message("Created new node for character '%c'", word[i]);
        } else {
            log_message("Node exists for character '%c'", word[i]);
        }
        
        current = current->children[index];
    }
    
    current->isEndOfWord = 1;
    log_message("Marked end of word");
    log_step_end("TRIE_INSERT");
}

int search(TrieNode* root, const char* word) {
    log_step_start("TRIE_SEARCH");
    log_message("Searching for word: '%s'", word);
    
    TrieNode* current = root;
    
    for (int i = 0; word[i] != '\0'; i++) {
        int index = (int)word[i];
        
        if (current->children[index] == NULL) {
            log_message("Character '%c' not found - word doesn't exist", word[i]);
            log_step_end("TRIE_SEARCH");
            return 0;
        }
        
        log_message("Found character '%c'", word[i]);
        current = current->children[index];
    }
    
    int found = (current != NULL && current->isEndOfWord);
    log_message("Search result: %s", found ? "FOUND" : "NOT FOUND");
    log_step_end("TRIE_SEARCH");
    
    return found;
}

int startsWith(TrieNode* root, const char* prefix) {
    log_step_start("TRIE_STARTS_WITH");
    log_message("Checking prefix: '%s'", prefix);
    
    TrieNode* current = root;
    
    for (int i = 0; prefix[i] != '\0'; i++) {
        int index = (int)prefix[i];
        
        if (current->children[index] == NULL) {
            log_message("Prefix not found");
            log_step_end("TRIE_STARTS_WITH");
            return 0;
        }
        
        current = current->children[index];
    }
    
    log_message("Prefix exists");
    log_step_end("TRIE_STARTS_WITH");
    return 1;
}

int main() {
    log_init();
    
    log_message("=== TRIE DATA STRUCTURE ===\n");
    
    TrieNode* root = createNode();
    
    log_message("--- Inserting Words ---");
    insert(root, "hello");
    insert(root, "world");
    insert(root, "help");
    insert(root, "heap");
    
    log_message("\n--- Searching Words ---");
    search(root, "hello");
    search(root, "help");
    search(root, "hell");
    search(root, "world");
    
    log_message("\n--- Checking Prefixes ---");
    startsWith(root, "hel");
    startsWith(root, "wor");
    startsWith(root, "xyz");
    
    return 0;
}
