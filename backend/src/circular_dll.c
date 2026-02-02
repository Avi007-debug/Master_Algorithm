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
    log_step_start("INSERT_CDLL");
    Node* newNode = createNode(data);
    
    if (*head == NULL) {
        *head = newNode;
        newNode->next = newNode;
        newNode->prev = newNode;
        log_message("Created first node: %d (bidirectional self-loop)", data);
    } else {
        Node* last = (*head)->prev;
        
        last->next = newNode;
        newNode->prev = last;
        newNode->next = *head;
        (*head)->prev = newNode;
        
        log_message("Inserted %d at end with bidirectional links", data);
    }
    
    log_step_end("INSERT_CDLL");
}

void deleteNode(Node** head, int value) {
    log_step_start("DELETE_CDLL");
    
    if (*head == NULL) {
        log_message("List is empty");
        log_step_end("DELETE_CDLL");
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
                log_message("Deleted only node: %d", value);
            }
            // Multiple nodes
            else {
                current->prev->next = current->next;
                current->next->prev = current->prev;
                
                if (current == *head) {
                    *head = current->next;
                }
                
                log_message("Deleted node: %d (updated bidirectional links)", value);
                free(current);
            }
            
            log_step_end("DELETE_CDLL");
            return;
        }
        current = current->next;
    } while (current != *head);
    
    log_message("Value %d not found", value);
    log_step_end("DELETE_CDLL");
}

void displayForward(Node* head) {
    log_step_start("DISPLAY_FORWARD");
    
    if (head == NULL) {
        log_message("List is empty");
        log_step_end("DISPLAY_FORWARD");
        return;
    }
    
    Node* temp = head;
    int count = 0;
    
    log_message("Forward traversal:");
    do {
        log_message("[%d] -> %d", count++, temp->data);
        temp = temp->next;
    } while (temp != head);
    
    log_message("... (back to head: %d)", head->data);
    log_step_end("DISPLAY_FORWARD");
}

void displayBackward(Node* head) {
    log_step_start("DISPLAY_BACKWARD");
    
    if (head == NULL) {
        log_message("List is empty");
        log_step_end("DISPLAY_BACKWARD");
        return;
    }
    
    Node* temp = head->prev; // Start from last node
    int count = 0;
    
    log_message("Backward traversal:");
    do {
        log_message("[%d] <- %d", count++, temp->data);
        temp = temp->prev;
    } while (temp != head->prev);
    
    log_message("... (back to last: %d)", head->prev->data);
    log_step_end("DISPLAY_BACKWARD");
}

int main() {
    log_init();
    
    Node* head = NULL;
    
    log_message("=== CIRCULAR DOUBLY LINKED LIST ===\n");
    
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
    
    return 0;
}
