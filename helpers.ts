import { IResponse } from './interfaces';

export const decodeResponse = (res: IResponse): IResponse => {
  return {
    ...res,
    results: res.results.map((q) => ({
      ...q,
      category: decodeURIComponent(q.category),
      correct_answer: decodeURIComponent(q.correct_answer),
      incorrect_answers: q.incorrect_answers.map(decodeURIComponent),
      question: decodeURIComponent(q.question),
    })),
  };
};
