#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

typedef struct Node {
    int digit;
    struct Node* next;
} Node;

Node* createNode(int digit) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->digit = digit;
    newNode->next = NULL;
    return newNode;
}

void insertAtBeginning(Node** head, int digit) {
    Node* newNode = createNode(digit);
    newNode->next = *head;
    *head = newNode;
}

void insertAtEnd(Node** head, int digit) {
    Node* newNode = createNode(digit);
    if (*head == NULL) {
        *head = newNode;
    } else {
        Node* temp = *head;
        while (temp->next != NULL) {
            temp = temp->next;
        }
        temp->next = newNode;
    }
}

Node* stringToList(const char* str) {
    Node* head = NULL;
    for (int i = 0; str[i] != '\0'; i++) {
        insertAtEnd(&head, str[i] - '0');
    }
    return head;
}

void displayNumber(Node* head, const char* label) {
    log_step_start("DISPLAY_NUMBER");
    
    if (head == NULL) {
        log_message("%s = 0", label);
        log_step_end("DISPLAY_NUMBER");
        return;
    }
    
    char numStr[256] = "";
    Node* temp = head;
    
    while (temp != NULL) {
        char digit[2];
        sprintf(digit, "%d", temp->digit);
        strcat(numStr, digit);
        temp = temp->next;
    }
    
    log_message("%s = %s", label, numStr);
    log_step_end("DISPLAY_NUMBER");
}

Node* reverseList(Node* head) {
    Node* prev = NULL;
    Node* current = head;
    Node* next = NULL;
    
    while (current != NULL) {
        next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }
    
    return prev;
}

Node* addLongIntegers(Node* num1, Node* num2) {
    log_step_start("ADD_LONG_INTEGERS");
    
    // Reverse both numbers for easier addition (right to left)
    num1 = reverseList(num1);
    num2 = reverseList(num2);
    
    Node* result = NULL;
    int carry = 0;
    
    while (num1 != NULL || num2 != NULL || carry > 0) {
        int sum = carry;
        
        if (num1 != NULL) {
            sum += num1->digit;
            num1 = num1->next;
        }
        
        if (num2 != NULL) {
            sum += num2->digit;
            num2 = num2->next;
        }
        
        int digit = sum % 10;
        carry = sum / 10;
        
        insertAtBeginning(&result, digit);
        
        log_message("Sum = %d, Digit = %d, Carry = %d", sum, digit, carry);
    }
    
    log_message("Addition complete");
    log_step_end("ADD_LONG_INTEGERS");
    
    return result;
}

int main(int argc, char* argv[]) {
    log_init();
    
    const char* num1Str;
    const char* num2Str;
    
    if (argc > 2) {
        num1Str = argv[1];
        num2Str = argv[2];
    } else {
        num1Str = "123456789012345678901234567890";
        num2Str = "987654321098765432109876543210";
    }
    
    log_message("=== ADDITION OF LONG POSITIVE INTEGERS ===\n");
    
    Node* num1 = stringToList(num1Str);
    Node* num2 = stringToList(num2Str);
    
    displayNumber(num1, "Number 1");
    displayNumber(num2, "Number 2");
    
    log_message("\n--- Performing Addition ---");
    Node* result = addLongIntegers(num1, num2);
    
    log_message("\n--- Result ---");
    displayNumber(result, "Sum");
    
    return 0;
}
