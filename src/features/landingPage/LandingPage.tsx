import React from 'react';
import TodoList from '../../components/todoList/TodoList';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div>
      <h2>Landing Page</h2>
      <div>
        <TodoList />
        <Link href='/about'>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>Go to About</a>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
