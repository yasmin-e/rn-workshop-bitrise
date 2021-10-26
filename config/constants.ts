import { DIFFICULTY, MAX_LIVES, MAX_QUESTIONS } from 'react-native-dotenv';

const DEFAULT_MAX_QUESTIONS = 10;
const DEFAULT_MAX_LIVES = 3;
const DEFAULT_DIFFICULTY = 'easy';

const maxQuestions = MAX_QUESTIONS
  ? Number(MAX_QUESTIONS)
  : DEFAULT_MAX_QUESTIONS;

const maxLives = MAX_LIVES ? Number(MAX_LIVES) : DEFAULT_MAX_LIVES;

const difficulty = DIFFICULTY || DEFAULT_DIFFICULTY;

const apiUrl = `https://opentdb.com/api.php?amount=${maxQuestions}&encode=url3986&difficulty=${difficulty}`;

export { apiUrl, maxLives, maxQuestions };
