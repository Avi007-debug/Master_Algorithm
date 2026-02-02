#!/usr/bin/env python3
"""
Fix redeclaration of msg in C files by moving declaration to function start
"""

import re

def fix_msg_redeclarations(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Split into lines
    lines = content.split('\n')
    result = []
    i = 0
    
    while i < len(lines):
        line = lines[i]
        
        # If we find a function definition
        if re.match(r'^\w+.*\(.*\)\s*\{?\s*$', line) and '{' in line or (i + 1 < len(lines) and '{' in lines[i + 1]):
            # This is a function start, collect the whole function
            func_start = i
            result.append(line)
            i += 1
            
            # Find opening brace
            brace_count = line.count('{') - line.count('}')
            while brace_count == 0 and i < len(lines):
                result.append(lines[i])
                brace_count += lines[i].count('{') - lines[i].count('}')
                i += 1
            
            # Now we're inside the function, collect all lines until function ends
            func_lines = []
            while i < len(lines) and brace_count > 0:
                func_lines.append(lines[i])
                brace_count += lines[i].count('{') - lines[i].count('}')
                i += 1
            
            # Check if this function has multiple "char msg[256];" declarations
            msg_count = sum(1 for l in func_lines if re.search(r'^\s*char msg\[256\];', l))
            
            if msg_count > 1:
                # Remove all "char msg[256];" and add one at the start
                new_func_lines = []
                added_msg = False
                for l in func_lines:
                    if re.search(r'^\s*char msg\[256\];', l):
                        if not added_msg:
                            # Find the indentation of the first line with code
                            indent_match = re.match(r'^(\s*)\S', func_lines[0])
                            if indent_match:
                                indent = indent_match.group(1)
                            else:
                                indent = '    '
                            new_func_lines.append(f'{indent}char msg[256];')
                            added_msg = True
                        # Skip this declaration
                        continue
                    new_func_lines.append(l)
                result.extend(new_func_lines)
            else:
                result.extend(func_lines)
        else:
            result.append(line)
            i += 1
    
    with open(filepath, 'w') as f:
        f.write('\n'.join(result))
    
    print(f"Fixed: {filepath}")

if __name__ == '__main__':
    fix_msg_redeclarations('src/closed_hashing_quadratic.c')
