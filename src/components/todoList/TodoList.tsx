import React from 'react';
import useTodoList from './hooks/TodoListHook';

const TodoList = () => {
  const { todosMap, newTodo, todoText, setTodoText } = useTodoList('');

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          newTodo();
        }}
      >
        <label htmlFor='write-todo'>Write Todo</label>
        <input
          type='text'
          value={todoText}
          id='write-todo'
          onChange={(e) => setTodoText(e.target.value)}
          placeholder='Write Todo Message'
        />
        <button type='submit'>Add</button>
      </form>
      <div>{todosMap.length > 0 && todosMap}</div>
    </div>
  );
};

export default TodoList;
