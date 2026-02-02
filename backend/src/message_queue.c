#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

#define MAX 100

typedef struct {
    char messages[MAX][256];
    int front, rear, size;
} MessageQueue;

void initQueue(MessageQueue* q) {
    q->front = 0;
    q->rear = -1;
    q->size = 0;
}

int isEmpty(MessageQueue* q) {
    return q->size == 0;
}

int isFull(MessageQueue* q) {
    return q->size == MAX;
}

void enqueue(MessageQueue* q, const char* message) {
    if (isFull(q)) {
        char msg[256];
        sprintf(msg, "Queue is FULL! Cannot enqueue: %s", message);
        log_message(msg);
        return;
    }
    
    log_step_start();
    log_message("ENQUEUE");
    q->rear = (q->rear + 1) % MAX;
    strcpy(q->messages[q->rear], message);
    q->size++;
    
    char msg[256];
    sprintf(msg, "Enqueued message: '%s'", message);
    log_message(msg);
    sprintf(msg, "Front: %d, Rear: %d, Size: %d", q->front, q->rear, q->size);
    log_message(msg);
    log_step_end();
    log_message("ENQUEUE");
}

void dequeue(MessageQueue* q) {
    if (isEmpty(q)) {
        log_message("Queue is EMPTY! Cannot dequeue");
        return;
    }
    
    log_step_start();
    log_message("DEQUEUE");
    char msg[256];
    sprintf(msg, "Dequeued message: '%s'", q->messages[q->front]);
    log_message(msg);
    q->front = (q->front + 1) % MAX;
    q->size--;
    
    sprintf(msg, "Front: %d, Rear: %d, Size: %d", q->front, q->rear, q->size);
    log_message(msg);
    log_step_end();
    log_message("DEQUEUE");
}

void displayQueue(MessageQueue* q) {
    if (isEmpty(q)) {
        log_message("Queue is empty");
        return;
    }
    
    log_step_start();
    log_message("DISPLAY_QUEUE");
    char msg[256];
    sprintf(msg, "Current messages in queue (%d):", q->size);
    log_message(msg);
    
    int i = q->front;
    for (int count = 0; count < q->size; count++) {
        sprintf(msg, "[%d] %s", count + 1, q->messages[i]);
        log_message(msg);
        i = (i + 1) % MAX;
    }
    
    log_step_end();
    log_message("DISPLAY_QUEUE");
}

int main() {
    log_init();
    
    MessageQueue mq;
    initQueue(&mq);
    
    log_step_start();
    log_message("=== MESSAGE QUEUE APPLICATION ===");
    log_message("Simulating a messaging system using circular queue\n");
    log_step_end();
    
    // Enqueue messages
    enqueue(&mq, "User1: Hello!");
    enqueue(&mq, "User2: Hi there!");
    enqueue(&mq, "User1: How are you?");
    enqueue(&mq, "User2: I'm good, thanks!");
    enqueue(&mq, "System: New update available");
    
    displayQueue(&mq);
    
    // Process (dequeue) some messages
    log_message("\n--- Processing messages ---");
    dequeue(&mq);
    dequeue(&mq);
    
    displayQueue(&mq);
    
    // Add more messages (showing circular behavior)
    log_message("\n--- Adding more messages ---");
    enqueue(&mq, "User3: Just joined!");
    enqueue(&mq, "User1: Welcome!");
    
    displayQueue(&mq);
    
    // Process all remaining messages
    log_message("\n--- Processing all messages ---");
    while (!isEmpty(&mq)) {
        dequeue(&mq);
    }
    
    displayQueue(&mq);
    
    return 0;
}
