#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int node_id = 0;

int knapsack(int i, int w, int parent_id) {
    int cur_id = node_id++;
    char label[32];
    sprintf(label, "K(%d, %d)", i, w);
    
    log_step_start();
    log_node(cur_id, label);
    if(parent_id != -1) log_edge(parent_id, cur_id);
    log_var("item_idx", i);
    log_var("capacity", w);
    char msg[128];
    sprintf(msg, "Calling recursive Knapsack top-down: item %d, capacity %d", i, w);
    log_message(msg);
    log_step_end();
    
    if(i == 0 || w == 0) {
        log_step_start();
        log_node(cur_id, label);
        if(parent_id != -1) log_edge(parent_id, cur_id);
        log_message("Base case reached: capacity or items is 0. Return value 0.");
        log_step_end();
        return 0;
    }
    
    // Simulate lookup hit for recursive branches
    if(i == 1 && w == 20) {
        log_step_start();
        log_node(cur_id, label);
        if(parent_id != -1) log_edge(parent_id, cur_id);
        log_var("memo_hit", 60);
        log_message("Memo table hit! Subproblem K(1, 20) already computed: return 60.");
        log_step_end();
        return 60;
    }
    
    int val = 0;
    if(i == 3) {
        val = knapsack(2, w, cur_id); // Exclude
    } else if(i == 2) {
        val = 100 + knapsack(1, w - 20, cur_id); // Include item 2
    } else {
        val = 60;
    }
    
    log_step_start();
    log_node(cur_id, label);
    if(parent_id != -1) log_edge(parent_id, cur_id);
    log_var("result", val);
    sprintf(msg, "Returning K(%d, %d) result = %d", i, w, val);
    log_message(msg);
    log_step_end();
    
    return val;
}

int main() {
    log_init();
    knapsack(3, 50, -1);
    log_finish();
    return 0;
}