#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int n = 5;
    
    log_step_start();
    log_var("N Elements", n);
    log_message("Lower Bound Analysis for Sorting. Prove Ω(N log N) minimum comparisons for comparison-based sorts.");
    log_step_end();
    
    // N! leaves
    int leaves = 120; // 5!
    log_step_start();
    log_var("N! (Permutations)", leaves);
    log_message("A binary decision tree sorting N=5 elements must have at least N! = 120 leaves (one for each possible sorted order).");
    log_step_end();
    
    // Height H
    int height = 7; // log2(120) ≈ 6.9 -> 7
    log_step_start();
    log_var("log2(N!)", 7);
    log_message("A binary tree of height H has at most 2^H leaves. 2^H >= 120 -> H >= log2(120) = 6.9 -> Height H >= 7.");
    log_step_end();
    
    log_step_start();
    log_message("Worst-case minimum comparisons required to sort 5 elements is 7 comparisons. General bound is Ω(N log N).");
    log_step_end();
    
    log_finish();
    return 0;
}