#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

int main(int argc, char* argv[]) {
    log_init();
    
    char* str = "aba$abacaba";
    int n = strlen(str);
    
    int Z[100];
    for (int i = 0; i < n; i++) Z[i] = 0;
    
    log_step_start();
    log_array("Z Array", Z, n);
    log_message("Initialize Z-Algorithm. String: 'aba$abacaba'");
    log_step_end();
    
    int L = 0, R = 0;
    for (int i = 1; i < n; i++) {
        log_step_start();
        log_array("Z Array", Z, n);
        log_var("L", L);
        log_var("R", R);
        log_highlight("Z Array", i);
        char msg[128];
        sprintf(msg, "Evaluating index %d. Current [L, R] window: [%d, %d]", i, L, R);
        log_message(msg);
        log_step_end();
        
        if (i > R) {
            L = R = i;
            while (R < n && str[R - L] == str[R]) {
                R++;
            }
            Z[i] = R - L;
            R--;
            
            log_step_start();
            log_array("Z Array", Z, n);
            log_highlight("Z Array", i);
            sprintf(msg, "i > R: computed Z[%d] = %d by manual comparison. New window: [%d, %d]", i, Z[i], L, R);
            log_message(msg);
            log_step_end();
        } else {
            int k = i - L;
            if (Z[k] < R - i + 1) {
                Z[i] = Z[k];
                
                log_step_start();
                log_array("Z Array", Z, n);
                log_highlight("Z Array", i);
                sprintf(msg, "Inside window: copied Z[%d] = Z[%d] = %d", i, k, Z[i]);
                log_message(msg);
                log_step_end();
            } else {
                L = i;
                while (R < n && str[R - L] == str[R]) {
                    R++;
                }
                Z[i] = R - L;
                R--;
                
                log_step_start();
                log_array("Z Array", Z, n);
                log_highlight("Z Array", i);
                sprintf(msg, "Inside window but exceeds boundary: matched further, Z[%d] = %d. New window: [%d, %d]", i, Z[i], L, R);
                log_message(msg);
                log_step_end();
            }
        }
    }
    
    log_step_start();
    log_array("Z Array", Z, n);
    log_message("Z-Algorithm complete!");
    log_step_end();
    
    log_finish();
    return 0;
}
