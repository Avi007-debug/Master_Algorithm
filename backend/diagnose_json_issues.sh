#!/bin/bash

# Manual Fix Guide for C Files with JSON Issues
# This script identifies the specific issues in each failing file

BACKEND_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BUILD_DIR="$BACKEND_DIR/build"

echo "======================================"
echo "C File JSON Issue Diagnostic Tool"
echo "======================================"
echo ""

# Array of files with issues (from test.sh)
failing_files=(
    "avl_tree"
    "bst_delete"
    "bst_insert"
    "counting_sort"
    "deque_ll"
    "doubly_linked_list"
    "expression_tree"
    "factorial"
    "heap_construction"
    "insertion_sort"
    "merge_sort"
    "postfix_evaluation"
    "queue_ll"
    "quick_sort"
    "radix_sort"
    "randomized_quick_sort"
    "recursion_fib"
    "selection_sort"
    "splay_tree"
    "stack_ll"
    "trie"
)

echo "Analyzing ${#failing_files[@]} files with JSON issues..."
echo ""

for file in "${failing_files[@]}"; do
    exe="$BUILD_DIR/$file"
    src="$BACKEND_DIR/src/${file}.c"
    
    if [ ! -x "$exe" ]; then
        echo "⚠️  $file: Executable not found"
        continue
    fi
    
    echo "📄 $file"
    echo "   Source: $src"
    
    # Run and capture JSON
    json_output=$("$exe" 2>&1)
    
    # Check for common issues
    
    # Issue 1: Double closing brackets
    if echo "$json_output" | grep -q "^\]\s*$" | tail -1; then
        double_bracket=$(echo "$json_output" | tail -5 | grep -c "^\]")
        if [ "$double_bracket" -gt 1 ]; then
            echo "   ❌ Issue: Double ] at end (duplicate log_finish)"
            echo "   Fix: Search for log_finish() in $src and remove duplicate"
            echo ""
            continue
        fi
    fi
    
    # Issue 2: Missing closing bracket
    if ! echo "$json_output" | tail -1 | grep -q "^\]"; then
        echo "   ❌ Issue: Missing ] at end (no log_finish)"
        echo "   Fix: Add log_finish(); before return 0; in main()"
        echo ""
        continue
    fi
    
    # Issue 3: Malformed JSON (check with python)
    error_msg=$(echo "$json_output" | python3 -m json.tool 2>&1 | head -1)
    if echo "$error_msg" | grep -q "Error\|Expecting"; then
        echo "   ❌ Issue: $error_msg"
        
        # Try to identify the issue
        if echo "$error_msg" | grep -q "position"; then
            pos=$(echo "$error_msg" | grep -oP 'position \K\d+')
            echo "   Context around error:"
            echo "$json_output" | head -c "$((pos + 100))" | tail -c 200
        fi
        
        echo ""
        echo "   Common fixes:"
        echo "   - Ensure all log_message() calls are between log_step_start/end"
        echo "   - Remove any nested log_step_start calls"
        echo "   - Check for standalone log_message calls in main()"
        echo ""
        continue
    fi
    
    echo "   ✅ Unexpected: JSON appears valid but failed in test"
    echo ""
done

echo "======================================"
echo "Fix Priorities"
echo "======================================"
echo ""
echo "1. Double log_finish() calls (search and remove duplicates)"
echo "2. Missing log_finish() calls (add before return 0;)"
echo "3. Standalone log_message() calls (wrap in log_step pairs)"
echo "4. Nested log_step calls (flatten structure)"
echo ""
echo "For detailed fixes, see ISSUES.md"
echo ""
echo "After fixing files, rebuild:"
echo "  make all"
echo ""
echo "Then test again:"
echo "  ../test.sh"
