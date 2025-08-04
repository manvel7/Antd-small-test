import { configureStore } from '@reduxjs/toolkit';
import { userApiSlice } from '@/entities/user/api/userApiSlice';
import userSlice from '@/entities/user/model/slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ENV_CONFIG } from '@/config/env';

// Configure the store
export const store = configureStore({
  reducer: {
    // RTK Query API slice
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    // Traditional slice for backward compatibility
    users: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(userApiSlice.middleware),
  devTools: ENV_CONFIG.ENABLE_DEV_TOOLS,
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export typed hooks
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
