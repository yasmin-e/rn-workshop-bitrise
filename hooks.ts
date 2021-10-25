import { useCallback, useEffect, useState } from 'react';
import { API_URL } from './config';
import { decodeResponse } from './helpers';
import { IQuiz } from './interfaces';

export function useQuiz() {
  const [questions, setQuestions] = useState<IQuiz[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const reload = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      const decoded = decodeResponse(json);
      setQuestions(decoded.results);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, []);

  return { reload, questions, isLoading };
}
