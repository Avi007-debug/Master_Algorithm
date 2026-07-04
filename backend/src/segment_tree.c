#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

#define N 4

int original[N] = {1, 3, 5, 7};
int tree[15];

int build(int node, int start, int end) {
    char label[32];
    sprintf(label, "[%d-%d]: ?", start, end);
    
    log_step_start();
    log_node(node, label);
    char msg[128];
    sprintf(msg, "Creating node %d for range [%d, %d]", node, start, end);
    log_message(msg);
    log_step_end();
    
    if (start == end) {
        tree[node] = original[start];
        sprintf(label, "[%d-%d]: %d", start, end, tree[node]);
        
        log_step_start();
        log_node(node, label);
        sprintf(msg, "Leaf node reach! Range [%d, %d] has value %d", start, end, tree[node]);
        log_message(msg);
        log_step_end();
        return tree[node];
    }
    
    int mid = start + (end - start) / 2;
    int left_child = 2 * node + 1;
    int right_child = 2 * node + 2;
    
    log_step_start();
    log_edge(node, left_child);
    log_edge(node, right_child);
    sprintf(msg, "Split range [%d, %d] into left [%d, %d] and right [%d, %d]", start, end, start, mid, mid + 1, end);
    log_message(msg);
    log_step_end();
    
    int left_val = build(left_child, start, mid);
    int right_val = build(right_child, mid + 1, end);
    
    tree[node] = left_val + right_val;
    sprintf(label, "[%d-%d]: %d", start, end, tree[node]);
    
    log_step_start();
    log_node(node, label);
    sprintf(msg, "Combine child values of node %d. Range [%d, %d] sum is %d", node, start, end, tree[node]);
    log_message(msg);
    log_step_end();
    
    return tree[node];
}

int main(int argc, char* argv[]) {
    log_init();
    
    log_step_start();
    log_array("Original", original, N);
    log_message("Initialize Segment Tree construction");
    log_step_end();
    
    build(0, 0, N - 1);
    
    log_finish();
    return 0;
}
