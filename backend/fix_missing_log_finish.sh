#!/bin/bash

# Script to add log_finish() calls to C files that are missing them
# This ensures all programs output valid JSON

BACKEND_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC_DIR="$BACKEND_DIR/src"

echo "Checking C files for missing log_finish() calls..."

files_fixed=0

for file in "$SRC_DIR"/*.c; do
    filename=$(basename "$file")
    
    # Skip logger.c itself
    if [ "$filename" = "logger.c" ]; then
        continue
    fi
    
    # Check if file has main function and log_init but no log_finish
    if grep -q "int main" "$file" && \
       grep -q "log_init()" "$file" && \
       ! grep -q "log_finish()" "$file"; then
        
        echo "Fixing: $filename"
        
        # Add log_finish() before return 0 in main
        sed -i 's/\([ \t]*\)return 0;/\1log_finish();\n\1return 0;/g' "$file"
        
        ((files_fixed++))
    fi
done

echo ""
echo "Fixed $files_fixed files"
echo ""
echo "Rebuilding..."
make clean && make all

echo ""
echo "Testing JSON validity of all executables..."
errors=0

for prog in "$BACKEND_DIR/build"/*; do
    if [ -x "$prog" ] && [ ! "$prog" = *".o" ]; then
        progname=$(basename "$prog")
        if timeout 2 "$prog" 2>&1 | python3 -m json.tool > /dev/null 2>&1; then
            echo "✓ $progname"
        else
            echo "✗ $progname"
            ((errors++))
        fi
    fi
done

echo ""
if [ $errors -eq 0 ]; then
    echo "✓ All executables produce valid JSON!"
else
    echo "⚠ $errors executable(s) still have JSON issues"
fi
