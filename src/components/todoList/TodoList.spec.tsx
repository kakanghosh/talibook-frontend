import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../todoList/TodoList';
import { Provider } from 'react-redux';
import mockStore from '../../store/store';

describe('TodoList', () => {
  beforeEach(() => {
    render(
      <Provider store={mockStore}>
        <TodoList />
      </Provider>
    );
  });

  it('should render successfully', () => {
    expect(screen).toBeTruthy();
  });

  it('should have label and input for todo and Button', () => {
    expect(screen.getByLabelText('Write Todo')).not.toBeNull();
    expect(screen.getByPlaceholderText('Write Todo Message')).not.toBeNull();
    expect(screen.getByText('Add')).not.toBeNull();
  });

  it('should have list of Todos', () => {
    const todoInputField = screen.getByPlaceholderText('Write Todo Message');
    const todos = ['Todo #123', 'Todo #124', 'Todo #125'];
    todos.forEach((todo) => {
      fireEvent.change(todoInputField, { target: { value: todo } });
      fireEvent.click(screen.getByText('Add'));
    });
    todos.forEach((todo) => {
      expect(screen.getByText(todo)).not.toBeNull();
    });
  });
});
