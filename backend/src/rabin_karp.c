#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

#define d 256

int main(int argc, char* argv[]) {
    log_init();
    
    char* text = "THIS IS A TEST TEXT";
    char* pattern = "TEST";
    int q = 101; // A prime number
    
    int M = strlen(pattern);
    int N = strlen(text);
    int p = 0; // hash value for pattern
    int t = 0; // hash value for txt
    int h = 1;
    
    // The value of h would be "pow(d, M-1)%q"
    for (int i = 0; i < M - 1; i++) {
        h = (h * d) % q;
    }
    
    // Calculate the hash value of pattern and first window of text
    for (int i = 0; i < M; i++) {
        p = (d * p + pattern[i]) % q;
        t = (d * t + text[i]) % q;
    }
    
    log_step_start();
    log_var("Pattern Hash", p);
    log_var("Initial Window Hash", t);
    log_message("Rabin-Karp: Computed initial hash values");
    log_step_end();
    
    // Slide the pattern over text one by one
    for (int i = 0; i <= N - M; i++) {
        log_step_start();
        log_var("Pattern Hash", p);
        log_var("Current Window Hash", t);
        log_var("Window Start Index", i);
        char msg[128];
        sprintf(msg, "Checking window at index %d: hashes %s", i, (p == t) ? "MATCH" : "DO NOT MATCH");
        log_message(msg);
        log_step_end();
        
        // Check the hash values of current window of text and pattern.
        // If the hash values match then only check for characters one by one
        if (p == t) {
            int j;
            for (j = 0; j < M; j++) {
                if (text[i + j] != pattern[j])
                    break;
            }
            if (j == M) {
                log_step_start();
                sprintf(msg, "Pattern found at index %d (exact match confirmed)", i);
                log_message(msg);
                log_step_end();
            }
        }
        
        // Calculate hash value for next window of text: Remove leading digit, add trailing digit
        if (i < N - M) {
            t = (d * (t - text[i] * h) + text[i + M]) % q;
            if (t < 0) t = (t + q);
        }
    }
    
    log_finish();
    return 0;
}
