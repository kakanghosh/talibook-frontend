import React from 'react';
import useTodoAction from '../../hooks/TodoItemHook';
import style from './Todo.module.scss';

const TodoItem = ({ todo }) => {
  const { isDeleting, deleteTodoFromList } = useTodoAction(todo);

  return (
    <div>
      <span className={isDeleting ? style.ondelete : ''}>{todo.text}</span>
      <button onClick={deleteTodoFromList}>
        {isDeleting ? (
          <img src='/loading-2.gif' width='16px' height='16px' alt='loading' />
        ) : (
          'X'
        )}
      </button>
    </div>
  );
};

export default TodoItem;
