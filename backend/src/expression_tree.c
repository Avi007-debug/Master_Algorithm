#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include "../include/logger.h"

#define MAX 100
#define MAX_NODES 100

typedef struct Node {
    char value;
    int isOperator;
    struct Node* left;
    struct Node* right;
} Node;

typedef struct {
    Node* items[MAX];
    int top;
} Stack;

void initStack(Stack* s) {
    s->top = -1;
}

void push(Stack* s, Node* node) {
    if (s->top < MAX - 1) {
        s->items[++(s->top)] = node;
    }
}

Node* pop(Stack* s) {
    if (s->top >= 0) {
        return s->items[(s->top)--];
    }
    return NULL;
}

Node* createNode(char value, int isOperator) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->value = value;
    newNode->isOperator = isOperator;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}

int isOperator(char c) {
    return (c == '+' || c == '-' || c == '*' || c == '/' || c == '^');
}

Node* buildFromPostfix(char* postfix) {
    Stack s;
    initStack(&s);
    
    for (int i = 0; postfix[i] != '\0'; i++) {
        char current = postfix[i];
        
        if (current == ' ') continue;
        
        char msg[256];
        sprintf(msg, "Processing: '%c'", current);
        // log_message(msg);
        
        if (isOperator(current)) {
            Node* node = createNode(current, 1);
            node->right = pop(&s);
            node->left = pop(&s);
            push(&s, node);
            char msg2[256];
            sprintf(msg2, "Created operator node: %c", current);
            // log_message(msg2);
        } else {
            Node* node = createNode(current, 0);
            push(&s, node);
            char msg2[256];
            sprintf(msg2, "Created operand node: %c", current);
            // log_message(msg2);
        }
    }
    
    Node* root = pop(&s);
    // log_message("Expression tree built successfully");
    
    return root;
}

int evaluate(Node* root) {
    if (root == NULL) return 0;
    
    if (!root->isOperator) {
        return root->value - '0';
    }
    
    int leftVal = evaluate(root->left);
    int rightVal = evaluate(root->right);
    
    char msg[256];
    sprintf(msg, "Evaluating: %d %c %d", leftVal, root->value, rightVal);
    // log_message(msg);
    
    switch(root->value) {
        case '+': return leftVal + rightVal;
        case '-': return leftVal - rightVal;
        case '*': return leftVal * rightVal;
        case '/': return leftVal / rightVal;
        case '^': {
            int result = 1;
            for (int i = 0; i < rightVal; i++) {
                result *= leftVal;
            }
            return result;
        }
        default: return 0;
    }
}

void inorder(Node* root, char* result) {
    if (root == NULL) return;
    
    if (root->isOperator) strcat(result, "(");
    inorder(root->left, result);
    
    char temp[2] = {root->value, '\0'};
    strcat(result, temp);
    
    inorder(root->right, result);
    if (root->isOperator) strcat(result, ")");
}

void preorder(Node* root, char* result) {
    if (root == NULL) return;
    
    char temp[2] = {root->value, '\0'};
    strcat(result, temp);
    
    preorder(root->left, result);
    preorder(root->right, result);
}

void postorder(Node* root, char* result) {
    if (root == NULL) return;
    
    postorder(root->left, result);
    postorder(root->right, result);
    
    char temp[2] = {root->value, '\0'};
    strcat(result, temp);
}

int main(int argc, char* argv[]) {
    log_init();
    
    char postfix[MAX];
    
    if (argc > 1) {
        strcpy(postfix, argv[1]);
    } else {
        strcpy(postfix, "ab+cd-*"); // (a+b)*(c-d)
    }
    
    log_step_start();
    log_message("=== EXPRESSION TREE ===\n");
    char msg[256];
    sprintf(msg, "Postfix Expression: %s\n", postfix);
    log_message(msg);
    log_step_end();
    
    Node* root = buildFromPostfix(postfix);
    
    log_step_start();
    log_message("\n--- Traversals ---");
    
    char inorderStr[MAX] = "";
    inorder(root, inorderStr);
    sprintf(msg, "Inorder (Infix):  %s", inorderStr);
    log_message(msg);
    
    char preorderStr[MAX] = "";
    preorder(root, preorderStr);
    sprintf(msg, "Preorder (Prefix): %s", preorderStr);
    log_message(msg);
    
    char postorderStr[MAX] = "";
    postorder(root, postorderStr);
    sprintf(msg, "Postorder:         %s", postorderStr);
    log_message(msg);
    log_step_end();
    
    // If using digits, evaluate
    if (isdigit(postfix[0])) {
        log_message("\n--- Evaluation ---");
        log_step_start();
        int result = evaluate(root);
        sprintf(msg, "Result: %d", result);
        log_message(msg);
        log_step_end();
    }
    
    log_finish();
    return 0;
}
