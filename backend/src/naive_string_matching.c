#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    char text[] = "AABAACAADAABAABA";
    char pattern[] = "AABA";
    int n = strlen(text);
    int m = strlen(pattern);
    
    // We log text as an array of characters
    int t_arr[16];
    for(int i=0; i<n; i++) t_arr[i] = text[i];
    
    log_step_start();
    log_array("Text Array", t_arr, n);
    log_var("TextLength", n);
    log_var("PatternLength", m);
    log_message("Starting Naive String Matching for pattern 'AABA' in text 'AABAACAADAABAABA'");
    log_step_end();
    
    for(int i=0; i<=n-m; i++) {
        log_step_start();
        log_array("Text Array", t_arr, n);
        log_highlight("left", i);
        log_highlight("right", i+m-1);
        char msg[128];
        sprintf(msg, "Aligning pattern at index %d of text", i);
        log_message(msg);
        log_step_end();
        
        int j;
        for(j=0; j<m; j++) {
            log_step_start();
            log_array("Text Array", t_arr, n);
            log_highlight("left", i);
            log_highlight("right", i+m-1);
            log_highlight("compare", i+j);
            sprintf(msg, "Comparing text[%d]='%c' with pattern[%d]='%c'", i+j, text[i+j], j, pattern[j]);
            log_message(msg);
            log_step_end();
            
            if(text[i+j] != pattern[j]) break;
        }
        
        if(j == m) {
            log_step_start();
            log_array("Text Array", t_arr, n);
            log_highlight("left", i);
            log_highlight("right", i+m-1);
            sprintf(msg, "Match found at index %d!", i);
            log_message(msg);
            log_step_end();
        }
    }
    
    log_finish();
    return 0;
}