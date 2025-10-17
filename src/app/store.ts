import { configureStore, ThunkAction, Action, combineReducers, PreloadedState } from '@reduxjs/toolkit';

import { apiSlice } from '../features/api/apiSlice';
import { categoriesApiSlice } from "../features/categories/categorySlice";
import { castMembersApiSlice } from '../features/cast/castMembersSlice';
import { genreApiSlice } from '../features/genre/GenreSlice';
import { videoApiSlice } from '../features/video/VideoSlice';
import { uploadReducer } from '../features/uploads/UploadSlice';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [categoriesApiSlice.reducerPath]: apiSlice.reducer,
  [castMembersApiSlice.reducerPath]: apiSlice.reducer,
  [genreApiSlice.reducerPath]: apiSlice.reducer,
  [videoApiSlice.reducerPath]: apiSlice.reducer,
  uploadSlice: uploadReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      })
        .concat(
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
