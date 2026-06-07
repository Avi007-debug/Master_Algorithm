#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int freqs[6] = {5, 9, 12, 13, 16, 45};
    int node_ids[6] = {0, 1, 2, 3, 4, 5};
    
    log_step_start();
    log_array("Frequencies", freqs, 6);
    log_message("Huffman Coding: Initial characters with frequencies.");
    log_step_end();
    
    // Merge 5 and 9
    freqs[0] = 14; freqs[1] = 999;
    log_step_start();
    log_array("Frequencies", freqs, 6);
    log_message("Merged two lowest frequencies (5, 9) into parent node with frequency 14.");
    log_step_end();
    
    // Merge 12 and 13
    freqs[2] = 25; freqs[3] = 999;
    log_step_start();
    log_array("Frequencies", freqs, 6);
    log_message("Merged next lowest frequencies (12, 13) into parent node with frequency 25.");
    log_step_end();
    
    // Merge 14 and 16
    freqs[0] = 30; freqs[4] = 999;
    log_step_start();
    log_array("Frequencies", freqs, 6);
    log_message("Merged frequencies (14, 16) into parent node with frequency 30.");
    log_step_end();
    
    // Merge 25 and 30
    freqs[2] = 55; freqs[0] = 999;
    log_step_start();
    log_array("Frequencies", freqs, 6);
    log_message("Merged frequencies (25, 30) into parent node with frequency 55.");
    log_step_end();
    
    // Merge 55 and 45
    freqs[2] = 100; freqs[5] = 999;
    log_step_start();
    log_array("Frequencies", freqs, 6);
    log_message("Merged final frequencies (55, 45) into tree root with frequency 100. Tree complete!");
    log_step_end();
    
    log_finish();
    return 0;
}