#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

#define N 8

int original[N] = {3, 2, -1, 6, 5, 4, -3, 2};
int BIT[N + 1] = {0};

void update(int idx, int val) {
    int tree_idx = idx + 1;
    log_step_start();
    log_array("Original", original, N);
    log_array("BIT", BIT, N + 1);
    char msg[128];
    sprintf(msg, "Adding value %d to index %d (BIT index %d)", val, idx, tree_idx);
    log_message(msg);
    log_step_end();
    
    original[idx] += val;
    
    while (tree_idx <= N) {
        BIT[tree_idx] += val;
        
        log_step_start();
        log_array("BIT", BIT, N + 1);
        log_highlight("BIT", tree_idx);
        sprintf(msg, "Updated BIT[%d] to %d. Move to next index (+LSB)", tree_idx, BIT[tree_idx]);
        log_message(msg);
        log_step_end();
        
        tree_idx += tree_idx & (-tree_idx);
    }
}

int query(int idx) {
    int sum = 0;
    int tree_idx = idx + 1;
    
    log_step_start();
    char msg[128];
    sprintf(msg, "Query prefix sum up to index %d (BIT index %d)", idx, tree_idx);
    log_message(msg);
    log_step_end();
    
    while (tree_idx > 0) {
        sum += BIT[tree_idx];
        
        log_step_start();
        log_array("BIT", BIT, N + 1);
        log_highlight("BIT", tree_idx);
        log_var("Accumulated Sum", sum);
        sprintf(msg, "Added BIT[%d] (%d). Cumulative: %d. Move to parent (-LSB)", tree_idx, BIT[tree_idx], sum);
        log_message(msg);
        log_step_end();
        
        tree_idx -= tree_idx & (-tree_idx);
    }
    return sum;
}

int main(int argc, char* argv[]) {
    log_init();
    
    log_step_start();
    log_array("Original", original, N);
    log_array("BIT", BIT, N + 1);
    log_message("Initialize Fenwick Tree (Binary Indexed Tree)");
    log_step_end();
    
    // Construct BIT
    for (int i = 0; i < N; i++) {
        // Build using point updates without modifying the logged original array values redundantly
        int val = original[i];
        original[i] = 0; // reset temporarily to let update() handle it
        update(i, val);
    }
    
    log_step_start();
    log_array("BIT", BIT, N + 1);
    log_message("BIT Construction Complete. Performing prefix queries.");
    log_step_end();
    
    query(5);
    
    log_finish();
    return 0;
}
