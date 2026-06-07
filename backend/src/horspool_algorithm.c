#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    char text[] = "TRUST_HARD_WORK_NOT_LUCK";
    char pattern[] = "WORK";
    int n = strlen(text);
    int m = strlen(pattern);
    
    int t_arr[24];
    for(int i=0; i<n; i++) t_arr[i] = text[i];
    
    log_step_start();
    log_array("Text String", t_arr, n);
    log_message("Horspool String Search for pattern 'WORK'");
    log_step_end();
    
    // Shift table details
    log_step_start();
    log_var("Shift W", 3);
    log_var("Shift O", 2);
    log_var("Shift R", 1);
    log_var("Shift Other", 4);
    log_message("Pre-processing: Constructed Bad-Symbol shift table for 'WORK'");
    log_step_end();
    
    int i = 0;
    while(i <= n-m) {
        log_step_start();
        log_array("Text String", t_arr, n);
        log_highlight("left", i);
        log_highlight("right", i+m-1);
        char msg[128];
        sprintf(msg, "Aligned pattern at index %d. Rightmost text character is '%c'", i, text[i+m-1]);
        log_message(msg);
        log_step_end();
        
        // Rightmost match check
        log_step_start();
        log_array("Text String", t_arr, n);
        log_highlight("compare", i+m-1);
        sprintf(msg, "Comparing text[%d]='%c' with pattern[3]='K'", i+m-1, text[i+m-1]);
        log_message(msg);
        log_step_end();
        
        if(text[i+m-1] == 'K' && text[i+m-2] == 'R' && text[i+m-3] == 'O' && text[i+m-4] == 'W') {
            log_step_start();
            log_array("Text String", t_arr, n);
            log_highlight("left", i);
            sprintf(msg, "Match found at index %d!", i);
            log_message(msg);
            log_step_end();
            break;
        } else {
            // Shift based on text[i+m-1]
            char badChar = text[i+m-1];
            int shift = 4; // default
            if(badChar == 'W') shift = 3;
            else if(badChar == 'O') shift = 2;
            else if(badChar == 'R') shift = 1;
            
            log_step_start();
            log_array("Text String", t_arr, n);
            log_var("Shift Value", shift);
            sprintf(msg, "Mismatch. Character '%c' shifts pattern right by %d indices", badChar, shift);
            log_message(msg);
            log_step_end();
            i += shift;
        }
    }
    
    log_finish();
    return 0;
}