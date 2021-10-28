import { fireEvent, render, waitFor } from '@testing-library/react-native';
import App from '../App';
import React from 'react';
import { maxLives, maxQuestions } from '../config';
import fetch from 'jest-fetch-mock';
import { IResponse } from '../interfaces';

const res: IResponse = {
  response_code: 0,
  results: [
    {
      category: '1',
      correct_answer: 'x',
      difficulty: 'easy',
      incorrect_answers: ['incorrect', 'b', 'c'],
      question: 'This is a question',
      type: 'multiple',
    },
  ],
};

describe('Game', () => {
  beforeAll(() => {
    fetch.mockResponse(JSON.stringify(res));
  });
  it('should have maximum lives by default', async () => {
    const { findAllByTestId } = render(<App />);
    const hearts = await findAllByTestId('heart-full');
    expect(hearts).toHaveLength(maxLives);
  });

  it('should show the first step', async () => {
    const { findByTestId } = render(<App />);
    const stepText = await findByTestId('currentStep');

    expect(stepText.children[0]).toBe(`1 / ${maxQuestions}`);
  });

  it('should decrease lives when wrong answer given', async () => {
    const { findByTestId, getByTestId, getAllByTestId } = render(<App />);
    const title = await findByTestId('question');
    const inCorrectButton = getByTestId('answer-1');

    expect(title.props.children).toEqual('This is a question');

    fireEvent.press(inCorrectButton);

    const hearts = getAllByTestId('heart-full');
    const emptyHearts = getAllByTestId('heart-empty');
    expect(hearts).toHaveLength(maxLives - 1);
    expect(emptyHearts).toHaveLength(1);
  });

  it('should increase step number if correct answer given', async () => {
    const { getByTestId, findByTestId, findByText, getAllByTestId } = render(
      <App />
    );
    const correctButton = await findByTestId('answer-0');

    fireEvent.press(correctButton);

    waitFor(() => {
      expect(getByTestId('currentStep').children[0]).toBe(
        `2 / ${maxQuestions}`
      );
    });
  });
});
