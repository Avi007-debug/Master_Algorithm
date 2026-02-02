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
    log_step_start("INSERT_CSLL");
    Node* newNode = createNode(data);
    
    if (*head == NULL) {
        *head = newNode;
        newNode->next = *head; // Point to itself
        log_message("Created first node: %d (points to itself)", data);
    } else {
        Node* temp = *head;
        while (temp->next != *head) {
            temp = temp->next;
        }
        temp->next = newNode;
        newNode->next = *head; // Complete the circle
        log_message("Inserted %d at end, linked back to head", data);
    }
    
    log_step_end("INSERT_CSLL");
}

void deleteNode(Node** head, int value) {
    log_step_start("DELETE_CSLL");
    
    if (*head == NULL) {
        log_message("List is empty");
        log_step_end("DELETE_CSLL");
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
            log_message("Deleted only node: %d", value);
        } else {
            current->next = (*head)->next;
            Node* temp = *head;
            *head = (*head)->next;
            free(temp);
            log_message("Deleted head node: %d", value);
        }
        log_step_end("DELETE_CSLL");
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
        log_message("Value %d not found", value);
    } else {
        prev->next = current->next;
        log_message("Deleted node: %d", value);
        free(current);
    }
    
    log_step_end("DELETE_CSLL");
}

void display(Node* head) {
    log_step_start("DISPLAY_CSLL");
    
    if (head == NULL) {
        log_message("List is empty");
        log_step_end("DISPLAY_CSLL");
        return;
    }
    
    Node* temp = head;
    int count = 0;
    
    log_message("Circular List:");
    do {
        log_message("[%d] -> %d", count++, temp->data);
        temp = temp->next;
    } while (temp != head);
    
    log_message("... (back to head: %d)", head->data);
    log_step_end("DISPLAY_CSLL");
}

int main() {
    log_init();
    
    Node* head = NULL;
    
    log_message("=== CIRCULAR SINGLY LINKED LIST ===\n");
    
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
    
    return 0;
}
