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
            log_message("Heapify up: Swapping element (priority %d) with parent (priority %d)",
                       pq->heap[i].priority, pq->heap[parent].priority);
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
            log_message("Heapify down: Swapping priority %d with %d",
                       pq->heap[i].priority, pq->heap[smallest].priority);
            swap(&pq->heap[i], &pq->heap[smallest]);
            i = smallest;
        } else {
            break;
        }
    }
}

void insert(PriorityQueue* pq, int data, int priority) {
    log_step_start("PQ_INSERT");
    
    if (pq->size >= MAX) {
        log_message("Priority queue is full!");
        log_step_end("PQ_INSERT");
        return;
    }
    
    int i = pq->size;
    pq->heap[i].data = data;
    pq->heap[i].priority = priority;
    pq->size++;
    
    log_message("Inserted: data=%d, priority=%d at index %d", data, priority, i);
    
    heapifyUp(pq, i);
    
    log_message("Insert complete. Queue size: %d", pq->size);
    log_step_end("PQ_INSERT");
}

Element extractMin(PriorityQueue* pq) {
    log_step_start("PQ_EXTRACT_MIN");
    
    Element empty = {-1, -1};
    
    if (pq->size == 0) {
        log_message("Priority queue is empty!");
        log_step_end("PQ_EXTRACT_MIN");
        return empty;
    }
    
    Element min = pq->heap[0];
    log_message("Extracting minimum: data=%d, priority=%d", min.data, min.priority);
    
    pq->heap[0] = pq->heap[pq->size - 1];
    pq->size--;
    
    if (pq->size > 0) {
        log_message("Heapifying down from root");
        heapifyDown(pq, 0);
    }
    
    log_message("Extract complete. Queue size: %d", pq->size);
    log_step_end("PQ_EXTRACT_MIN");
    
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
    log_step_start("PQ_DISPLAY");
    
    if (pq->size == 0) {
        log_message("Priority queue is empty");
        log_step_end("PQ_DISPLAY");
        return;
    }
    
    log_message("Priority Queue (size=%d):", pq->size);
    for (int i = 0; i < pq->size; i++) {
        log_message("[%d] Data: %d, Priority: %d", 
                   i, pq->heap[i].data, pq->heap[i].priority);
    }
    
    log_step_end("PQ_DISPLAY");
}

int main() {
    log_init();
    
    PriorityQueue pq;
    initPQ(&pq);
    
    log_message("=== PRIORITY QUEUE (MIN HEAP) ===\n");
    
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
        log_message("Extracted: data=%d, priority=%d", e.data, e.priority);
    }
    
    display(&pq);
    
    return 0;
}
