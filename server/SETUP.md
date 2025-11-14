# Server Setup Guide

## For Running Tests (Required for Assignment)

**Good news:** Tests don't need MongoDB! They use MongoDB Memory Server automatically.

Just run:
```bash
npm test
```

## For Running Dev Server (Optional)

The dev server requires MongoDB. You have two options:

### Option 1: MongoDB Atlas (Recommended - No Installation)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a free cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/...`)

6. Create `server/.env` file:
```
PORT=4000
MONGODB_URI=your-atlas-connection-string-here
JWT_SECRET=your-secret-key-here
```

7. Run the server:
```bash
npm run dev
```

### Option 2: Local MongoDB

1. Download and install MongoDB Community Edition:
   - Windows: https://www.mongodb.com/try/download/community
   - Or use MongoDB via Docker

2. Start MongoDB service:
   - Windows: MongoDB should start automatically as a service
   - Or run: `mongod` in a terminal

3. Create `server/.env` file:
```
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/mern-testing
JWT_SECRET=your-secret-key-here
```

4. Run the server:
```bash
npm run dev
```

## Important Notes

- **For the assignment:** You only need to run tests, which work without MongoDB
- **Dev server is optional:** Only needed if you want to manually test the API
- **Tests are independent:** Integration tests use MongoDB Memory Server, so they work without any setup

