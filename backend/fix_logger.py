import re
import sys

def fix_logger_calls(content):
    # Add msg buffer at start of functions that need it
    lines = content.split('\n')
    result = []
    in_function = False
    needs_msg_buffer = False
    added_buffer = False
    
    for i, line in enumerate(lines):
        # Check if line has problematic log calls
        if re.search(r'log_(message|step_start|step_end)\([^)]*,', line):
            needs_msg_buffer = True
        
        # Detect function start
        if re.match(r'^(\w+\s+)*\w+\s+\w+\([^)]*\)\s*{', line) or (i > 0 and lines[i-1].strip().endswith(')') and line.strip() == '{'):
            in_function = True
            added_buffer = False
            result.append(line)
            continue
            
        # Add msg buffer after opening brace if needed
        if in_function and not added_buffer and line.strip() and not line.strip().startswith('//'):
            if needs_msg_buffer:
                result.append('    char msg[256];')
                added_buffer = True
                needs_msg_buffer = False
            in_function = False
        
        result.append(line)
    
    content = '\n'.join(result)
    
    # Fix log_message calls with formatting
    def fix_log_message(match):
        full = match.group(0)
        args = match.group(1)
        
        # Count commas not in quotes
        in_quotes = False
        comma_count = 0
        for c in args:
            if c == '"':
                in_quotes = not in_quotes
            elif c == ',' and not in_quotes:
                comma_count += 1
        
        if comma_count > 0:
            # Has formatting arguments
            return f'sprintf(msg, {args});\n    log_message(msg);'
        return full
    
    content = re.sub(r'log_message\(([^)]+)\)', fix_log_message, content)
    
    # Fix log_step_start and log_step_end calls with arguments
    content = re.sub(r'log_step_start\([^)]+\)', 'log_step_start()', content)
    content = re.sub(r'log_step_end\([^)]+\)', 'log_step_end()', content)
    
    return content

if __name__ == '__main__':
    filename = sys.argv[1]
    with open(filename, 'r') as f:
        content = f.read()
    
    fixed = fix_logger_calls(content)
    
    with open(filename, 'w') as f:
        f.write(fixed)
    
    print(f'Fixed {filename}')
