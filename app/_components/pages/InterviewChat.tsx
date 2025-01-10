'use client';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { DeveloperType, QuestionState } from '@/app/_types/interview';
import {
  generateAnotherQuestionAPI,
  generateFeedbackAnswerAPI,
  generateQuestionAPI,
} from '@/app/services/api/interview';

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
    try {
      const { question: lastQuestion } = questions[questions.length - 1];
      const { score, feedBack, improvedAnswer } = await generateFeedbackAnswerAPI({
        question: lastQuestion,
        userAnswer: answerText,
      });

      setQuestions((prevQuestions) => {
        const lastQuestionReceivedFeedback = prevQuestions[prevQuestions.length - 1];
        lastQuestionReceivedFeedback.score = score;
        lastQuestionReceivedFeedback.feedBack = feedBack;
        lastQuestionReceivedFeedback.improvedAnswer = improvedAnswer;

        const newQuestions = [...prevQuestions.slice(0, -1), lastQuestionReceivedFeedback];
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
        level={{ title: '최우선 🚨', shade: '01' }}
        keywords={[
          '키워드 1',
          '키워드 2',
          '키워드 3',
          '키워드 4',
          '키워드 5',
          '키워드 6',
          '키워드 7',
          '키워드 8',
          '키워드 9',
          '키워드 10',
        ]}
        score={100}
        answer={'내답변은 이거야'}
        feedBack={
          '피드백 내용은 이렇습니다. 피드백 내용은 이렇습니다. 피드백 내용은 이렇습니다. 피드백 내용은 이렇습니다. 피드백 내용은 이렇습니다. 피드백 내용은 이렇습니다. 피드백 내용은 이렇습니다. 피드백 내용은 이렇습니다. 피드백 내용은 이렇습니다. 피드백 내용은 이렇습니다. 피드백 내용은 이렇습니다. 피드백 내용은 이렇습니다. 피드백 내용은 이렇습니다. 피드백 내용은 이렇습니다. '
        }
        improvedAnswer={'100점짜리 답변은 이거다'}
      />
    </div>
  );
}
