import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { maxQuestions } from '../config';

interface IProps {
  isGameOver: boolean;
  onResetGame: () => void;
  currentIndex: number;
}

const EndGame = ({ isGameOver, onResetGame, currentIndex }: IProps) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>
        {isGameOver ? 'Game over\nBetter luck next time' : 'Congratz, you won!'}
      </Text>

      {isGameOver && (
        <Text
          style={styles.scoreText}
        >{`${currentIndex} / ${maxQuestions}`}</Text>
      )}

      <TouchableOpacity onPress={onResetGame} style={styles.button}>
        <Text style={styles.buttonText}>New game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 40,
    fontWeight: '900',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'darkblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginTop: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  scoreText: {
    marginTop: 25,
    fontSize: 20,
  },
});

export default EndGame;
