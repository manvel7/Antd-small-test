import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../model/types';
import { ENDPOINTS, BASE_QUERY_CONFIG } from '../../../shared/api/endpoints';
import { GLOBAL_HEADERS } from '../../../shared/config/env';

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
}

// RTK Query API slice
export const userApiSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_QUERY_CONFIG.baseUrl,
    timeout: BASE_QUERY_CONFIG.timeout as unknown as number,
    prepareHeaders: (headers) => {
      // Add global headers
      Object.entries(GLOBAL_HEADERS).forEach(([key, value]) => {
        headers.set(key, value);
      });
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    // Get all users
    getUsers: builder.query<User[], void>({
      query: () => ENDPOINTS.USERS,
      transformResponse: (response: ApiResponse<User[]>) => response.data,
      providesTags: ['User'],
    }),

    // Get user by ID
    getUserById: builder.query<User, string>({
      query: (id) => ENDPOINTS.USER_BY_ID(id),
      transformResponse: (response: ApiResponse<User>) => response.data,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),

    // Create new user
    createUser: builder.mutation<User, CreateUserRequest>({
      query: (userData) => ({
        url: ENDPOINTS.USERS,
        method: 'POST',
        body: userData,
      }),
      transformResponse: (response: ApiResponse<User>) => response.data,
      invalidatesTags: ['User'],
    }),

    // Update existing user
    updateUser: builder.mutation<User, UpdateUserRequest>({
      query: ({ key, ...userData }) => ({
        url: ENDPOINTS.USER_BY_ID(key),
        method: 'PUT',
        body: userData,
      }),
      transformResponse: (response: ApiResponse<User>) => response.data,
      invalidatesTags: (result, error, { key }) => [
        { type: 'User', id: key },
        'User',
      ],
    }),

    // Delete user
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: ENDPOINTS.USER_BY_ID(id),
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'User', id },
        'User',
      ],
    }),
  }),
});

// Export hooks for use in components
export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApiSlice;
