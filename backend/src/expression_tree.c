#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include "../include/logger.h"

#define MAX 100

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
    log_step_start("BUILD_EXPRESSION_TREE");
    Stack s;
    initStack(&s);
    
    for (int i = 0; postfix[i] != '\0'; i++) {
        char current = postfix[i];
        
        if (current == ' ') continue;
        
        log_step_start("PROCESS_CHAR");
        log_message("Processing: '%c'", current);
        
        if (isOperator(current)) {
            Node* node = createNode(current, 1);
            node->right = pop(&s);
            node->left = pop(&s);
            push(&s, node);
            log_message("Created operator node: %c", current);
        } else {
            Node* node = createNode(current, 0);
            push(&s, node);
            log_message("Created operand node: %c", current);
        }
        
        log_step_end("PROCESS_CHAR");
    }
    
    Node* root = pop(&s);
    log_message("Expression tree built successfully");
    log_step_end("BUILD_EXPRESSION_TREE");
    
    return root;
}

int evaluate(Node* root) {
    if (root == NULL) return 0;
    
    if (!root->isOperator) {
        return root->value - '0';
    }
    
    int leftVal = evaluate(root->left);
    int rightVal = evaluate(root->right);
    
    log_message("Evaluating: %d %c %d", leftVal, root->value, rightVal);
    
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
    
    log_message("=== EXPRESSION TREE ===\n");
    log_message("Postfix Expression: %s\n", postfix);
    
    Node* root = buildFromPostfix(postfix);
    
    log_message("\n--- Traversals ---");
    
    char inorderStr[MAX] = "";
    inorder(root, inorderStr);
    log_message("Inorder (Infix):  %s", inorderStr);
    
    char preorderStr[MAX] = "";
    preorder(root, preorderStr);
    log_message("Preorder (Prefix): %s", preorderStr);
    
    char postorderStr[MAX] = "";
    postorder(root, postorderStr);
    log_message("Postorder:         %s", postorderStr);
    
    // If using digits, evaluate
    if (isdigit(postfix[0])) {
        log_message("\n--- Evaluation ---");
        log_step_start("EVALUATE_TREE");
        int result = evaluate(root);
        log_message("Result: %d", result);
        log_step_end("EVALUATE_TREE");
    }
    
    return 0;
}
