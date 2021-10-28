import React, { useMemo } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import Button from './Button';

interface IProps {
  onAnswerSelected: (answer: string) => void;
  answers: string[];
  title: string;
}

const QuizQuestion = ({ onAnswerSelected, answers, title }: IProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.titleWrapper}>
        <Text testID="question" style={styles.title}>
          {title}
        </Text>
      </View>

      <View style={styles.answerList}>
        {answers.map((ans, i) => (
          <Button
            key={ans}
            testID={`answer-${i}`}
            onPress={() => onAnswerSelected(ans)}
            activeOpacity={0.6}
            text={ans}
            style={styles.button}
          />
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
    height: 200,
  },
  answerList: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 30,
  },
  button: {
    marginBottom: 30,
  },
});

export default QuizQuestion;
