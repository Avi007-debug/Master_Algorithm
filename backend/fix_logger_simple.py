#!/usr/bin/env python3
"""
Fix all log_message calls with format specifiers in C files
"""

import re
import sys
import os

def fix_file(filepath):
    """Fix a single C file"""
    print(f"Processing {filepath}...")
    
    with open(filepath, 'r') as f:
        lines = f.readlines()
    
    fixed_lines = []
    i = 0
    
    while i < len(lines):
        line = lines[i]
        
        # Check for log_message with format specifiers
        match = re.match(r'^(\s*)log_message\("([^"]*)"(,\s*(.+))?\);?\s*$', line)
        if match and '%' in match.group(2):
            indent = match.group(1)
            format_str = match.group(2)
            args_part = match.group(4) if match.group(4) else None
            
            if args_part:  # Has format arguments
                # Remove trailing );
                args = args_part.rstrip(');').rstrip()
                
                fixed_lines.append(f'{indent}char msg[256];\n')
                fixed_lines.append(f'{indent}sprintf(msg, "{format_str}", {args});\n')
                fixed_lines.append(f'{indent}log_message(msg);\n')
                i += 1
                continue
        
        fixed_lines.append(line)
        i += 1
    
    with open(filepath, 'w') as f:
        f.writelines(fixed_lines)
    
    print(f"Fixed {filepath}")

if __name__ == '__main__':
    files = [
        'src/adjacency_list.c',
        'src/avl_tree.c',
        'src/b_plus_tree.c',
        'src/closed_hashing_linear.c',
        'src/closed_hashing_quadratic.c',
        'src/splay_tree.c',
    ]
    
    for filepath in files:
        if os.path.exists(filepath):
            fix_file(filepath)
        else:
            print(f"File not found: {filepath}")
