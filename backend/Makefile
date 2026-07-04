CC = gcc
CFLAGS = -Wall -Wextra -Iinclude
CFLAGS_DEV = $(CFLAGS) -g -O0 -fsanitize=address,undefined
CFLAGS_PROD = $(CFLAGS) -O2
SRC_DIR = src
BUILD_DIR = build
TEST_DIR = test

# List of algorithms to build
ALGORITHMS = two_sum three_sum valid-parentheses reverse_linked_list binary_search binary_tree_level_order longest_substring bfs_graph fibonacci_dp n_queens bubble_sort bst_search selection_sort insertion_sort merge_sort quick_sort counting_sort radix_sort stack_ll queue_ll deque_ll factorial recursion_fib doubly_linked_list randomized_quick_sort towers_of_hanoi tree_inorder tree_preorder tree_postorder dfs_graph circular_queue \
	infix_to_postfix infix_to_prefix postfix_evaluation message_queue singly_linked_list_complete \
	circular_sll circular_dll polynomial_multiplication long_integer_addition \
	bst_insert bst_delete expression_tree \
	heap_construction heap_sort priority_queue \
	avl_tree trie threaded_binary_tree b_plus_tree splay_tree \
	adjacency_matrix adjacency_list \
	open_hashing closed_hashing_linear closed_hashing_quadratic closed_hashing_double \
	long_integer_multiplication strassen_matrix_multiplication topological_sort presorting heapify problem_reduction \
	naive_string_matching horspool_algorithm boyer_moore_algorithm binomial_coefficient warshall_algorithm floyd_algorithm \
	knapsack_01 memoization prim_algorithm dijkstra_algorithm huffman_coding fractional_knapsack \
	sum_of_subsets tsp assignment_problem decision_trees_sorting comparison_trees lower_bound_sorting \
	non_deterministic_algorithms class_p class_np np_complete np_hard polynomial_time_reduction \
	astar_search tarjan_scc kosaraju_scc kmp_string rabin_karp z_algorithm bellman_ford trie_insert_search fenwick_tree segment_tree union_find graham_scan

# Default target
all: $(ALGORITHMS)

# Development build with sanitizers
dev: CFLAGS := $(CFLAGS_DEV)
dev: clean all

# Production build with optimizations
prod: CFLAGS := $(CFLAGS_PROD)
prod: clean all

# Compile logger
$(BUILD_DIR)/logger.o: $(SRC_DIR)/logger.c include/logger.h | $(BUILD_DIR)
	$(CC) $(CFLAGS) -c $< -o $@

# Pattern rule for algorithms
# Each algorithm should have a .c file in src/
# e.g., src/two_sum.c -> build/two_sum
%: $(SRC_DIR)/%.c $(BUILD_DIR)/logger.o | $(BUILD_DIR)
	$(CC) $(CFLAGS) $< $(BUILD_DIR)/logger.o -o $(BUILD_DIR)/$@

$(BUILD_DIR):
	mkdir -p $(BUILD_DIR)

# Run all algorithms with test inputs (basic smoke test)
test: all
	@echo "Running basic smoke tests..."
	@$(BUILD_DIR)/bubble_sort 5,3,8,1,9 || true
	@$(BUILD_DIR)/binary_search 1,2,3,4,5 3 || true
	@$(BUILD_DIR)/factorial 5 || true
	@echo "Smoke tests complete"

# Format C code using clang-format
format:
	clang-format -i $(SRC_DIR)/*.c include/*.h

# Check formatting without modifying files
format-check:
	clang-format --dry-run --Werror $(SRC_DIR)/*.c include/*.h

# Run with valgrind for memory leak detection (Unix only)
valgrind-%: $(BUILD_DIR)/%
	valgrind --leak-check=full --show-leak-kinds=all $(BUILD_DIR)/$*

clean:
	rm -rf $(BUILD_DIR)

.PHONY: all clean dev prod test format format-check
