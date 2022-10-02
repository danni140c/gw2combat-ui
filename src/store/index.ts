import { configureStore } from '@reduxjs/toolkit';
import skillsReducer from './Skills';

const store = configureStore({
  reducer: {
    skills: skillsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export { useAppDispatch, useAppSelector } from './hooks';

export default store;
