#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include "../include/logger.h"

#define ALPHABET_SIZE 26

typedef struct TrieNode {
    int id;
    struct TrieNode* children[ALPHABET_SIZE];
    bool isEndOfWord;
    char charValue;
} TrieNode;

int node_id_counter = 0;

TrieNode* create_node(char c) {
    TrieNode* node = (TrieNode*)malloc(sizeof(TrieNode));
    node->id = node_id_counter++;
    node->isEndOfWord = false;
    node->charValue = c;
    for (int i = 0; i < ALPHABET_SIZE; i++) {
        node->children[i] = NULL;
    }
    return node;
}

void insert(TrieNode* root, const char* key) {
    TrieNode* curr = root;
    int len = strlen(key);
    
    log_step_start();
    char msg[128];
    sprintf(msg, "Insert word: '%s'", key);
    log_message(msg);
    log_node(root->id, "Root");
    log_step_end();
    
    for (int level = 0; level < len; level++) {
        int index = key[level] - 'a';
        if (!curr->children[index]) {
            curr->children[index] = create_node(key[level]);
            
            log_step_start();
            char label[8];
            sprintf(label, "%c", key[level]);
            log_node(curr->children[index]->id, label);
            log_edge(curr->id, curr->children[index]->id);
            sprintf(msg, "Create new node for char '%c'", key[level]);
            log_message(msg);
            log_step_end();
        } else {
            log_step_start();
            sprintf(msg, "Char '%c' already exists at this path", key[level]);
            log_message(msg);
            log_step_end();
        }
        
        curr = curr->children[index];
    }
    
    curr->isEndOfWord = true;
    log_step_start();
    sprintf(msg, "Mark node '%c' as end of word", curr->charValue);
    log_message(msg);
    log_step_end();
}

int main(int argc, char* argv[]) {
    log_init();
    
    TrieNode* root = create_node('/');
    
    insert(root, "cat");
    insert(root, "car");
    insert(root, "dog");
    
    log_finish();
    return 0;
}
