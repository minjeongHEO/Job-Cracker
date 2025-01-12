import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { generateAnotherQuestionAPI, generateFeedbackAnswerAPI, generateQuestionAPI } from '@/services/api/interview';

import { InterviewChatProps, QuestionState } from '../_types/interview';

export default function useQuestions({ devType, topics, subTopics }: InterviewChatProps) {
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

  useEffect(() => {
    const generateInitialQuestion = async () => {
      if (!questions.length) {
        try {
          const question = await generateQuestionAPI({ devType, topics, subTopics });
          setQuestions([{ ...question, id: uuidv4() }]);
        } catch (error) {
          console.error(error);
        }
      }
    };

    generateInitialQuestion();
  }, [devType, topics, subTopics, questions.length]);

  const handleGenerateAnotherQuestion = async () => {
    if (!questions.length) return;
    try {
      const question = await generateAnotherQuestionAPI({
        devType,
        topics,
        subTopics,
        questionState: questions[questions.length - 1],
      });

      const anotherQuestion = { ...question, id: uuidv4() };

      setQuestions((prevQuestions) => {
        const newQuestions = [...prevQuestions.slice(0, -1), anotherQuestion];
        return newQuestions;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleGenerateFeedbackAnswer = async (answerText: string) => {
    if (!questions.length) return;
    try {
      const { question: lastQuestion } = questions[questions.length - 1];
      const { score, feedBack, improvedAnswer, followUpQuestion } = await generateFeedbackAnswerAPI({
        topics,
        question: lastQuestion,
        userAnswer: answerText,
      });

      setQuestions((prevQuestions) => {
        const lastQuestion = prevQuestions[prevQuestions.length - 1];
        const updatedQuestion = { ...lastQuestion, score, feedBack, improvedAnswer, userAnswer: answerText };
        const nextQuestion = {
          id: uuidv4(),
          ...followUpQuestion,
        };
        const newQuestions = [...prevQuestions.slice(0, -1), updatedQuestion, nextQuestion];

        return newQuestions;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const selectedQuestion = questions.find(({ id }) => id === selectedQuestionId) || null;

  const handleQuestionClick = (id: string) => setSelectedQuestionId(id);

  const handleCloseAnswer = () => setSelectedQuestionId(null);

  return {
    handleGenerateAnotherQuestion,
    handleGenerateFeedbackAnswer,
    selectedQuestion,
    handleQuestionClick,
    handleCloseAnswer,
    selectedQuestionId,
    questions,
  };
}
