import { configureStore } from '@reduxjs/toolkit';
import todoListReducer from './slices/todoListSlice';
import distributorReducer from './slices/distributorSlice';
import shopReducer from './slices/shopSlice';
import transactionReducer from './slices/transactionSlice';
import { enableMapSet } from 'immer';

enableMapSet();

const store = configureStore({
  reducer: {
    todoList: todoListReducer,
    distributor: distributorReducer,
    shop: shopReducer,
    transaction: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
