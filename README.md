# Testing and Debugging MERN Applications

This assignment focuses on implementing comprehensive testing strategies for a MERN stack application, including unit testing, integration testing, and end-to-end testing, along with debugging techniques.

## Assignment Overview

You will:
1. Set up testing environments for both client and server
2. Write unit tests for React components and server functions
3. Implement integration tests for API endpoints
4. Create end-to-end tests for critical user flows
5. Apply debugging techniques for common MERN stack issues

## Project Structure

```
mern-testing/
├── client/                 # React front-end
│   ├── src/                # React source code
│   │   ├── components/     # React components
│   │   ├── tests/          # Client-side tests
│   │   │   ├── unit/       # Unit tests
│   │   │   └── integration/ # Integration tests
│   │   └── App.jsx         # Main application component
│   └── cypress/            # End-to-end tests
├── server/                 # Express.js back-end
│   ├── src/                # Server source code
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── middleware/     # Custom middleware
│   └── tests/              # Server-side tests
│       ├── unit/           # Unit tests
│       └── integration/    # Integration tests
├── jest.config.js          # Jest configuration
└── package.json            # Project dependencies
```

## Getting Started

### 1. Install dependencies
```bash
npm run install-all
```
This installs the shared dev tooling plus the client/server workspace dependencies.

### 2. Environment variables (Optional - only needed for running dev server)

**Important:** Tests don't require MongoDB! They use MongoDB Memory Server automatically.

If you want to run the dev server (`npm run dev`), set up environment variables:

**Option A: Use the setup script (recommended)**
```bash
powershell -ExecutionPolicy Bypass -File setup-env.ps1
```

**Option B: Manual setup**
1. Copy `server/.env.example` to `server/.env`
2. Update `server/.env` with your MongoDB connection string (see `server/SETUP.md`)

**To run tests, you can skip this step!** Tests work without MongoDB installed.

For detailed MongoDB setup instructions, see `server/SETUP.md`.

## Testing Strategy

| Layer | Tools | Coverage |
| ----- | ----- | -------- |
| Client unit | Jest + React Testing Library | Components (`Button`, `PostForm`, `ErrorBoundary`), custom hook (`useFetchPosts`), Redux slice (`postsSlice`) |
| Client integration | Jest + MSW | `App` happy-path flow, API error handling |
| Client e2e | Cypress | Critical flows: create post, validation feedback, navigation |
| Server unit | Jest | Controllers (`postController`), middleware (`authenticate`, `errorHandler`) |
| Server integration | Jest + Supertest + MongoDB Memory Server | CRUD operations for `/api/posts`, auth checks, pagination, filtering |

### Running Tests
```bash
# All Jest projects (client + server)
npm test

# Focused suites
npm run test:unit
npm run test:integration
npm run test:e2e   # Cypress (client workspace)

# Per workspace (example)
npm run test -w client
npm run test -w server
```

### Coverage
The root `jest.config.js` enforces ≥70% global lines/funcs. Generate HTML/text reports with:
```bash
npm run coverage
```
Artifacts are written to `coverage/client` and `coverage/server`.

## Debugging Techniques
- **Structured logging** via Winston + Morgan piping (`server/src/utils/logger.js`).
- **Global Express error handling** with graceful JSON responses.
- **Error boundaries** on the React side to prevent white screens.
- **Cypress intercepts** to simulate flaky API responses and reproduce issues.
- **Mongo Memory Server** enables deterministic DB state for integration tests.

## Submission Checklist
1. All automated tests passing (unit, integration, e2e).
2. Coverage report ≥70% attached to submission (screenshots).
3. README kept up to date with strategy + debugging notes.
4. Include evidence of debugging steps (log snippets, boundary usage) in PR/commit notes.

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Cypress Documentation](https://docs.cypress.io/)
- [MongoDB Testing Best Practices](https://www.mongodb.com/blog/post/mongodb-testing-best-practices) 