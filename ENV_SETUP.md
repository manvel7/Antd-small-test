# Environment Setup Guide

## 🔧 Environment Files Configuration

Since `.env` files are gitignored, you need to create them manually. Here are the configurations for each environment:

### 📁 Create `.env` (Default/Development)
```bash
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:3001/api
REACT_APP_API_TIMEOUT=10000

# Environment
REACT_APP_ENVIRONMENT=development

# Feature Flags
REACT_APP_ENABLE_LOGGING=true
REACT_APP_ENABLE_DEV_TOOLS=true

# Optional: Authentication
REACT_APP_AUTH_TOKEN_KEY=auth_token
REACT_APP_REFRESH_TOKEN_KEY=refresh_token
```

### 📁 Create `.env.development`
```bash
# Development Environment Configuration
REACT_APP_API_BASE_URL=http://localhost:3001/api
REACT_APP_API_TIMEOUT=10000
REACT_APP_ENVIRONMENT=development
REACT_APP_ENABLE_LOGGING=true
REACT_APP_ENABLE_DEV_TOOLS=true
```

### 📁 Create `.env.production`
```bash
# Production Environment Configuration
REACT_APP_API_BASE_URL=https://api.yourapp.com/api
REACT_APP_API_TIMEOUT=15000
REACT_APP_ENVIRONMENT=production
REACT_APP_ENABLE_LOGGING=false
REACT_APP_ENABLE_DEV_TOOLS=false
```

### 📁 Create `.env.test`
```bash
# Test Environment Configuration
REACT_APP_API_BASE_URL=http://localhost:3001/api
REACT_APP_API_TIMEOUT=5000
REACT_APP_ENVIRONMENT=test
REACT_APP_ENABLE_LOGGING=true
REACT_APP_ENABLE_DEV_TOOLS=true
```

## 🚀 Available Scripts

With cross-env installed, you can now use these scripts:

```bash
# Development (default)
npm start

# Production mode locally
npm run start:prod

# Build for production
npm run build

# Build for development
npm run build:dev

# Run tests
npm test
```

## 📝 How It Works

1. **cross-env**: Ensures environment variables work on Windows, macOS, and Linux
2. **Environment hierarchy**: `.env.local` > `.env.development` > `.env`
3. **Global config**: All environment variables are centralized in `src/shared/config/env.ts`
4. **RTK Query**: API configuration automatically uses environment variables

## 🔍 Environment Detection

The app will automatically detect the environment and configure:
- API base URL
- Request timeouts
- Logging levels
- Development tools
- Error handling

## 🛠️ Usage in Code

```typescript
import { ENV_CONFIG, GLOBAL_HEADERS } from '../shared/config/env';

// Access environment variables
console.log(ENV_CONFIG.API_BASE_URL);
console.log(ENV_CONFIG.ENVIRONMENT);
```
