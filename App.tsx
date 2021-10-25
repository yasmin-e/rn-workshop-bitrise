import React, { useCallback, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { MAX_LIVES, MAX_QUESTIONS } from './config';
import { useQuiz } from './hooks';
import { Game, EndGame } from './screens';

export default function App() {
  const { questions, reload, isLoading } = useQuiz();
  const [lives, setLives] = useState(MAX_LIVES);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswerSelected = useCallback(
    (answer) => {
      const currentQuestion = questions[currentQuestionIndex];
      if (answer === currentQuestion.correct_answer) {
        setCurrentQuestionIndex((c) => c + 1);
      } else {
        setLives((l) => l - 1);
      }
    },
    [questions, currentQuestionIndex]
  );

  const handleResetGame = () => {
    setLives(MAX_LIVES);
    setCurrentQuestionIndex(0);
    reload();
  };

  return (
    <SafeAreaView style={styles.container}>
      {currentQuestionIndex !== MAX_QUESTIONS && lives > 0 && (
        <Game
          currentIndex={currentQuestionIndex}
          questions={questions}
          handleAnswerSelected={handleAnswerSelected}
          onResetGame={handleResetGame}
          isLoading={isLoading}
        />
      )}

      {(lives === 0 || currentQuestionIndex === MAX_QUESTIONS) && (
        <EndGame
          onResetGame={handleResetGame}
          isGameOver={lives === 0}
          currentIndex={currentQuestionIndex}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
});
