# Setup script to create .env files from .env.example templates

Write-Host "Creating .env files..." -ForegroundColor Green

# Server .env.example
$serverEnvExample = @"
# Server Configuration
PORT=4000

# MongoDB Configuration
# Option 1: Local MongoDB (requires MongoDB installed and running)
MONGODB_URI=mongodb://127.0.0.1:27017/mern-testing

# Option 2: MongoDB Atlas (cloud database - recommended)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-testing?retryWrites=true&w=majority

# JWT Secret for authentication
# IMPORTANT: Change this to a secure random string in production!
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Environment
NODE_ENV=development
"@

# Server .env (actual file with defaults)
$serverEnv = @"
# Server Configuration
PORT=4000

# MongoDB Configuration
# For local development, uncomment the line below if you have MongoDB installed:
# MONGODB_URI=mongodb://127.0.0.1:27017/mern-testing

# For MongoDB Atlas, uncomment and replace with your connection string:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-testing?retryWrites=true&w=majority

# JWT Secret for authentication
JWT_SECRET=dev-secret-key-change-in-production

# Environment
NODE_ENV=development
"@

# Client .env.example
$clientEnvExample = @"
# Client Configuration
# Vite automatically uses these variables prefixed with VITE_

# API Base URL (optional - defaults to proxy in vite.config.js)
# VITE_API_URL=http://localhost:4000

# Environment
NODE_ENV=development
"@

# Create files
if (-not (Test-Path "server\.env.example")) {
    Set-Content -Path "server\.env.example" -Value $serverEnvExample
    Write-Host "✓ Created server/.env.example" -ForegroundColor Green
} else {
    Write-Host "⚠ server/.env.example already exists, skipping..." -ForegroundColor Yellow
}

if (-not (Test-Path "server\.env")) {
    Set-Content -Path "server\.env" -Value $serverEnv
    Write-Host "✓ Created server/.env" -ForegroundColor Green
} else {
    Write-Host "⚠ server/.env already exists, skipping..." -ForegroundColor Yellow
}

if (-not (Test-Path "client\.env.example")) {
    Set-Content -Path "client\.env.example" -Value $clientEnvExample
    Write-Host "✓ Created client/.env.example" -ForegroundColor Green
} else {
    Write-Host "⚠ client/.env.example already exists, skipping..." -ForegroundColor Yellow
}

Write-Host "`nSetup complete! Remember to:" -ForegroundColor Cyan
Write-Host "1. Update server/.env with your MongoDB connection string (if needed)" -ForegroundColor Yellow
Write-Host "2. Change JWT_SECRET to a secure value in production" -ForegroundColor Yellow
Write-Host "3. .env files are already in .gitignore and won't be committed" -ForegroundColor Yellow

