import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { GenerateQuestionResponse } from '@/app/_types/api/interview';
import { QuestionState } from '@/app/_types/interview';

export type AddQuestionType = (newQuestion: QuestionState) => void;
export type ChangeLastQuestionType = (anotherQuestion: QuestionState) => void;

interface PropsUpdateFollowUpQuestion {
  score: number;
  feedBack: string;
  improvedAnswer: string;
  userAnswer: string;
  followUpQuestion: GenerateQuestionResponse;
}
export type UpdateFollowUpQuestionType = ({
  score,
  feedBack,
  improvedAnswer,
  userAnswer,
  followUpQuestion,
}: PropsUpdateFollowUpQuestion) => void;

export default function useQuestionState() {
  const [questions, setQuestions] = useState<QuestionState[]>([]);

  const addQuestion = (newQuestion: QuestionState) => {
    setQuestions((prevQuestions) => [...prevQuestions, { ...newQuestion, id: uuidv4() }]);
  };

  const changeLastQuestion: ChangeLastQuestionType = (anotherQuestion) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions.slice(0, -1), anotherQuestion];
      return newQuestions;
    });
  };

  const updateFollowUpQuestion: UpdateFollowUpQuestionType = ({
    score,
    feedBack,
    improvedAnswer,
    userAnswer,
    followUpQuestion,
  }) => {
    setQuestions((prevQuestions) => {
      const lastQuestion = prevQuestions[prevQuestions.length - 1];
      const updatedQuestion = { ...lastQuestion, score, feedBack, improvedAnswer, userAnswer };
      const nextQuestion = {
        id: uuidv4(),
        ...followUpQuestion,
      };
      const newQuestions = [...prevQuestions.slice(0, -1), updatedQuestion, nextQuestion];

      return newQuestions;
    });
  };

  return { addQuestion, questions, changeLastQuestion, updateFollowUpQuestion };
}
