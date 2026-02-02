# Deployment Guide

This guide covers deploying the Algorithm Visualization Platform for both development and production environments.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Local Development](#local-development)
- [Production Deployment](#production-deployment)
- [Environment Variables](#environment-variables)
- [Common Issues](#common-issues)

## Prerequisites

### System Requirements
- **Node.js**: v18 or higher
- **npm**: v9 or higher  
- **GCC/Clang**: For compiling C programs
- **Make**: Build automation tool
- **OS**: Linux, macOS, or WSL2 on Windows

### Dependencies Installation

```bash
# Install system dependencies (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install build-essential gcc make

# Install system dependencies (macOS)
brew install gcc make

# Install Node.js dependencies
cd backend && npm install
cd ../frontend && npm install
```

## Local Development

### 1. Backend Setup

```bash
cd backend

# Create environment file
cp .env.example .env

# Edit .env with your local settings
# Default values work for local development

# Build C programs
make all

# Verify build (should show 57+ executables)
ls build/ | grep -v "\.o$" | wc -l

# Start backend server
npm start
# Server runs on http://localhost:3001
```

### 2. Frontend Setup

```bash
cd frontend

# Create environment file
cp .env.example .env

# Start development server
npm run dev
# Frontend runs on http://localhost:5173
```

### 3. Access Application

Open your browser and navigate to:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## Production Deployment

### Option 1: VPS Deployment (DigitalOcean, Linode, AWS EC2)

#### Backend Deployment

```bash
# 1. SSH into your server
ssh user@your-server-ip

# 2. Clone repository
git clone https://github.com/yourusername/ALGO-VISUALIZATION.git
cd ALGO-VISUALIZATION/backend

# 3. Install dependencies
npm install --production

# 4. Build C programs
make all

# 5. Create production environment
cp .env.production .env
nano .env  # Edit with your production values

# 6. Install PM2 for process management
npm install -g pm2

# 7. Start backend with PM2
pm2 start server.js --name algo-viz-backend
pm2 save
pm2 startup  # Follow instructions to enable startup on boot

# 8. Setup Nginx reverse proxy
sudo apt-get install nginx

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/algo-viz-backend
```

**Nginx Backend Configuration** (`/etc/nginx/sites-available/algo-viz-backend`):
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/algo-viz-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Setup SSL with Let's Encrypt
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

#### Frontend Deployment

```bash
cd ../frontend

# 1. Create production environment
cp .env.production .env
nano .env  # Set VITE_API_URL=https://api.yourdomain.com

# 2. Build for production
npm run build

# 3. Create Nginx configuration
sudo nano /etc/nginx/sites-available/algo-viz-frontend
```

**Nginx Frontend Configuration** (`/etc/nginx/sites-available/algo-viz-frontend`):
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    root /path/to/ALGO-VISUALIZATION/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/algo-viz-frontend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Setup SSL
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### Option 2: Platform-as-a-Service (Vercel, Netlify, Railway)

#### Frontend on Vercel/Netlify

1. **Connect Repository**: Link your GitHub repository
2. **Configure Build Settings**:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Root Directory: `frontend`
3. **Environment Variables**: Add `VITE_API_URL` in platform settings
4. **Deploy**: Platform auto-deploys on git push

#### Backend on Railway/Render

1. **Create New Service**: Select your repository
2. **Configure**:
   - Root Directory: `backend`
   - Build Command: `npm install && make all`
   - Start Command: `npm start`
3. **Environment Variables**: Add all variables from `.env.production`
4. **Deploy**: Platform auto-deploys

### Option 3: Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build individually
docker build -t algo-viz-backend ./backend
docker build -t algo-viz-frontend ./frontend

docker run -p 3001:3001 --env-file backend/.env algo-viz-backend
docker run -p 80:80 algo-viz-frontend
```

## Environment Variables

### Backend (.env)

| Variable | Development | Production | Description |
|----------|-------------|------------|-------------|
| `PORT` | 3001 | 3001 or dynamic | Server port |
| `NODE_ENV` | development | production | Environment mode |
| `EXECUTION_TIMEOUT` | 5000 | 5000 | Max execution time (ms) |
| `MAX_INPUT_LENGTH` | 1000 | 1000 | Max input string length |
| `MAX_INPUTS` | 100 | 100 | Max number of inputs |
| `ALLOWED_ORIGINS` | localhost:5173 | your-domain.com | CORS allowed origins |

### Frontend (.env)

| Variable | Development | Production | Description |
|----------|-------------|------------|-------------|
| `VITE_API_URL` | http://localhost:3001 | https://api.yourdomain.com | Backend API URL |

## Post-Deployment Checks

```bash
# 1. Health check
curl https://api.yourdomain.com/health

# 2. Test algorithm execution
curl -X POST https://api.yourdomain.com/run/bubble_sort \
  -H "Content-Type: application/json" \
  -d '{"inputs": []}'

# 3. Check frontend loads
curl https://yourdomain.com

# 4. Monitor backend logs
pm2 logs algo-viz-backend

# 5. Check Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Performance Optimization

### Backend
- Enable gzip compression in Nginx
- Use PM2 cluster mode: `pm2 start server.js -i max`
- Implement Redis caching for frequently used algorithms
- Add rate limiting with `express-rate-limit`

### Frontend
- Enable CDN for static assets
- Implement code splitting (already configured)
- Use service workers for offline support
- Optimize images and assets

## Security Checklist

- [ ] Update all `ALLOWED_ORIGINS` in production
- [ ] Enable HTTPS/SSL certificates
- [ ] Set strong `NODE_ENV=production`
- [ ] Implement rate limiting on API endpoints
- [ ] Regular dependency updates (`npm audit fix`)
- [ ] Firewall rules to restrict backend access
- [ ] Monitor logs for suspicious activity
- [ ] Backup database/configs regularly

## Monitoring

### PM2 Monitoring
```bash
pm2 monit
pm2 status
pm2 logs
```

### Nginx Monitoring
```bash
sudo systemctl status nginx
sudo nginx -t  # Test configuration
```

## Common Issues

### C Programs Not Compiling
```bash
# Check GCC version
gcc --version

# Rebuild all
cd backend
make clean
make all

# Check specific errors
make 2>&1 | grep error
```

### CORS Errors
- Verify `ALLOWED_ORIGINS` in backend `.env`
- Check browser console for actual origin
- Ensure frontend URL matches exactly (with/without trailing slash)

### 502 Bad Gateway
- Backend not running: `pm2 status`
- Port mismatch in Nginx config
- Check backend logs: `pm2 logs`

### Frontend Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

## Scaling Considerations

### Horizontal Scaling
- Use load balancer (Nginx, AWS ELB)
- Run multiple backend instances
- Share build directory via NFS or S3

### Vertical Scaling
- Increase server resources
- Optimize C program compilation with `-O2` or `-O3`
- Use faster CPU for compilation

## Rollback Procedure

```bash
# Backend rollback
pm2 stop algo-viz-backend
git checkout previous-commit
npm install
make all
pm2 restart algo-viz-backend

# Frontend rollback
cd frontend
git checkout previous-commit
npm install
npm run build
# Or revert deployment in platform UI
```

## Support

For issues or questions:
- GitHub Issues: [Repository Issues Page]
- Documentation: See README.md and FEATURES.md
- Logs: Check PM2 and Nginx logs for errors
