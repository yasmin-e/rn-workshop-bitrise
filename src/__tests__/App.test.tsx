import { render } from '@testing-library/react-native';
import App from '../App';
import React from 'react';
import { maxLives, maxQuestions } from '../config';

describe('Game', () => {
  it('should have maximum lives by default', () => {
    const { getAllByTestId } = render(<App />);
    const hearts = getAllByTestId('heart-live');
    expect(hearts).toHaveLength(maxLives);

    const activeHearts = hearts.filter((element) =>
      element.findByProps({ color: 'red' })
    );
    expect(activeHearts).toHaveLength(maxLives);
  });

  it('should show the first step', () => {
    const { getByTestId } = render(<App />);
    const stepText = getByTestId('currentStep');

    expect(stepText.children[0]).toBe(`1 / ${maxQuestions}`);
  });
});
