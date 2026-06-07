#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int a = 12, b = 18;
    
    log_step_start();
    log_var("A", a);
    log_var("B", b);
    log_message("Find Least Common Multiple (LCM) of 12 and 18. Transform the problem by reducing it to Greatest Common Divisor (GCD).");
    log_step_end();
    
    // Compute GCD steps
    log_step_start();
    log_var("a", 18);
    log_var("b", 12);
    log_message("Euclid GCD step: gcd(12, 18) -> gcd(18, 12)");
    log_step_end();
    
    log_step_start();
    log_var("a", 12);
    log_var("b", 6);
    log_message("Euclid GCD step: gcd(12, 18 % 12) -> gcd(12, 6)");
    log_step_end();
    
    int gcdVal = 6;
    log_step_start();
    log_var("GCD", gcdVal);
    log_message("GCD(12, 18) is computed as 6");
    log_step_end();
    
    int lcmVal = (a * b) / gcdVal;
    log_step_start();
    log_var("LCM", lcmVal);
    log_message("Conquer: Compute LCM using LCM(a,b) = (a * b) / GCD = (12 * 18) / 6 = 36");
    log_step_end();
    
    log_finish();
    return 0;
}