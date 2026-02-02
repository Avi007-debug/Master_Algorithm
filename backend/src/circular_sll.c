#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

typedef struct Node {
    int data;
    struct Node* next;
} Node;

Node* createNode(int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}

void insertAtEnd(Node** head, int data) {
    log_step_start();
    log_message("INSERT_CSLL");
    Node* newNode = createNode(data);
    
    if (*head == NULL) {
        *head = newNode;
        newNode->next = *head; // Point to itself
        char msg[256];
        sprintf(msg, "Created first node: %d (points to itself)", data);
        log_message(msg);
    } else {
        Node* temp = *head;
        while (temp->next != *head) {
            temp = temp->next;
        }
        temp->next = newNode;
        newNode->next = *head; // Complete the circle
        char msg[256];
        sprintf(msg, "Inserted %d at end, linked back to head", data);
        log_message(msg);
    }
    
    log_step_end();
    log_message("INSERT_CSLL");
}

void deleteNode(Node** head, int value) {
    log_step_start();
    log_message("DELETE_CSLL");
    
    if (*head == NULL) {
        log_message("List is empty");
        log_step_end();
    log_message("DELETE_CSLL");
        return;
    }
    
    Node *current = *head, *prev = NULL;
    
    // If head is the node to delete
    if ((*head)->data == value) {
        // Find last node
        while (current->next != *head) {
            current = current->next;
        }
        
        if (*head == (*head)->next) {
            // Only one node
            free(*head);
            *head = NULL;
            char msg[256];
            sprintf(msg, "Deleted only node: %d", value);
            log_message(msg);
        } else {
            current->next = (*head)->next;
            Node* temp = *head;
            *head = (*head)->next;
            free(temp);
            char msg[256];
            sprintf(msg, "Deleted head node: %d", value);
            log_message(msg);
        }
        log_step_end();
    log_message("DELETE_CSLL");
        return;
    }
    
    // Search for the node
    prev = *head;
    current = (*head)->next;
    
    while (current != *head && current->data != value) {
        prev = current;
        current = current->next;
    }
    
    if (current == *head) {
        char msg[256];
        sprintf(msg, "Value %d not found", value);
        log_message(msg);
    } else {
        prev->next = current->next;
        char msg[256];
        sprintf(msg, "Deleted node: %d", value);
        log_message(msg);
        free(current);
    }
    
    log_step_end();
    log_message("DELETE_CSLL");
}

void display(Node* head) {
    log_step_start();
    log_message("DISPLAY_CSLL");
    
    if (head == NULL) {
        log_message("List is empty");
        log_step_end();
    log_message("DISPLAY_CSLL");
        return;
    }
    
    Node* temp = head;
    int count = 0;
    
    log_message("Circular List:");
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
    log_message("DISPLAY_CSLL");
}

int main() {
    log_init();
    
    Node* head = NULL;
    
    log_step_start();
    log_message("=== CIRCULAR SINGLY LINKED LIST ===\n");
    log_step_end();
    
    insertAtEnd(&head, 10);
    insertAtEnd(&head, 20);
    insertAtEnd(&head, 30);
    insertAtEnd(&head, 40);
    display(head);
    
    log_message("\n--- Deleting node 20 ---");
    deleteNode(&head, 20);
    display(head);
    
    log_message("\n--- Deleting head node 10 ---");
    deleteNode(&head, 10);
    display(head);
    
    log_finish();
    return 0;
}
