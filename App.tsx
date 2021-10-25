import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { QuizQuestion } from './components';
import { decodeResponse } from './helpers';
import { IQuiz, IResponse } from './interfaces';

const API_URL = 'https://opentdb.com/api.php?amount=10&encode=url3986';
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
        setCurrentQuestionIndex((c) => (c += 1));
      } else {
        // TODO: incorrect
      }
    },
    [questions, currentQuestionIndex]
  );

  return (
    <SafeAreaView style={styles.container}>
      {questions[currentQuestionIndex] && (
        <QuizQuestion
          onAnswerSelected={handleAnswerSelected}
          {...questions[currentQuestionIndex]}
        ></QuizQuestion>
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
