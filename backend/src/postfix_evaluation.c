#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include "../include/logger.h"

#define MAX 100

typedef struct {
    int items[MAX];
    int top;
} Stack;

void initStack(Stack* s) {
    s->top = -1;
}

int isEmpty(Stack* s) {
    return s->top == -1;
}

void push(Stack* s, int value) {
    if (s->top < MAX - 1) {
        s->items[++(s->top)] = value;
        char msg[100];
        sprintf(msg, "Pushed %d to stack", value);
        log_message(msg);
    }
}

int pop(Stack* s) {
    if (!isEmpty(s)) {
        int value = s->items[(s->top)--];
        char msg[100];
        sprintf(msg, "Popped %d from stack", value);
        log_message(msg);
        return value;
    }
    return 0;
}

int isOperator(char c) {
    return (c == '+' || c == '-' || c == '*' || c == '/' || c == '^');
}

int performOperation(int a, int b, char op) {
    switch(op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        case '^': {
            int result = 1;
            for (int i = 0; i < b; i++) {
                result *= a;
            }
            return result;
        }
        default: return 0;
    }
}

int evaluatePostfix(char* postfix) {
    Stack s;
    initStack(&s);
    char msg[256];
    
    log_step_start();
    sprintf(msg, "Postfix Expression: %s", postfix);
    log_message(msg);
    
    for (int i = 0; postfix[i] != '\0'; i++) {
        char current = postfix[i];
        
        if (current == ' ') continue;
        
        log_step_start();
        sprintf(msg, "Processing: '%c'", current);
        log_message(msg);
        
        // If operand (digit)
        if (isdigit(current)) {
            int num = current - '0';
            push(&s, num);
            sprintf(msg, "Operand: %d", num);
            log_message(msg);
        }
        // If operator
        else if (isOperator(current)) {
            int operand2 = pop(&s);
            int operand1 = pop(&s);
            
            sprintf(msg, "Operation: %d %c %d", operand1, current, operand2);
            log_message(msg);
            
            int result = performOperation(operand1, operand2, current);
            push(&s, result);
            
            sprintf(msg, "Result: %d", result);
            log_message(msg);
        }
        
        // Show stack state
        char stackStr[MAX * 10] = "[";
        for (int k = 0; k <= s.top; k++) {
            char temp[20];
            sprintf(temp, "%d", s.items[k]);
            strcat(stackStr, temp);
            if (k < s.top) strcat(stackStr, ", ");
        }
        strcat(stackStr, "]");
        sprintf(msg, "Stack: %s", stackStr);
        log_message(msg);
        
        log_step_end();
    }
    
    int finalResult = pop(&s);
    log_step_end();
    
    return finalResult;
}

int main(int argc, char* argv[]) {
    log_init();
    
    char postfix[MAX];
    char msg[256];
    
    // Default expression or use command line argument
    if (argc > 1) {
        strcpy(postfix, argv[1]);
    } else {
        strcpy(postfix, "53+82-*"); // (5+3)*(8-2) = 8*6 = 48
    }
    
    log_step_start();
    log_message("=== POSTFIX EXPRESSION EVALUATION ===");
    log_step_end();
    
    int result = evaluatePostfix(postfix);
    
    log_step_start();
    log_message("\n=== RESULT ===");
    sprintf(msg, "Postfix Expression: %s", postfix);
    log_message(msg);
    sprintf(msg, "Evaluation Result: %d", result);
    log_message(msg);
    log_step_end();
    
    log_finish();
    return 0;
}
