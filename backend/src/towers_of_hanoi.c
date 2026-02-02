#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

// Towers of Hanoi - Classic Recursion Problem
// Move n disks from source to destination using auxiliary peg
// Visualization shows the state of all three pegs

void towerOfHanoi(int n, char source, char destination, char auxiliary, int step) {
    if (n == 1) {
        log_step_start();
        char msg[256];
        sprintf(msg, "Move disk 1 from %c to %c", source, destination);
        log_message(msg);
        log_step_end();
        return;
    }
    
    // Move n-1 disks from source to auxiliary using destination
    towerOfHanoi(n-1, source, auxiliary, destination, step);
    
    // Move the nth disk from source to destination
    log_step_start();
    char msg[256];
    sprintf(msg, "Move disk %d from %c to %c", n, source, destination);
    log_message(msg);
    log_step_end();
    
    // Move n-1 disks from auxiliary to destination using source
    towerOfHanoi(n-1, auxiliary, destination, source, step);
}

int main(int argc, char* argv[]) {
    log_init();
    
    int n = 3; // Number of disks
    if (argc > 1) {
        n = atoi(argv[1]);
        if (n < 1) n = 1;
        if (n > 7) n = 7; // Limit to prevent too many steps
    }
    
    log_step_start();
    char msg[256];
    sprintf(msg, "Towers of Hanoi with %d disk(s)", n);
    log_message(msg);
    log_message("Goal: Move all disks from A to C using B");
    log_message("Rule: Only one disk at a time, larger cannot go on smaller");
    log_step_end();
    
    log_step_start();
    sprintf(msg, "Total moves needed: %d", (1 << n) - 1); // 2^n - 1
    log_message(msg);
    log_step_end();
    
    towerOfHanoi(n, 'A', 'C', 'B', 0);
    
    log_step_start();
    log_message("All disks successfully moved to destination!");
    log_step_end();
    
    log_finish();
    return 0;
}
