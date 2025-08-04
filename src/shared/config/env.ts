// Environment configuration
export const ENV_CONFIG = {
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
  API_TIMEOUT: parseInt(process.env.REACT_APP_API_TIMEOUT || '10000'),
  ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT || 'development',
  ENABLE_LOGGING: process.env.REACT_APP_ENABLE_LOGGING === 'true',
  ENABLE_DEV_TOOLS: process.env.REACT_APP_ENABLE_DEV_TOOLS === 'true',
} as const;

// Global headers configuration
export const GLOBAL_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
} as const;

// Log environment config in development
if (ENV_CONFIG.ENABLE_LOGGING) {
  console.log('Environment Config:', {
    API_BASE_URL: ENV_CONFIG.API_BASE_URL,
    ENVIRONMENT: ENV_CONFIG.ENVIRONMENT,
    API_TIMEOUT: ENV_CONFIG.API_TIMEOUT,
  });
}
