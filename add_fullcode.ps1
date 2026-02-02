# Script to add fullCode property to algorithms in problems.js
# Maps algorithm IDs to their C source files

$algorithmMappings = @{
    'infix_to_postfix' = 'infix_to_postfix.c'
    'infix_to_prefix' = 'infix_to_prefix.c'
    'postfix_evaluation' = 'postfix_evaluation.c'
    'message_queue' = 'message_queue.c'
    'singly_linked_list_complete' = 'singly_linked_list_complete.c'
    'circular_sll' = 'circular_sll.c'
    'circular_dll' = 'circular_dll.c'
    'polynomial_multiplication' = 'polynomial_multiplication.c'
    'long_integer_addition' = 'long_integer_addition.c'
    'bst_insert' = 'bst_insert.c'
    'bst_delete' = 'bst_delete.c'
    'expression_tree' = 'expression_tree.c'
    'heap_construction' = 'heap_construction.c'
    'heap_sort' = 'heap_sort.c'
    'priority_queue' = 'priority_queue.c'
    'avl_tree' = 'avl_tree.c'
    'trie' = 'trie.c'
    'threaded_binary_tree' = 'threaded_binary_tree.c'
    'b_plus_tree' = 'b_plus_tree.c'
    'splay_tree' = 'splay_tree.c'
    'adjacency_matrix' = 'adjacency_matrix.c'
    'adjacency_list' = 'adjacency_list.c'
    'open_hashing' = 'open_hashing.c'
    'closed_hashing_linear' = 'closed_hashing_linear.c'
    'closed_hashing_quadratic' = 'closed_hashing_quadratic.c'
    'closed_hashing_double' = 'closed_hashing_double.c'
}

$backendPath = "C:\Coding\ALGO-VISUALIZATION\backend\src"
$problemsJsPath = "C:\Coding\ALGO-VISUALIZATION\frontend\src\data\problems.js"

# Read problems.js
$content = Get-Content $problemsJsPath -Raw

$count = 0

foreach ($algoId in $algorithmMappings.Keys) {
    $cFile = Join-Path $backendPath $algorithmMappings[$algoId]
    
    if (Test-Path $cFile) {
        # Read C file content
        $cCode = Get-Content $cFile -Raw
        
        # Escape backticks and backslashes for JavaScript template literal
        $cCode = $cCode -replace '\\', '\\'
        $cCode = $cCode -replace '`', '\`'
        $cCode = $cCode -replace '\$', '\$'
        
        # Find the algorithm block and check if it already has fullCode
        $pattern = "id: `"$algoId`"[\s\S]*?runCommand: '$algoId'"
        
        if ($content -match $pattern) {
            $algoBlock = $Matches[0]
            
            # Check if fullCode already exists
            if ($algoBlock -notmatch 'fullCode:') {
                # Insert fullCode before codeSnippet
                $insertPattern = "(id: `"$algoId`"[\s\S]*?description: `"[^`"]+`",\s+)"
                $replacement = "`$1fullCode: ``$cCode``,`n        "
                
                $content = $content -replace $insertPattern, $replacement
                $count++
                Write-Host "Added fullCode for: $algoId"
            } else {
                Write-Host "Skipped (already has fullCode): $algoId"
            }
        } else {
            Write-Host "WARNING: Could not find algorithm block for: $algoId"
        }
    } else {
        Write-Host "WARNING: C file not found: $cFile"
    }
}

# Save updated content
$content | Set-Content $problemsJsPath -NoNewline

Write-Host "`nCompleted! Added fullCode to $count algorithms."
