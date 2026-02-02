#!/bin/bash

# Automated fix for the 21 C files with JSON issues
# This script adds missing log_finish() calls and reports files needing manual fixes

BACKEND_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC_DIR="$BACKEND_DIR/src"

echo "======================================"
echo "Automated C File JSON Fixer"
echo "======================================"
echo ""

# Files needing log_finish() added (from diagnostic)
files_missing_log_finish=(
    "counting_sort.c"
    "deque_ll.c"
    "doubly_linked_list.c"
    "factorial.c"
    "insertion_sort.c"
    "merge_sort.c"
    "queue_ll.c"
    "quick_sort.c"
    "radix_sort.c"
    "randomized_quick_sort.c"
    "recursion_fib.c"
    "selection_sort.c"
    "splay_tree.c"
    "stack_ll.c"
    "trie.c"
)

# Files needing manual fix (standalone log_message calls)
files_need_manual_fix=(
    "avl_tree.c"
    "bst_delete.c"
    "bst_insert.c"
    "expression_tree.c"
    "heap_construction.c"
    "postfix_evaluation.c"
)

echo "Step 1: Adding missing log_finish() calls"
echo "------------------------------------------"

for file in "${files_missing_log_finish[@]}"; do
    filepath="$SRC_DIR/$file"
    
    if [ ! -f "$filepath" ]; then
        echo "⚠️  $file: Not found"
        continue
    fi
    
    # Check if log_finish already exists
    if grep -q "log_finish()" "$filepath"; then
        echo "✅ $file: Already has log_finish()"
        continue
    fi
    
    # Add log_finish() before the last return 0;
    # Find the last occurrence of 'return 0;' and add log_finish() before it
    awk '
        /return 0;/ {
            if (!found_last) {
                # Store the line
                stored[++count] = $0
            }
        }
        !/return 0;/ {
            # Print any stored lines first
            for (i = 1; i <= count; i++) {
                print stored[i]
            }
            count = 0
            # Print current line
            print
        }
        END {
            # At the end, print stored lines with log_finish before the last one
            for (i = 1; i < count; i++) {
                print stored[i]
            }
            if (count > 0) {
                print "    log_finish();"
                print stored[count]
            }
        }
    ' "$filepath" > "$filepath.tmp" && mv "$filepath.tmp" "$filepath"
    
    echo "✅ $file: Added log_finish()"
done

echo ""
echo "Step 2: Files needing manual fixes"
echo "-----------------------------------"
echo ""

for file in "${files_need_manual_fix[@]}"; do
    filepath="$SRC_DIR/$file"
    base=$(basename "$file" .c)
    
    echo "📝 $file"
    echo "   Issue: Standalone log_message() calls outside log_step pairs"
    echo ""
    
    # Find standalone log_message calls (not in log_step blocks)
    echo "   Problematic patterns found:"
    awk '
        /log_step_start\(\)/ { in_step = 1; next }
        /log_step_end\(\)/ { in_step = 0; next }
        /log_message\(/ && !in_step && !/log_init|log_finish/ {
            printf "   Line %d: %s\n", NR, $0
        }
    ' "$filepath"
    
    echo ""
    echo "   Manual fix needed:"
    echo "   1. Identify the standalone log_message() calls listed above"
    echo "   2. Either:"
    echo "      a) Remove them if they're redundant/duplicate markers"
    echo "      b) Wrap them in log_step_start() ... log_step_end()"
    echo "   3. Ensure they don't print duplicate markers like 'DISPLAY_AVL'"
    echo ""
done

echo "======================================"
echo "Summary"
echo "======================================"
echo ""
echo "Automated fixes: ${#files_missing_log_finish[@]} files"
echo "Manual fixes needed: ${#files_need_manual_fix[@]} files"
echo ""
echo "Next steps:"
echo "1. Review the 6 files listed above and fix standalone log_message() calls"
echo "2. Rebuild: make clean && make all"
echo "3. Test: ../test.sh"
echo ""
