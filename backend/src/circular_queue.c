#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

#define MAX 5

// Circular Queue - Efficient use of array space
// Front and rear wrap around when reaching end

typedef struct {
    int items[MAX];
    int front;
    int rear;
    int count;
} CircularQueue;

void initQueue(CircularQueue* q) {
    q->front = 0;
    q->rear = -1;
    q->count = 0;
}

int isFull(CircularQueue* q) {
    return q->count == MAX;
}

int isEmpty(CircularQueue* q) {
    return q->count == 0;
}

void enqueue(CircularQueue* q, int value) {
    if (isFull(q)) {
        log_step_start();
        log_message("Queue is FULL! Cannot enqueue.");
        log_step_end();
        return;
    }
    
    q->rear = (q->rear + 1) % MAX; // Wrap around
    q->items[q->rear] = value;
    q->count++;
    
    log_step_start();
    log_array("Queue", q->items, MAX);
    char msg[128];
    sprintf(msg, "Enqueue %d at rear=%d (count=%d)", value, q->rear, q->count);
    log_message(msg);
    log_step_end();
}

int dequeue(CircularQueue* q) {
    if (isEmpty(q)) {
        log_step_start();
        log_message("Queue is EMPTY! Cannot dequeue.");
        log_step_end();
        return -1;
    }
    
    int value = q->items[q->front];
    q->items[q->front] = 0; // Clear for visualization
    q->front = (q->front + 1) % MAX; // Wrap around
    q->count--;
    
    log_step_start();
    log_array("Queue", q->items, MAX);
    char msg[128];
    sprintf(msg, "Dequeue %d from front=%d (count=%d)", value, (q->front - 1 + MAX) % MAX, q->count);
    log_message(msg);
    log_step_end();
    
    return value;
}

int main(int argc, char* argv[]) {
    log_init();
    
    CircularQueue q;
    initQueue(&q);
    
    log_step_start();
    log_array("Queue", q.items, MAX);
    log_message("Circular Queue: Front and rear wrap around");
    log_message("Max size: 5");
    log_step_end();
    
    // Enqueue operations
    enqueue(&q, 10);
    enqueue(&q, 20);
    enqueue(&q, 30);
    enqueue(&q, 40);
    
    // Dequeue some
    dequeue(&q);
    dequeue(&q);
    
    // Enqueue more (showing circular behavior)
    enqueue(&q, 50);
    enqueue(&q, 60);
    enqueue(&q, 70); // This will wrap around
    
    // Dequeue remaining
    while (!isEmpty(&q)) {
        dequeue(&q);
    }
    
    log_step_start();
    log_array("Queue", q.items, MAX);
    log_message("All operations complete!");
    log_step_end();
    
    log_finish();
    return 0;
}
