#!/bin/bash

# Deploy Script - One command to deploy ALGO-VISUALIZATION
# Usage: ./deploy.sh [local|docker|test]

set -e

BACKEND_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/backend" && pwd)"
FRONTEND_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/frontend" && pwd)"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

print_header() {
    echo ""
    echo "======================================"
    echo "$1"
    echo "======================================"
    echo ""
}

print_success() {
    echo "✅ $1"
}

print_error() {
    echo "❌ $1"
    exit 1
}

print_warning() {
    echo "⚠️  $1"
}

check_dependencies() {
    print_header "Checking Dependencies"
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js not found. Install Node 16+ first."
    fi
    print_success "Node.js $(node --version)"
    
    if ! command -v npm &> /dev/null; then
        print_error "npm not found."
    fi
    print_success "npm $(npm --version)"
    
    if ! command -v make &> /dev/null; then
        print_error "make not found. Install build-essential (Linux) or Xcode (Mac)."
    fi
    print_success "make available"
    
    if ! command -v gcc &> /dev/null; then
        print_error "gcc not found. Install build-essential (Linux) or Xcode (Mac)."
    fi
    print_success "gcc $(gcc --version | head -1)"
}

deploy_local() {
    print_header "Deploying for Local Development"
    
    # Backend
    print_success "Setting up backend..."
    cd "$BACKEND_DIR"
    
    if [ ! -d "node_modules" ]; then
        print_success "Installing backend dependencies..."
        npm install
    fi
    
    if [ ! -f ".env" ]; then
        print_success "Creating .env from example..."
        cp .env.example .env
    fi
    
    print_success "Building C programs..."
    make clean && make all
    
    # Count working algorithms
    working=0
    total=0
    for exe in build/*; do
        if [ -x "$exe" ]; then
            total=$((total + 1))
            if "$exe" 2>&1 | python3 -m json.tool > /dev/null 2>&1; then
                working=$((working + 1))
            fi
        fi
    done
    
    print_success "Built $total executables, $working produce valid JSON"
    
    # Frontend
    print_success "Setting up frontend..."
    cd "$FRONTEND_DIR"
    
    if [ ! -d "node_modules" ]; then
        print_success "Installing frontend dependencies..."
        npm install
    fi
    
    if [ ! -f ".env" ]; then
        print_success "Creating .env from example..."
        cp .env.example .env
    fi
    
    print_header "Deployment Complete!"
    echo "Start servers with:"
    echo ""
    echo "Terminal 1 (Backend):"
    echo "  cd $BACKEND_DIR"
    echo "  npm start"
    echo ""
    echo "Terminal 2 (Frontend):"
    echo "  cd $FRONTEND_DIR"
    echo "  npm run dev"
    echo ""
    echo "Then open: http://localhost:5173"
    echo ""
}

deploy_docker() {
    print_header "Deploying with Docker"
    
    if ! command -v docker &> /dev/null; then
        print_error "Docker not found. Install Docker first: https://docs.docker.com/get-docker/"
    fi
    print_success "Docker $(docker --version)"
    
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null 2>&1; then
        print_error "docker-compose not found. Install it first."
    fi
    print_success "docker-compose available"
    
    cd "$ROOT_DIR"
    
    # Check for .env files
    if [ ! -f "backend/.env" ]; then
        print_warning "backend/.env not found, creating from example..."
        cp backend/.env.example backend/.env
    fi
    
    if [ ! -f "frontend/.env" ]; then
        print_warning "frontend/.env not found, creating from example..."
        cp frontend/.env.example frontend/.env
    fi
    
    print_success "Building Docker images..."
    docker-compose build
    
    print_success "Starting containers..."
    docker-compose up -d
    
    echo ""
    echo "Waiting for services to be healthy..."
    sleep 5
    
    # Check health
    if curl -f http://localhost:3001/health > /dev/null 2>&1; then
        print_success "Backend is healthy"
    else
        print_warning "Backend health check failed, check logs: docker-compose logs backend"
    fi
    
    print_header "Deployment Complete!"
    echo "Services running:"
    echo "  Frontend: http://localhost"
    echo "  Backend:  http://localhost:3001"
    echo "  Health:   http://localhost:3001/health"
    echo ""
    echo "View logs: docker-compose logs -f"
    echo "Stop: docker-compose down"
    echo ""
}

run_tests() {
    print_header "Running Tests"
    
    cd "$ROOT_DIR"
    
    if [ ! -x "test.sh" ]; then
        chmod +x test.sh
    fi
    
    ./test.sh
}

show_help() {
    echo "ALGO-VISUALIZATION Deployment Script"
    echo ""
    echo "Usage: ./deploy.sh [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  local     Deploy for local development (default)"
    echo "  docker    Deploy using Docker Compose"
    echo "  test      Run comprehensive tests"
    echo "  help      Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./deploy.sh              # Local development"
    echo "  ./deploy.sh docker       # Docker deployment"
    echo "  ./deploy.sh test         # Run tests"
    echo ""
    echo "For production deployment, see DEPLOYMENT.md"
    echo ""
}

# Main script logic
check_dependencies

case "${1:-local}" in
    local)
        deploy_local
        ;;
    docker)
        deploy_docker
        ;;
    test)
        run_tests
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        print_error "Unknown command: $1. Use './deploy.sh help' for usage."
        ;;
esac
