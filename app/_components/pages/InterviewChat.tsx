'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { DeveloperType, QuestionState } from '@/app/_types/interview';
import { IMPORTANCE_LEVEL } from '@/app/interview/_constants/questions';

import { generateAnotherQuestionAPI, generateFeedbackAnswerAPI, generateQuestionAPI } from '@/services/api/interview';

import AnswerSection from './AnswerSection';
import styles from './InterviewChat.module.scss';
import QuestionSection from './QuestionSection';

interface InterviewChatProps {
  devType: DeveloperType;
  topics: string[];
  subTopics: string[];
}

export default function InterviewChat({ devType, topics, subTopics }: InterviewChatProps) {
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

  // 초기 질문 생성
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

  const handleQuestionClick = (id: string) => setSelectedQuestionId(id);

  const handleCloseAnswer = () => setSelectedQuestionId(null);

  const selectedQuestion = questions.find(({ id }) => id === selectedQuestionId) || null;

  return (
    <div className={styles['interview-chat']}>
      <div
        className={clsx(styles['interview-chat__container'], {
          [styles['interview-chat__container--with-answer']]: selectedQuestionId,
        })}
      >
        <QuestionSection
          handleQuestionClick={handleQuestionClick}
          selectedQuestionId={selectedQuestionId}
          questions={questions}
          handleGenerateAnotherQuestion={handleGenerateAnotherQuestion}
          handleGenerateFeedbackAnswer={handleGenerateFeedbackAnswer}
        />
      </div>

      <AnswerSection
        handleCloseAnswer={handleCloseAnswer}
        selectedQuestion={selectedQuestion}
        level={IMPORTANCE_LEVEL[selectedQuestion?.importance || '05']}
        keywords={selectedQuestion?.keywords || []}
        score={selectedQuestion?.score || 0}
        userAnswer={selectedQuestion?.userAnswer || ''}
        feedBack={selectedQuestion?.feedBack || ''}
        improvedAnswer={selectedQuestion?.improvedAnswer || ''}
      />
    </div>
  );
}
