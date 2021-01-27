import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToTodoList, selectTodoList } from '../store/slices/todoListSlice';
import TodoItem from '../components/todoItem/TodoItem';
import { Todo } from '../models';

function getMappedTodos(todos: Todo[]) {
  return todos.map((todo) => <TodoItem key={todo.id} todo={todo} />);
}

function useTodoList(text) {
  const dispatch = useDispatch();
  const [todoText, setTodoText] = useState(text);
  const todos: Todo[] = useSelector(selectTodoList);
  const todosMap = getMappedTodos(todos);

  function newTodo() {
    dispatch(addToTodoList(todoText));
    setTodoText('');
  }

  return {
    todosMap,
    newTodo,
    todoText,
    setTodoText,
  };
}

export default useTodoList;
