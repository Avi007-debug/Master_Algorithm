#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

#define MAX 100

typedef struct {
    int data;
    int priority;
} Element;

typedef struct {
    Element heap[MAX];
    int size;
} PriorityQueue;

void initPQ(PriorityQueue* pq) {
    pq->size = 0;
}

void swap(Element* a, Element* b) {
    Element temp = *a;
    *a = *b;
    *b = temp;
}

void heapifyUp(PriorityQueue* pq, int i) {
    while (i > 0) {
        int parent = (i - 1) / 2;
        
        // Min heap: higher priority = smaller number
        if (pq->heap[i].priority < pq->heap[parent].priority) {
            char msg[256];
            sprintf(msg, "Heapify up: Swapping element (priority %d) with parent (priority %d)",
                       pq->heap[i].priority, pq->heap[parent].priority);
            log_message(msg);
            swap(&pq->heap[i], &pq->heap[parent]);
            i = parent;
        } else {
            break;
        }
    }
}

void heapifyDown(PriorityQueue* pq, int i) {
    while (1) {
        int smallest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        
        if (left < pq->size && pq->heap[left].priority < pq->heap[smallest].priority) {
            smallest = left;
        }
        if (right < pq->size && pq->heap[right].priority < pq->heap[smallest].priority) {
            smallest = right;
        }
        
        if (smallest != i) {
            char msg[256];
            sprintf(msg, "Heapify down: Swapping priority %d with %d",
                       pq->heap[i].priority, pq->heap[smallest].priority);
            log_message(msg);
            swap(&pq->heap[i], &pq->heap[smallest]);
            i = smallest;
        } else {
            break;
        }
    }
}

void insert(PriorityQueue* pq, int data, int priority) {
    log_step_start();
    log_message("PQ_INSERT");
    
    if (pq->size >= MAX) {
        log_message("Priority queue is full!");
        log_step_end();
        log_message("PQ_INSERT");
        return;
    }
    
    int i = pq->size;
    pq->heap[i].data = data;
    pq->heap[i].priority = priority;
    pq->size++;
    
    char msg[256];
    sprintf(msg, "Inserted: data=%d, priority=%d at index %d", data, priority, i);
    log_message(msg);
    
    heapifyUp(pq, i);
    
    sprintf(msg, "Insert complete. Queue size: %d", pq->size);
    log_message(msg);
    log_step_end();
    log_message("PQ_INSERT");
}

Element extractMin(PriorityQueue* pq) {
    log_step_start();
    log_message("PQ_EXTRACT_MIN");
    
    Element empty = {-1, -1};
    
    if (pq->size == 0) {
        log_message("Priority queue is empty!");
        log_step_end();
        log_message("PQ_EXTRACT_MIN");
        return empty;
    }
    
    Element min = pq->heap[0];
    char msg[256];
    sprintf(msg, "Extracting minimum: data=%d, priority=%d", min.data, min.priority);
    log_message(msg);
    
    pq->heap[0] = pq->heap[pq->size - 1];
    pq->size--;
    
    if (pq->size > 0) {
        log_message("Heapifying down from root");
        heapifyDown(pq, 0);
    }
    
    sprintf(msg, "Extract complete. Queue size: %d", pq->size);
    log_message(msg);
    log_step_end();
    log_message("PQ_EXTRACT_MIN");
    
    return min;
}

Element peek(PriorityQueue* pq) {
    Element empty = {-1, -1};
    
    if (pq->size == 0) {
        log_message("Priority queue is empty!");
        return empty;
    }
    
    return pq->heap[0];
}

void display(PriorityQueue* pq) {
    log_step_start();
    log_message("PQ_DISPLAY");
    
    if (pq->size == 0) {
        log_message("Priority queue is empty");
        log_step_end();
        log_message("PQ_DISPLAY");
        return;
    }
    
    char msg[256];
    sprintf(msg, "Priority Queue (size=%d):", pq->size);
    log_message(msg);
    for (int i = 0; i < pq->size; i++) {
        sprintf(msg, "[%d] Data: %d, Priority: %d", 
                   i, pq->heap[i].data, pq->heap[i].priority);
        log_message(msg);
    }
    
    log_step_end();
    log_message("PQ_DISPLAY");
}

int main() {
    log_init();
    
    PriorityQueue pq;
    initPQ(&pq);
    
    log_step_start();
    log_message("=== PRIORITY QUEUE (MIN HEAP) ===\n");
    log_step_end();
    
    log_message("--- Inserting Elements ---");
    insert(&pq, 100, 3);
    insert(&pq, 200, 1);
    insert(&pq, 300, 5);
    insert(&pq, 400, 2);
    insert(&pq, 500, 4);
    
    display(&pq);
    
    log_message("\n--- Extracting Elements (in priority order) ---");
    while (pq.size > 0) {
        Element e = extractMin(&pq);
        char msg[256];
        sprintf(msg, "Extracted: data=%d, priority=%d", e.data, e.priority);
        log_message(msg);
    }
    
    display(&pq);
    
    return 0;
}
