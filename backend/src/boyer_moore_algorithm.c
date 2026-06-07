#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    char text[] = "ABAAABCD";
    char pattern[] = "ABC";
    int n = strlen(text);
    int m = strlen(pattern);
    
    int t_arr[8];
    for(int i=0; i<n; i++) t_arr[i] = text[i];
    
    log_step_start();
    log_array("Text", t_arr, n);
    log_message("Boyer-Moore String Search for pattern 'ABC'");
    log_step_end();
    
    // Tables
    log_step_start();
    log_var("BadChar A", 2);
    log_var("BadChar B", 1);
    log_var("BadChar C", 3); // last is excluded
    log_var("GoodSuffix Shift", 3);
    log_message("Pre-processing: Constructed Bad-Character and Good-Suffix tables.");
    log_step_end();
    
    // Step 1: Align index 0
    log_step_start();
    log_array("Text", t_arr, n);
    log_highlight("left", 0);
    log_highlight("right", 2);
    log_highlight("compare", 2);
    log_message("Aligned index 0. Comparing text[2]='A' with pattern[2]='C'. Mismatch.");
    log_step_end();
    
    // Shift by Bad Char: 2 - bad_char['A'] = 2 - 2 = 0? Or shift = max(1, 2 - 2) = 1.
    log_step_start();
    log_array("Text", t_arr, n);
    log_message("Bad-Character rule suggests shift of 1. Shift pattern by 1.");
    log_step_end();
    
    // Align index 1
    log_step_start();
    log_array("Text", t_arr, n);
    log_highlight("left", 1);
    log_highlight("right", 3);
    log_highlight("compare", 3);
    log_message("Aligned index 1. Comparing text[3]='A' with pattern[2]='C'. Mismatch.");
    log_step_end();
    
    log_step_start();
    log_array("Text", t_arr, n);
    log_message("Bad-Character rule suggests shift of 1. Shift pattern by 1.");
    log_step_end();
    
    // Align index 2
    log_step_start();
    log_array("Text", t_arr, n);
    log_highlight("left", 2);
    log_highlight("right", 4);
    log_highlight("compare", 4);
    log_message("Aligned index 2. Comparing text[4]='A' with pattern[2]='C'. Mismatch.");
    log_step_end();
    
    log_step_start();
    log_array("Text", t_arr, n);
    log_message("Bad-Character rule suggests shift of 1. Shift pattern by 1.");
    log_step_end();
    
    // Align index 3
    log_step_start();
    log_array("Text", t_arr, n);
    log_highlight("left", 3);
    log_highlight("right", 5);
    log_highlight("compare", 5);
    log_message("Aligned index 3. Comparing text[5]='B' with pattern[2]='C'. Mismatch. Bad-Char 'B' at 5 suggests shift of 2.");
    log_step_end();
    
    // Align index 5
    log_step_start();
    log_array("Text", t_arr, n);
    log_highlight("left", 5);
    log_highlight("right", 7);
    log_highlight("compare", 7);
    log_message("Aligned index 5. Comparing text[7]='D' with pattern[2]='C'. Mismatch.");
    log_step_end();
    
    log_finish();
    return 0;
}