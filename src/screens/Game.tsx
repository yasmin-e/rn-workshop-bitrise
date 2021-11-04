import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Button, QuizQuestion } from '../components';
import { maxLives, maxQuestions } from '../config';
import { IQuiz } from '../interfaces';
import { shuffle } from '../utils';

interface IProps {
  questions: IQuiz[];
  currentIndex: number;
  handleAnswerSelected: (answer: string) => void;
  onResetGame: () => void;
  isLoading: boolean;
  lives: number;
  isLifelineUsed: boolean;
  setIsLifelineUsed: (val: boolean) => void;
}

const Game = ({
  currentIndex,
  questions,
  handleAnswerSelected,
  onResetGame,
  isLoading,
  lives,
  isLifelineUsed,
  setIsLifelineUsed,
}: IProps) => {
  const currentQuestion =
    questions.length > 0 ? questions[currentIndex] : undefined;

  const [answers, setAnswers] = useState<string[]>([]);
  const shuffled = useMemo(() => shuffle(answers), [answers]);

  useEffect(() => {
    if (currentQuestion) {
      setAnswers([
        currentQuestion.correct_answer,
        ...currentQuestion.incorrect_answers,
      ]);
    }
  }, [currentQuestion]);

  const handleLifelinePressed = useCallback(() => {
    if (isLifelineUsed) return;

    if (currentQuestion) {
      const incorrectShuffled = shuffle(currentQuestion.incorrect_answers).slice(0, 2);

      setAnswers((all) => all.filter((ans) => !incorrectShuffled.includes(ans)));
      setIsLifelineUsed(true);
    }
  }, [currentQuestion, isLifelineUsed]);

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
        <Text testID="currentStep">
          {`${currentIndex + 1} / ${maxQuestions}`}
        </Text>
        {Array(maxLives)
          .fill('')
          .map((_, i) => (
            <Icon
              key={i}
              name="heart"
              tvParallaxProperties
              type="entypo"
              testID={`heart-${i < lives ? 'full' : 'empty'}`}
              color={i < lives ? 'red' : 'white'}
              size={40}
            />
          ))}

        <Button onPress={handleLifelinePressed} fullWidth={false} inverted text="50 / 50" testID="thanos" />
      </View>

      {isLoading || !currentQuestion ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="darkblue" />
        </View>
      ) : (
        <QuizQuestion
          onAnswerSelected={handleAnswerSelected}
          title={currentQuestion.question}
          answers={shuffled}
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
