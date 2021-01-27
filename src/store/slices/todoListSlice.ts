import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, TodoListSliceState } from '../../models';
import { RootState } from '../store';

let idCounter = 0;

const initialState: TodoListSliceState = {
  value: [],
};

const addToTodoListReducer: CaseReducer<
  TodoListSliceState,
  PayloadAction<string>
> = (state, action) => {
  if (action.payload.length > 0) {
    const todo = new Todo();
    todo.id = idCounter++;
    todo.text = action.payload;
    state.value.push({
      ...todo,
    });
  }
};

const deleteTodoReducer: CaseReducer<
  TodoListSliceState,
  PayloadAction<number>
> = (state, action) => {
  state.value = state.value.filter((todo) => todo.id !== action.payload);
};

const deleteAllReducer: CaseReducer<TodoListSliceState> = (state) => {
  state.value = [];
};

export const todoListSlice = createSlice({
  name: 'todoListSlice',
  initialState,
  reducers: {
    addToTodoList: addToTodoListReducer,
    deleteTodo: deleteTodoReducer,
    deleteAll: deleteAllReducer,
  },
});

export const { addToTodoList, deleteTodo, deleteAll } = todoListSlice.actions;

export const selectTodoList = ({ todoList }: RootState) => todoList.value;

export const deleteTodoAsync = (id: number) => (dispatch) => {
  setTimeout(() => {
    dispatch(deleteTodo(id));
  }, 1000);
};

export default todoListSlice.reducer;
