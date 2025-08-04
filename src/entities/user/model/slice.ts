import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from './types';

const initialState: UserState = {
  users: [],
  loading: false,
  error: null
};

// Create the user slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<Omit<User, 'key'>>) => {
      const newUser: User = {
        key: Date.now().toString(),
        ...action.payload
      };
      console.log('newUser', newUser);
      state.users.push(newUser);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(
        (user) => user.key === action.payload.key
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.key !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  }
});

// Export actions
export const { addUser, updateUser, deleteUser, setLoading } = userSlice.actions;

// Export the reducer as default
export default userSlice;
