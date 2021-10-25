import React from 'react';
import { Text } from 'react-native';
import { IQuiz } from '../interfaces';

interface IProps extends IQuiz {}

const QuizQuestion = (props: IProps) => {
  return (
    <>
      <Text>{props.question}</Text>
    </>
  );
};

export default QuizQuestion;
