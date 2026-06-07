#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int A[4] = {1, 2, 3, 4}; // [[1,2],[3,4]]
    int B[4] = {5, 6, 7, 8}; // [[5,6],[7,8]]
    
    log_step_start();
    log_array("Matrix A", A, 4);
    log_array("Matrix B", B, 4);
    log_message("Strassen Multiplication of 2x2 Matrices A and B");
    log_step_end();
    
    int m1 = (1 + 4) * (5 + 8); // (A11+A22)*(B11+B22) = 5 * 13 = 65
    int m2 = (3 + 4) * 5;       // (A21+A22)*B11 = 7 * 5 = 35
    int m3 = 1 * (6 - 8);       // A11*(B12-B22) = 1 * -2 = -2
    int m4 = 4 * (7 - 5);       // A22*(B21-B11) = 4 * 2 = 8
    int m5 = (1 + 2) * 8;       // (A11+A12)*B22 = 3 * 8 = 24
    int m6 = (3 - 1) * (5 + 6); // (A21-A11)*(B11+B12) = 2 * 11 = 22
    int m7 = (2 - 4) * (7 + 8); // (A12-A22)*(B21+B22) = -2 * 15 = -30
    
    log_step_start();
    log_var("M1", m1);
    log_var("M2", m2);
    log_var("M3", m3);
    log_var("M4", m4);
    log_var("M5", m5);
    log_message("Computed 7 Strassen sub-products: M1 to M5");
    log_step_end();
    
    log_step_start();
    log_var("M6", m6);
    log_var("M7", m7);
    log_message("Computed 7 Strassen sub-products: M6 to M7");
    log_step_end();
    
    int c11 = m1 + m4 - m5 + m7; // 65 + 8 - 24 - 30 = 19
    int c12 = m3 + m5;           // -2 + 24 = 22
    int c21 = m2 + m4;           // 35 + 8 = 43
    int c22 = m1 - m2 + m3 + m6; // 65 - 35 - 2 + 22 = 50
    
    int C[4] = {c11, c12, c21, c22};
    
    log_step_start();
    log_array("Result Matrix C", C, 4);
    log_message("Combined products: C11=19, C12=22, C21=43, C22=50");
    log_step_end();
    
    log_finish();
    return 0;
}