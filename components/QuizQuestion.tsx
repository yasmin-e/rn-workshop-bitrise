import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { shuffle } from '../helpers';
import { IQuiz } from '../interfaces';

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
          <TouchableOpacity
            key={ans}
            onPress={() => onAnswerSelected(ans)}
            activeOpacity={0.6}
            style={styles.answer}
          >
            <Text style={styles.answerText}>{ans}</Text>
          </TouchableOpacity>
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
    padding: 30,
    height: 150,
    justifyContent: 'center',
  },
  answerText: {
    color: 'white',
    fontSize: 18,
  },
  answer: {
    backgroundColor: 'darkblue',
    width: '100%',
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 2,
  },
  answerList: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 30,
  },
});

export default QuizQuestion;
