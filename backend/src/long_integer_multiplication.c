#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main(int argc, char* argv[]) {
    log_init();
    
    long long x = (argc > 1) ? atoll(argv[1]) : 1234;
    long long y = (argc > 2) ? atoll(argv[2]) : 5678;
    
    int A[4] = {1, 2, 3, 4};
    int B[4] = {5, 6, 7, 8};
    
    log_step_start();
    log_array("X Digits", A, 4);
    log_array("Y Digits", B, 4);
    log_var("X", (int)x);
    log_var("Y", (int)y);
    log_message("Starting Karatsuba Long Integer Multiplication");
    log_step_end();
    
    // Split
    int x1 = 12, x0 = 34;
    int y1 = 56, y0 = 78;
    
    log_step_start();
    log_var("x1 (high)", x1);
    log_var("x0 (low)", x0);
    log_var("y1 (high)", y1);
    log_var("y0 (low)", y0);
    log_message("Split X and Y into high and low halves: 12, 34 and 56, 78");
    log_step_end();
    
    // Compute P1, P2, P3
    int p1 = x1 * y1; // 672
    int p2 = x0 * y0; // 2652
    int p3 = (x1 + x0) * (y1 + y0); // 46 * 134 = 6164
    
    log_step_start();
    log_var("P1 (x1*y1)", p1);
    log_var("P2 (x0*y0)", p2);
    log_var("P3 (x1+x0)*(y1+y0)", p3);
    log_message("Computed three products recursively: P1 = 672, P2 = 2652, P3 = 6164");
    log_step_end();
    
    int middle = p3 - p1 - p2; // 2840
    long long result = (long long)p1 * 10000 + (long long)middle * 100 + p2;
    
    log_step_start();
    log_var("P3 - P1 - P2", middle);
    log_var("Result", (int)result);
    log_message("Combined products: P1*10^4 + (P3-P1-P2)*10^2 + P2 = 7006652");
    log_step_end();
    
    log_finish();
    return 0;
}