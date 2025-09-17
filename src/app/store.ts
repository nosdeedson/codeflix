import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { apiSlice } from '../features/api/apiSlice';
import categoriesReducers, { categoriesApiSlice } from "../features/categories/categorySlice";
import castMembersReducers, { castMembersApiSlice } from '../features/cast/castMembersSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducers,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [categoriesApiSlice.reducerPath]: categoriesApiSlice.reducer,
    [castMembersApiSlice.reducerPath]: castMembersApiSlice.reducer,
    castMembers: castMembersReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
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
