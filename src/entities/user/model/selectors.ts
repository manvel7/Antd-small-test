import { RootState } from '@/store';

export const getUsers = (state: RootState) => state.users.users;
export const getUsersLoading = (state: RootState) => state.users.loading;
export const getUsersError = (state: RootState) => state.users.error;
