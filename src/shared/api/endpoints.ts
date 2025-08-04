import { ENV_CONFIG } from '../config/env';

// API endpoints configuration
export const ENDPOINTS = {
  // User endpoints
  USERS: '/users',
  USER_BY_ID: (id: string) => `/users/${id}`,
} as const;

// Base query configuration for RTK Query
export const BASE_QUERY_CONFIG = {
  baseUrl: process.env.REACT_APP_API_URL || '',
  timeout: process.env.REACT_APP_API_TIMEOUT || '',
} as const;
