#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int tree[5] = {4, 10, 3, 5, 1};
    
    log_step_start();
    log_array("TreeStructure", tree, 5);
    log_message("Initial tree array representation: [4, 10, 3, 5, 1]");
    log_step_end();
    
    // Heapify at root index 0
    log_step_start();
    log_array("TreeStructure", tree, 5);
    log_highlight("TreeStructure", 0);
    log_highlight("TreeStructure", 1);
    log_highlight("TreeStructure", 2);
    log_message("Heapifying root (4). Compare with left child (10) and right child (3)");
    log_step_end();
    
    // Swap 4 and 10
    int temp = tree[0];
    tree[0] = tree[1];
    tree[1] = temp;
    
    log_step_start();
    log_array("TreeStructure", tree, 5);
    log_highlight("TreeStructure", 0);
    log_highlight("TreeStructure", 1);
    log_message("Left child (10) is largest. Swapped root (4) and left child (10)");
    log_step_end();
    
    // Heapify at index 1
    log_step_start();
    log_array("TreeStructure", tree, 5);
    log_highlight("TreeStructure", 1);
    log_highlight("TreeStructure", 3);
    log_highlight("TreeStructure", 4);
    log_message("Recursively heapifying at index 1 (4). Compare with children (5) and (1)");
    log_step_end();
    
    // Swap 4 and 5
    temp = tree[1];
    tree[1] = tree[3];
    tree[3] = temp;
    
    log_step_start();
    log_array("TreeStructure", tree, 5);
    log_highlight("TreeStructure", 1);
    log_highlight("TreeStructure", 3);
    log_message("Child (5) is larger. Swapped 4 and 5. Max-Heap property restored!");
    log_step_end();
    
    log_finish();
    return 0;
}