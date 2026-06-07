#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main() {
    log_init();
    
    int weights[3] = {10, 20, 30};
    int values[3] = {60, 100, 120};
    int capacity = 50;
    
    log_step_start();
    log_array("Weights", weights, 3);
    log_array("Values", values, 3);
    log_var("Capacity", capacity);
    log_message("Fractional Knapsack problem: items sorted by value/weight ratio.");
    log_step_end();
    
    double totalValue = 0;
    
    // Pack Item 0
    totalValue += 60;
    capacity -= 10;
    log_step_start();
    log_highlight("Weights", 0);
    log_var("Knapsack Profit", (int)totalValue);
    log_var("Remaining Capacity", capacity);
    log_message("Greedily added Item 0 (weight 10, value 60). Remaining capacity is 40.");
    log_step_end();
    
    // Pack Item 1
    totalValue += 100;
    capacity -= 20;
    log_step_start();
    log_highlight("Weights", 1);
    log_var("Knapsack Profit", (int)totalValue);
    log_var("Remaining Capacity", capacity);
    log_message("Greedily added Item 1 (weight 20, value 100). Remaining capacity is 20.");
    log_step_end();
    
    // Pack fraction of Item 2
    double fraction = (double)capacity / 30.0;
    double partialVal = fraction * 120.0;
    totalValue += partialVal;
    capacity = 0;
    
    log_step_start();
    log_highlight("Weights", 2);
    log_var("Knapsack Profit", (int)totalValue);
    log_var("Remaining Capacity", capacity);
    log_message("Capacity full. Added fraction of Item 2 (20kg out of 30kg, value 80). Optimal profit is 240.");
    log_step_end();
    
    log_finish();
    return 0;
}