#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

// Towers of Hanoi - Classic Recursion Problem
// Move n disks from source to destination using auxiliary peg
// Visualization shows the state of all three pegs

#define MAX_DISKS 7
#define MAX_HEIGHT 10

// Global state for visualization
int towerA[MAX_HEIGHT], towerB[MAX_HEIGHT], towerC[MAX_HEIGHT];
int topA = -1, topB = -1, topC = -1;
int totalDisks = 0;

void initTowers(int n) {
    totalDisks = n;
    topA = topB = topC = -1;
    
    // Initialize tower A with all disks (largest at bottom)
    for (int i = n; i >= 1; i--) {
        towerA[++topA] = i;
    }
}

void visualizeTowers() {
    char fullState[512];
    char towerStr[150];
    
    // Tower A
    strcpy(towerStr, "A:[");
    if (topA >= 0) {
        for (int i = 0; i <= topA; i++) {
            char disk[10];
            sprintf(disk, "%d%s", towerA[i], i < topA ? "," : "");
            strcat(towerStr, disk);
        }
    }
    strcat(towerStr, "]");
    strcpy(fullState, towerStr);
    
    // Tower B
    strcpy(towerStr, " B:[");
    if (topB >= 0) {
        for (int i = 0; i <= topB; i++) {
            char disk[10];
            sprintf(disk, "%d%s", towerB[i], i < topB ? "," : "");
            strcat(towerStr, disk);
        }
    }
    strcat(towerStr, "]");
    strcat(fullState, towerStr);
    
    // Tower C
    strcpy(towerStr, " C:[");
    if (topC >= 0) {
        for (int i = 0; i <= topC; i++) {
            char disk[10];
            sprintf(disk, "%d%s", towerC[i], i < topC ? "," : "");
            strcat(towerStr, disk);
        }
    }
    strcat(towerStr, "]");
    strcat(fullState, towerStr);
    
    log_message(fullState);
}

void moveDisk(char from, char to, int diskNum) {
    int disk;
    
    // Pop from source
    if (from == 'A') disk = towerA[topA--];
    else if (from == 'B') disk = towerB[topB--];
    else disk = towerC[topC--];
    
    // Push to destination
    if (to == 'A') towerA[++topA] = disk;
    else if (to == 'B') towerB[++topB] = disk;
    else towerC[++topC] = disk;
}

void towerOfHanoi(int n, char source, char destination, char auxiliary, int *moveCount) {
    if (n == 1) {
        (*moveCount)++;
        log_step_start();
        char msg[512];
        sprintf(msg, "Move #%d: Disk 1 from %c → %c | ", *moveCount, source, destination);
        moveDisk(source, destination, 1);
        char state[256];
        char towerStr[150];
        
        // Build compact state representation
        strcpy(towerStr, "A:[");
        if (topA >= 0) {
            for (int i = 0; i <= topA; i++) {
                char disk[10];
                sprintf(disk, "%d%s", towerA[i], i < topA ? "," : "");
                strcat(towerStr, disk);
            }
        }
        strcat(towerStr, "] B:[");
        if (topB >= 0) {
            for (int i = 0; i <= topB; i++) {
                char disk[10];
                sprintf(disk, "%d%s", towerB[i], i < topB ? "," : "");
                strcat(towerStr, disk);
            }
        }
        strcat(towerStr, "] C:[");
        if (topC >= 0) {
            for (int i = 0; i <= topC; i++) {
                char disk[10];
                sprintf(disk, "%d%s", towerC[i], i < topC ? "," : "");
                strcat(towerStr, disk);
            }
        }
        strcat(towerStr, "]");
        strcpy(state, towerStr);
        strcat(msg, state);
        log_message(msg);
        log_step_end();
        return;
    }
    
    // Move n-1 disks from source to auxiliary using destination
    towerOfHanoi(n-1, source, auxiliary, destination, moveCount);
    
    // Move the nth disk from source to destination
    (*moveCount)++;
    log_step_start();
    char msg[512];
    sprintf(msg, "Move #%d: Disk %d from %c → %c | ", *moveCount, n, source, destination);
    moveDisk(source, destination, n);
    char state[256];
    char towerStr[150];
    
    // Build compact state representation
    strcpy(towerStr, "A:[");
    if (topA >= 0) {
        for (int i = 0; i <= topA; i++) {
            char disk[10];
            sprintf(disk, "%d%s", towerA[i], i < topA ? "," : "");
            strcat(towerStr, disk);
        }
    }
    strcat(towerStr, "] B:[");
    if (topB >= 0) {
        for (int i = 0; i <= topB; i++) {
            char disk[10];
            sprintf(disk, "%d%s", towerB[i], i < topB ? "," : "");
            strcat(towerStr, disk);
        }
    }
    strcat(towerStr, "] C:[");
    if (topC >= 0) {
        for (int i = 0; i <= topC; i++) {
            char disk[10];
            sprintf(disk, "%d%s", towerC[i], i < topC ? "," : "");
            strcat(towerStr, disk);
        }
    }
    strcat(towerStr, "]");
    strcpy(state, towerStr);
    strcat(msg, state);
    log_message(msg);
    log_step_end();
    
    // Move n-1 disks from auxiliary to destination using source
    towerOfHanoi(n-1, auxiliary, destination, source, moveCount);
}

int main(int argc, char* argv[]) {
    log_init();
    
    int n = 3; // Number of disks
    if (argc > 1) {
        n = atoi(argv[1]);
        if (n < 1) n = 1;
        if (n > 5) n = 5; // Limit to 5 for better visualization
    }
    
    initTowers(n);
    int moveCount = 0;
    
    log_step_start();
    char msg[256];
    sprintf(msg, "=== TOWERS OF HANOI: %d disk(s) ===", n);
    log_message(msg);
    log_message("Goal: Move all disks from Tower A to Tower C");
    log_message("Rules: 1) Move one disk at a time");
    log_message("       2) Larger disk cannot go on smaller disk");
    log_message("       3) Use Tower B as auxiliary");
    sprintf(msg, "Minimum moves needed: %d", (1 << n) - 1); // 2^n - 1
    log_message(msg);
    log_message("");
    log_message("Initial State:");
    visualizeTowers();
    log_step_end();
    
    towerOfHanoi(n, 'A', 'C', 'B', &moveCount);
    
    log_step_start();
    sprintf(msg, "=== COMPLETED in %d moves! ===", moveCount);
    log_message(msg);
    log_message("Final State:");
    visualizeTowers();
    log_message("All disks successfully moved to Tower C!");
    log_step_end();
    
    log_finish();
    return 0;
}
