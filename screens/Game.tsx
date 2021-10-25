import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
  isLoading: boolean;
}

const Game = ({
  currentIndex,
  questions,
  handleAnswerSelected,
  onResetGame,
  isLoading,
}: IProps) => {
  const currentQuestion =
    questions.length > 0 ? questions[currentIndex] : undefined;

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

      {isLoading || !currentQuestion ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="darkblue" />
        </View>
      ) : (
        <QuizQuestion
          onAnswerSelected={handleAnswerSelected}
          {...currentQuestion}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Game;
