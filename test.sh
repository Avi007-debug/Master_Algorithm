#!/bin/bash

# Comprehensive test script for Algorithm Visualization Platform

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "======================================"
echo "Algorithm Visualization Platform Tests"
echo "======================================"
echo ""

# Change to backend directory
cd "$(dirname "$0")/backend" || exit 1

# Test 1: Check build directory
echo "Test 1: Checking build directory..."
if [ ! -d "build" ]; then
    echo -e "${RED}✗ Build directory not found${NC}"
    echo "Run 'make all' first"
    exit 1
fi

# Count executables
exe_count=$(ls build/ 2>/dev/null | grep -v "\.o$" | wc -l)
echo -e "${GREEN}✓ Found $exe_count executables${NC}"
echo ""

# Test 2: JSON Validity
echo "Test 2: Testing JSON validity of all executables..."
json_valid=0
json_invalid=0
invalid_files=()

for prog in build/*; do
    if [ -x "$prog" ] && [[ ! "$prog" =~ \.o$ ]]; then
        progname=$(basename "$prog")
        if timeout 2 "$prog" 2>&1 | python3 -m json.tool > /dev/null 2>&1; then
            ((json_valid++))
        else
            ((json_invalid++))
            invalid_files+=("$progname")
        fi
    fi
done

echo -e "${GREEN}✓ Valid JSON: $json_valid${NC}"
if [ $json_invalid -gt 0 ]; then
    echo -e "${RED}✗ Invalid JSON: $json_invalid${NC}"
    echo "Files with issues:"
    for file in "${invalid_files[@]}"; do
        echo "  - $file"
    done
else
    echo -e "${GREEN}✓ All executables produce valid JSON!${NC}"
fi
echo ""

# Test 3: Check if server starts
echo "Test 3: Checking server configuration..."
if [ ! -f "server.js" ]; then
    echo -e "${RED}✗ server.js not found${NC}"
    exit 1
fi

if [ ! -f "package.json" ]; then
    echo -e "${RED}✗ package.json not found${NC}"
    exit 1
fi

if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠ node_modules not found. Run 'npm install'${NC}"
else
    echo -e "${GREEN}✓ Node modules installed${NC}"
fi
echo ""

# Test 4: Environment files
echo "Test 4: Checking environment configuration..."
if [ -f ".env" ]; then
    echo -e "${GREEN}✓ .env file exists${NC}"
else
    echo -e "${YELLOW}⚠ .env file not found. Copy from .env.example${NC}"
fi

if [ -f ".env.example" ]; then
    echo -e "${GREEN}✓ .env.example exists${NC}"
else
    echo -e "${YELLOW}⚠ .env.example not found${NC}"
fi
echo ""

# Test 5: Test API endpoints (if server is running)
echo "Test 5: Testing API endpoints..."
if curl -s http://localhost:3001/health > /dev/null 2>&1; then
    health=$(curl -s http://localhost:3001/health)
    echo -e "${GREEN}✓ Server is running${NC}"
    echo "Health check response: $health"
    
    # Test a simple algorithm
    echo ""
    echo "Testing bubble_sort endpoint..."
    response=$(curl -s -X POST http://localhost:3001/run/bubble_sort \
        -H "Content-Type: application/json" \
        -d '{"inputs": []}' 2>&1)
    
    if echo "$response" | python3 -m json.tool > /dev/null 2>&1; then
        echo -e "${GREEN}✓ API endpoint working${NC}"
    else
        echo -e "${RED}✗ API endpoint returned invalid JSON${NC}"
        echo "Response: $response"
    fi
else
    echo -e "${YELLOW}⚠ Server not running. Start with 'npm start'${NC}"
fi
echo ""

# Test 6: Frontend build
echo "Test 6: Checking frontend..."
cd ../frontend || exit 1

if [ ! -f "package.json" ]; then
    echo -e "${RED}✗ Frontend package.json not found${NC}"
    exit 1
fi

if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠ Frontend node_modules not found. Run 'npm install'${NC}"
else
    echo -e "${GREEN}✓ Frontend modules installed${NC}"
fi

if [ -f ".env" ]; then
    echo -e "${GREEN}✓ Frontend .env exists${NC}"
else
    echo -e "${YELLOW}⚠ Frontend .env not found. Copy from .env.example${NC}"
fi
echo ""

# Summary
echo "======================================"
echo "Test Summary"
echo "======================================"
echo -e "Executables found: ${GREEN}$exe_count${NC}"
echo -e "JSON valid: ${GREEN}$json_valid${NC}"
echo -e "JSON invalid: ${RED}$json_invalid${NC}"
echo ""

if [ $json_invalid -eq 0 ]; then
    echo -e "${GREEN}✓ All tests passed!${NC}"
    echo "System is ready for deployment."
    exit 0
else
    echo -e "${YELLOW}⚠ Some issues found.${NC}"
    echo "Review the issues above before deployment."
    echo "See ISSUES.md for known issues and fixes."
    exit 1
fi
