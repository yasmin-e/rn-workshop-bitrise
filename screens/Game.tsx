import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Button, QuizQuestion } from '../components';
import { MAX_QUESTIONS } from '../config';
import { IQuiz } from '../interfaces';

const { width } = Dimensions.get('screen');
const counterSize = width * 0.3;

interface IProps {
  questions: IQuiz[];
  currentIndex: number;
  handleAnswerSelected: (answer: string) => void;
  onResetGame: () => void;
}

const Game = ({
  currentIndex,
  questions,
  handleAnswerSelected,
  onResetGame,
}: IProps) => {
  // TODO: add loading indicator
  return (
    <>
      <View style={styles.row}>
        <Text style={styles.header}>Quiz</Text>
        <Button
          fullWidth={false}
          onPress={onResetGame}
          inverted
          text="New game"
        />
      </View>
      <View style={styles.row}>
        <Text>{`${currentIndex + 1} / ${MAX_QUESTIONS}`}</Text>
        <Button fullWidth={false} inverted text="50 / 50" />
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
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'flex-end',
  },
  header: {
    fontSize: 50,
  },
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
