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
    
    log_step_start("INFIX_TO_POSTFIX");
    log_message("Original Infix Expression: %s", infix);
    
    while (infix[i] != '\0') {
        char current = infix[i];
        
        log_step_start("PROCESS_CHAR");
        log_message("Processing character: '%c'", current);
        
        // If operand, add to output
        if (isalnum(current)) {
            postfix[j++] = current;
            log_message("Operand '%c' added to postfix", current);
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
            log_message("Operator '%c' found (precedence: %d)", current, precedence(current));
            
            while (!isEmpty(&s) && precedence(peek(&s)) >= precedence(current)) {
                char popped = pop(&s);
                postfix[j++] = popped;
                log_message("Popped '%c' (higher precedence) to postfix", popped);
            }
            push(&s, current);
            log_message("Pushed '%c' to stack", current);
        }
        
        // Show current stack state
        char stackStr[MAX * 2] = "";
        for (int k = 0; k <= s.top; k++) {
            char temp[3];
            sprintf(temp, "%c ", s.items[k]);
            strcat(stackStr, temp);
        }
        log_message("Stack: [%s]", stackStr);
        
        // Show current postfix
        postfix[j] = '\0';
        log_message("Postfix so far: %s", postfix);
        log_step_end("PROCESS_CHAR");
        
        i++;
    }
    
    // Pop remaining operators
    log_message("Popping remaining operators from stack");
    while (!isEmpty(&s)) {
        char popped = pop(&s);
        postfix[j++] = popped;
        log_message("Popped '%c' to postfix", popped);
    }
    
    postfix[j] = '\0';
    log_step_end("INFIX_TO_POSTFIX");
}

int main(int argc, char* argv[]) {
    log_init();
    
    char infix[MAX];
    char postfix[MAX] = "";
    
    // Default expression or use command line argument
    if (argc > 1) {
        strcpy(infix, argv[1]);
    } else {
        strcpy(infix, "A+B*C-D/E");
    }
    
    log_message("=== INFIX TO POSTFIX CONVERSION ===");
    
    infixToPostfix(infix, postfix);
    
    log_message("\n=== RESULT ===");
    log_message("Infix Expression:   %s", infix);
    log_message("Postfix Expression: %s", postfix);
    
    return 0;
}
