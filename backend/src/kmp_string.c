#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

int main(int argc, char* argv[]) {
    log_init();
    
    char* text = "ABABDABACDABABCABAB";
    char* pattern = "ABABCABAB";
    int n = strlen(text);
    int m = strlen(pattern);
    
    int lps[100];
    for (int i = 0; i < m; i++) lps[i] = 0;
    
    log_step_start();
    log_array("LPS Table", lps, m);
    log_message("KMP Search: Start building LPS (Longest Prefix Suffix) array");
    log_step_end();
    
    // Compute LPS
    int len = 0;
    int i = 1;
    lps[0] = 0;
    while (i < m) {
        if (pattern[i] == pattern[len]) {
            len++;
            lps[i] = len;
            
            log_step_start();
            log_array("LPS Table", lps, m);
            log_highlight("LPS Table", i);
            char msg[128];
            sprintf(msg, "Match found! lps[%d] updated to %d", i, lps[i]);
            log_message(msg);
            log_step_end();
            
            i++;
        } else {
            if (len != 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    
    log_step_start();
    log_array("LPS Table", lps, m);
    log_message("LPS array computation complete. Starting pattern search.");
    log_step_end();
    
    int txt_idx = 0;
    int pat_idx = 0;
    while (txt_idx < n) {
        log_step_start();
        log_var("Text Index", txt_idx);
        log_var("Pattern Index", pat_idx);
        char msg[128];
        sprintf(msg, "Comparing text[%d] ('%c') and pattern[%d] ('%c')", txt_idx, text[txt_idx], pat_idx, pattern[pat_idx]);
        log_message(msg);
        log_step_end();
        
        if (pattern[pat_idx] == text[txt_idx]) {
            pat_idx++;
            txt_idx++;
        }
        
        if (pat_idx == m) {
            log_step_start();
            log_message("Pattern found at index!");
            log_step_end();
            pat_idx = lps[pat_idx - 1];
        } else if (txt_idx < n && pattern[pat_idx] != text[txt_idx]) {
            if (pat_idx != 0) {
                pat_idx = lps[pat_idx - 1];
            } else {
                txt_idx++;
            }
        }
    }
    
    log_finish();
    return 0;
}
