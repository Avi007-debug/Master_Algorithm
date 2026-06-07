#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int node_id = 0;

void subsetSum(int sum, int idx, int parent_id) {
    int cur_id = node_id++;
    char label[32];
    sprintf(label, "S(sum=%d)", sum);
    
    log_step_start();
    log_node(cur_id, label);
    if(parent_id != -1) log_edge(parent_id, cur_id);
    log_var("Current Sum", sum);
    log_var("Index", idx);
    char msg[128];
    sprintf(msg, "Backtracking state space tree: sum = %d, index = %d", sum, idx);
    log_message(msg);
    log_step_end();
    
    if(sum == 9) {
        log_step_start();
        log_node(cur_id, label);
        if(parent_id != -1) log_edge(parent_id, cur_id);
        log_message("Target sum 9 found! Solution branch registered.");
        log_step_end();
        return;
    }
    
    if(idx >= 5 || sum > 9) {
        log_step_start();
        log_node(cur_id, label);
        if(parent_id != -1) log_edge(parent_id, cur_id);
        log_message("Sum exceeds target or out of bounds. Pruning branch.");
        log_step_end();
        return;
    }
    
    // Backtracking inclusion/exclusion tree path simulation
    if(idx == 0) {
        subsetSum(sum + 1, idx + 1, cur_id); // include 1
        subsetSum(sum, idx + 1, cur_id);     // exclude 1
    } else if(idx == 1) {
        subsetSum(sum + 2, idx + 2, cur_id); // include 2
    }
}

int main() {
    log_init();
    subsetSum(0, 0, -1);
    log_finish();
    return 0;
}