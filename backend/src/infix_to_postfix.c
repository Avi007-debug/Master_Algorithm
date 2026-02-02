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

int isFull(Stack* s) {
    return s->top == MAX - 1;
}

void push(Stack* s, char c) {
    if (!isFull(s)) {
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

void infixToPostfix(char* infix, char* postfix) {
    Stack s;
    initStack(&s);
    int i = 0, j = 0;
    char msg[256];
    
    log_step_start();
    sprintf(msg, "Original Infix Expression: %s", infix);
    log_message(msg);
    log_step_end();
    
    while (infix[i] != '\0') {
        char current = infix[i];
        
        log_step_start();
        sprintf(msg, "Processing character: '%c'", current);
        log_message(msg);
        
        // If operand, add to output
        if (isalnum(current)) {
            postfix[j++] = current;
            sprintf(msg, "Operand '%c' added to postfix", current);
            log_message(msg);
        }
        // If '(', push to stack
        else if (current == '(') {
            push(&s, current);
            log_message("'(' pushed to stack");
        }
        // If ')', pop until '('
        else if (current == ')') {
            log_message("')' found - popping until '('");
            while (!isEmpty(&s) && peek(&s) != '(') {
                postfix[j++] = pop(&s);
            }
            if (!isEmpty(&s)) {
                pop(&s); // Remove '('
            }
        }
        // If operator
        else if (isOperator(current)) {
            sprintf(msg, "Operator '%c' found (precedence: %d)", current, precedence(current));
            log_message(msg);
            
            while (!isEmpty(&s) && precedence(peek(&s)) >= precedence(current)) {
                char popped = pop(&s);
                postfix[j++] = popped;
                sprintf(msg, "Popped '%c' (higher precedence) to postfix", popped);
                log_message(msg);
            }
            push(&s, current);
            sprintf(msg, "Pushed '%c' to stack", current);
            log_message(msg);
        }
        
        // Show current stack state
        char stackStr[MAX * 2] = "";
        for (int k = 0; k <= s.top; k++) {
            char temp[3];
            sprintf(temp, "%c ", s.items[k]);
            strcat(stackStr, temp);
        }
        sprintf(msg, "Stack: [%s]", stackStr);
        log_message(msg);
        
        // Show current postfix
        postfix[j] = '\0';
        sprintf(msg, "Postfix so far: %s", postfix);
        log_message(msg);
        log_step_end();
        
        i++;
    }
    
    // Pop remaining operators
    log_step_start();
    log_message("Popping remaining operators from stack");
    while (!isEmpty(&s)) {
        char popped = pop(&s);
        postfix[j++] = popped;
        sprintf(msg, "Popped '%c' to postfix", popped);
        log_message(msg);
    }
    
    postfix[j] = '\0';
    log_step_end();
}

int main(int argc, char* argv[]) {
    log_init();
    
    char infix[MAX];
    char postfix[MAX] = "";
    char msg[256];
    
    // Default expression or use command line argument
    if (argc > 1) {
        strcpy(infix, argv[1]);
    } else {
        strcpy(infix, "A+B*C-D/E");
    }
    
    log_step_start();
    log_message("=== INFIX TO POSTFIX CONVERSION ===");
    log_step_end();
    
    infixToPostfix(infix, postfix);
    
    log_step_start();
    log_message("\n=== RESULT ===");
    sprintf(msg, "Infix Expression:   %s", infix);
    log_message(msg);
    sprintf(msg, "Postfix Expression: %s", postfix);
    log_message(msg);
    log_step_end();
    
    log_finish();
    return 0;
}
