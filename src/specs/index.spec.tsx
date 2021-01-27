import React from 'react';
import { render } from '@testing-library/react';
import Index from '../pages/index';
import { Provider } from 'react-redux';
import store from '../store/store';

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <Index />
      </Provider>
    );
    expect(baseElement).toBeTruthy();
  });
});
