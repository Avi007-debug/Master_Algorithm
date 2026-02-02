#!/bin/bash
#
# Auto-fix the 6 remaining files by removing standalone log_message calls
# These calls are causing malformed JSON output
#

echo "======================================"
echo "Fixing 6 remaining C files"
echo "======================================"
echo

FILES=(
    "src/avl_tree.c"
    "src/bst_delete.c"
    "src/bst_insert.c"
    "src/expression_tree.c"
    "src/heap_construction.c"
    "src/postfix_evaluation.c"
)

# Backup directory
BACKUP_DIR="./src_backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

for file in "${FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ $file not found, skipping..."
        continue
    fi
    
    echo "📝 Processing $file..."
    
    # Create backup
    cp "$file" "$BACKUP_DIR/$(basename $file)"
    
    # The fix: Comment out standalone log_message() calls that are NOT
    # already within a log_step_start/log_step_end block
    # We'll use a Python script for this more complex task
    
    python3 - "$file" << 'PYTHON_SCRIPT'
import sys
import re

def fix_file(filename):
    with open(filename, 'r') as f:
        lines = f.readlines()
    
    in_log_step = False
    in_main = False
    fixed_lines = []
    changes_made = 0
    
    for i, line in enumerate(lines):
        # Track if we're in main function
        if 'int main(' in line:
            in_main = True
        
        # Track log_step blocks
        if 'log_step_start(' in line or 'log_step_start_marker(' in line:
            in_log_step = True
        elif 'log_step_end(' in line or 'log_step_end_marker(' in line:
            in_log_step = False
        
        # If we find a standalone log_message() call (not in a log_step)
        # and it's inside a helper function (not main), comment it out
        if 'log_message(' in line and not in_log_step:
            # Skip if it's in main function - those are usually OK
            # Skip if it's already commented
            # Skip if it's part of log initialization
            if not in_main and '//' not in line.split('log_message')[0]:
                # Comment it out
                indent = len(line) - len(line.lstrip())
                fixed_lines.append(' ' * indent + '// ' + line.lstrip())
                changes_made += 1
            else:
                fixed_lines.append(line)
        else:
            fixed_lines.append(line)
    
    # Write back
    with open(filename, 'w') as f:
        f.writelines(fixed_lines)
    
    return changes_made

if __name__ == '__main__':
    filename = sys.argv[1]
    changes = fix_file(filename)
    print(f"  Changes made: {changes}")

PYTHON_SCRIPT

done

echo
echo "======================================"
echo "Done!"
echo "======================================"
echo "Backups stored in: $BACKUP_DIR"
echo
echo "Next steps:"
echo "1. Rebuild: make clean && make all"
echo "2. Test the fixed algorithms"
