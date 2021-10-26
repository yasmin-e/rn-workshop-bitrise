import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Button, QuizQuestion } from '../components';
import { maxLives, maxQuestions } from '../config';
import { IQuiz } from '../../interfaces';

interface IProps {
  questions: IQuiz[];
  currentIndex: number;
  handleAnswerSelected: (answer: string) => void;
  onResetGame: () => void;
  isLoading: boolean;
  lives: number;
}

const Game = ({
  currentIndex,
  questions,
  handleAnswerSelected,
  onResetGame,
  isLoading,
  lives,
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
        <Text>{`${currentIndex + 1} / ${maxQuestions}`}</Text>
        {Array(maxLives)
          .fill('')
          .map((_, i) => (
            <Icon
              key={i}
              name="heart"
              tvParallaxProperties
              type="entypo"
              color={i < lives ? 'red' : 'white'}
              size={40}
            />
          ))}

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Game;
