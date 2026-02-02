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
    
    log_step_start("INFIX_TO_PREFIX");
    log_message("Original Infix: %s", infix);
    
    // Step 1: Reverse the infix expression
    reverseString(infix);
    log_message("Step 1: Reversed Infix: %s", infix);
    
    // Step 2: Replace ( with ) and vice versa
    for (int i = 0; infix[i] != '\0'; i++) {
        if (infix[i] == '(') infix[i] = ')';
        else if (infix[i] == ')') infix[i] = '(';
    }
    log_message("Step 2: Swapped parentheses: %s", infix);
    
    // Step 3: Convert to postfix
    char postfix[MAX] = "";
    int i = 0, j = 0;
    
    log_message("Step 3: Converting to postfix...");
    
    while (infix[i] != '\0') {
        char current = infix[i];
        
        if (isalnum(current)) {
            postfix[j++] = current;
            log_message("Operand '%c' added", current);
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
            log_message("Operator '%c' processed", current);
        }
        i++;
    }
    
    while (!isEmpty(&s)) {
        postfix[j++] = pop(&s);
    }
    postfix[j] = '\0';
    
    log_message("Postfix result: %s", postfix);
    
    // Step 4: Reverse the postfix to get prefix
    reverseString(postfix);
    strcpy(prefix, postfix);
    
    log_message("Step 4: Reversed to get Prefix: %s", prefix);
    log_step_end("INFIX_TO_PREFIX");
}

int main(int argc, char* argv[]) {
    log_init();
    
    char infix[MAX];
    char prefix[MAX] = "";
    
    if (argc > 1) {
        strcpy(infix, argv[1]);
    } else {
        strcpy(infix, "A+B*C-D/E");
    }
    
    // Save original for display
    char original[MAX];
    strcpy(original, infix);
    
    log_message("=== INFIX TO PREFIX CONVERSION ===");
    
    infixToPrefix(infix, prefix);
    
    log_message("\n=== RESULT ===");
    log_message("Infix Expression:  %s", original);
    log_message("Prefix Expression: %s", prefix);
    
    return 0;
}
