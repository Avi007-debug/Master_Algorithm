# Create build folder
if (!(Test-Path -Path "build")) {
    New-Item -ItemType Directory -Path "build" | Out-Null
}

# Compile logger
Write-Host "Compiling logger.c..."
gcc -Wall -Wextra -Iinclude -c src/logger.c -o build/logger.o
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to compile logger.c"
    exit 1
}

# Compile all algorithms
$files = Get-ChildItem -Path "src" -Filter "*.c"
foreach ($file in $files) {
    if ($file.Name -eq "logger.c") {
        continue
    }
    
    $name = $file.BaseName
    Write-Host "Compiling $name..."
    gcc -Wall -Wextra -Iinclude $file.FullName build/logger.o -o build/$name.exe
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "Failed to compile $name"
    }
}

Write-Host "Compilation complete!"
