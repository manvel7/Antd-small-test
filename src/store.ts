import {configureStore} from '@reduxjs/toolkit';
import userSlice from './entities/user/model/slice';
import {TypedUseSelectorHook} from 'react-redux';

// Configure the store
export const store = configureStore({
  reducer: {
    users: userSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppSelector = TypedUseSelectorHook<RootState>;
