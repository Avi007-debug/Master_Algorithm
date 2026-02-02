#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include "../include/logger.h"

#define MAX 100

typedef struct {
    char items[MAX];
    int top;
} Stack;

void initStack(Stack* s) {
    s->top = -1;
}

int isEmpty(Stack* s) {
    return s->top == -1;
}

void push(Stack* s, char c) {
    if (s->top < MAX - 1) {
        s->items[++(s->top)] = c;
    }
}

char pop(Stack* s) {
    if (!isEmpty(s)) {
        return s->items[(s->top)--];
    }
    return '\0';
}

char peek(Stack* s) {
    if (!isEmpty(s)) {
        return s->items[s->top];
    }
    return '\0';
}

int precedence(char op) {
    switch(op) {
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
            return 2;
        case '^':
            return 3;
        default:
            return 0;
    }
}

int isOperator(char c) {
    return (c == '+' || c == '-' || c == '*' || c == '/' || c == '^');
}

void reverseString(char* str) {
    int n = strlen(str);
    for (int i = 0; i < n/2; i++) {
        char temp = str[i];
        str[i] = str[n-i-1];
        str[n-i-1] = temp;
    }
}

void infixToPrefix(char* infix, char* prefix) {
    Stack s;
    initStack(&s);
    char msg[256];
    
    log_step_start();
    sprintf(msg, "Original Infix: %s", infix);
    log_message(msg);
    
    // Step 1: Reverse the infix expression
    reverseString(infix);
    sprintf(msg, "Step 1: Reversed Infix: %s", infix);
    log_message(msg);
    
    // Step 2: Replace ( with ) and vice versa
    for (int i = 0; infix[i] != '\0'; i++) {
        if (infix[i] == '(') infix[i] = ')';
        else if (infix[i] == ')') infix[i] = '(';
    }
    sprintf(msg, "Step 2: Swapped parentheses: %s", infix);
    log_message(msg);
    
    // Step 3: Convert to postfix
    char postfix[MAX] = "";
    int i = 0, j = 0;
    
    log_message("Step 3: Converting to postfix...");
    
    while (infix[i] != '\0') {
        char current = infix[i];
        
        if (isalnum(current)) {
            postfix[j++] = current;
            sprintf(msg, "Operand '%c' added", current);
            log_message(msg);
        }
        else if (current == '(') {
            push(&s, current);
            log_message("'(' pushed");
        }
        else if (current == ')') {
            while (!isEmpty(&s) && peek(&s) != '(') {
                postfix[j++] = pop(&s);
            }
            if (!isEmpty(&s)) pop(&s);
            log_message("')' processed");
        }
        else if (isOperator(current)) {
            // For prefix, use > instead of >= for right associativity
            while (!isEmpty(&s) && precedence(peek(&s)) > precedence(current)) {
                postfix[j++] = pop(&s);
            }
            push(&s, current);
            sprintf(msg, "Operator '%c' processed", current);
            log_message(msg);
        }
        i++;
    }
    
    while (!isEmpty(&s)) {
        postfix[j++] = pop(&s);
    }
    postfix[j] = '\0';
    
    sprintf(msg, "Postfix result: %s", postfix);
    log_message(msg);
    
    // Step 4: Reverse the postfix to get prefix
    reverseString(postfix);
    strcpy(prefix, postfix);
    
    sprintf(msg, "Step 4: Reversed to get Prefix: %s", prefix);
    log_message(msg);
    log_step_end();
}

int main(int argc, char* argv[]) {
    log_init();
    
    char infix[MAX];
    char prefix[MAX] = "";
    char msg[256];
    
    if (argc > 1) {
        strcpy(infix, argv[1]);
    } else {
        strcpy(infix, "A+B*C-D/E");
    }
    
    // Save original for display
    char original[MAX];
    strcpy(original, infix);
    
    log_step_start();
    log_message("=== INFIX TO PREFIX CONVERSION ===");
    log_step_end();
    
    infixToPrefix(infix, prefix);
    
    log_step_start();
    log_message("\n=== RESULT ===");
    sprintf(msg, "Infix Expression:  %s", original);
    log_message(msg);
    sprintf(msg, "Prefix Expression: %s", prefix);
    log_message(msg);
    log_step_end();
    
    log_finish();
    return 0;
}
