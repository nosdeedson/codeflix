import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import categoriesReducers from "../features/categories/categorySlice"

export const store = configureStore({
  reducer: {
    categories: categoriesReducers
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
