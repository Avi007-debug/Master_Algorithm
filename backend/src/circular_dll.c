#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

typedef struct Node {
    int data;
    struct Node* next;
    struct Node* prev;
} Node;

Node* createNode(int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->next = NULL;
    newNode->prev = NULL;
    return newNode;
}

void insertAtEnd(Node** head, int data) {
    log_step_start();
    log_message("INSERT_CDLL");
    Node* newNode = createNode(data);
    
    if (*head == NULL) {
        *head = newNode;
        newNode->next = newNode;
        newNode->prev = newNode;
        char msg[256];
        sprintf(msg, "Created first node: %d (bidirectional self-loop)", data);
        log_message(msg);
    } else {
        Node* last = (*head)->prev;
        
        last->next = newNode;
        newNode->prev = last;
        newNode->next = *head;
        (*head)->prev = newNode;
        
        char msg[256];
        sprintf(msg, "Inserted %d at end with bidirectional links", data);
        log_message(msg);
    }
    
    log_step_end();
    log_message("INSERT_CDLL");
}

void deleteNode(Node** head, int value) {
    log_step_start();
    log_message("DELETE_CDLL");
    
    if (*head == NULL) {
        log_message("List is empty");
        log_step_end();
    log_message("DELETE_CDLL");
        return;
    }
    
    Node* current = *head;
    
    // Find the node
    do {
        if (current->data == value) {
            // Only one node
            if (current->next == current) {
                free(current);
                *head = NULL;
                char msg[256];
                sprintf(msg, "Deleted only node: %d", value);
                log_message(msg);
            }
            // Multiple nodes
            else {
                current->prev->next = current->next;
                current->next->prev = current->prev;
                
                if (current == *head) {
                    *head = current->next;
                }
                
                char msg[256];
                sprintf(msg, "Deleted node: %d (updated bidirectional links)", value);
                log_message(msg);
                free(current);
            }
            
            log_step_end();
    log_message("DELETE_CDLL");
            return;
        }
        current = current->next;
    } while (current != *head);
    
    char msg[256];
    sprintf(msg, "Value %d not found", value);
    log_message(msg);
    log_step_end();
    log_message("DELETE_CDLL");
}

void displayForward(Node* head) {
    log_step_start();
    log_message("DISPLAY_FORWARD");
    
    if (head == NULL) {
        log_message("List is empty");
        log_step_end();
    log_message("DISPLAY_FORWARD");
        return;
    }
    
    Node* temp = head;
    int count = 0;
    
    log_message("Forward traversal:");
    do {
        char msg[256];
        sprintf(msg, "[%d] -> %d", count++, temp->data);
        log_message(msg);
        temp = temp->next;
    } while (temp != head);
    
    char msg[256];
    sprintf(msg, "... (back to head: %d)", head->data);
    log_message(msg);
    log_step_end();
    log_message("DISPLAY_FORWARD");
}

void displayBackward(Node* head) {
    log_step_start();
    log_message("DISPLAY_BACKWARD");
    
    if (head == NULL) {
        log_message("List is empty");
        log_step_end();
    log_message("DISPLAY_BACKWARD");
        return;
    }
    
    Node* temp = head->prev; // Start from last node
    int count = 0;
    
    log_message("Backward traversal:");
    do {
        char msg[256];
        sprintf(msg, "[%d] <- %d", count++, temp->data);
        log_message(msg);
        temp = temp->prev;
    } while (temp != head->prev);
    
    char msg[256];
    sprintf(msg, "... (back to last: %d)", head->prev->data);
    log_message(msg);
    log_step_end();
    log_message("DISPLAY_BACKWARD");
}

int main() {
    log_init();
    
    Node* head = NULL;
    
    log_step_start();
    log_message("=== CIRCULAR DOUBLY LINKED LIST ===\n");
    log_step_end();
    
    insertAtEnd(&head, 10);
    insertAtEnd(&head, 20);
    insertAtEnd(&head, 30);
    insertAtEnd(&head, 40);
    
    displayForward(head);
    displayBackward(head);
    
    log_message("\n--- Deleting node 20 ---");
    deleteNode(&head, 20);
    displayForward(head);
    
    log_message("\n--- Deleting node 40 ---");
    deleteNode(&head, 40);
    displayForward(head);
    
    log_finish();
    return 0;
}
