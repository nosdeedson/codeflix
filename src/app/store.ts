import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import categoriesReducers, { categoriesApiSlice } from "../features/categories/categorySlice"
import { apiSlice } from '../features/api/apiSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducers,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [categoriesApiSlice.reducerPath]: categoriesApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      categoriesApiSlice.middleware, // ✅ don’t forget this one
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
