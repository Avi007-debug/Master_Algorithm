#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

#define N 6

struct Point {
    int x, y;
    int id;
};

struct Point points[N] = {
    {0, 0, 0},
    {3, 1, 1},
    {2, 2, 2}, // inside
    {4, 4, 3},
    {0, 3, 4},
    {1, 2, 5}  // inside
};

struct Point pivot;

// Helper to calculate orientation
// 0 -> Colinear
// 1 -> Clockwise (Right turn)
// 2 -> Counterclockwise (Left turn)
int orientation(struct Point p, struct Point q, struct Point r) {
    int val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val == 0) return 0;
    return (val > 0) ? 1 : 2;
}

// Distance helper
int distSq(struct Point p1, struct Point p2) {
    return (p1.x - p2.x)*(p1.x - p2.x) + (p1.y - p2.y)*(p1.y - p2.y);
}

// Compare function for sorting points relative to pivot
int compare(const void *vp1, const void *vp2) {
    struct Point *p1 = (struct Point *)vp1;
    struct Point *p2 = (struct Point *)vp2;
    
    int o = orientation(pivot, *p1, *p2);
    if (o == 0)
        return (distSq(pivot, *p2) >= distSq(pivot, *p1)) ? -1 : 1;
    return (o == 2) ? -1 : 1;
}

int main(int argc, char* argv[]) {
    log_init();
    
    int X[N], Y[N];
    for (int i = 0; i < N; i++) {
        X[i] = points[i].x;
        Y[i] = points[i].y;
    }
    
    log_step_start();
    log_array("Points X", X, N);
    log_array("Points Y", Y, N);
    log_message("Initialize Graham Scan: Given set of 2D points");
    log_step_end();
    
    // Find bottom-most point
    int ymin = points[0].y, min_idx = 0;
    for (int i = 1; i < N; i++) {
        int y = points[i].y;
        if ((y < ymin) || (ymin == y && points[i].x < points[min_idx].x)) {
            ymin = points[i].y;
            min_idx = i;
        }
    }
    
    // Swap bottom-most to first place
    struct Point temp = points[0];
    points[0] = points[min_idx];
    points[min_idx] = temp;
    
    // Re-assign coordinates arrays to reflect swap
    for (int i = 0; i < N; i++) {
        X[i] = points[i].x;
        Y[i] = points[i].y;
    }
    
    log_step_start();
    log_array("Points X", X, N);
    log_array("Points Y", Y, N);
    log_highlight("Points X", 0);
    char msg[128];
    sprintf(msg, "Found bottom-most point: (%d, %d)", points[0].x, points[0].y);
    log_message(msg);
    log_step_end();
    
    // Sort other points
    pivot = points[0];
    qsort(&points[1], N - 1, sizeof(struct Point), compare);
    
    for (int i = 0; i < N; i++) {
        X[i] = points[i].x;
        Y[i] = points[i].y;
    }
    
    log_step_start();
    log_array("Points X", X, N);
    log_array("Points Y", Y, N);
    log_message("Points sorted by polar angle with pivot point");
    log_step_end();
    
    // Build hull using stack
    int hullStack[N];
    int hullSize = 0;
    
    hullStack[hullSize++] = 0;
    hullStack[hullSize++] = 1;
    hullStack[hullSize++] = 2;
    
    log_step_start();
    log_array("Hull Stack", hullStack, hullSize);
    log_message("Initial hull stack with first 3 points");
    log_step_end();
    
    for (int i = 3; i < N; i++) {
        log_step_start();
        log_array("Points X", X, N);
        log_highlight("Points X", i);
        sprintf(msg, "Checking point (%d, %d)", points[i].x, points[i].y);
        log_message(msg);
        log_step_end();
        
        while (hullSize >= 2 && orientation(points[hullStack[hullSize-2]], points[hullStack[hullSize-1]], points[i]) != 2) {
            log_step_start();
            log_array("Hull Stack", hullStack, hullSize);
            log_highlight("Hull Stack", hullSize-1);
            sprintf(msg, "Clockwise or colinear turn with (%d, %d). Pop (%d, %d)", points[i].x, points[i].y, points[hullStack[hullSize-1]].x, points[hullStack[hullSize-1]].y);
            log_message(msg);
            log_step_end();
            
            hullSize--;
        }
        
        hullStack[hullSize++] = i;
        
        log_step_start();
        log_array("Hull Stack", hullStack, hullSize);
        sprintf(msg, "Counter-clockwise turn. Push point (%d, %d) to stack", points[i].x, points[i].y);
        log_message(msg);
        log_step_end();
    }
    
    log_step_start();
    log_array("Hull Stack", hullStack, hullSize);
    log_message("Graham Scan completed! Convex Hull points identified.");
    log_step_end();
    
    log_finish();
    return 0;
}
