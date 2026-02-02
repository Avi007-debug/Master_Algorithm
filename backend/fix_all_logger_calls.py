#!/usr/bin/env python3
"""
Script to automatically fix all log_message calls to use sprintf
"""

import re
import sys

def fix_log_message_calls(content):
    """Fix log_message calls that use format strings"""
    lines = content.split('\n')
    result = []
    i = 0
    
    while i < len(lines):
        line = lines[i]
        
        # Check if this line contains a log_message call with format specifiers
        if 'log_message(' in line and re.search(r'%[dscf]', line):
            # Extract indentation
            indent = len(line) - len(line.lstrip())
            spaces = ' ' * indent
            
            # Try to extract the complete log_message call (might span multiple lines)
            call_text = line
            paren_count = line.count('(') - line.count(')')
            j = i + 1
            while paren_count > 0 and j < len(lines):
                call_text += '\n' + lines[j]
                paren_count += lines[j].count('(') - lines[j].count(')')
                j += 1
            
            # Extract the arguments
            match = re.search(r'log_message\s*\((.*)\)', call_text, re.DOTALL)
            if match:
                args = match.group(1)
                # Split arguments - this is a simplified approach
                # Find the format string (first argument)
                if args.strip().startswith('"'):
                    # Find the end of the format string
                    format_end = args.find('"', 1)
                    if format_end != -1:
                        format_str = args[:format_end+1]
                        remaining_args = args[format_end+1:].strip()
                        if remaining_args.startswith(','):
                            remaining_args = remaining_args[1:].strip()
                        
                        if remaining_args:  # Has format arguments
                            # Generate the fixed code
                            result.append(spaces + 'char msg[256];')
                            result.append(spaces + f'sprintf(msg, {format_str}, {remaining_args});')
                            result.append(spaces + 'log_message(msg);')
                            i = j
                            continue
        
        result.append(line)
        i += 1
    
    return '\n'.join(result)

def process_file(filepath):
    """Process a single file"""
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        
        fixed_content = fix_log_message_calls(content)
        
        with open(filepath, 'w') as f:
            f.write(fixed_content)
        
        print(f"Fixed: {filepath}")
        return True
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False

if __name__ == '__main__':
    files_to_fix = [
        'src/adjacency_list.c',
        'src/avl_tree.c',
        'src/b_plus_tree.c',
        'src/closed_hashing_linear.c',
        'src/closed_hashing_quadratic.c',
        'src/splay_tree.c',
        'src/trie.c',
    ]
    
    for file in files_to_fix:
        process_file(file)
