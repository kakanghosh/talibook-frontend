import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodoAsync } from '../store/slices/todoListSlice';

function useTodoAction(todo) {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  function deleteTodoFromList() {
    setIsDeleting(true);
    dispatch(deleteTodoAsync(todo.id));
  }
  return { isDeleting, deleteTodoFromList };
}

export default useTodoAction;
