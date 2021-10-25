import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { shuffle } from '../helpers';
import { IQuiz } from '../interfaces';
import Button from './Button';

interface IProps extends IQuiz {
  onAnswerSelected: (answer: string) => void;
}

const QuizQuestion = ({
  correct_answer,
  incorrect_answers,
  question,
  onAnswerSelected,
}: IProps) => {
  const allAnswers = shuffle([correct_answer, ...incorrect_answers]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{question}</Text>
      </View>

      <View style={styles.answerList}>
        {allAnswers.map((ans) => (
          <Button
            key={ans}
            onPress={() => onAnswerSelected(ans)}
            activeOpacity={0.6}
            text={ans}
          ></Button>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: '800',
  },
  titleWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'center',
  },

  answerList: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 30,
  },
});

export default QuizQuestion;
