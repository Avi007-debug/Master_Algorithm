#!/bin/bash
# Script to fix log_message calls in C files

fix_file() {
    local file="$1"
    echo "Processing $file..."
    
    # Create a backup
    cp "$file" "$file.bak"
    
    # Use Python to fix the file properly
    python3 << 'EOF'
import re
import sys

file_path = sys.argv[1]

with open(file_path, 'r') as f:
    content = f.read()

# Pattern to match log_message calls with format specifiers
# This is a multi-line aware replacement
lines = content.split('\n')
result = []
i = 0

while i < len(lines):
    line = lines[i]
    
    # Simple case: log_message with format string on same line
    match = re.match(r'^(\s*)log_message\("([^"]*%[^"]*)"(,\s*.+)?\);?\s*$', line)
    if match:
        indent = match.group(1)
        format_str = match.group(2)
        args = match.group(3) if match.group(3) else ""
        
        if args:  # Has arguments
            args = args[1:].strip()  # Remove leading comma
            result.append(f'{indent}char msg[256];')
            result.append(f'{indent}sprintf(msg, "{format_str}", {args});')
            result.append(f'{indent}log_message(msg);')
        else:
            result.append(line)
        i += 1
        continue
    
    result.append(line)
    i += 1

with open(file_path, 'w') as f:
    f.write('\n'.join(result))
EOF
python3 -c "
import sys
file_path = '$file'
exec(open('/dev/stdin').read())
" < /dev/stdin
}

# Fix all files
for file in src/adjacency_list.c src/avl_tree.c src/b_plus_tree.c src/closed_hashing_linear.c src/closed_hashing_quadratic.c src/splay_tree.c src/trie.c; do
    fix_file "$file"
done
