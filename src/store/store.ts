import { configureStore } from '@reduxjs/toolkit';
import todoListReducer from './slices/todoListSlice';

const store = configureStore({
  reducer: {
    todoList: todoListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
