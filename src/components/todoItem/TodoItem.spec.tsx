import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import TodoItem from './TodoItem';
import mockStore from '../../store/store';
import { Todo } from '../../models';

describe('TodoItem', () => {
  const todo = new Todo();
  todo.id = 1;
  todo.text = 'Todo 1';

  beforeEach(() => {
    render(
      <Provider store={mockStore}>
        <TodoItem todo={todo} />
      </Provider>
    );
  });

  it('should render successfully', () => {
    expect(screen).toBeTruthy();
  });

  it('should render todo text and delete button', () => {
    expect(screen.getByText(todo.text)).not.toBeNull();
    expect(screen.getByText('X')).not.toBeNull();
  });

  it('should show loading on fire delete event', () => {
    fireEvent.click(screen.getByText('X'));
    expect(screen.getByAltText('loading')).not.toBeNull();
    expect(screen.queryByText('X')).toBeNull();
  });
});
