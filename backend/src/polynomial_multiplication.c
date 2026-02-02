#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

typedef struct Node {
    int coeff;
    int exp;
    struct Node* next;
} Node;

Node* createNode(int coeff, int exp) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->coeff = coeff;
    newNode->exp = exp;
    newNode->next = NULL;
    return newNode;
}

void insertTerm(Node** poly, int coeff, int exp) {
    if (coeff == 0) return; // Skip zero coefficients
    
    Node* newNode = createNode(coeff, exp);
    
    if (*poly == NULL) {
        *poly = newNode;
    } else {
        Node* temp = *poly;
        while (temp->next != NULL) {
            temp = temp->next;
        }
        temp->next = newNode;
    }
}

void displayPolynomial(Node* poly, const char* name) {
    log_step_start();
    log_message("DISPLAY_POLYNOMIAL");
    
    if (poly == NULL) {
        char msg[256];
        sprintf(msg, "%s = 0", name);
        log_message(msg);
        log_step_end();
    log_message("DISPLAY_POLYNOMIAL");
        return;
    }
    
    char polyStr[256] = "";
    Node* temp = poly;
    int first = 1;
    
    while (temp != NULL) {
        char term[50];
        
        if (!first && temp->coeff > 0) {
            strcat(polyStr, " + ");
        } else if (temp->coeff < 0) {
            strcat(polyStr, " - ");
        }
        
        if (temp->exp == 0) {
            sprintf(term, "%d", abs(temp->coeff));
        } else if (temp->exp == 1) {
            sprintf(term, "%dx", abs(temp->coeff));
        } else {
            sprintf(term, "%dx^%d", abs(temp->coeff), temp->exp);
        }
        
        strcat(polyStr, term);
        temp = temp->next;
        first = 0;
    }
    
    char msg[512];
    sprintf(msg, "%s = %s", name, polyStr);
    log_message(msg);
    log_step_end();
    log_message("DISPLAY_POLYNOMIAL");
}

Node* multiplyPolynomials(Node* poly1, Node* poly2) {
    log_step_start();
    log_message("MULTIPLY_POLYNOMIALS");
    
    if (poly1 == NULL || poly2 == NULL) {
        log_message("One or both polynomials are empty");
        log_step_end();
    log_message("MULTIPLY_POLYNOMIALS");
        return NULL;
    }
    
    Node* result = NULL;
    
    // Multiply each term of poly1 with each term of poly2
    for (Node* p1 = poly1; p1 != NULL; p1 = p1->next) {
        for (Node* p2 = poly2; p2 != NULL; p2 = p2->next) {
            int newCoeff = p1->coeff * p2->coeff;
            int newExp = p1->exp + p2->exp;
            
            char msg[256];
            sprintf(msg, "Multiplying: (%dx^%d) * (%dx^%d) = %dx^%d", 
                       p1->coeff, p1->exp, p2->coeff, p2->exp, newCoeff, newExp);
            log_message(msg);
            
            // Check if this exponent already exists in result
            Node* temp = result;
            Node* prev = NULL;
            int found = 0;
            
            while (temp != NULL) {
                if (temp->exp == newExp) {
                    temp->coeff += newCoeff;
                    char msg2[256];
                    sprintf(msg2, "Combined with existing term: %dx^%d", temp->coeff, temp->exp);
                    log_message(msg2);
                    found = 1;
                    break;
                }
                prev = temp;
                temp = temp->next;
            }
            
            if (!found) {
                Node* newNode = createNode(newCoeff, newExp);
                if (result == NULL) {
                    result = newNode;
                } else {
                    prev->next = newNode;
                }
                char msg2[256];
                sprintf(msg2, "Added new term: %dx^%d", newCoeff, newExp);
                log_message(msg2);
            }
        }
    }
    
    log_step_end();
    log_message("MULTIPLY_POLYNOMIALS");
    return result;
}

void sortPolynomial(Node** poly) {
    if (*poly == NULL) return;
    
    log_step_start();
    log_message("SORT_POLYNOMIAL");
    
    // Bubble sort by exponent (descending)
    int swapped;
    do {
        swapped = 0;
        Node* current = *poly;
        Node* prev = NULL;
        Node* next = NULL;
        
        while (current->next != NULL) {
            if (current->exp < current->next->exp) {
                swapped = 1;
                next = current->next;
                current->next = next->next;
                next->next = current;
                
                if (prev == NULL) {
                    *poly = next;
                } else {
                    prev->next = next;
                }
                
                prev = next;
            } else {
                prev = current;
                current = current->next;
            }
        }
    } while (swapped);
    
    log_message("Polynomial sorted in descending order of exponents");
    log_step_end();
    log_message("SORT_POLYNOMIAL");
}

int main() {
    log_init();
    
    log_step_start();
    log_message("=== POLYNOMIAL MULTIPLICATION ===\n");
    log_step_end();
    
    // Create first polynomial: 3x^2 + 5x + 2
    Node* poly1 = NULL;
    insertTerm(&poly1, 3, 2);
    insertTerm(&poly1, 5, 1);
    insertTerm(&poly1, 2, 0);
    displayPolynomial(poly1, "P1");
    
    // Create second polynomial: 4x + 1
    Node* poly2 = NULL;
    insertTerm(&poly2, 4, 1);
    insertTerm(&poly2, 1, 0);
    displayPolynomial(poly2, "P2");
    
    log_message("\n--- Multiplying Polynomials ---");
    Node* result = multiplyPolynomials(poly1, poly2);
    
    log_message("\n--- Sorting Result ---");
    sortPolynomial(&result);
    
    log_message("\n--- Final Result ---");
    displayPolynomial(result, "P1 * P2");
    
    log_finish();
    return 0;
}
