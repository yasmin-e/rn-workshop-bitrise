import React from "react";
import App from "../App";
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { maxLives, maxQuestions } from "../config";
import fetch from "jest-fetch-mock";
import { IResponse } from "../interfaces";

const mockResponse: IResponse = {
    response_code: 0,
    results: [
        {
            question: 'Do you enjoy this workshop, motherfucker?',
            correct_answer: 'YES',
            incorrect_answers: ['No', 'Not really', 'Maybe, motherfucker'],
            category: 'tech',
            difficulty: 'easy',
            type: 'multiple'
        }
    ]
};

describe('App', () => {
    beforeEach(() => {
        fetch.mockResponse(JSON.stringify(mockResponse));
    });

    it('should have all lives by default', async () => {
        const { findAllByTestId } = render(<App />);
        const hearts = await findAllByTestId('heart-full');

        expect(hearts).toHaveLength(maxLives);
    });

    it('should show first step text', async () => {
        const { findByTestId } = render(<App />);
        const currentStep = await findByTestId('currentStep');

        expect(currentStep.props.children).toEqual(`1 / ${maxQuestions}`);
    });

    it('should decrease lives when incorrect selected', async () => {
        const { findByTestId, findAllByTestId, getByText } = render(<App />);

        const question = await findByTestId('question');

        expect(question.props.children).toEqual('Do you enjoy this workshop, motherfucker?');

        const incorrectButton = getByText('Not really');
        fireEvent.press(incorrectButton);
        const hearts = await findAllByTestId('heart-full');
        const emptyHearts = await findAllByTestId('heart-empty');

        expect(hearts).toHaveLength(maxLives - 1);
        expect(emptyHearts).toHaveLength(1);
    });

    it('should increase stepCount if correct answer selected', async () => {
        const { getByText } = render(<App />);

        const correctButton = await waitFor(() => getByText('YES'));
        fireEvent.press(correctButton);
        const nextStep = getByText(`2 / ${maxQuestions}`);

        expect(nextStep.props.children).toEqual(`2 / ${maxQuestions}`);
    })
});