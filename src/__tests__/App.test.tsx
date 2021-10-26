import { render, fireEvent } from '@testing-library/react-native';
import App from '../App';
import React from 'react';

test('form submits two answers', () => {
  const mockFn = jest.fn();

  const { getByText, findAllByTestId } = render(<App></App>);
  const newGameButton = getByText('New game');
  const hearts = findAllByTestId('heart-live');
});
