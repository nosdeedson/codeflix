import { configureStore, ThunkAction, Action, combineReducers, PreloadedState } from '@reduxjs/toolkit';

import { apiSlice } from '../features/api/apiSlice';
import categoriesReducers from "../features/categories/categorySlice";
import castMembersReducers from '../features/cast/castMembersSlice';

const rootReducer = combineReducers({
  categories: categoriesReducers,
  castMembers: castMembersReducers,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        apiSlice.middleware,
      ),
  })
};


export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
