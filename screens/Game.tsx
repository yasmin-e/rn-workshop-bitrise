import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { QuizQuestion } from '../components';
import { IQuiz } from '../interfaces';

const { width } = Dimensions.get('screen');
const counterSize = width * 0.3;

interface IProps {
  questions: IQuiz[];
  currentIndex: number;
  handleAnswerSelected: (answer: string) => void;
}

const Game = ({ currentIndex, questions, handleAnswerSelected }: IProps) => {
  // TODO: add loading indicator
  return (
    <>
      <View>
        <Text>Quiz</Text>
      </View>
      <View style={styles.counter}>
        <Text style={styles.counterText}>{currentIndex + 1}</Text>
      </View>
      {questions[currentIndex] && (
        <QuizQuestion
          onAnswerSelected={handleAnswerSelected}
          {...questions[currentIndex]}
        ></QuizQuestion>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  counter: {
    borderWidth: 1,
    width: counterSize,
    height: counterSize,
    borderRadius: counterSize,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'darkblue',
  },
  counterText: {
    color: 'white',
    fontSize: 50,
  },
});

export default Game;
