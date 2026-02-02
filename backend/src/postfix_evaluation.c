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
        log_message("Pushed %d to stack", value);
    }
}

int pop(Stack* s) {
    if (!isEmpty(s)) {
        int value = s->items[(s->top)--];
        log_message("Popped %d from stack", value);
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
    
    log_step_start("POSTFIX_EVALUATION");
    log_message("Postfix Expression: %s", postfix);
    
    for (int i = 0; postfix[i] != '\0'; i++) {
        char current = postfix[i];
        
        if (current == ' ') continue;
        
        log_step_start("PROCESS_CHAR");
        log_message("Processing: '%c'", current);
        
        // If operand (digit)
        if (isdigit(current)) {
            int num = current - '0';
            push(&s, num);
            log_message("Operand: %d", num);
        }
        // If operator
        else if (isOperator(current)) {
            int operand2 = pop(&s);
            int operand1 = pop(&s);
            
            log_message("Operation: %d %c %d", operand1, current, operand2);
            
            int result = performOperation(operand1, operand2, current);
            push(&s, result);
            
            log_message("Result: %d", result);
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
        log_message("Stack: %s", stackStr);
        
        log_step_end("PROCESS_CHAR");
    }
    
    int finalResult = pop(&s);
    log_step_end("POSTFIX_EVALUATION");
    
    return finalResult;
}

int main(int argc, char* argv[]) {
    log_init();
    
    char postfix[MAX];
    
    // Default expression or use command line argument
    if (argc > 1) {
        strcpy(postfix, argv[1]);
    } else {
        strcpy(postfix, "53+82-*"); // (5+3)*(8-2) = 8*6 = 48
    }
    
    log_message("=== POSTFIX EXPRESSION EVALUATION ===");
    
    int result = evaluatePostfix(postfix);
    
    log_message("\n=== RESULT ===");
    log_message("Postfix Expression: %s", postfix);
    log_message("Evaluation Result: %d", result);
    
    return 0;
}
