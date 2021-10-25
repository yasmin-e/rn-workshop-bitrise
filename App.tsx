import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { QuizQuestion } from './components';
import { IQuiz, IResponse } from './interfaces';

const API_URL = 'https://opentdb.com/api.php?amount=10&encode=url3986';
const MAX_LIVES = 3;

export default function App() {
  const [questions, setQuestions] = useState<IQuiz[]>([]);
  const [lives, setLives] = useState(MAX_LIVES);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then((val: IResponse) => setQuestions(val.results));
  }, []);

  return (
    <View style={styles.container}>
      <QuizQuestion {...questions[0]}></QuizQuestion>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
