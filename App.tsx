import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { QuizQuestion } from './components';
import { MAX_QUESTIONS } from './config';
import { decodeResponse } from './helpers';
import { IQuiz, IResponse } from './interfaces';
import { Game, EndGame } from './screens';

const API_URL = `https://opentdb.com/api.php?amount=${MAX_QUESTIONS}&encode=url3986`;
const MAX_LIVES = 3;

export default function App() {
  const [questions, setQuestions] = useState<IQuiz[]>([]);
  const [lives, setLives] = useState(MAX_LIVES);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then((res: IResponse) => {
        const decoded = decodeResponse(res);
        setQuestions(decoded.results);
      });
  }, []);

  const handleAnswerSelected = useCallback(
    (answer) => {
      const currentQuestion = questions[currentQuestionIndex];
      if (answer === currentQuestion.correct_answer) {
        // TODO: correct
        setCurrentQuestionIndex((c) => c + 1);
      } else {
        // TODO: incorrect
      }
    },
    [questions, currentQuestionIndex]
  );

  const handleResetGame = () => {
    setLives(MAX_LIVES);
    setCurrentQuestionIndex(0);
    // TODO: get new questions
  };

  return (
    <SafeAreaView style={styles.container}>
      {currentQuestionIndex !== MAX_QUESTIONS && lives > 0 && (
        <Game
          currentIndex={currentQuestionIndex}
          questions={questions}
          handleAnswerSelected={handleAnswerSelected}
          onResetGame={handleResetGame}
        />
      )}

      {(lives === 0 || currentQuestionIndex === MAX_QUESTIONS) && (
        <EndGame onResetGame={handleResetGame} isGameOver={lives === 0} />
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
