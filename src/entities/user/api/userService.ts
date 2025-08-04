import { User } from '../model/types';
import { ENV_CONFIG, GLOBAL_HEADERS } from '../../../shared/config/env';
import { ENDPOINTS } from '../../../shared/api/endpoints';

// API request/response types
export interface CreateUserRequest {
  name: string;
  age: number;
  phone: string;
}

export interface UpdateUserRequest extends CreateUserRequest {
  key: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  timestamp?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Custom API Error class
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Base API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${ENV_CONFIG.API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      ...GLOBAL_HEADERS,
      ...(options.headers || {}),
    },
    ...options,
  };

  // Add body serialization for POST/PUT/PATCH
  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), ENV_CONFIG.API_TIMEOUT);

    const response = await fetch(url, {
      ...config,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle different response types
    let responseData: any = null;
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else if (response.status !== 204) { // Not No Content
      responseData = await response.text();
    }

    if (!response.ok) {
      throw new ApiError(
        responseData?.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        response.statusText,
        responseData
      );
    }

    return responseData;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiError('Request timeout', 408, 'Request Timeout');
      }
      throw new ApiError(error.message, 0, 'Network Error');
    }

    throw new ApiError('Unknown error occurred', 0, 'Unknown Error');
  }
}

// User API service functions
export const userService = {
  // Get all users
  async getUsers(): Promise<User[]> {
    if (ENV_CONFIG.ENABLE_LOGGING) {
      console.log('🔍 Fetching users...');
    }

    const response = await apiRequest<ApiResponse<User[]>>(ENDPOINTS.USERS);

    if (ENV_CONFIG.ENABLE_LOGGING) {
      console.log('✅ Users fetched:', response.data.length);
    }

    return response.data;
  },

  // Get user by ID
  async getUserById(id: string): Promise<User> {
    if (ENV_CONFIG.ENABLE_LOGGING) {
      console.log(`🔍 Fetching user with ID: ${id}`);
    }

    const response = await apiRequest<ApiResponse<User>>(
      ENDPOINTS.USER_BY_ID(id)
    );

    if (ENV_CONFIG.ENABLE_LOGGING) {
      console.log('✅ User fetched:', response.data.name);
    }

    return response.data;
  },

  // Create new user
  async createUser(userData: CreateUserRequest): Promise<User> {
    if (ENV_CONFIG.ENABLE_LOGGING) {
      console.log('➕ Creating user:', userData.name);
    }

    const response = await apiRequest<ApiResponse<User>>(ENDPOINTS.USERS, {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (ENV_CONFIG.ENABLE_LOGGING) {
      console.log('✅ User created:', response.data.name);
    }

    return response.data;
  },

  // Update existing user
  async updateUser(userData: UpdateUserRequest): Promise<User> {
    if (ENV_CONFIG.ENABLE_LOGGING) {
      console.log('✏️ Updating user:', userData.name);
    }

    const { key, ...updateData } = userData;
    const response = await apiRequest<ApiResponse<User>>(
      ENDPOINTS.USER_BY_ID(key),
      {
        method: 'PUT',
        body: JSON.stringify(updateData),
      }
    );

    if (ENV_CONFIG.ENABLE_LOGGING) {
      console.log('✅ User updated:', response.data.name);
    }

    return response.data;
  },

  // Partially update user
  async patchUser(id: string, partialData: Partial<CreateUserRequest>): Promise<User> {
    if (ENV_CONFIG.ENABLE_LOGGING) {
      console.log('🔧 Patching user:', id);
    }

    const response = await apiRequest<ApiResponse<User>>(
      ENDPOINTS.USER_BY_ID(id),
      {
        method: 'PATCH',
        body: JSON.stringify(partialData),
      }
    );

    if (ENV_CONFIG.ENABLE_LOGGING) {
      console.log('✅ User patched:', response.data.name);
    }

    return response.data;
  },

  // Delete user
  async deleteUser(id: string): Promise<void> {
    if (ENV_CONFIG.ENABLE_LOGGING) {
      console.log('🗑️ Deleting user:', id);
    }

    await apiRequest<void>(ENDPOINTS.USER_BY_ID(id), {
      method: 'DELETE',
    });

    if (ENV_CONFIG.ENABLE_LOGGING) {
      console.log('✅ User deleted:', id);
    }
  },

  // Get users with pagination
  async getUsersPaginated(page = 1, limit = 10): Promise<PaginatedResponse<User>> {
    if (ENV_CONFIG.ENABLE_LOGGING) {
      console.log(`📄 Fetching users page ${page}, limit ${limit}`);
    }

    const response = await apiRequest<PaginatedResponse<User>>(
      `${ENDPOINTS.USERS}?page=${page}&limit=${limit}`
    );

    if (ENV_CONFIG.ENABLE_LOGGING) {
      console.log('✅ Paginated users fetched:', response.data.length);
    }

    return response;
  },

  // Search users
  async searchUsers(query: string): Promise<User[]> {
    if (ENV_CONFIG.ENABLE_LOGGING) {
      console.log('🔍 Searching users:', query);
    }

    const response = await apiRequest<ApiResponse<User[]>>(
      `${ENDPOINTS.USERS}/search?q=${encodeURIComponent(query)}`
    );

    if (ENV_CONFIG.ENABLE_LOGGING) {
      console.log('✅ Users found:', response.data.length);
    }

    return response.data;
  },
};

// Export individual functions for convenience
export const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  patchUser,
  deleteUser,
  getUsersPaginated,
  searchUsers,
} = userService;
